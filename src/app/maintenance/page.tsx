import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';

/* 1:1 rebuild of the live (noindexed) /maintenance/ page — the last step of
   the live process chain (education → evaluation → application → maintenance),
   linked from /application/. Live's inline link target
   /life-insurance-policy-and-annuity-checkups/ no longer resolves on live;
   remapped to /evaluation/ (the checkup step of the same chain). */

export const metadata: Metadata = {
  title: { absolute: 'Maintenance – I&E | Whole Life & Infinite Banking Strategies' },
  robots: { index: false, follow: true },
  alternates: { canonical: '/maintenance/' },
};

const linkClass = 'underline decoration-[#0D1B3D]/30 underline-offset-2 hover:decoration-[#0D1B3D]';

export default function MaintenancePage() {
  return (
    <PageShell>
      <PageHero title="Maintenance" />
      <section className="px-6 pb-24">
        <div className="max-w-[54rem] mx-auto bg-white rounded-3xl border border-black/5 p-6 md:p-12 text-[#0D1B3D]/80 leading-relaxed space-y-6">
          <p>
            We live in a world of constant change. As such, it is all too common for Life
            Insurance Products, even those backed by a solid strategy, to become inadequate or
            even obsolete.
          </p>
          <img
            src="/wp-content/uploads/IE-Maintenance-Phase.jpg"
            alt="I&E Maintenance Process"
            loading="lazy"
            className="w-full h-auto rounded-2xl"
          />
          <p>
            This is why at I&amp;E, we prioritize regular status sessions to discuss issues such
            as{' '}
            <a href="/evaluation/" className={linkClass}>
              maintaining your strategic life insurance or annuity
            </a>{' '}
            during what we define as your Maintenance phase.
          </p>
          <p>
            Your expert{' '}
            <a href="/proclientguide/introduction/" className={linkClass}>
              Pro Client Guide
            </a>{' '}
            is available to conduct regular status checkups concerning all aspects of your
            strategic plan and products, as well as guide you on best practices of how to
            utilize your policy to get the most out of it.
          </p>
          <p>So, what are you waiting for? Please schedule your complimentary strategy session today!</p>
        </div>
      </section>
    </PageShell>
  );
}
