/* Live Trustpilot "Mini" trustbox — same widget iframe as the live site
   (theme=light variant, as used on the live intro pages). The TrustScore /
   review count text is rendered inside the widget itself. */

const TRUSTBOX_SRC =
  'https://widget.trustpilot.com/trustboxes/53aa8807dec7e10d38f59f32/index.html' +
  '?templateId=53aa8807dec7e10d38f59f32&businessunitId=5eced1756efff500018631d5' +
  '#locale=en-US&styleHeight=150px&styleWidth=100%25&theme=light';

export default function TrustpilotBox({ className }: { className?: string }) {
  return (
    <div className={`w-full max-w-[220px] mx-auto ${className ?? ''}`}>
      <iframe
        title="Trustpilot reviews"
        src={TRUSTBOX_SRC}
        loading="lazy"
        className="block w-full h-[150px] overflow-hidden border-0"
      />
    </div>
  );
}
