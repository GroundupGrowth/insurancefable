'use client';

import { useState, type FormEvent } from 'react';
import { ArrowLeft, BookOpen, Compass } from 'lucide-react';
import EmbedSlot from '../../components/EmbedSlot';
import { PrimaryCta, SecondaryCta } from '../../components/CtaButtons';

/* One question per screen, auto-advance on answer, then an email capture step
   (EmbedSlot form:quiz-advice with a local fallback form) before the result.
   Scoring: Q2 (primary goal) carries the weight, Q6 (business / real estate)
   and Q9 (estate planning status) act as tie-breakers per the funnel spec. */

type Track = 'infinite-banking' | 'iul' | 'estate';

interface Option {
  label: string;
  /** Score contributions toward each result track */
  weights?: Partial<Record<Track, number>>;
}

interface Question {
  prompt: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    prompt: 'What is your age range?',
    options: [
      { label: 'Under 30' },
      { label: '30 to 39' },
      { label: '40 to 49' },
      { label: '50 to 59' },
      { label: '60 or older' },
    ],
  },
  {
    prompt: 'What is your primary financial goal right now?',
    options: [
      { label: 'Protect my family', weights: { estate: 2 } },
      { label: 'Build wealth I control', weights: { 'infinite-banking': 2 } },
      { label: 'Tax-free retirement income', weights: { iul: 2 } },
      { label: 'Pass on wealth efficiently', weights: { estate: 2 } },
      { label: 'Get out of debt faster', weights: { 'infinite-banking': 2 } },
    ],
  },
  {
    prompt: 'What do you currently have in place?',
    options: [
      { label: 'A 401k or IRA' },
      { label: 'Term life insurance' },
      { label: 'A whole life policy' },
      { label: 'Real estate investments' },
      { label: 'Starting from scratch' },
    ],
  },
  {
    prompt: "How do you feel about the stock market's control over your retirement?",
    options: [
      { label: 'It keeps me up at night' },
      { label: 'I would rather have guarantees' },
      { label: 'I am fine with some risk' },
      { label: 'I have never really thought about it' },
    ],
  },
  {
    prompt: 'How much could you commit each month to building your own capital?',
    options: [
      { label: '$250 to $500' },
      { label: '$500 to $1,500' },
      { label: '$1,500 to $5,000' },
      { label: '$5,000 or more' },
      { label: 'Not sure yet' },
    ],
  },
  {
    prompt: 'Do you own a business or invest in real estate?',
    options: [
      { label: 'I own a business', weights: { 'infinite-banking': 1 } },
      { label: 'I invest in real estate', weights: { 'infinite-banking': 1 } },
      { label: 'Both', weights: { 'infinite-banking': 1 } },
      { label: 'Neither, not yet' },
    ],
  },
  {
    prompt: 'What is your biggest frustration with traditional financial advice?',
    options: [
      { label: 'Everything funnels into Wall Street products' },
      { label: 'Nobody explains where the fees actually go' },
      { label: 'Taxes are ignored until it is too late' },
      { label: 'One-size-fits-all plans that ignore my situation' },
      { label: 'I cannot touch my own money for decades' },
    ],
  },
  {
    prompt: 'How familiar are you with the Infinite Banking Concept?',
    options: [
      { label: 'Never heard of it' },
      { label: 'Heard of it, curious to learn more' },
      { label: 'I have read about it' },
      { label: 'I am ready to start' },
    ],
  },
  {
    prompt: 'Where does your estate planning stand today?',
    options: [
      { label: 'Nothing in place yet', weights: { estate: 1 } },
      { label: 'A will only' },
      { label: 'A trust is set up' },
      { label: 'Not sure what I need' },
    ],
  },
  {
    prompt: 'When do you want to get started?',
    options: [
      { label: 'Right away' },
      { label: 'In 1 to 3 months' },
      { label: 'Just exploring for now' },
    ],
  },
];

const TOTAL = QUESTIONS.length;

interface TrackResult {
  title: string;
  explanation: string;
  strategyHref: string;
  guideHref: string;
}

const TRACKS: Record<Track, TrackResult> = {
  'infinite-banking': {
    title: 'Infinite Banking',
    explanation:
      'Based on your answers, you are wired to become your own banker. A properly structured dividend-paying whole life policy lets you build capital you control, borrow against it on your own terms, and keep every dollar working in two places at once. It is the same strategy business owners and real estate investors use to finance growth without asking a bank for permission.',
    strategyHref: '/infinite-banking-strategy/',
    guideHref: '/self-banking-blueprint/',
  },
  iul: {
    title: 'Tax-Free Retirement (IUL)',
    explanation:
      'Your answers point to one clear priority, retirement income the IRS cannot touch. An indexed universal life policy captures a share of market upside while a built-in floor protects you from losses, then pays you tax-free income through policy loans when you retire. It is a way to grow with confidence and step out of the tax trap that 401ks and IRAs quietly walk you into.',
    strategyHref: '/iul-introduction/',
    guideHref: '/iul-retirement/',
  },
  estate: {
    title: 'Estate & Legacy',
    explanation:
      'Your answers show that protecting what you have built, and passing it on well, matters most right now. The right combination of a living trust and permanent life insurance keeps your estate out of probate, shields your family from unnecessary taxes and delays, and turns your legacy into a plan instead of a hope. Start with the foundations and build from there.',
    strategyHref: '/estate-planning-living-trust/',
    guideHref: '/generational-transfer/',
  },
};

/* Deterministic winner: highest score, ties resolved in this order (Infinite
   Banking is the site's flagship strategy). */
const TIE_ORDER: Track[] = ['infinite-banking', 'iul', 'estate'];

function scoreAnswers(answers: number[]): Track {
  const scores: Record<Track, number> = { 'infinite-banking': 0, iul: 0, estate: 0 };
  answers.forEach((optionIndex, questionIndex) => {
    const weights = QUESTIONS[questionIndex]?.options[optionIndex]?.weights;
    if (!weights) return;
    for (const [track, value] of Object.entries(weights) as [Track, number][]) {
      scores[track] += value;
    }
  });
  return TIE_ORDER.reduce((best, track) => (scores[track] > scores[best] ? track : best));
}

type Phase = 'questions' | 'capture' | 'result';

const inputClass =
  'w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[15px] text-[#0D1B3D] outline-none focus:border-[#0D1B3D]/40 transition-colors duration-200';

export default function QuizFlow() {
  const [phase, setPhase] = useState<Phase>('questions');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const selectOption = (optionIndex: number) => {
    const next = [...answers];
    next[step] = optionIndex;
    setAnswers(next);
    if (step + 1 < TOTAL) {
      setStep(step + 1);
    } else {
      setPhase('capture');
    }
  };

  const goBack = () => {
    if (phase === 'capture') {
      setPhase('questions');
      setStep(TOTAL - 1);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // {/* TODO: wire submissions */}
    console.log({ name, email, phone, agreed, answers, track: scoreAnswers(answers) });
    setPhase('result');
  };

  const progress =
    phase === 'questions' ? Math.round(((step + 1) / TOTAL) * 100) : 100;

  const track = TRACKS[scoreAnswers(answers)];

  return (
    <section className="px-6 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        {phase !== 'result' && (
          <div className="mb-6">
            <div className="h-1.5 rounded-full bg-black/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#0D1B3D] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-black/5 p-6 md:p-10">
          {phase === 'questions' && (
            <div>
              <p className="text-[#0D1B3D]/50 text-sm mb-3">
                Question {step + 1} of {TOTAL}
              </p>
              <h2
                className="text-[#0D1B3D] text-xl md:text-2xl font-medium leading-snug mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                {QUESTIONS[step].prompt}
              </h2>

              <div className="flex flex-col gap-3">
                {QUESTIONS[step].options.map((option, index) => {
                  const selected = answers[step] === index;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => selectOption(index)}
                      className={`w-full text-left rounded-full border px-6 py-3.5 text-[15px] font-medium transition-colors duration-200 ${
                        selected
                          ? 'bg-[#0D1B3D] text-white border-[#0D1B3D]'
                          : 'bg-white text-[#0D1B3D] border-black/10 hover:border-[#0D1B3D]/40 hover:bg-[#F5F5F5]'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {step > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#0D1B3D]/60 hover:text-[#0D1B3D] transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
            </div>
          )}

          {phase === 'capture' && (
            <div>
              <p className="text-[#0D1B3D]/50 text-sm mb-3">One last step</p>
              <h2
                className="text-[#0D1B3D] text-xl md:text-2xl font-medium leading-snug mb-2"
                style={{ letterSpacing: '-0.02em' }}
              >
                Where should we send your personalized plan?
              </h2>
              <p className="text-[#0D1B3D]/60 text-[15px] leading-relaxed mb-6">
                We will send a short plan built from your answers, plus the reading that
                fits your recommended strategy.
              </p>

              <EmbedSlot slotKey="form:quiz-advice">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label className="block text-sm text-[#0D1B3D]/70">
                    Name
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`${inputClass} mt-1.5`}
                    />
                  </label>
                  <label className="block text-sm text-[#0D1B3D]/70">
                    Email
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${inputClass} mt-1.5`}
                    />
                  </label>
                  <label className="block text-sm text-[#0D1B3D]/70">
                    Phone
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`${inputClass} mt-1.5`}
                    />
                  </label>

                  <hr className="border-black/5" />

                  <p className="text-xs leading-[1.6] text-[#0D1B3D]/60">
                    By pressing the Submit button, you agree to use InsuranceandEstates&rsquo;{' '}
                    <a href="/privacytou/" className="underline">
                      privacy policy and terms
                    </a>
                    . InsuranceandEstates may contact you at the number you entered on this
                    webpage using our automatic dialing system to market our life insurance
                    products. Alternatively, you can contact us at{' '}
                    <a href="tel:1-877-787-7558" className="underline">
                      877-787-7558
                    </a>
                    .
                  </p>
                  <label className="flex items-center gap-2 text-sm text-[#0D1B3D]/70 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="shrink-0"
                    />
                    I read the disclaimer above.
                  </label>

                  {/* TODO: wire submissions */}
                  <button
                    type="submit"
                    className="self-start bg-[#0D1B3D] text-white font-medium px-8 py-2.5 rounded-full hover:bg-[#1C2E55] transition-colors duration-200"
                  >
                    Send My Plan
                  </button>
                </form>
              </EmbedSlot>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1.5 text-sm text-[#0D1B3D]/60 hover:text-[#0D1B3D] transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setPhase('result')}
                  className="text-sm text-[#0D1B3D]/60 underline underline-offset-2 hover:text-[#0D1B3D] transition-colors duration-200"
                >
                  Skip, just show my result
                </button>
              </div>
            </div>
          )}

          {phase === 'result' && (
            <div className="text-center">
              <p className="inline-flex items-center gap-1.5 text-[#0D1B3D]/60 text-sm mb-3">
                <Compass className="w-4 h-4" />
                Your recommended path
              </p>
              <h2
                className="text-[#0D1B3D] text-3xl md:text-4xl font-medium leading-tight mb-5"
                style={{ letterSpacing: '-0.04em' }}
              >
                {track.title}
              </h2>
              <p className="text-[#0D1B3D]/70 text-[15px] md:text-base leading-relaxed max-w-xl mx-auto mb-8 text-left md:text-center">
                {track.explanation}
              </p>

              <div className="flex gap-4 flex-wrap justify-center">
                <PrimaryCta href={track.strategyHref} label="Read the Strategy Guide" />
                <SecondaryCta href={track.guideHref} label="Get the Free Book" />
              </div>

              <p className="mt-8 text-sm text-[#0D1B3D]/60 inline-flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <a
                  href="/proclientguide/introduction/"
                  className="underline underline-offset-2 hover:text-[#0D1B3D] transition-colors duration-200"
                >
                  Or connect with an expert for a free fit call
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
