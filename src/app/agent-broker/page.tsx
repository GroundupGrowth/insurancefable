import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import GravityFormReplica, { type ReplicaField } from '../questionnaire/GravityFormReplica';

/* 1:1 replica of live /agent-broker/ (the /agent-broker/thanks/ page already
   exists as the form's redirect target). Copy verbatim from the capture,
   including live's "health pipeline" wording. Noindexed on live (noindex,
   follow) — must stay noindexed.

   MISSING ASSET: live opens with wp-content/uploads/jrc_teamwork-min.jpg
   (decorative, empty alt) which was not localized — the image is omitted
   until it's added under public/wp-content/uploads/. */

export const metadata: Metadata = {
  title: { absolute: 'Agent Broker – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    'Here at I&E, one thing that we’ve learned over the years is that if you really want to compete in today’s life insurance industry as an independent life Ins',
  robots: { index: false, follow: true },
  alternates: { canonical: '/agent-broker/' },
};

/* Verbatim labels and options from the captured form (gform_10). */
const fields: ReplicaField[] = [
  { kind: 'text', label: 'Name', required: true },
  { kind: 'tel', label: 'Phone', required: true },
  { kind: 'email', label: 'Email', required: true },
  {
    kind: 'select',
    label: 'Years of experience:',
    required: true,
    options: ['Less than 1 year', '1 - 3 years', '3 - 5 years', 'Seasoned'],
  },
  {
    kind: 'checkboxes',
    label: 'Brokerage focus:',
    required: true,
    options: ['Term', 'Whole Life', 'Final Expense', 'Annuities'],
  },
  {
    kind: 'checkboxes',
    label: 'A good partner would help you:',
    required: true,
    options: [
      'Gaining access to a wider range of products.',
      'Increased access to sales technology.',
      'Assistance in placing difficult cases.',
      'Assistance in preparing whole life insurance illustrations.',
      'Other',
    ],
  },
  { kind: 'textarea', label: 'Comments' },
];

const leadIn = 'text-[#0D1B3D] text-xl md:text-2xl font-medium';
const paragraph = 'text-[#0D1B3D]/70 text-base md:text-lg leading-relaxed';

export default function AgentBrokerPage() {
  return (
    <PageShell>
      <PageHero
        title="Agent Broker"
        intro="Here at I&E, one thing that we’ve learned over the years is that if you really want to compete in today’s life insurance industry as an independent life Insurance brokerage, you’re going to need help competing with the “big boys”."
      />

      <section className="px-6 pb-24">
        <div className="max-w-[88rem] mx-auto space-y-4">
          <div className="bg-white rounded-3xl border border-black/5 p-8 md:p-12">
            <div className="space-y-6 max-w-[75ch]">
              <p className={leadIn} style={{ letterSpacing: '-0.02em' }}>
                This is because&hellip;
              </p>
              <p className={paragraph}>
                Unlike the days of old when an individual life insurance agent would only need to
                reach out to his or her community to create a successful business, today&rsquo;s
                agents now find themselves competing with massive nationwide insurance brokerages
                offering a wide variety of products many of which won&rsquo;t require their clients
                to leave the comfort of their homes to become insured.
              </p>
              <p className={leadIn} style={{ letterSpacing: '-0.02em' }}>
                And while&hellip;
              </p>
              <p className={paragraph}>
                Technically any life insurance agent should be able to do the same, let&rsquo;s
                face it, for the average life insurance agent, being able to keep up with all of
                the product changes that seem to occur on a near daily basis while also trying to
                create and maintain a health pipeline of business makes it nearly impossible for
                most to even consider changing how they&rsquo;ve done things in the past.
              </p>
              <p className={leadIn} style={{ letterSpacing: '-0.02em' }}>
                Which is why&hellip;
              </p>
              <p className={paragraph}>
                We here at I&amp;E would like to invite any experienced life insurance agent who is
                looking to help &ldquo;modernize&rdquo; their business by adding:
              </p>
              <ul className="space-y-3">
                {[
                  'E-App (e-signature) processing with 11 different insurance companies.',
                  'Tele-App (phone interview) processing with 10 different insurance companies.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="bg-[#F5F5F5] rounded-full p-1.5 mt-0.5 shrink-0">
                      <Check className="w-4 h-4 text-[#0D1B3D]" />
                    </span>
                    <span className="text-[#0D1B3D]/70 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className={paragraph}>
                And gain access to a team of professionals who can help you throughout the entire
                underwriting process as well as provide you with valuable insight on which
                insurance company or product may or may not be the &ldquo;best&rdquo; for your
                particular client, give us a call and see what we can do for you and your business.
              </p>
            </div>
          </div>

          <div className="bg-[#0D1B3D] rounded-3xl p-8 md:p-12">
            <div className="max-w-2xl">
              <GravityFormReplica slotKey="page:agent-broker:form" fields={fields} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
