/* Heuristic spam scoring for /api/lead submissions (Xander, 2026-09-01:
   bot leads like "hQqSewEJrCtTjAwXsM" / "m.e.gog.ekas.e.v61@gmail.com"
   showing up in the Leads module).

   Philosophy: NEVER drop a lead. A flagged submission is still archived in
   fallback_leads with spam=true — it is only excluded from GHL forwarding
   and hidden behind a toggle at /admin -> Leads, so a false positive costs
   one click, not a customer. Thresholds are deliberately conservative:
   every heuristic targets a bot signature no plausible real signup shows. */

export interface SpamVerdict {
  spam: boolean;
  score: number;
  reasons: string[];
}

/** Case flips inside a single token, e.g. hQqSewEJrCtTjAwXsM -> many. */
function caseTransitions(token: string): number {
  let transitions = 0;
  for (let i = 1; i < token.length; i += 1) {
    const prev = token[i - 1];
    const curr = token[i];
    if (/[a-z]/.test(prev) !== /[a-z]/.test(curr) && /[a-zA-Z]/.test(prev) && /[a-zA-Z]/.test(curr)) {
      transitions += 1;
    }
  }
  return transitions;
}

function vowelRatio(token: string): number {
  const letters = token.replace(/[^a-zA-Z]/g, '');
  if (letters.length === 0) return 1;
  const vowels = letters.replace(/[^aeiouAEIOU]/g, '').length;
  return vowels / letters.length;
}

export function scoreLeadSpam(input: {
  name: string;
  email: string;
  phone?: string;
  extras?: Record<string, string>;
  elapsedMs?: number;
}): SpamVerdict {
  const reasons: string[] = [];
  let score = 0;

  /* Random-string names: a single long token with mixed case flipping back
     and forth (real single names are Bob / Stacey / RUSSELL — 0-1 flips). */
  const name = input.name.trim();
  if (!name.includes(' ') && name.length >= 8) {
    if (caseTransitions(name) >= 4) {
      score += 2;
      reasons.push('random-cased name');
    } else if (vowelRatio(name) < 0.2) {
      score += 2;
      reasons.push('unpronounceable name');
    }
  }
  if (/https?:\/\//i.test(name)) {
    score += 2;
    reasons.push('URL in name');
  }

  /* Gmail dot-trick addresses: locals chopped into many fragments with 2+
     single-character segments (m.e.gog.ekas.e.v61). Real dotted addresses
     (john.smith, h.melotto) have at most one initial. */
  const local = input.email.trim().split('@')[0] ?? '';
  const segments = local.split('.');
  const singleCharSegments = segments.filter((s) => s.length === 1).length;
  if (singleCharSegments >= 2) {
    score += 2;
    reasons.push('fragmented email local part');
  } else if (segments.length >= 5) {
    score += 1;
    reasons.push('heavily dotted email');
  }

  /* Keyboard-mash phones: one repeated digit or an ascending run. */
  const phone = (input.phone ?? '').replace(/\D/g, '');
  if (phone.length >= 7 && (/^(\d)\1+$/.test(phone) || '01234567890123456789'.includes(phone))) {
    score += 2;
    reasons.push('fake phone pattern');
  }

  /* Link-stuffed message/extra fields (contact-form spam). */
  const extraText = Object.values(input.extras ?? {}).join(' ');
  const urlCount = (extraText.match(/https?:\/\//gi) ?? []).length;
  if (urlCount >= 2) {
    score += 1;
    reasons.push('links in message');
  }

  /* Sub-2.5s fill time, when the form reported one. Absence is NOT penalized
     (several forms don't send it). */
  if (typeof input.elapsedMs === 'number' && input.elapsedMs >= 0 && input.elapsedMs < 2500) {
    score += 2;
    reasons.push('submitted too fast');
  }

  return { spam: score >= 2, score, reasons };
}
