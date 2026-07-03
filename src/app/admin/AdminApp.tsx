'use client';

import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Check, LogOut, Plus, Trash2 } from 'lucide-react';
import { getSupabase, type EmbedSlotRow } from '../../lib/supabase';

/* Embed manager: paste GoHighLevel / LeadConnector embed codes per slot and
   the matching placeholder on the site starts rendering them. Auth is a
   Supabase email/password user (create one in Supabase → Authentication). */

const CATEGORY_ORDER: EmbedSlotRow['category'][] = ['advisor', 'form', 'page', 'ebook'];

const CATEGORY_LABELS: Record<EmbedSlotRow['category'], { title: string; hint: string }> = {
  advisor: {
    title: 'Advisor booking calendars',
    hint: 'Paste each advisor’s LeadConnector calendar embed. It appears as a booking section on their profile page.',
  },
  form: {
    title: 'Lead forms',
    hint: 'Paste the GHL form embeds. Each one replaces the matching placeholder form on the site.',
  },
  page: {
    title: 'Page widgets',
    hint: 'Larger page embeds, e.g. the quote engine on /life-insurance-quotes/.',
  },
  ebook: {
    title: 'eBooks & guides',
    hint: 'One opt-in embed per book/guide on /ebooks-and-guides/. Add new slots here when a new eBook launches.',
  },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const inputClass =
  'bg-white border border-black/10 text-[#0D1B3D] rounded-xl px-4 py-3 w-full outline-none focus:border-black/30';

export default function AdminApp() {
  const supabase = useMemo(() => getSupabase(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [slots, setSlots] = useState<EmbedSlotRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [newLabel, setNewLabel] = useState('');
  const [newCategory, setNewCategory] = useState<EmbedSlotRow['category']>('ebook');

  const loadSlots = useCallback(async () => {
    if (!supabase) return;
    const { data, error: loadError } = await supabase
      .from('embed_slots')
      .select('*')
      .order('slot_key');
    if (loadError) setError(loadError.message);
    else setSlots((data as EmbedSlotRow[]) ?? []);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (session) void loadSlots();
  }, [session, loadSlots]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setAuthError(null);
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) setAuthError(loginError.message);
  };

  const handleSave = async (slotKey: string) => {
    if (!supabase) return;
    setError(null);
    const embed_code = drafts[slotKey] ?? '';
    const { error: saveError } = await supabase
      .from('embed_slots')
      .update({ embed_code, updated_at: new Date().toISOString() })
      .eq('slot_key', slotKey);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    setSlots((current) =>
      current.map((slot) => (slot.slot_key === slotKey ? { ...slot, embed_code } : slot)),
    );
    setDrafts(({ [slotKey]: _saved, ...rest }) => rest);
    setSavedKey(slotKey);
    setTimeout(() => setSavedKey((key) => (key === slotKey ? null : key)), 2000);
  };

  const handleAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !newLabel.trim()) return;
    setError(null);
    const prefix = newCategory === 'advisor' ? 'advisor' : newCategory === 'ebook' ? 'ebook' : newCategory;
    const base = `${prefix}:${slugify(newLabel)}`;
    const slot_key = newCategory === 'advisor' ? `${base}:booking` : base;
    const { error: insertError } = await supabase.from('embed_slots').insert({
      slot_key,
      label: newLabel.trim(),
      category: newCategory,
      embed_code: '',
    });
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setNewLabel('');
    await loadSlots();
  };

  const handleDelete = async (slotKey: string) => {
    if (!supabase) return;
    if (!window.confirm(`Delete slot ${slotKey}? The placeholder on the site falls back to its default.`)) return;
    setError(null);
    const { error: deleteError } = await supabase.from('embed_slots').delete().eq('slot_key', slotKey);
    if (deleteError) setError(deleteError.message);
    else setSlots((current) => current.filter((slot) => slot.slot_key !== slotKey));
  };

  if (!supabase) {
    return (
      <Shell>
        <div className="bg-white rounded-2xl p-8 border border-black/5 max-w-xl">
          <h2 className="text-[#0D1B3D] text-xl font-medium mb-3">Backend not configured</h2>
          <p className="text-[#0D1B3D]/70 text-sm leading-relaxed">
            Set <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
            <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> (Vercel → Settings →
            Environment Variables, or <code className="font-mono">.env.local</code>), run{' '}
            <code className="font-mono">supabase/schema.sql</code> in the Supabase SQL editor, and
            create an admin user under Authentication → Users.
          </p>
        </div>
      </Shell>
    );
  }

  if (!authReady) return <Shell />;

  if (!session) {
    return (
      <Shell>
        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 border border-black/5 max-w-md flex flex-col gap-4">
          <h2 className="text-[#0D1B3D] text-xl font-medium">Sign in</h2>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
          {authError && <p className="text-red-600 text-sm">{authError}</p>}
          <button
            type="submit"
            className="bg-[#0D1B3D] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200 self-start"
          >
            Sign in
          </button>
        </form>
      </Shell>
    );
  }

  return (
    <Shell
      headerRight={
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="inline-flex items-center gap-2 text-[#0D1B3D]/60 hover:text-[#0D1B3D] text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      }
    >
      {error && (
        <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">{error}</p>
      )}

      {CATEGORY_ORDER.map((category) => {
        const categorySlots = slots.filter((slot) => slot.category === category);
        const { title, hint } = CATEGORY_LABELS[category];
        return (
          <section key={category} className="mb-12">
            <h2 className="text-[#0D1B3D] text-2xl font-medium mb-1" style={{ letterSpacing: '-0.02em' }}>
              {title}
            </h2>
            <p className="text-[#0D1B3D]/60 text-sm mb-5">{hint}</p>
            <div className="flex flex-col gap-4">
              {categorySlots.length === 0 && (
                <p className="text-[#0D1B3D]/50 text-sm">No slots yet.</p>
              )}
              {categorySlots.map((slot) => {
                const draft = drafts[slot.slot_key];
                const value = draft ?? slot.embed_code;
                const dirty = draft !== undefined && draft !== slot.embed_code;
                return (
                  <div key={slot.slot_key} className="bg-white rounded-2xl p-6 border border-black/5">
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                      <div>
                        <p className="text-[#0D1B3D] font-medium">{slot.label}</p>
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
                          onClick={() => handleDelete(slot.slot_key)}
                          aria-label={`Delete ${slot.slot_key}`}
                          className="text-[#0D1B3D]/30 hover:text-red-600 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows={value.trim() ? 6 : 3}
                      placeholder="Paste the embed code here (iframe + script)…"
                      value={value}
                      onChange={(e) =>
                        setDrafts((current) => ({ ...current, [slot.slot_key]: e.target.value }))
                      }
                      className="bg-[#F5F5F5] border border-black/5 text-[#0D1B3D] text-sm font-mono rounded-xl px-4 py-3 w-full outline-none focus:border-black/20 resize-y"
                    />
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        disabled={!dirty}
                        onClick={() => handleSave(slot.slot_key)}
                        className="bg-[#0D1B3D] disabled:bg-[#0D1B3D]/30 text-white font-medium text-sm px-6 py-2 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
                      >
                        Save
                      </button>
                      {savedKey === slot.slot_key && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 text-sm">
                          <Check className="w-4 h-4" /> Saved
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="mb-24">
        <h2 className="text-[#0D1B3D] text-2xl font-medium mb-1" style={{ letterSpacing: '-0.02em' }}>
          Add a slot
        </h2>
        <p className="text-[#0D1B3D]/60 text-sm mb-5">
          For new eBooks, advisors, or page widgets. eBook slots show up automatically when the
          matching card exists on the site; anything else needs a placeholder added in code.
        </p>
        <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 border border-black/5 flex gap-3 flex-wrap items-center">
          <input
            type="text"
            required
            placeholder="Label, e.g. 'New eBook Title'"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className={`${inputClass} max-w-xs`}
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as EmbedSlotRow['category'])}
            className={`${inputClass} max-w-[12rem]`}
          >
            <option value="ebook">eBook / guide</option>
            <option value="advisor">Advisor booking</option>
            <option value="form">Lead form</option>
            <option value="page">Page widget</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#0D1B3D] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Add slot
          </button>
        </form>
      </section>
    </Shell>
  );
}

function Shell({ children, headerRight }: { children?: React.ReactNode; headerRight?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-[#0D1B3D] text-3xl font-medium" style={{ letterSpacing: '-0.03em' }}>
              Embed Manager
            </h1>
            <p className="text-[#0D1B3D]/60 text-sm mt-1">
              Paste GoHighLevel / LeadConnector embed codes — the site picks them up instantly.
            </p>
          </div>
          {headerRight}
        </div>
        {children}
      </div>
    </div>
  );
}
