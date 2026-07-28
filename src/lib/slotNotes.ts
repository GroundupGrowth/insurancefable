/* The embed_slots `notes` column carries per-slot metadata without needing a
   migration. Two formats coexist:
   - legacy plain string  -> the thank-you page path (books admin, 2026-07-28)
   - JSON {"thank_you": "/path/", "webhook": "https://..."} -> used as soon as
     a slot also has a lead webhook (admin Books "Lead webhook" field).
   Always read via parseSlotNotes and write via serializeSlotNotes so the two
   formats stay interchangeable. */

export interface SlotMeta {
  thankYou?: string;
  webhook?: string;
}

export function parseSlotNotes(notes: string | null | undefined): SlotMeta {
  if (!notes) return {};
  const trimmed = notes.trim();
  if (trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed) as { thank_you?: unknown; webhook?: unknown };
      return {
        thankYou: typeof parsed.thank_you === 'string' && parsed.thank_you ? parsed.thank_you : undefined,
        webhook: typeof parsed.webhook === 'string' && parsed.webhook ? parsed.webhook : undefined,
      };
    } catch {
      return { thankYou: trimmed };
    }
  }
  return { thankYou: trimmed };
}

export function serializeSlotNotes(meta: SlotMeta): string | null {
  const thankYou = meta.thankYou?.trim() || '';
  const webhook = meta.webhook?.trim() || '';
  if (webhook) return JSON.stringify({ thank_you: thankYou || null, webhook });
  return thankYou || null;
}
