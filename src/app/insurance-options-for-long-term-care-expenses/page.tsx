import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import GravityFormReplica, { type ReplicaField } from '../questionnaire/GravityFormReplica';

/* 1:1 replica of live /insurance-options-for-long-term-care-expenses/ — a
   meeting-prep landing page: Vimeo intro video + Gravity Forms questionnaire.
   Copy verbatim from the capture. Noindexed on live (noindex, follow) — must
   stay noindexed. */

export const metadata: Metadata = {
  title: {
    absolute:
      'Insurance Options for Long Term Care Expenses – I&E | Whole Life & Infinite Banking Strategies',
  },
  description:
    '  Schedule a Conversation with an Expert! I&E Meeting Prep – Help Us Get To Know You By Responding To A Few Short Questions. Your information is',
  robots: { index: false, follow: true },
  alternates: { canonical: '/insurance-options-for-long-term-care-expenses/' },
};

/* Verbatim labels and options from the captured form (gform_17). */
const fields: ReplicaField[] = [
  { kind: 'text', label: 'Name', required: true },
  { kind: 'email', label: 'Email', required: true },
  { kind: 'tel', label: 'Phone', required: true },
  {
    kind: 'select',
    label: 'Your age',
    required: true,
    options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65 or Above', 'Prefer Not to Answer'],
  },
  {
    kind: 'checkboxes',
    label: 'What area of infinite banking (or other planning) are you most interested in:',
    required: true,
    options: [
      'real estate/other investing',
      'retirement planning',
      'estate or tax planning',
      'family protection',
    ],
  },
  {
    kind: 'checkboxes',
    label: 'What is your current annual income:',
    required: true,
    options: [
      'unemployed or part time',
      '$20,000 - $50,000',
      '$50,000 - $100,000',
      '$100,000 - $250,000',
      '$250,000 - $1,000,000',
      '$1,000,000 +',
    ],
  },
  {
    kind: 'checkboxes',
    label:
      'Based upon a percentage of your income, how much are you currently saving or investing each month:',
    required: true,
    options: ['less than 5%', '5 - 10%', '10 - 25%', 'over 25%'],
  },
  {
    kind: 'checkboxes',
    label: 'Which of the following is most important to you:',
    required: true,
    options: ['freedom', 'control', 'safety/stability', 'opportunity'],
  },
  {
    kind: 'textarea',
    label: 'Briefly describe what is your most important objective in connecting with I&E?',
  },
];

export default function InsuranceOptionsForLongTermCareExpensesPage() {
  return (
    <PageShell>
      <PageHero title="Insurance Options for Long Term Care Expenses" />

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Live's Vimeo intro video (same src; live sets autoplay=1 too). */}
          <div className="bg-white rounded-3xl border border-black/5 p-4">
            <iframe
              src="https://player.vimeo.com/video/420850978?title=0&byline=0&portrait=0&color=ffffff&autoplay=1&dnt=0&muted=0&texttrack="
              title="Insurance Options for Long Term Care Expenses"
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="block w-full aspect-video rounded-2xl border-0"
            />
          </div>

          <div className="bg-[#0D1B3D] rounded-3xl p-8 md:p-12">
            <GravityFormReplica
              slotKey="page:insurance-options-for-long-term-care-expenses:form"
              fields={fields}
            >
              <h2
                className="text-white text-2xl md:text-3xl font-medium mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Schedule a Conversation with an Expert!
              </h2>
              <p className="text-white font-medium leading-relaxed mb-3">
                I&amp;E Meeting Prep &ndash; Help Us Get To Know You By Responding To A Few Short
                Questions.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Your information is kept secure and only used for confidential consultative
                services.
              </p>
            </GravityFormReplica>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
