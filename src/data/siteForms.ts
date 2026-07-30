/* Registry of the site's native (non-ebook) lead forms. Each form posts to
   /api/lead/ with its embed-slot key as the `source`; the GHL webhook it
   forwards to is set per form at /admin -> Forms (stored in the slot's
   `notes`, same mechanism as the per-book webhooks). A GHL embed pasted into
   the same slot at /admin -> Embeds still overrides the native form. */

export interface SiteForm {
  /** embed_slots key; doubles as the /api/lead `source` value */
  slotKey: string;
  label: string;
  /** Where the form renders (links shown in the admin) */
  pages: string[];
  /** What the form collects — shown in the admin so mapping in GHL is easy */
  fields: string;
}

export const siteForms: SiteForm[] = [
  {
    slotKey: 'form:contact',
    label: 'Contact form',
    pages: ['/contact/'],
    fields: 'name, email, phone, message',
  },
  {
    slotKey: 'form:guide-request',
    label: 'Guide request (Ebooks & Guides)',
    pages: ['/ebooks-and-guides/'],
    fields: 'guide (which resource), name, email, phone',
  },
  {
    slotKey: 'page:trust-workshop:form',
    label: 'Trust Workshop registration',
    pages: ['/trust-workshop/'],
    fields: 'name, email, phone',
  },
  {
    slotKey: 'page:estate-planning-living-trust:form',
    label: 'Trust program (Estate Planning Living Trust)',
    pages: ['/estate-planning-living-trust/'],
    fields: 'name, email, phone',
  },
  {
    slotKey: 'page:wills-and-trusts:form',
    label: 'Trust program (Wills and Trusts)',
    pages: ['/wills-and-trusts/'],
    fields: 'name, email, phone',
  },
  {
    slotKey: 'page:ibc-masterclass:form',
    label: 'IBC Masterclass webinar access',
    pages: ['/ibc-masterclass/'],
    fields: 'name, email, phone',
  },
  {
    slotKey: 'page:infinite-banking-pdf:form',
    label: 'Infinite Banking PDF opt-in',
    pages: ['/infinite-banking-pdf/'],
    fields: 'name, phone, email, age',
  },
  {
    slotKey: 'page:exam-one:form',
    label: 'Exam One quote requests (both forms)',
    pages: ['/exam-one/'],
    fields: 'state, health class, birthdate, gender, smoker, [term type], face amount, name, email, phone',
  },
  {
    slotKey: 'page:whole-life-insurance-calculator:form',
    label: 'Whole life calculator quotes',
    pages: ['/whole-life-insurance-calculator/'],
    fields: 'state, health class, birthdate, gender, smoker, face amount, name, email, phone',
  },
  {
    slotKey: 'page:whole-life-insurance-calculator:form-no-exam',
    label: 'No-exam whole life quotes (calculator page)',
    pages: ['/whole-life-insurance-calculator/'],
    fields: 'state, health class, birthdate, gender, smoker, face amount, name, email, phone',
  },
  {
    slotKey: 'page:whole-life-insurance-calculator:form-term',
    label: 'Term life quotes (calculator page)',
    pages: ['/whole-life-insurance-calculator/'],
    fields: 'state, health class, birthdate, gender, smoker, term type, face amount, name, email, phone',
  },
];

export const siteFormSlotKeys = new Set(siteForms.map((form) => form.slotKey));
