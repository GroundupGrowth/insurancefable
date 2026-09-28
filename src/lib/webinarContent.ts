import { serverClient } from './content';
import { mergeWebinarContent, WEBINAR_CONTENT_SLOT, type WebinarContent } from '../data/webinarContent';

/* Webinar page copy: code defaults overlaid with what /admin -> Webinar saved
   (JSON in the embed_slots `notes` column). Falls back to the defaults when
   Supabase is unreachable or the saved JSON is unreadable. */
export async function getWebinarContent(): Promise<WebinarContent> {
  const supabase = serverClient();
  if (!supabase) return mergeWebinarContent(null);
  try {
    const { data } = await supabase
      .from('embed_slots')
      .select('notes')
      .eq('slot_key', WEBINAR_CONTENT_SLOT)
      .maybeSingle();
    return mergeWebinarContent(data?.notes ? JSON.parse(data.notes) : null);
  } catch {
    return mergeWebinarContent(null);
  }
}
