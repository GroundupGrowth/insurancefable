'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { getSupabase, type AdvisorRow } from '../../../lib/supabase';
import { advisorDefaults } from '../../../data/advisors';
import type { AdvisorProfile } from '../../proclientguide/ProfileLayout';
import { Card, Field, PageHeader, SaveButton, StatusPill, inputClass, revalidatePaths, textareaClass } from '../ui';

/* Agents: one profile per advisor. The editor shows the merged view (override
   or code default) and saves the full state as an override row + the booking
   embed slot. "Reset" deletes the row so the code default shows again. */

interface EditorState {
  name: string;
  firstName: string;
  role: string;
  intro: string;
  photoUrl: string;
  email: string;
  schedulerUrl: string;
  specialties: string;                                        // one per line
  credentials: string;                                        // one per line
  bioSections: { heading: string; paragraphs: string }[];     // paragraphs = blank-line separated
  testimonials: { quote: string; attribution: string }[];
  bookingEmbed: string;
  /* Trust signals (E-E-A-T) */
  linkedinUrl: string;
  sameAs: string;                                             // one URL per line
  yearsExperience: string;
  licenses: string;                                           // one per line
  education: string;                                          // one per line
  publications: { source: string; title: string; href: string }[];
}

function toEditorState(fallback: AdvisorProfile, row: AdvisorRow | null, bookingEmbed: string): EditorState {
  const val = <T,>(override: T | null | undefined, def: T): T =>
    override === null || override === undefined || (typeof override === 'string' && override.trim() === '')
      ? def
      : override;
  const bioSections = val(row?.bio_sections, fallback.bioSections);
  const testimonials = val(row?.testimonials, fallback.testimonials);
  return {
    name: val(row?.name, fallback.name),
    firstName: val(row?.first_name, fallback.firstName),
    role: val(row?.role, fallback.role),
    intro: val(row?.intro, fallback.intro),
    photoUrl: val(row?.photo_url, fallback.photo?.src ?? ''),
    email: val(row?.email, fallback.email ?? ''),
    schedulerUrl: val(row?.scheduler_url, fallback.schedulerUrl ?? ''),
    specialties: val(row?.specialties, fallback.specialties).join('\n'),
    credentials: val(row?.credentials, fallback.credentials).join('\n'),
    bioSections: bioSections.map((section) => ({
      heading: section.heading,
      paragraphs: section.paragraphs.join('\n\n'),
    })),
    testimonials: testimonials.map((testimonial) => ({
      quote: testimonial.quote,
      attribution: testimonial.attribution ?? '',
    })),
    bookingEmbed,
    linkedinUrl: val(row?.linkedin_url, fallback.linkedinUrl ?? ''),
    sameAs: val(row?.same_as, fallback.sameAs ?? []).join('\n'),
    yearsExperience: val(row?.years_experience, fallback.yearsExperience ?? ''),
    licenses: val(row?.licenses, fallback.licenses ?? []).join('\n'),
    education: val(row?.education, fallback.education ?? []).join('\n'),
    publications: val(row?.publications, fallback.publications ?? []).map((publication) => ({
      source: publication.source ?? '',
      title: publication.title,
      href: publication.href ?? '',
    })),
  };
}

export default function AgentsPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const slugs = Object.keys(advisorDefaults);
  const [rows, setRows] = useState<Record<string, AdvisorRow>>({});
  const [embeds, setEmbeds] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [editor, setEditor] = useState<EditorState | null>(null);

  const load = async () => {
    if (!supabase) return;
    const [advisors, slots] = await Promise.all([
      supabase.from('advisors').select('*'),
      supabase.from('embed_slots').select('slot_key, embed_code').like('slot_key', 'advisor:%'),
    ]);
    const rowMap: Record<string, AdvisorRow> = {};
    (advisors.data as AdvisorRow[] | null)?.forEach((row) => {
      rowMap[row.slug] = row;
    });
    setRows(rowMap);
    const embedMap: Record<string, string> = {};
    slots.data?.forEach((slot) => {
      const slug = slot.slot_key.split(':')[1];
      embedMap[slug] = slot.embed_code ?? '';
    });
    setEmbeds(embedMap);
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  const openEditor = (slug: string) => {
    setSelected(slug);
    setEditor(toEditorState(advisorDefaults[slug], rows[slug] ?? null, embeds[slug] ?? ''));
  };

  if (selected && editor) {
    const fallback = advisorDefaults[selected];
    const path = `/proclientguide/${selected}/`;
    const set = (patch: Partial<EditorState>) => setEditor((state) => ({ ...state!, ...patch }));

    const save = async () => {
      if (!supabase) return;
      const { error: advisorError } = await supabase.from('advisors').upsert({
        slug: selected,
        name: editor.name,
        first_name: editor.firstName,
        role: editor.role,
        intro: editor.intro,
        photo_url: editor.photoUrl || null,
        email: editor.email || null,
        scheduler_url: editor.schedulerUrl || null,
        specialties: editor.specialties.split('\n').map((s) => s.trim()).filter(Boolean),
        credentials: editor.credentials.split('\n').map((s) => s.trim()).filter(Boolean),
        bio_sections: editor.bioSections
          .filter((section) => section.heading.trim())
          .map((section) => ({
            heading: section.heading,
            paragraphs: section.paragraphs.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
          })),
        testimonials: editor.testimonials
          .filter((testimonial) => testimonial.quote.trim())
          .map((testimonial) => ({
            quote: testimonial.quote,
            ...(testimonial.attribution.trim() ? { attribution: testimonial.attribution.trim() } : {}),
          })),
        linkedin_url: editor.linkedinUrl.trim() || null,
        same_as: editor.sameAs.split('\n').map((s) => s.trim()).filter(Boolean),
        years_experience: editor.yearsExperience.trim() || null,
        licenses: editor.licenses.split('\n').map((s) => s.trim()).filter(Boolean),
        education: editor.education.split('\n').map((s) => s.trim()).filter(Boolean),
        publications: editor.publications
          .filter((publication) => publication.title.trim())
          .map((publication) => ({
            title: publication.title.trim(),
            ...(publication.source.trim() ? { source: publication.source.trim() } : {}),
            ...(publication.href.trim() ? { href: publication.href.trim() } : {}),
          })),
        updated_at: new Date().toISOString(),
      });
      if (advisorError) throw new Error(advisorError.message);
      const { error: embedError } = await supabase.from('embed_slots').upsert({
        slot_key: `advisor:${selected}:booking`,
        label: `${editor.name} — booking calendar`,
        category: 'advisor',
        embed_code: editor.bookingEmbed,
        updated_at: new Date().toISOString(),
      });
      if (embedError) throw new Error(embedError.message);
      await revalidatePaths([path, '/proclientguide/introduction/']);
      await load();
    };

    const reset = async () => {
      if (!supabase) return;
      if (!window.confirm(`Reset ${fallback.name} to the defaults shipped with the code?`)) return;
      await supabase.from('advisors').delete().eq('slug', selected);
      await revalidatePaths([path]);
      await load();
      openEditor(selected);
    };

    return (
      <>
        <button
          type="button"
          onClick={() => {
            setSelected(null);
            setEditor(null);
          }}
          className="inline-flex items-center gap-2 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All agents
        </button>

        <PageHeader
          title={editor.name}
          text={`Live at ${path} — changes publish within a few seconds of saving.`}
          actions={
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="text-[#0D1B3D]/50 hover:text-red-600 text-sm font-medium transition-colors duration-150"
              >
                Reset to default
              </button>
              <SaveButton onSave={save} />
            </div>
          }
        />

        <div className="flex flex-col gap-4">
          <Card>
            <h2 className="text-[#0D1B3D] text-lg font-medium mb-4">Basics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Full name">
                <input className={inputClass} value={editor.name} onChange={(e) => set({ name: e.target.value })} />
              </Field>
              <Field label="First name" hint="Used in buttons: “Email Barry”, “Schedule a call with Barry”.">
                <input className={inputClass} value={editor.firstName} onChange={(e) => set({ firstName: e.target.value })} />
              </Field>
              <Field label="Role" hint="Shown above the name on the profile page.">
                <input className={inputClass} value={editor.role} onChange={(e) => set({ role: e.target.value })} />
              </Field>
              <Field label="Photo URL">
                <input className={inputClass} value={editor.photoUrl} onChange={(e) => set({ photoUrl: e.target.value })} />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Intro" hint="The paragraph under the name at the top of the profile.">
                <textarea rows={3} className={textareaClass} value={editor.intro} onChange={(e) => set({ intro: e.target.value })} />
              </Field>
            </div>
          </Card>

          <Card>
            <h2 className="text-[#0D1B3D] text-lg font-medium mb-4">Contact &amp; booking</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Email">
                <input className={inputClass} value={editor.email} onChange={(e) => set({ email: e.target.value })} />
              </Field>
              <Field label="Scheduler link" hint="Fallback link for the “Schedule a Call” button.">
                <input className={inputClass} value={editor.schedulerUrl} onChange={(e) => set({ schedulerUrl: e.target.value })} />
              </Field>
            </div>
            <div className="mt-4">
              <Field
                label="Booking calendar embed"
                hint="Paste the LeadConnector calendar embed code — it renders as a booking section on the profile page."
              >
                <textarea
                  rows={editor.bookingEmbed.trim() ? 6 : 3}
                  placeholder="Paste the embed code here (iframe + script)…"
                  className={`${textareaClass} font-mono text-xs`}
                  value={editor.bookingEmbed}
                  onChange={(e) => set({ bookingEmbed: e.target.value })}
                />
              </Field>
            </div>
          </Card>

          <Card>
            <h2 className="text-[#0D1B3D] text-lg font-medium mb-4">Specialties &amp; credentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Specialties" hint="One per line — shown as pills.">
                <textarea rows={5} className={textareaClass} value={editor.specialties} onChange={(e) => set({ specialties: e.target.value })} />
              </Field>
              <Field label="Credentials & achievements" hint="One per line — shown as a check list.">
                <textarea rows={5} className={textareaClass} value={editor.credentials} onChange={(e) => set({ credentials: e.target.value })} />
              </Field>
            </div>
          </Card>

          <Card>
            <h2 className="text-[#0D1B3D] text-lg font-medium mb-1">Trust signals (E-E-A-T)</h2>
            <p className="text-[#0D1B3D]/50 text-sm mb-4">
              Feeds the at-a-glance band, the LinkedIn button, the publications section, and the
              structured data search engines and AI assistants use to verify who this person is.
              Every field is optional — sections appear once filled.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="LinkedIn URL" hint="Shown as a button on the profile + used for entity verification.">
                <input
                  className={inputClass}
                  placeholder="https://www.linkedin.com/in/…"
                  value={editor.linkedinUrl}
                  onChange={(e) => set({ linkedinUrl: e.target.value })}
                />
              </Field>
              <Field label="Years of experience" hint="Shown big on the profile, e.g. “25+ years” or “Since 2010”.">
                <input
                  className={inputClass}
                  value={editor.yearsExperience}
                  onChange={(e) => set({ yearsExperience: e.target.value })}
                />
              </Field>
              <Field label="Licenses" hint="One per line, e.g. “Series 6, 63 and 65”.">
                <textarea rows={4} className={textareaClass} value={editor.licenses} onChange={(e) => set({ licenses: e.target.value })} />
              </Field>
              <Field label="Education" hint="One per line, e.g. “JD, University of San Diego School of Law”.">
                <textarea rows={4} className={textareaClass} value={editor.education} onChange={(e) => set({ education: e.target.value })} />
              </Field>
            </div>
            <div className="mt-4">
              <Field
                label="Other verified profile URLs"
                hint="One URL per line (X, YouTube, Amazon author page …) — structured data only, not shown on the page."
              >
                <textarea rows={3} className={textareaClass} value={editor.sameAs} onChange={(e) => set({ sameAs: e.target.value })} />
              </Field>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#0D1B3D] text-sm font-medium">Books, media &amp; publications</p>
                <button
                  type="button"
                  onClick={() =>
                    set({ publications: [...editor.publications, { source: '', title: '', href: '' }] })
                  }
                  className="inline-flex items-center gap-1.5 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium"
                >
                  <Plus className="w-4 h-4" /> Add publication
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {editor.publications.map((publication, index) => (
                  <div key={index} className="border border-black/5 rounded-xl p-4 grid grid-cols-1 md:grid-cols-[10rem_1fr_1fr_auto] gap-3 items-start">
                    <input
                      className={inputClass}
                      placeholder="Source, e.g. “Book”"
                      value={publication.source}
                      onChange={(e) => {
                        const next = [...editor.publications];
                        next[index] = { ...next[index], source: e.target.value };
                        set({ publications: next });
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Title"
                      value={publication.title}
                      onChange={(e) => {
                        const next = [...editor.publications];
                        next[index] = { ...next[index], title: e.target.value };
                        set({ publications: next });
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Link (optional)"
                      value={publication.href}
                      onChange={(e) => {
                        const next = [...editor.publications];
                        next[index] = { ...next[index], href: e.target.value };
                        set({ publications: next });
                      }}
                    />
                    <button
                      type="button"
                      aria-label="Remove publication"
                      onClick={() => set({ publications: editor.publications.filter((_, i) => i !== index) })}
                      className="text-[#0D1B3D]/30 hover:text-red-600 transition-colors duration-150 shrink-0 mt-2.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {editor.publications.length === 0 && (
                  <p className="text-[#0D1B3D]/40 text-sm">
                    No publications yet — add books, articles, or podcast features.
                  </p>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#0D1B3D] text-lg font-medium">Bio sections</h2>
              <button
                type="button"
                onClick={() => set({ bioSections: [...editor.bioSections, { heading: '', paragraphs: '' }] })}
                className="inline-flex items-center gap-1.5 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add section
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {editor.bioSections.map((section, index) => (
                <div key={index} className="border border-black/5 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      className={inputClass}
                      placeholder="Section heading"
                      value={section.heading}
                      onChange={(e) => {
                        const next = [...editor.bioSections];
                        next[index] = { ...next[index], heading: e.target.value };
                        set({ bioSections: next });
                      }}
                    />
                    <button
                      type="button"
                      aria-label="Remove section"
                      onClick={() => set({ bioSections: editor.bioSections.filter((_, i) => i !== index) })}
                      className="text-[#0D1B3D]/30 hover:text-red-600 transition-colors duration-150 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    className={textareaClass}
                    placeholder="Section text — separate paragraphs with a blank line."
                    value={section.paragraphs}
                    onChange={(e) => {
                      const next = [...editor.bioSections];
                      next[index] = { ...next[index], paragraphs: e.target.value };
                      set({ bioSections: next });
                    }}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#0D1B3D] text-lg font-medium">Testimonials</h2>
              <button
                type="button"
                onClick={() => set({ testimonials: [...editor.testimonials, { quote: '', attribution: '' }] })}
                className="inline-flex items-center gap-1.5 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add testimonial
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {editor.testimonials.map((testimonial, index) => (
                <div key={index} className="border border-black/5 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <textarea
                      rows={3}
                      className={textareaClass}
                      placeholder="Quote"
                      value={testimonial.quote}
                      onChange={(e) => {
                        const next = [...editor.testimonials];
                        next[index] = { ...next[index], quote: e.target.value };
                        set({ testimonials: next });
                      }}
                    />
                    <button
                      type="button"
                      aria-label="Remove testimonial"
                      onClick={() => set({ testimonials: editor.testimonials.filter((_, i) => i !== index) })}
                      className="text-[#0D1B3D]/30 hover:text-red-600 transition-colors duration-150 shrink-0 mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    className={`${inputClass} mt-3`}
                    placeholder="Attribution (optional), e.g. “Joey — June 5, 2026”"
                    value={testimonial.attribution}
                    onChange={(e) => {
                      const next = [...editor.testimonials];
                      next[index] = { ...next[index], attribution: e.target.value };
                      set({ testimonials: next });
                    }}
                  />
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-end pb-12">
            <SaveButton onSave={save} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Agents"
        text="Each agent's profile page: bio, specialties, testimonials, contact, and their booking calendar embed."
      />
      <div className="flex flex-col gap-3">
        {slugs.map((slug) => {
          const fallback = advisorDefaults[slug];
          const row = rows[slug];
          const name = row?.name?.trim() ? row.name : fallback.name;
          const role = row?.role?.trim() ? row.role : fallback.role;
          const photo = row?.photo_url?.trim() ? row.photo_url : fallback.photo?.src;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => openEditor(slug)}
              className="bg-white rounded-2xl p-4 border border-black/5 hover:border-black/15 transition-colors duration-150 flex items-center gap-4 text-left"
            >
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={name} className="w-12 h-12 rounded-xl object-cover object-top" />
              ) : (
                <span className="w-12 h-12 rounded-xl bg-[#0D1B3D] flex items-center justify-center text-white font-medium">
                  {fallback.initials}
                </span>
              )}
              <span className="flex-1 min-w-0">
                <span className="block text-[#0D1B3D] font-medium">{name}</span>
                <span className="block text-[#0D1B3D]/50 text-sm truncate">{role}</span>
              </span>
              <span className="flex items-center gap-2">
                {embeds[slug]?.trim() && (
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 whitespace-nowrap">
                    Calendar live
                  </span>
                )}
                <StatusPill overridden={Boolean(row)} />
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
