import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Extra content under the intro, e.g. CTA buttons */
  children?: ReactNode;
  align?: 'left' | 'center';
}

export default function PageHero({ eyebrow, title, intro, children, align = 'center' }: PageHeroProps) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';
  return (
    <section className="px-6 pt-10 pb-16 md:pb-20">
      <div className={`max-w-[88rem] mx-auto flex flex-col ${alignment}`}>
        {eyebrow && <p className="text-[#0D1B3D]/60 text-sm mb-2">{eyebrow}</p>}
        <h1
          className="text-[#0D1B3D] text-4xl md:text-6xl font-medium leading-[1.05] max-w-4xl mb-6"
          style={{ letterSpacing: '-0.04em' }}
        >
          {title}
        </h1>
        {intro && (
          <p className={`text-[#0D1B3D]/60 text-base md:text-lg leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
            {intro}
          </p>
        )}
        {children && <div className="mt-8 flex gap-4 flex-wrap justify-center">{children}</div>}
      </div>
    </section>
  );
}
