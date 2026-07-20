'use client';

import { Check } from 'lucide-react';
import EmbedSlot from '../../components/EmbedSlot';

const callPoints = [
  'Map out your goals — where you are and where you want to be',
  'Identify your needs before any product is on the table',
  'Get matched with the right specialist for your situation',
  'No pitch, no pressure — just answers',
];

/* Discovery-call booking. The default is the SAME live LeadConnector (GHL)
   calendar the WordPress site uses — captured in
   extraction/parsed/connect-with-our-experts.json — so bookings land in the
   real CRM out of the box.

   This deliberately replaced an earlier local form stub whose submit handler
   only console.logged and then showed a "we'll reach out" message: it looked
   functional but silently dropped every lead. Do not reintroduce a fake-submit
   form here. If a different embed is wanted, paste it at /admin under
   `form:connect-with-our-experts` and it overrides the calendar below. */

const LIVE_BOOKING_CALENDAR =
  'https://api.leadconnectorhq.com/widget/booking/twTnQVNTJJKOdulIBYDc';

export default function LeadForm() {
  return (
    <section id="book-a-call" className="px-6 pb-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="bg-[#0D1B3D] rounded-3xl">
          <div className="grid md:grid-cols-2 gap-12 p-10 md:p-14">
            <div>
              <p className="text-white/50 text-sm uppercase tracking-wide mb-2">
                Discovery Call
              </p>
              <h2
                className="text-white text-4xl md:text-5xl font-medium mb-6"
                style={{ letterSpacing: '-0.03em' }}
              >
                Book Your Discovery Call
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                A quick call to map out your goals. We&rsquo;ll identify your needs and
                match you with the right specialist to design your custom wealth
                strategy.
              </p>
              <ul className="space-y-3">
                {callPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-white/60">
                    <Check className="w-4 h-4 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center">
              {/* An embed saved at /admin under this slot overrides the live
                  calendar; otherwise the live calendar renders. */}
              <EmbedSlot slotKey="form:connect-with-our-experts" className="bg-white rounded-2xl p-2">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <iframe
                    src={LIVE_BOOKING_CALENDAR}
                    title="Book your discovery call"
                    scrolling="no"
                    className="block w-full min-h-[700px] border-0"
                  />
                </div>
              </EmbedSlot>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
