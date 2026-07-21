import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import GravityFormReplica, { type ReplicaField } from './GravityFormReplica';

/* 1:1 replica of live /questionnaire/ — a Gravity Forms fact-finding page with
   no copy beyond the heading and the form itself. Noindexed on live (noindex,
   follow) — must stay noindexed. Title + description are live's exact tags
   (the description is Slim SEO's auto-generated excerpt of the form labels —
   reproduced verbatim). */

export const metadata: Metadata = {
  title: { absolute: 'Questionnaire – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    '" * " indicates required fields X/Twitter This field is for validation purposes and should be left unchanged. Name * Email * Phone * Age? * Marital St',
  robots: { index: false, follow: true },
  alternates: { canonical: '/questionnaire/' },
};

/* Field labels, options and helper descriptions verbatim from the captured
   form (gform_2) — including live's own "Convertable" spelling. */
const fields: ReplicaField[] = [
  { kind: 'text', label: 'Name', required: true },
  { kind: 'email', label: 'Email', required: true },
  { kind: 'tel', label: 'Phone', required: true },
  { kind: 'text', label: 'Age?', required: true },
  { kind: 'text', label: 'Marital Status?' },
  { kind: 'text', label: 'Total death benefit from policies', required: true },
  {
    kind: 'radio',
    label: 'Do you (or does our business) own life insurance?',
    options: ['Yes', 'No'],
    required: true,
  },
  {
    kind: 'radio',
    label: 'Do you (or your business) own key man insurance?',
    options: ['Yes', 'No'],
    required: true,
  },
  {
    kind: 'checkboxes',
    label: 'Term Life AND if YES check all that apply',
    options: [
      'Convertable Term',
      '20 year annual renewable',
      '10 year annual renewable',
      '5 year annual renewable',
    ],
  },
  {
    kind: 'checkboxes',
    label: 'Universal Life AND if YES check all that apply',
    options: ['Indexed Universal', 'Guaranteed Universal', 'Variable Universal'],
    required: true,
  },
  {
    kind: 'checkboxes',
    label: 'Whole Life AND if YES check all that apply',
    options: [
      'Mutual Whole Life',
      'Stock Whole Life',
      'Maximized Death Benefit',
      'Maximized Cash Value Growth',
    ],
    required: true,
  },
  {
    kind: 'radio',
    label: 'Additional life insurance required?',
    options: ['Yes', 'No'],
    required: true,
  },
  { kind: 'textarea', label: 'Describe life insurance goals and concerns' },
  {
    kind: 'textarea',
    label: 'Heirs or Other Beneficiaries?',
    required: true,
    description:
      'Identify heirs such as siblings, children, grandchildren OR other beneficiaries...include name, approximate age, and relationship.',
  },
  {
    kind: 'checkboxes',
    label: 'Do any of the following circumstances apply to your estate?',
    required: true,
    options: [
      "You're unmarried and in a non-traditional relationship.",
      "You're current marriage is not your first.",
      'You have children from prior marriages.',
      'You or a family member is receiving or may need full time skilled nursing care.',
      'You have aging parents who need planning for long term medical care.',
      'You have children or other dependents with special needs.',
      'You have children who struggle with drug and alcohol abuse.',
      'You and/or your spouse own a business',
      'You and/or your spouse own real estate investments.',
      'You owe unpaid creditors.',
      'Other',
    ],
  },
  {
    kind: 'textarea',
    label: 'Total estimated gross value of assets?',
    required: true,
    description:
      'Identify real estate, financial accounts, personal property vehicles, collectibles, etc.',
  },
  {
    kind: 'textarea',
    label: 'Total approximate debt owned to creditors?',
    required: true,
    description:
      'Identify all parties who may be considered lenders with unpaid balances such as banks, credit card companies, finance companies and all other third parties with outstanding loans subject to be repaid.',
  },
  {
    kind: 'textarea',
    label: 'Identify desired estate appointees and successors?',
    required: true,
    description:
      'Include name, relationship, approximate age, and state of residence (key roles are trustee, personal representative/executor, legal guardian, power of attorney, and healthcare surrogate).',
  },
  {
    kind: 'textarea',
    label: 'Additional information?',
    description:
      'May include your personal goals and/or concerns OR description of ANY other matter pertaining to your unique circumstances.',
  },
];

export default function QuestionnairePage() {
  return (
    <PageShell>
      <PageHero title="Questionnaire" />

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0D1B3D] rounded-3xl p-8 md:p-12">
            <GravityFormReplica
              slotKey="page:questionnaire:form"
              fields={fields}
              /* Verbatim from live, "betwe" typo included. */
              disclaimerNote="*Submission of information to insuranceandestates.com, Steven Gibbs or Insurance & Estate Strategies, LLC does not establish an attorney-client relationship betwe with the user. We are acting as attorneys or agents and no representation can be presumed unless and until the terms of the agreement are confirmed in writing."
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
