/* Client-side helper the native forms share: POST the lead to /api/lead/
   (trailing slash required — next.config 308s the bare path) and report
   honestly. A failed submission must NEVER look like success — the site had
   fake-submit replicas that silently dropped leads, and this is the guard
   against reintroducing that. */

export const LEAD_ERROR_MESSAGE =
  'Something went wrong sending your request. Please call 877-787-7558 or email info@insuranceandestates.com and we will take care of you directly.';

export async function submitLead(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const response = await fetch('/api/lead/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...payload, page: window.location.pathname }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/* "Jane van Doe" -> { first_name: "Jane", last_name: "van Doe" } — the forms
   with a single Name field still feed GHL's first/last mapping. */
export function splitName(name: string): { first_name: string; last_name: string } {
  const parts = name.trim().split(/\s+/);
  return { first_name: parts[0] ?? '', last_name: parts.slice(1).join(' ') };
}
