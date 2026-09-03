'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { parseSlotNotes, serializeSlotNotes } from '../../../lib/slotNotes';
import { siteForms } from '../../../data/siteForms';
import { Card, Field, FormsTabs, PageHeader, SaveButton, inputClass, revalidatePaths } from '../ui';

/* Forms: every native site form (contact, quote widgets, funnel opt-ins) and
   the GHL webhook its submissions forward to. The forms POST to /api/lead/
   with their slot key as `source`; the webhook saved here (slot `notes`) is
   where the relay delivers. A form without a webhook shows an honest error on
   submit — set the webhook and it goes live within minutes (ISR). Ebook forms
   live under Books instead. */

interface FormState {
  slotKey: string;
  webhook: string;
  thankYou: string;
  hasEmbed: boolean;
}

export default function FormsAdminPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [forms, setForms] = useState<Record<string, FormState>>({});
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    const keys = siteForms.map((form) => form.slotKey);
    const { data, error: loadError } = await supabase
      .from('embed_slots')
      .select('slot_key, embed_code, notes')
      .in('slot_key', keys);
    if (loadError) {
      setError(loadError.message);
      return;
    }
    const bySlot: Record<string, FormState> = {};
    for (const key of keys) {
      const row = data?.find((candidate) => candidate.slot_key === key);
      const meta = parseSlotNotes(row?.notes);
      bySlot[key] = {
        slotKey: key,
        webhook: meta.webhook ?? '',
        thankYou: meta.thankYou ?? '',
        hasEmbed: Boolean(row?.embed_code?.trim()),
      };
    }
    setForms(bySlot);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const update = (slotKey: string, patch: Partial<FormState>) =>
    setForms((current) => ({ ...current, [slotKey]: { ...current[slotKey], ...patch } }));

  const saveAll = async () => {
    if (!supabase) return;
    setError(null);
    const now = new Date().toISOString();
    /* Preserve embed_code: read the current rows and only replace notes. */
    const { data: existing, error: readError } = await supabase
      .from('embed_slots')
      .select('slot_key, embed_code')
      .in(
        'slot_key',
        siteForms.map((form) => form.slotKey)
      );
    if (readError) throw new Error(readError.message);
    const rows = siteForms.map((form) => {
      const state = forms[form.slotKey];
      const row = existing?.find((candidate) => candidate.slot_key === form.slotKey);
      return {
        slot_key: form.slotKey,
        embed_code: row?.embed_code ?? '',
        notes: serializeSlotNotes({ thankYou: state?.thankYou, webhook: state?.webhook }),
        updated_at: now,
      };
    });
    const { error: upsertError } = await supabase
      .from('embed_slots')
      .upsert(rows, { onConflict: 'slot_key' });
    if (upsertError) {
      setError(upsertError.message);
      throw new Error(upsertError.message);
    }
    await revalidatePaths([...new Set(siteForms.flatMap((form) => form.pages))]);
    await load();
  };

  const configured = Object.values(forms).filter((form) => form.webhook.trim()).length;

  return (
    <div>
      <FormsTabs active="forms" />
      <PageHeader
        title="Forms"
        text={`The site's native lead forms and the GHL webhook each one delivers to. ${configured}/${siteForms.length} forms have a webhook. Without one, a form shows an honest error on submit (never a fake success). Paste the workflow's inbound-webhook URL and it's live within minutes. Ebook opt-in webhooks live under Books.`}
        actions={<SaveButton onSave={saveAll} />}
      />
      {error && <p className="text-[#FF6352] text-sm mb-6">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {siteForms.map((form) => {
          const state = forms[form.slotKey];
          const live = Boolean(state?.webhook.trim());
          return (
            <Card key={form.slotKey}>
              <div className="flex items-start justify-between gap-4 mb-1">
                <h2 className="text-[#0D1B3D] text-lg font-medium">{form.label}</h2>
                <span
                  className={`shrink-0 text-xs px-2.5 py-1 rounded-full ${
                    state?.hasEmbed
                      ? 'bg-[#0D1B3D]/10 text-[#0D1B3D]'
                      : live
                        ? 'bg-[#6ED05D]/20 text-[#2E7D32]'
                        : 'bg-[#FF6352]/15 text-[#C62828]'
                  }`}
                >
                  {state?.hasEmbed ? 'GHL embed pasted' : live ? 'Live' : 'No webhook'}
                </span>
              </div>
              <p className="text-[#0D1B3D]/50 text-xs mb-1">Collects: {form.fields}</p>
              <p className="text-[#0D1B3D]/50 text-xs mb-4 flex flex-wrap gap-x-3">
                {form.pages.map((page) => (
                  <a
                    key={page}
                    href={page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 underline decoration-[#0D1B3D]/20 underline-offset-2 hover:text-[#0D1B3D]"
                  >
                    {page}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </p>
              <Field
                label="Lead webhook"
                hint="GHL inbound-webhook URL (Workflows → Inbound Webhook trigger)"
              >
                <input
                  type="url"
                  value={state?.webhook ?? ''}
                  onChange={(event) => update(form.slotKey, { webhook: event.target.value })}
                  placeholder="https://services.leadconnectorhq.com/hooks/…"
                  className={`${inputClass} font-mono text-xs`}
                />
              </Field>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
