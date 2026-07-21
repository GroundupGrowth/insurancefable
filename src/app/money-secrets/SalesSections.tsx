import { SalesSection, SalesProse } from '../../components/EbookLanding';

/* Live sales copy for /money-secrets/ — reproduced verbatim from
   extraction/parsed/money-secrets.json; the page's only live section. Live is a
   bare opt-in page, so this is the copy that surrounds its form (the form
   itself — required-fields note, consent text, Akismet field — belongs to
   live's embedded Gravity Form; our GHL embed carries its own consent flow).
   Live shows the eptg-med cover art here; it is reproduced as-is. */

export default function SalesSections() {
  return (
    <SalesSection>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src="/wp-content/uploads/eptg-med-136x200.webp"
          alt="Eptg Med"
          className="w-32 h-auto rounded-sm shadow-[0_16px_40px_rgba(13,27,61,0.25)] shrink-0"
        />
        <div>
          <p className="text-[#0D1B3D]/60 text-sm mb-3">Exclusive Wealth Strategies Inside</p>
          <p
            className="text-[#0D1B3D] text-2xl md:text-4xl font-medium leading-tight max-w-4xl mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            Money Secrets of the Wealthy
          </p>
          <SalesProse>
            <p>
              <strong>What the wealthy teach their kids and why it matters to you.</strong>
              <br />
              Join over 10,000 others who have downloaded our eBooks.
            </p>
            <p>
              Enter your name and email to get free and immediate access! We respect your privacy.
              Your information is never sold.
            </p>
          </SalesProse>
        </div>
      </div>
    </SalesSection>
  );
}
