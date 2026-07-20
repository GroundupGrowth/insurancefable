import type { AdvisorProfile } from '../app/proclientguide/ProfileLayout';

export const advisorDefaults: Record<string, AdvisorProfile> = {
  steve: {
    slug: 'steve',
    role: 'Chief Strategic Partnerships Officer',
    name: 'Steve Gibbs, JD, AEP®',
    firstName: 'Steve',
    intro:
      'Steven Gibbs is the CSPO, Co-Owner and Co-Founder of Insurance and Estate Strategies LLC (I&E), having recently pivoted after serving as CEO since 2018, to focus on building external strategic partnerships, and serving as a coach and mentor for our growing community of partners, clients and experts.',
    photo: {
      src: '/wp-content/uploads/steven_gibbs-230x300.webp',
      alt: 'Steve Gibbs, JD, AEP®',
    },
    initials: 'SG',
    specialties: [
      'Wealth Transfer Coaching',
      'Estate Planning Coaching and Training',
      'Strategic Life Insurance Design',
      'Business Succession and Exit Strategies',
    ],
    bioSections: [
      {
        heading: 'Background',
        paragraphs: [
          'Before co-founding I&E, Steve built a career spanning small business, real estate development, and trust and estate planning law with a focus on asset protection. He operated a Florida trusts and estates law practice from 2008 to 2023 and earned legal licenses in California, Florida, and Minnesota along the way.',
          'That combination — attorney, entrepreneur, and licensed life and annuity producer in all 50 states — is what lets him see both the legal and the financial side of a family wealth strategy at the same time.',
        ],
      },
      {
        heading: 'Philosophy & Approach',
        paragraphs: [
          'Steve believes most enterprising people focus on offense while neglecting the defensive side of their plan. His work centers on helping clients understand a well-thought-out defensive strategy — and on closing the preventative gaps that typical experts overlook.',
          'He partners with companies that offer real protection and leverage, promotes communication, legacy, and charitable goals within families, and encourages wealth-building approaches that avoid unnecessary risks.',
        ],
      },
    ],
    credentials: [
      'AEP® Certification for Multi-Disciplinary Estate Planning Expertise, 2024',
      "Penn Mutual's Century Club Award, 2021",
      'State Bar Admission in CA and FL',
      'Licensed Life & Annuity Producer in all 50 States and DC Since 2017',
      'Author of Several Books and Contributor to National Publications such as ThinkAdvisor',
      'NBI Presenter and Contributor',
    ],
    testimonials: [
      {
        quote:
          "When I heard about Being your own bank, Infinite Banking and the other terms used for this service I was intrigued. I watched Steve's videos, did some research and was really excited to learn more. I'm so glad I did! This is one of the most important and useful tools we have to secure our money, leverage it and gain independence from the traditional banks, lenders and accounts.",
      },
    ],
    schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/stevegibbs',
    email: 'steve@insuranceandestates.com',
    // FILL IN: linkedinUrl (via /admin or here)
    yearsExperience: 'Since 2008',
    licenses: [
      'State Bar admission in CA and FL',
      'Licensed Life & Annuity Producer in all 50 states + DC',
    ],
    publications: [
      { source: 'ThinkAdvisor', title: 'Contributor to national publications' },
    ],
  },
  barry: {
    slug: 'barry',
    role: 'IBC Pro Client Guide Practitioner',
    name: 'Barry Brooksby',
    firstName: 'Barry',
    intro:
      'Barry Brooksby, Pro Client Guide, is our resident Infinite Banking Practitioner and Real Estate Strategist. He has been helping clients take control of their wealth for over 25 years and offers clients an extensive background in large scale real estate investing and financial services.',
    photo: {
      src: '/wp-content/uploads/Barry-1-1.webp',
      alt: 'Barry Brooksby',
    },
    initials: 'BB',
    specialties: [
      'Real Estate Consulting',
      'Wealth Accumulation Mentorship',
      'Infinite Banking Coaching',
      'Agent Training',
    ],
    bioSections: [
      {
        heading: 'Background',
        paragraphs: [
          "Barry's 30-year career has been anything but conventional. He started out directing the guitar program at Southern Utah University before moving into financial services — building experience in large scale real estate investing and managing a trust-deed investment company along the way.",
          'In 2010 he discovered the Infinite Banking Concept, and everything changed. Since then he has dedicated his practice to designing high cash value whole life policies and teaching clients — and other agents — how to become their own source of financing.',
        ],
      },
      {
        heading: 'Philosophy & Approach',
        paragraphs: [
          'Barry believes clients should be in control of their own money, and his faith-based approach to decision making keeps the focus on what actually serves the client.',
          'His priorities: delivering the right policy, proper strategy and clear training to empower every client to take control of his or her finances — and vetting and updating the best companies regularly to assure that clients are set up for success.',
        ],
      },
    ],
    credentials: [
      'Awarded Top Performer for several Top Mutual WL Companies',
      'Authorized Nelson Nash Infinite Banking Practitioner',
      'Author of several books on infinite banking and creating tax free income',
      'Creator of the Amazing Life Agent program',
      'Featured on several national podcasts',
    ],
    testimonials: [
      {
        quote:
          'Barry is hands down the best advisor in whole life insurance and provides unbiased advice for whole life insurance policies for Cash Value life insurance for IBC or infinite banking.',
      },
      {
        quote:
          'Barry and his team are not only very knowledgeable, they are also attentive, responsive and very transparent in their dealings.',
      },
      {
        quote:
          'Barry is one of the best insurance agents by far. He is so professional and very knowledgeable – an expert.',
      },
      {
        quote:
          'Barry and his team are fantastic. Barry is incredibly knowledgeable in all things insurance, and walked me through the process step by step.',
      },
      {
        quote:
          'Barry has expertise needed for business owners and found the best solutions for my situation. Professional and efficient.',
        attribution: 'Jerry M',
      },
    ],
    schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/barrybrooksby',
    email: 'barry@insuranceandestates.com',
    // FILL IN: linkedinUrl, licenses (via /admin or here)
    yearsExperience: '30+ years',
    publications: [
      {
        source: 'Book',
        title: 'Live Rich, Die Rich',
        href: 'https://lrdr.insuranceandestates.com/live-rich-die-rich-2025',
      },
    ],
    book: {
      eyebrow: "Barry's latest book",
      title: 'Live Rich, Die Rich',
      text: 'How to Use High Cash Value Life Insurance and the Infinite Banking Concept as a Tax-Free Strategy to Supercharge Your Wealth.',
      href: 'https://lrdr.insuranceandestates.com/live-rich-die-rich-2025',
    },
  },
  jasonh: {
    slug: 'jasonh',
    role: 'Overfunded Life Specialist',
    name: 'Jason Herring',
    firstName: 'Jason',
    intro:
      'Jason Herring has spent 16 years in life insurance and financial services — most of them deep inside the universal life and indexed universal life world. That experience is exactly what makes him different.',
    photo: {
      src: '/wp-content/uploads/Jason-1.webp',
      alt: 'Jason Herring',
    },
    initials: 'JH',
    specialties: [
      'Indexed Universal Life (IUL)',
      'Dividend-Paying Whole Life',
      'Side-by-Side Policy Comparison',
      'Retirement Income Distribution',
      'Estate Planning & Wealth Transfer',
    ],
    bioSections: [
      {
        heading: 'Why Jason',
        paragraphs: [
          'Most agents live in one camp. Jason has sat in over 400 meetings designing IUL and annuity-based retirement strategies for advisors and their clients. He knows the mechanics, the caps, the floors, the policy charges, and the fine print most agents gloss over.',
          'But Jason also discovered something along the way: whole life insurance, when properly structured and overfunded, does things that universal life products simply cannot replicate — particularly when used as infrastructure for banking, cash flow, and generational wealth transfer.',
          'So now Jason does what almost nobody in the industry does. He sits across from a client, illustrates both policies side by side, and walks through the honest pros and cons of each — so the client can make a truly informed decision based on what they actually want to accomplish.',
          'No pitch. No agenda. Just deep clarity on which overfunded life policy is best suited for his client.',
        ],
      },
      {
        heading: 'Background',
        paragraphs: [
          'Jason began in pharmaceutical sales before transitioning to life insurance. He worked with Hartford as a wholesaler on retirement income distribution strategies, then transitioned to Prudential when Hartford sold its life division in 2012, educating Prudential advisors and clients on comprehensive income strategies.',
          "He joined Insurance & Estate Strategies in 2017 and has been instrumental in shaping the firm's values and expertise ever since.",
        ],
      },
      {
        heading: 'What Jason Specializes In',
        paragraphs: [
          'Indexed Universal Life: market-linked growth with downside protection, cap rate optimization, and income distribution design.',
          'Dividend-paying whole life: guaranteed cash value growth, infinite banking structure, and generational wealth transfer.',
          'Retirement income distribution: LIRP strategies, guaranteed income, and tax-efficient withdrawal design — plus the protection strategies most financial advisors overlook.',
        ],
      },
      {
        heading: 'Philosophy & Personal',
        paragraphs: [
          "Jason believes overfunded life insurance in the client's best interest is always the right move — whether that's whole life, IUL, or a combination. He'll cost himself a sale before he'll put a client in the wrong product.",
          'He also believes most people protect everything in their lives except what matters most. His job is to fix that.',
          'Jason has been married 25 years, has three daughters who keep him busy, and lives in Nashville with their dog Sadie. He prioritizes family time, schedules regular vacations, and spends time on mission trips putting his faith into action.',
        ],
      },
    ],
    credentials: [
      'Prudential Pinnacle Award recipient, 2014 and 2015',
      'Series 6, 63, and 65',
      'Licensed producer in all 50 states and DC',
      'Instructor with AFES (Adult Financial Education Services)',
      'National Association of Fixed Annuities (NAFA) member',
      '16 years of experience across IULs, whole life, annuities, and advanced cash value strategies',
    ],
    testimonials: [
      {
        quote:
          'This was an amazing experience, when I first contacted Insurance and Estates, I barely knew anything about life insurance. Jason was very patient, informative and, clear in how he quickly educated me to make intelligent decisions on my financial future. I would definitely recommend Insurance and Estates to anyone.',
      },
      {
        quote:
          "Jason helped me with a whole life policy, protecting my daughter as well as go through the process without disrupting my over the road work as a trucker. Some times as a trucker it's hard to get on site medical while going state to state, as a non smoker I qualified, Jason is awesome",
      },
      {
        quote:
          'Jason was very patient with all my questions (despite asking the same questions over and over!) and gave detailed explanation of everything he was sharing with me. He explained the whole process to me and simplified it for me to understand what I was signing up for. He was also very responsive via email and texts. Thank you.',
        attribution: 'Mrinalini',
      },
      {
        quote:
          "Jason was extremely helpful walking me through my options. He was quick to respond, very detailed and overall amazing to work with. I'm very pleased with the experience and happy to have my policy set up.",
        attribution: 'David',
      },
    ],
    schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/jasonherring',
    email: 'jason@insuranceandestates.com',
    // FILL IN: linkedinUrl (via /admin or here)
    yearsExperience: '16+ years',
    licenses: ['Series 6, 63 and 65', 'Licensed producer in all 50 states + DC'],
  },
  jasonk: {
    slug: 'jasonk',
    role: 'Chief Executive Officer',
    name: 'Jason Kenyon, Esq.',
    firstName: 'Jason',
    intro:
      "Jason Kenyon spent 20 years watching the conventional financial system fail the people it was supposed to serve. That frustration built a business. He's the co-founder and CEO of Insurance & Estate Strategies, one of the most widely read independent education platforms in the life insurance and wealth strategy space.",
    photo: {
      src: '/wp-content/uploads/jasonk-1-230x300.webp',
      alt: 'Jason Kenyon, Esq.',
    },
    initials: 'JK',
    specialties: [
      'Whole Life Insurance',
      'Infinite Banking Concept',
      'Estate Planning',
      'Wealth Transfer Strategies',
      'Generational Wealth Protection',
    ],
    bioSections: [
      {
        heading: 'Background',
        paragraphs: [
          'Before I&E, Jason built and sold TermLife2Go — an earlier digital insurance platform — giving him a track record most advisors never achieve once, let alone twice.',
          "Jason holds a JD from University of San Diego School of Law, has been licensed in life insurance since 2010, and holds a Master's in Business Leadership.",
        ],
      },
      {
        heading: 'Volume-Based Banking',
        paragraphs: [
          'His real credential is the Volume-Based Banking methodology he developed — a framework that reframes whole life insurance not as a savings vehicle but as financial infrastructure, helping families build banking systems that compound across generations.',
          'His work sits at the intersection of Austrian economics, estate planning, and contrarian financial strategy. He writes, teaches, and now creates video content for people who sense something is deeply wrong with conventional financial advice — and are looking for the exit.',
        ],
      },
    ],
    credentials: [
      'JD, University of San Diego School of Law',
      'Life insurance licensed since 2010',
      "Master's in Business Leadership",
      'Developed the proprietary Volume-Based Banking methodology',
    ],
    testimonials: [
      {
        quote:
          'This was an amazing experience, when I first contacted Insurance and Estates, I barely knew anything about life insurance. Jason was very patient, informative and, clear in how he quickly educated me to make intelligent decisions on my financial future. I would definitely recommend Insurance and Estates to anyone.',
      },
      {
        quote:
          "Jason helped me with a whole life policy, protecting my daughter as well as go through the process without disrupting my over the road work as a trucker. Some times as a trucker it's hard to get on site medical while going state to state, as a non smoker I qualified, Jason is awesome",
      },
      {
        quote:
          'Jason was very patient with all my questions (despite asking the same questions over and over!) and gave detailed explanation of everything he was sharing with me. He explained the whole process to me and simplified it for me to understand what I was signing up for. He was also very responsive via email and texts. Thank you.',
      },
      {
        quote:
          "Jason was extremely helpful walking me through my options. He was quick to respond, very detailed and overall amazing to work with. I'm very pleased with the experience and happy to have my policy set up.",
        attribution: 'David',
      },
    ],
    // FOLLOW-UP: no booking widget or direct email surfaced on the live page — add if one exists.
    // FILL IN: linkedinUrl (via /admin or here)
    yearsExperience: '20+ years',
    licenses: ['Life insurance licensed since 2010'],
    education: ['JD, University of San Diego School of Law', "Master's in Business Leadership"],
  },
  denise: {
    slug: 'denise',
    role: 'Pro Client Guide',
    name: 'Denise Boisvert',
    firstName: 'Denise',
    intro:
      'Denise Boisvert, Pro Client Guide, has 22 years of experience in the life industry. She specializes in educating clients on strategic ways to leverage life insurance to get out of debt, provide family protection, as well as maximize cash value accumulation to allow for self-funding opportunities, and tax-free lifetime income streams.',
    photo: {
      src: '/wp-content/uploads/Denise-1.webp',
      alt: 'Denise Boisvert',
    },
    initials: 'DB',
    specialties: [
      'Life Insurance',
      'Annuities',
      'Infinite Banking Concept (IBC)',
      'Life Insurance Retirement Planning',
      'College Funding',
    ],
    bioSections: [
      {
        heading: 'Background & Expertise',
        paragraphs: [
          "Denise's career began in human resources at companies including Yomega Yo Yo's and Speidel Textron. Following a 2003 layoff, she pursued long-term care planning before discovering her calling in helping people secure their futures.",
          'She is a licensed producer in all 50 states and DC, appointed with top carriers, and her philosophy centers on providing financial strategies without encouraging risk — helping clients control their own destiny.',
        ],
      },
      {
        heading: 'Philosophy & Approach',
        paragraphs: [
          "Putting the client's best interests and goals first. Partnering with top mutual companies with high Comdex (Financial Strength) scores. Designing policies that maximize benefits for strategic goals.",
        ],
      },
      {
        heading: 'Current Focus',
        paragraphs: [
          'Educating clients on strategic ways to leverage properly designed, cash value whole life insurance for: supporting small business operation and growth, recapturing debt, providing family legacy protection, and maximizing cash value accumulation to allow for tax free retirement, leveraging social security or college funding.',
        ],
      },
      {
        heading: 'Life on the Road',
        paragraphs: [
          'Denise is currently in her fourth year of RV-ing eight months a year with her 5-year-old Goldendoodle, Ollie, with a home base in Austin, TX. She describes her decision to jump off the hamster wheel as choosing to work surrounded by mountains, ocean, lakes and sunshine.',
          'She is the author of Prosperity Pals, a children\'s financial literacy book, and Training Active Dogs, based on her experiences with Ollie — with a third book in the works.',
        ],
      },
    ],
    credentials: [
      'Over 16 years experience in infinite banking policy design',
      'Notable Member of the American Business Women\'s Association',
      'Completed the Pan Mass (200 Mile) Bike Challenge at age 50',
    ],
    testimonials: [
      {
        quote:
          'Great Experience with Denise Boisvert - I had (and continue to have) a great experience working with Denise Boisvert. She recently helped me complete the 1035 exchange process.',
      },
      {
        quote:
          'Great Communication, Service and Product - Denise is extremely helpful in my selection of the insurance policy. Highly recommended.',
      },
      {
        quote:
          'Denise Boisvert was such a professional. She has explained clearly to us all available options.',
      },
      {
        quote:
          'Amazing experience with Denise Boisvert! She was very informative and made the process of applying very easy.',
      },
      {
        quote:
          'Denise was great and set us up with a great policy. She took the time to listen and answer all questions.',
        attribution: 'A. Smith',
      },
    ],
    schedulerUrl:
      'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/deniseboisvert',
    email: 'denise@insuranceandestates.com',
    // FILL IN: linkedinUrl (via /admin or here)
    yearsExperience: '22+ years',
    licenses: ['Licensed producer in all 50 states + DC'],
    publications: [
      {
        source: 'Book',
        title: 'Designing a DEBT-FREE LIFE',
        href: 'https://debtfreeibc.insuranceandestates.com/2025-5884',
      },
      { source: 'Book', title: "Prosperity Pals — children's financial literacy" },
      { source: 'Book', title: 'Training Active Dogs' },
    ],
    book: {
      eyebrow: "Denise's latest book",
      title: 'Designing a DEBT-FREE LIFE',
      text: 'How to Use High Cash Value Life Insurance and the Infinite Banking Concept as a Tax-Free Strategy for Financial Freedom.',
      href: 'https://debtfreeibc.insuranceandestates.com/2025-5884',
    },
  },
};
