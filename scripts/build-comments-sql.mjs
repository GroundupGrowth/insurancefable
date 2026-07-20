/* Parses wp:comment blocks from the WordPress export and emits SQL for the
   post_comments table (read-only comment archive rendered under articles).

   Privacy: the export carries commenter emails and IP addresses — those are
   deliberately NOT migrated. Only what the live pages render is kept:
   author display name, date, text, and threading.

   Usage: node scripts/build-comments-sql.mjs
   Output: sync-from-export.comments.2026-07-10.sql (gitignored; Xander runs it
   manually in Supabase — anon key has no write access by design). */

import fs from 'node:fs';

const XML = 'iampewholelifeampinfinitebankingstrategies.WordPress.2026-07-10.xml';
const OUT = 'sync-from-export.comments.2026-07-10.sql';

const xml = fs.readFileSync(XML, 'utf8');

const cdata = (block, tag) => {
  const m = block.match(new RegExp(`<wp:${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</wp:${tag}>`));
  return m ? m[1] : '';
};

const rows = [];
for (const item of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
  const it = item[1];
  if (!it.includes('<wp:status><![CDATA[publish]]>')) continue;
  const slugM = it.match(/<wp:post_name><!\[CDATA\[([\s\S]*?)\]\]><\/wp:post_name>/);
  if (!slugM) continue;
  const slug = slugM[1];
  for (const cm of it.matchAll(/<wp:comment>([\s\S]*?)<\/wp:comment>/g)) {
    const c = cm[1];
    if (cdata(c, 'comment_approved') !== '1') continue;
    if (cdata(c, 'comment_type') !== 'comment') continue; // skip pingbacks
    rows.push({
      id: Number(cdata(c, 'comment_id')),
      slug,
      parent: Number(cdata(c, 'comment_parent')) || null,
      author: cdata(c, 'comment_author').trim(),
      date: cdata(c, 'comment_date_gmt').trim(), // GMT
      body: cdata(c, 'comment_content').trim(),
    });
  }
}

// drop replies whose parent was filtered out (unapproved/pingback parents)
const ids = new Set(rows.map((r) => r.id));
for (const r of rows) if (r.parent && !ids.has(r.parent)) r.parent = null;

const q = (s) => "'" + String(s).replace(/'/g, "''") + "'";

const lines = [];
lines.push(`-- Read-only comment archive from the 2026-07-10 WordPress export.
-- ${rows.length} approved comments across ${new Set(rows.map((r) => r.slug)).size} published posts.
-- Emails and IPs from the export are intentionally excluded (table is anon-readable).

create table if not exists post_comments (
  id bigint primary key,
  post_slug text not null,
  parent_id bigint references post_comments (id),
  author_name text not null,
  published_at timestamptz not null,
  body text not null
);
create index if not exists post_comments_slug_idx on post_comments (post_slug);
alter table post_comments enable row level security;
drop policy if exists "public read" on post_comments;
create policy "public read" on post_comments for select using (true);

begin;
delete from post_comments;
`);

// parents before children (WP ids are chronological, but be safe: sort roots first)
rows.sort((a, b) => (a.parent === null) === (b.parent === null) ? a.id - b.id : a.parent === null ? -1 : 1);
for (const r of rows) {
  lines.push(
    `insert into post_comments (id, post_slug, parent_id, author_name, published_at, body) values (` +
      `${r.id}, ${q(r.slug)}, ${r.parent ?? 'null'}, ${q(r.author)}, ${q(r.date + '+00')}, ${q(r.body)});`
  );
}
lines.push('commit;');

fs.writeFileSync(OUT, lines.join('\n'));
console.log(`${OUT}: ${rows.length} comments, ${new Set(rows.map((r) => r.slug)).size} posts`);
const per = {};
for (const r of rows) per[r.slug] = (per[r.slug] || 0) + 1;
console.log('top:', Object.entries(per).sort((a, b) => b[1] - a[1]).slice(0, 5));
