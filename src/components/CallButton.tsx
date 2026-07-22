import { Phone } from 'lucide-react';

/* Floating call button, fixed bottom-right on every page. Pure anchor, no JS.
   Sits under the hero video modal (z-[100]) but above page content. */
export default function CallButton() {
  return (
    <a
      href="tel:1-877-787-7558"
      aria-label="Call us at 877-787-7558"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-0 group"
    >
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out">
        <span className="block bg-[#0D1B3D] text-white text-sm font-medium rounded-full py-2.5 px-4 mr-2 whitespace-nowrap shadow-lg">
          877-787-7558
        </span>
      </span>
      <span className="w-14 h-14 rounded-full bg-[#0D1B3D] text-white flex items-center justify-center shadow-lg shadow-[#0D1B3D]/25 hover:bg-[#1C2E55] transition-colors duration-200">
        <Phone className="w-5 h-5" />
      </span>
    </a>
  );
}
