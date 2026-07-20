/* Coral CTA pill from the live intro pages ("bricks-button lg circle"):
   centered, fully rounded, white 15px text on the coral accent.
   NOTE: the live button links to /proclientguide/introduction/ — pass that via
   `href` when cloning a page verbatim; default follows the build spec. */

export default function QuoteCtaBanner({
  href = '/connect-with-our-experts/',
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className ?? ''}`}>
      <a
        href={href}
        className="inline-block bg-[#FF6352] text-white text-[15px] leading-[1.7] tracking-[0.5px] rounded-full px-7 py-2.5 transition-opacity duration-200 hover:opacity-90"
      >
        Get Your Personalized Quote Today. Click Here to Connect with an Expert!
      </a>
    </div>
  );
}
