import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import GravityFormReplica, { type ReplicaField } from '../questionnaire/GravityFormReplica';

/* 1:1 replica of live /agent-partners/ — the "Join the Team" recruiting page
   (the footer will link here). Copy is verbatim from the capture. Noindexed on
   live (noindex, follow) — must stay noindexed. */

export const metadata: Metadata = {
  title: { absolute: 'Agent Partners – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    "Most agents spend their careers chasing leads and pushing products. Since 2018, we've built something different. Insurance & Estate Strategies runs on a simple",
  robots: { index: false, follow: true },
  alternates: { canonical: '/agent-partners/' },
};

const premise = [
  'Educate our community first with unparalleled resources',
  'Welcome those who’ve embraced why they need what we offer',
  'Mentor them to put these products and strategies to work for their own success and legacy',
];

const whatYouGet = [
  'Warm leads from clients who came looking for us—already introduced to our products and strategies',
  'Proprietary training you won’t find anywhere else',
  'Top-tier carrier access across the full product spectrum',
  'Mentorship from a team that’s been in the trenches',
  'Systems and infrastructure so you can focus on clients, not busywork',
];

/* Verbatim labels from the captured form (gform_28) — "Linkedin" casing is live's. */
const fields: ReplicaField[] = [
  { kind: 'text', label: 'Name', required: true },
  { kind: 'email', label: 'Email', required: true },
  { kind: 'tel', label: 'Phone', required: true },
  { kind: 'text', label: 'Linkedin' },
  { kind: 'textarea', label: 'Note' },
];

const paragraph = 'text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed';

export default function AgentPartnersPage() {
  return (
    <PageShell>
      <PageHero
        title="Agent Partners"
        intro="Most agents spend their careers chasing leads and pushing products. Since 2018, we’ve built something different."
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto space-y-4">
          {/* The premise */}
          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <p className={`${paragraph} mb-6`}>
              Insurance &amp; Estate Strategies runs on a simple premise:
            </p>
            <ul className="space-y-3 mb-8">
              {premise.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="bg-[#F5F5F5] rounded-full p-1.5 mt-0.5 shrink-0">
                    <Check className="w-4 h-4 text-[#0D1B3D]" />
                  </span>
                  <span className="text-[#0D1B3D]/70 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-4 max-w-[75ch]">
              <p className={paragraph}>
                Today, our content platform brings in over 300,000 visitors a year—people actively
                searching for alternatives to conventional financial advice. They find us. Then we
                serve them.
              </p>
              <p className={paragraph}>
                Over eight years, we&rsquo;ve developed proprietary methodology—The Ultimate
                Asset&reg; framework—and built deep carrier relationships across a full suite of
                life insurance and annuity products. We&rsquo;re not a quote shop. We&rsquo;re an
                education-first platform with the systems and infrastructure for agents who want to
                do meaningful work with clients who get it.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What you get */}
            <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-10">
              <h2
                className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                What you get:
              </h2>
              <ul className="space-y-3">
                {whatYouGet.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="bg-[#F5F5F5] rounded-full p-1.5 mt-0.5 shrink-0">
                      <Check className="w-4 h-4 text-[#0D1B3D]" />
                    </span>
                    <span className="text-[#0D1B3D]/70 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who this is for */}
            <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-10">
              <h2
                className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Who this is for:
              </h2>
              <div className="space-y-4">
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">
                  Client-centered producers. People who&rsquo;ve advised clients and closed
                  deals—in any industry—and know what it takes to sit across from someone,
                  understand their situation, and help them find the path that serves their goals.
                  If that&rsquo;s you, we can teach you everything else.
                </p>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">
                  If you&rsquo;re still getting your feet wet or waiting until everything is
                  perfect, you&rsquo;re not ready yet. Come back when you&rsquo;ve got evidence you
                  can connect with clients and help them act.
                </p>
                <p className="text-[#0D1B3D]/70 text-base leading-relaxed">
                  We&rsquo;re selective. We&rsquo;d rather work with a small team of people who
                  produce results than a large team of people who talk about it.
                </p>
              </div>
            </div>
          </div>

          {/* Application form */}
          <div className="bg-[#0D1B3D] rounded-3xl p-8 md:p-12">
            <div className="max-w-2xl">
              <GravityFormReplica slotKey="page:agent-partners:form" fields={fields}>
                <h2
                  className="text-white text-2xl md:text-3xl font-medium mb-8"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  If that&rsquo;s you, let&rsquo;s talk about becoming an I&amp;E Pro Client Guide.
                </h2>
              </GravityFormReplica>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
