'use client';

import { useState } from 'react';

/* "Select your quote." tab switcher — clone of the live Bricks nested tabs
   (.quote-tab: pill radius 3rem, .5rem side margins; active tab opens its
   LeadConnector form pane). All three live form iframes are kept mounted and
   toggled with `hidden` so a pane keeps its state when switching back. */

const quoteTabs = [
  {
    label: 'Whole Life',
    src: 'https://api.leadconnectorhq.com/widget/form/AkhGIgnXMIaBEiVGgBqy',
  },
  {
    label: 'Term Life',
    src: 'https://api.leadconnectorhq.com/widget/form/EE5Lawx0T1dxvIyN9u1M',
  },
  {
    label: 'Whole Life - No Exam',
    src: 'https://api.leadconnectorhq.com/widget/form/W8tRIHyHn4pXwkqsrV1y',
  },
];

/* fas fa-arrow-down (live: green icon between the label and the tabs) */
function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 448 512" aria-hidden="true" className="w-10 h-10 mx-auto text-[#7BBD44]" fill="currentColor">
      <path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z" />
    </svg>
  );
}

export default function QuoteTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <p className="text-[#262626] text-[22px] font-extrabold text-center">
        Select your quote.
      </p>
      <div className="mt-4">
        <ArrowDownIcon />
      </div>

      {/* Tab menu */}
      <div role="tablist" className="flex flex-wrap justify-center mt-4">
        {quoteTabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={activeTab === index}
            onClick={() => setActiveTab(index)}
            className={`my-4 mx-2 rounded-[3rem] px-8 py-3 text-[16px] transition-colors duration-200 ${
              activeTab === index
                ? 'bg-[#77708C] text-white'
                : 'bg-[#EFEFEF] text-[#363636] hover:bg-[#e4e4e4]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panes — live LeadConnector quote form embeds */}
      <div className="mt-8">
        {quoteTabs.map((tab, index) => (
          <div key={tab.src} role="tabpanel" className={activeTab === index ? '' : 'hidden'}>
            <iframe
              src={tab.src}
              title={`${tab.label} quote form`}
              className="block w-full min-h-[1100px] border-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
