'use client';

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import {
  Code2,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  Users,
  X,
} from 'lucide-react';
import { getSupabase } from '../../lib/supabase';

/* Admin chrome: auth gate + sidebar. Every /admin/* page renders inside this. */

const NAV = [
  { href: '/admin/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/agents/', label: 'Agents', icon: Users },
  { href: '/admin/pages/', label: 'Pages', icon: FileText },
  { href: '/admin/blog/', label: 'Blog', icon: Newspaper },
  { href: '/admin/embeds/', label: 'Embeds', icon: Code2 },
];

const inputClass =
  'bg-white border border-black/10 text-[#0D1B3D] rounded-xl px-4 py-3 w-full outline-none focus:border-black/30';

export default function AdminShell({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => getSupabase(), []);
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
    setMobileNavOpen(false);
  }, [pathname]);

  if (!supabase) {
    return (
      <Centered>
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
      </Centered>
    );
  }

  if (!authReady) return <Centered />;

  if (!session) {
    return (
      <Centered>
        <form
          onSubmit={async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setAuthError(null);
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setAuthError(error.message);
          }}
          className="bg-white rounded-2xl p-8 border border-black/5 w-full max-w-md flex flex-col gap-4"
        >
          <div className="mb-2">
            <p className="text-[#0D1B3D] text-2xl font-medium" style={{ letterSpacing: '-0.03em' }}>
              I&amp;E Admin
            </p>
            <p className="text-[#0D1B3D]/50 text-sm mt-1">Sign in to manage the site.</p>
          </div>
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
            className="bg-[#0D1B3D] text-white font-medium px-8 py-3 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
          >
            Sign in
          </button>
        </form>
      </Centered>
    );
  }

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active =
          href === '/admin/' ? pathname === '/admin' || pathname === '/admin/' : pathname.startsWith(href.slice(0, -1));
        return (
          <a
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
              active
                ? 'bg-[#0D1B3D] text-white'
                : 'text-[#0D1B3D]/70 hover:bg-black/5 hover:text-[#0D1B3D]'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </a>
        );
      })}
    </nav>
  );

  const footerLinks = (
    <div className="flex flex-col gap-1">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#0D1B3D]/70 hover:bg-black/5 hover:text-[#0D1B3D] transition-colors duration-150"
      >
        <ExternalLink className="w-4 h-4" />
        View site
      </a>
      <button
        type="button"
        onClick={() => supabase.auth.signOut()}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#0D1B3D]/70 hover:bg-black/5 hover:text-[#0D1B3D] transition-colors duration-150 text-left"
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col justify-between bg-white border-r border-black/5 p-4 sticky top-0 h-screen">
        <div>
          <div className="px-4 pt-3 pb-6">
            <p className="text-[#0D1B3D] text-lg font-medium" style={{ letterSpacing: '-0.02em' }}>
              I&amp;E <span className="text-[#0D1B3D]/40">Admin</span>
            </p>
          </div>
          {nav}
        </div>
        {footerLinks}
      </aside>

      {/* Mobile header + drawer */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-black/5 px-4 py-3 flex items-center justify-between">
        <p className="text-[#0D1B3D] text-lg font-medium" style={{ letterSpacing: '-0.02em' }}>
          I&amp;E <span className="text-[#0D1B3D]/40">Admin</span>
        </p>
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileNavOpen((open) => !open)}
          className="text-[#0D1B3D] p-1"
        >
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-white pt-16 px-4">
          {nav}
          <div className="mt-4 border-t border-black/5 pt-4">{footerLinks}</div>
        </div>
      )}

      <main className="flex-1 min-w-0 px-6 py-8 lg:px-10 pt-20 lg:pt-8">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

function Centered({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-6">{children}</div>
  );
}
