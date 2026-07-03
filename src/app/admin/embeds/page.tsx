'use client';

import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getSupabase, type EmbedSlotRow } from '../../../lib/supabase';
import { Card, Field, PageHeader, SaveButton, inputClass, revalidatePaths, textareaClass } from '../ui';

/* Embeds: every GHL/LeadConnector embed slot on the site, grouped by type.
   Advisor booking calendars are also editable from the agent's profile in
   the Agents section — same data, two doors. */

const CATEGORY_ORDER: EmbedSlotRow['category'][] = ['advisor', 'form', 'page', 'ebook'];

const CATEGORY_LABELS: Record<EmbedSlotRow['category'], { title: string; hint: string }> = {
  advisor: {
    title: 'Advisor booking calendars',
    hint: 'Each advisor’s LeadConnector calendar — shows as a booking section on their profile page.',
  },
  form: {
    title: 'Lead forms',
    hint: 'Each embed replaces the matching placeholder form on the site.',
  },
  page: {
    title: 'Page widgets',
    hint: 'Larger page embeds, e.g. the quote engine on /life-insurance-quotes/.',
  },
  ebook: {
    title: 'eBooks & guides',
    hint: 'One opt-in embed per book/guide on /ebooks-and-guides/. Add a slot when a new eBook launches.',
  },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function EmbedsAdminPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [slots, setSlots] = useState<EmbedSlotRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const [newCategory, setNewCategory] = useState<EmbedSlotRow['category']>('ebook');

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data, error: loadError } = await supabase.from('embed_slots').select('*').order('slot_key');
    if (loadError) setError(loadError.message);
    else setSlots((data as EmbedSlotRow[]) ?? []);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  const saveSlot = async (slotKey: string) => {
    if (!supabase) return;
    const embed_code = drafts[slotKey] ?? '';
    const { error: saveError } = await supabase
      .from('embed_slots')
      .update({ embed_code, updated_at: new Date().toISOString() })
      .eq('slot_key', slotKey);
    if (saveError) throw new Error(saveError.message);
    setSlots((current) => current.map((slot) => (slot.slot_key === slotKey ? { ...slot, embed_code } : slot)));
    setDrafts(({ [slotKey]: _saved, ...rest }) => rest);
    // embeds are fetched client-side, but bust ISR caches anyway for good measure
    await revalidatePaths(['/']);
  };

  const addSlot = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !newLabel.trim()) return;
    setError(null);
    const base = `${newCategory}:${slugify(newLabel)}`;
    const slot_key = newCategory === 'advisor' ? `${base}:booking` : base;
    const { error: insertError } = await supabase.from('embed_slots').insert({
      slot_key,
      label: newLabel.trim(),
      category: newCategory,
      embed_code: '',
    });
    if (insertError) setError(insertError.message);
    else {
      setNewLabel('');
      await load();
    }
  };

  const deleteSlot = async (slotKey: string) => {
    if (!supabase) return;
    if (!window.confirm(`Delete slot ${slotKey}? Its placeholder on the site falls back to the default.`)) return;
    const { error: deleteError } = await supabase.from('embed_slots').delete().eq('slot_key', slotKey);
    if (deleteError) setError(deleteError.message);
    else setSlots((current) => current.filter((slot) => slot.slot_key !== slotKey));
  };

  return (
    <>
      <PageHeader
        title="Embeds"
        text="Paste GoHighLevel / LeadConnector embed codes — the site picks them up instantly. Empty slots show their built-in placeholder."
      />

      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">{error}</p>
      )}

      {CATEGORY_ORDER.map((category) => {
        const categorySlots = slots.filter((slot) => slot.category === category);
        const { title, hint } = CATEGORY_LABELS[category];
        return (
          <section key={category} className="mb-10">
            <h2 className="text-[#0D1B3D] text-xl font-medium mb-1" style={{ letterSpacing: '-0.02em' }}>
              {title}
            </h2>
            <p className="text-[#0D1B3D]/50 text-sm mb-4">{hint}</p>
            <div className="flex flex-col gap-3">
              {categorySlots.length === 0 && <p className="text-[#0D1B3D]/40 text-sm">No slots yet.</p>}
              {categorySlots.map((slot) => {
                const draft = drafts[slot.slot_key];
                const value = draft ?? slot.embed_code;
                const dirty = draft !== undefined && draft !== slot.embed_code;
                return (
                  <Card key={slot.slot_key}>
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                      <div>
                        <p className="text-[#0D1B3D] font-medium text-sm">{slot.label}</p>
                        <p className="text-[#0D1B3D]/40 text-xs font-mono">{slot.slot_key}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            slot.embed_code.trim()
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-[#F5F5F5] text-[#0D1B3D]/50'
                          }`}
                        >
                          {slot.embed_code.trim() ? 'Live' : 'Empty — placeholder shown'}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteSlot(slot.slot_key)}
                          aria-label={`Delete ${slot.slot_key}`}
                          className="text-[#0D1B3D]/30 hover:text-red-600 transition-colors duration-150"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows={value.trim() ? 6 : 3}
                      placeholder="Paste the embed code here (iframe + script)…"
                      value={value}
                      onChange={(e) => setDrafts((current) => ({ ...current, [slot.slot_key]: e.target.value }))}
                      className={`${textareaClass} font-mono text-xs bg-[#F5F5F5]`}
                    />
                    <div className="mt-3">
                      <SaveButton onSave={() => saveSlot(slot.slot_key)} disabled={!dirty} />
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="pb-12">
        <h2 className="text-[#0D1B3D] text-xl font-medium mb-4" style={{ letterSpacing: '-0.02em' }}>
          Add a slot
        </h2>
        <Card>
          <form onSubmit={addSlot} className="flex gap-3 flex-wrap items-end">
            <div className="flex-1 min-w-[16rem]">
              <Field label="Label">
                <input
                  className={inputClass}
                  required
                  placeholder="e.g. 'New eBook Title'"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
              </Field>
            </div>
            <div className="w-44">
              <Field label="Type">
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as EmbedSlotRow['category'])}
                  className={inputClass}
                >
                  <option value="ebook">eBook / guide</option>
                  <option value="advisor">Advisor booking</option>
                  <option value="form">Lead form</option>
                  <option value="page">Page widget</option>
                </select>
              </Field>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#0D1B3D] text-white font-medium text-sm px-6 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Add slot
            </button>
          </form>
        </Card>
      </section>
    </>
  );
}
