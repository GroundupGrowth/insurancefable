import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import IntakeForm from './IntakeForm';

/* Analyzer-style intake (modeled on the multi-step qualification forms Xander
   referenced, 2026-08): one question per step, contact details last. The
   questions are I&E's own Fit Call qualification set — the answers arrive in
   GHL before the call so the Guide can run real numbers instead of asking the
   basics live. Posts to /api/lead with source `form:intake`; webhook is set
   at /admin -> Forms. */

export const metadata: Metadata = {
  title: 'Intake',
  description:
    'Seven quick questions so your Fit Call is about your actual numbers, not a pitch. See if these strategies mathematically work for your situation.',
  alternates: { canonical: '/intake/' },
};

export default function IntakePage() {
  return (
    <PageShell>
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <p className="text-[#0D1B3D]/60 text-sm mb-2">Before your Fit Call</p>
            <h1
              className="text-[#0D1B3D] text-4xl md:text-5xl font-medium mb-4"
              style={{ letterSpacing: '-0.03em' }}
            >
              See if the math works for you.
            </h1>
            <p className="text-[#0D1B3D]/70 text-lg leading-relaxed">
              Our experts never pitch. These seven quick questions tell us where you
              stand, so your Fit Call is about your actual numbers, not a sales
              script. It takes about two minutes.
            </p>
          </div>
          <IntakeForm />
        </div>
      </section>
    </PageShell>
  );
}
