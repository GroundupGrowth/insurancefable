import type { SupabaseClient } from '@supabase/supabase-js';

/* Permanently deletes a draft article and everything keyed to it: the
   category relation, the per-post overrides (tag, author, featured image) and
   its slug in any selected-articles schema block.

   Drafts only. A published article must be unpublished first, so a single
   click can never take a live, indexed URL down. The status check runs in the
   delete query itself, not just in the UI. */
export async function deleteDraftPost(
  supabase: SupabaseClient,
  post: { id: number; slug: string }
): Promise<void> {
  const { data: current, error: readError } = await supabase
    .from('posts')
    .select('_status')
    .eq('id', post.id)
    .maybeSingle();
  if (readError) throw new Error(`Delete failed: ${readError.message}`);
  if (!current) throw new Error('This article no longer exists.');
  if (current._status === 'published') throw new Error('Unpublish this article before deleting it.');

  // The category relation goes first in case posts_rels.parent_id has a
  // non-cascading foreign key to posts.
  const { error: relError } = await supabase.from('posts_rels').delete().eq('parent_id', post.id);
  if (relError) throw new Error(`Delete failed: ${relError.message}`);

  const { data: deleted, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', post.id)
    .neq('_status', 'published')
    .select('id');
  if (error) throw new Error(`Delete failed: ${error.message}`);
  // RLS rejects a delete silently (0 rows, no error), so check that it went.
  if (!deleted?.length) {
    throw new Error(
      'Nothing was deleted. The article may be published (unpublish it first), or your account lacks delete access.'
    );
  }

  /* Cleanup after the post itself is gone. Leftovers would be harmless
     orphans keyed to a slug nothing uses. */
  await Promise.all([
    supabase.from('site_post_tags').delete().eq('post_slug', post.slug),
    supabase.from('site_post_authors').delete().eq('post_slug', post.slug),
    supabase.from('site_post_images').delete().eq('post_slug', post.slug),
  ]);
  const { data: blocks } = await supabase
    .from('site_schema_blocks')
    .select('id, post_slugs')
    .contains('post_slugs', [post.slug]);
  await Promise.all(
    (blocks ?? []).map((block: { id: string; post_slugs: string[] }) =>
      supabase
        .from('site_schema_blocks')
        .update({ post_slugs: block.post_slugs.filter((slug) => slug !== post.slug) })
        .eq('id', block.id)
    )
  );
}
