import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import GravityFormReplica, { type ReplicaField } from '../questionnaire/GravityFormReplica';

/* 1:1 replica of live /getmyquote/ — a Gravity Forms quote-request page with
   no copy beyond the headings and the form. Noindexed on live (noindex,
   follow) — must stay noindexed. Title + description are live's exact tags
   (the description is Slim SEO's auto-generated excerpt of the form labels). */

export const metadata: Metadata = {
  title: { absolute: 'Get My Quote – I&E | Whole Life & Infinite Banking Strategies' },
  description:
    'GET YOUR FREE QUOTE! " * " indicates required fields LinkedIn This field is for validation purposes and should be left unchanged. Product Select your',
  robots: { index: false, follow: true },
  alternates: { canonical: '/getmyquote/' },
};

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming', 'Armed Forces Americas', 'Armed Forces Europe',
  'Armed Forces Pacific',
];

/* Field labels and options verbatim from the captured form (gform_7).
   APPROXIMATION: live shows/hides the product-specific fields (Coverage
   Amount, Daily Benefit Amount, Spouse …) with Gravity Forms conditional
   logic; the replica lists them all. */
const fields: ReplicaField[] = [
  {
    kind: 'select',
    label: 'Select your product',
    placeholder: '(select)',
    required: true,
    options: ['Whole Life', 'Universal Life', 'Convertible Term Life', 'Annuity', 'Long Term Care'],
    description: 'Which type of product would you like a quote for?',
  },
  { kind: 'text', label: 'Name', required: true },
  { kind: 'tel', label: 'Phone', required: true },
  { kind: 'email', label: 'Email', required: true },
  { kind: 'date', label: 'Date of Birth', required: true },
  { kind: 'select', label: 'Resident State', required: true, options: states },
  { kind: 'select', label: 'Self Banking Strategy', required: true, options: ['Yes', 'No'] },
  {
    kind: 'select',
    label: 'Coverage Amount',
    required: true,
    options: [
      '$25,000', '$50,000', '$75,000', '$100,000', '$150,000', '$200,000', '$250,000',
      '$300,000', '$400,000', '$500,000', '$600,000', '$700,000', '$750,000', '$800,000',
      '$900,000', '$1,000,000', '$1,500,000', '$2,000,000', '$3,000,000', '$4,000,000',
      '$5,000,000',
    ],
  },
  { kind: 'select', label: 'Smoker', required: true, options: ['Yes', 'No'] },
  { kind: 'text', label: 'Daily Benefit Amount', required: true },
  { kind: 'text', label: 'Spouse Name', required: true },
  { kind: 'date', label: 'Spouse Date of Birth', required: true },
];

export default function GetMyQuotePage() {
  return (
    <PageShell>
      <PageHero title="Get My Quote" />

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0D1B3D] rounded-3xl p-8 md:p-12">
            <GravityFormReplica slotKey="page:getmyquote:form" fields={fields}>
              {/* Live's heading above the form, verbatim (all caps on live). */}
              <h2
                className="text-white text-2xl md:text-3xl font-medium mb-8"
                style={{ letterSpacing: '-0.02em' }}
              >
                GET YOUR FREE QUOTE!
              </h2>
            </GravityFormReplica>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
