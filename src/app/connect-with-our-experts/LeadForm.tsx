'use client';

import EmbedSlot from '../../components/EmbedSlot';
import GhlResizeScript from '../../components/GhlResizeScript';

/* Discovery-call booking. The default is the SAME live LeadConnector (GHL)
   calendar the WordPress site uses — captured in
   extraction/parsed/connect-with-our-experts.json — so bookings land in the
   real CRM out of the box.

   This deliberately replaced an earlier local form stub whose submit handler
   only console.logged and then showed a "we'll reach out" message: it looked
   functional but silently dropped every lead. Do not reintroduce a fake-submit
   form here. If a different embed is wanted, paste it at /admin under
   `form:connect-with-our-experts` and it overrides the calendar below.

   Layout note (Xander, 2026-07-26): the calendar spans (nearly) the full width
   of the navy container — wide, not tall. No side column: a half-width embed
   made the widget stack and run very long. */

const LIVE_BOOKING_CALENDAR =
  'https://api.leadconnectorhq.com/widget/booking/twTnQVNTJJKOdulIBYDc';

export default function LeadForm() {
  return (
    <section id="book-a-call" className="px-6 pb-24">
      <div className="max-w-[88rem] mx-auto">
        <div className="bg-[#0D1B3D] rounded-3xl p-4 md:p-8">
          {/* An embed saved at /admin under this slot overrides the live
              calendar; otherwise the live calendar renders. */}
          <EmbedSlot slotKey="form:connect-with-our-experts" className="bg-white rounded-2xl p-2">
            <div className="bg-white rounded-2xl overflow-hidden">
              {/* form_embed.js resizes the calendar to its real height —
                  the min-height only covers the moment before it loads */}
              <GhlResizeScript />
              <iframe
                src={LIVE_BOOKING_CALENDAR}
                title="Book your discovery call"
                scrolling="no"
                className="block w-full min-h-[750px] border-0"
              />
            </div>
          </EmbedSlot>
        </div>
      </div>
    </section>
  );
}
