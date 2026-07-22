'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Phone, X } from 'lucide-react';

/* Floating contact launcher, fixed bottom-right on every page. Closed it is a
   navy chat bubble; open it reveals a chat-box style card with the contact
   channels. A live-chat row can join the list once a chat widget exists
   (GHL webchat embed). */

const channels = [
  {
    href: 'tel:1-877-787-7558',
    label: 'Call us',
    detail: '877-787-7558',
    Icon: Phone,
  },
  {
    href: 'mailto:info@insuranceandestates.com',
    label: 'Email us',
    detail: 'info@insuranceandestates.com',
    Icon: Mail,
  },
];

export default function CallButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div
        className={`transition-all duration-300 ease-out origin-bottom-right ${
          open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl shadow-[#0D1B3D]/15 border border-black/5 w-72 overflow-hidden">
          <div className="bg-[#0D1B3D] px-5 py-4">
            <p className="text-white font-medium">How can we help?</p>
            <p className="text-white/60 text-sm mt-0.5">
              Real people, no phone menus. No pressure, just answers.
            </p>
          </div>
          <div className="p-2">
            {channels.map(({ href, label, detail, Icon }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3.5 rounded-xl px-3 py-3 hover:bg-[#F5F5F5] transition-colors duration-200 group"
              >
                <span className="w-10 h-10 rounded-full bg-[#0D1B3D] text-white flex items-center justify-center shrink-0 group-hover:bg-[#1C2E55] transition-colors duration-200">
                  <Icon className="w-4 h-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[#0D1B3D] font-medium text-sm">{label}</span>
                  <span className="block text-[#0D1B3D]/60 text-xs truncate">{detail}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        aria-expanded={open}
        className="w-14 h-14 rounded-full bg-[#0D1B3D] text-white flex items-center justify-center shadow-lg shadow-[#0D1B3D]/25 hover:bg-[#1C2E55] transition-colors duration-200"
      >
        <span className="relative w-6 h-6">
          <MessageCircle
            className={`absolute inset-0 w-6 h-6 transition-all duration-200 ${
              open ? 'opacity-0 rotate-45 scale-75' : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <X
            className={`absolute inset-0 w-6 h-6 transition-all duration-200 ${
              open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-45 scale-75'
            }`}
          />
        </span>
      </button>
    </div>
  );
}
