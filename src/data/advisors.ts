import type { AdvisorProfile, RecentArticle } from '../app/proclientguide/ProfileLayout';

/* Live renders the identical eight-card "Recent Articles" grid at the bottom of
   steve, denise, jasonh and jasonk. Titles, targets, thumbnails and alt text are
   taken verbatim from the capture; every image is localized under
   public/wp-content/uploads/. Barry's page is on the newer template and carries
   its own two-card set, so it is deliberately not sharing this list. */
const legacyRecentArticles: RecentArticle[] = [
  {
    title: 'Preparing Heirs: Why Formation Matters More Than Financial Literacy',
    href: '/preparing-heirs/',
    image: {
      src: '/wp-content/uploads/Preparing-Heirs-for-Generational-Wealth-150x150.webp',
      alt: "Why Financial Literacy Isn't the Answer",
    },
  },
  {
    title:
      'How to Keep Family Land in the Family: The 8 Threats and the Plan That Actually Works',
    href: '/keep-family-land/',
    image: {
      src: '/wp-content/uploads/How-to-Keep-Family-Land-in-the-Family-150x150.webp',
      alt: 'Three generations of a family farming together representing how to keep family land in the family across generations',
    },
  },
  {
    title: 'The 401k Is Not an Investment. It Is Price Support.',
    href: '/401k-worldview/',
    image: {
      src: '/wp-content/uploads/401k-Not-An-Investment-1-1-150x150.webp',
      alt: '401k Not An Investment',
    },
  },
  {
    title: 'The Family Bank: What Most Generational Wealth Strategies Are Missing',
    href: '/family-bank/',
    image: {
      src: '/wp-content/uploads/Family-Trust-Benefits-150x100.jpg',
      alt: 'Family Bank Benefits',
    },
  },
  {
    title: 'Whole Life Insurance for Retirement: How to Create Tax-Free Income for Life',
    href: '/whole-life-insurance-retirement/',
    image: {
      src: '/wp-content/uploads/whole-life-insurance-retirement-1-150x150.webp',
      alt: 'Chart showing how a $30,000 annual whole life insurance premium over 25 years generates $110,000 per year in tax-free retirement income — $750K in, $2.3M out',
    },
  },
  {
    title: 'The Asset Class Nobody Told You About (And Why Banks Hold $205 Billion of It)',
    href: '/asset-classes/',
    image: {
      src: '/wp-content/uploads/asset-classes-150x150.webp',
      alt: 'Eight major asset classes compared including stocks, bonds, real estate, business, gold, oil and gas, and cash value life insurance',
    },
  },
  {
    title: 'Cash Value Life Insurance: How It Works, How It Grows, and How to Access It',
    href: '/cash-value-life-insurance/',
    image: {
      src: '/wp-content/uploads/cash-value-life-insurance-2-150x150.webp',
      alt: 'Cash value life insurance guide by Insurance and Estates — how cash value works, grows, and how to access it',
    },
  },
  {
    title: 'Infinite Banking Concept: How It Works and Why It Changes Everything',
    href: '/infinite-banking/',
    image: {
      src: '/wp-content/uploads/Infinite-Banking-3-150x113.jpg',
      alt: 'Infinite Banking Concept — how dividend-paying whole life insurance works as a personal banking system',
    },
  },
];

/* NOT BUILT — deliberate. Live renders a "<Name>'s Top Webinars" band on all
   four legacy pages, but the section contains nothing except that heading (one
   block in the capture, no videos, no links). Building it would add an empty
   band, so the section is omitted until live has content in it. */

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
    /* Bio reproduced verbatim from the live capture (paragraph breaks and
       headings follow live). Live's bio carries no inline text links — its only
       anchor is the AEP® badge image below, which links to NAEPC. */
    bioSections: [
      {
        heading: 'Background',
        wide: true,
        paragraphs: [
          'During his early years, Steve’s involvements unfolded to include small business startups, real estate development, trust and estate planning law, and asset protection. Notably, in 2008, Steve launched a FL trusts and estates law practice which he operated until 2023.',
          'He has earned legal licenses and earned various accreditations in CA, FL and MN Steve’s legal practice over 15 years connected him with thousands of people and landed him in countless meetings with both wealthy and average people alike. These experiences acclimated Steve to a full gamut of estate planning, asset protection, real estate, small business, wealth transfer and a myriad of other concerns.',
          'In 2018, Steve and an attorney-colleague set out to revolutionize the permanent life insurance sector, co-founding I&E with a singular mission to create the top platform on the web promoting cash value life insurance and other permanent products in powerful ways. Out of the gate, Steve became a top producing agent and Penn Mutual recognized him as among their top rising stars in 2021, having earned the prestigious Century Club award. Since that time, I&E has attracted some of the top experts in the industry, allowing Steve to segue into his current coaching and training role.',
        ],
      },
      {
        heading: 'Philosophy and Approach',
        paragraphs: [
          'Steve’s knowledge base brings together multiple unique disciplines, drawing from both his legal experience and his “hands on” involvements in various business sectors such as real estate development, business startups and exit strategies.',
          'Steve believes that most “enterprising” people operate with the offense calling all the plays defense lingering in the background, if even on the field. He also sees that modern estate planning is in trouble because it leaves many critical questions unanswered.',
          'So he prioritizes:',
        ],
        bullets: [
          'Helping clients understand the need for a well thought out defensive plan',
          'Addressing preventative gaps that almost all typical experts miss or ignore completely',
          'Partnering with the best companies offering both protection and leverage',
          'Promoting communication, legacy and charitable goals for families',
          'Encouraging true wealth building approach that avoid unwarranted risks',
        ],
      },
      {
        heading: 'Current Focus',
        paragraphs: [
          'Steve’s passion is bringing his unique depth of experience to coaching families in legacy preservation and wealth transfer concerns that often extend way beyond the documents. Steve was recently recognized for his contributions and 15+ years of experience and awarded the AEP® Certification *.',
          '* The AEP® designation is a graduate-level specialization designed to recognize educated, knowledgeable, experienced, and ethical professionals within the multi-disciplinary profession of estate planning. This designation embodies the ever-important values of NAEPC and the estate planning councils from across the country; collaboration; education; and the cultivation of multi-disciplinary relationships.',
        ],
        /* Live wraps this badge in the NAEPC designation link — the page's only
           outbound credential anchor. */
        image: {
          src: '/wp-content/uploads/image-10.webp',
          alt: 'AEP',
          width: 388,
          height: 200,
          href: 'https://www.naepc.org/designations/estate-planners',
        },
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
    /* Live repeats this single review five times — one card, not five. */
    testimonials: [
      {
        title: 'Thank You Steve!',
        quote:
          'When I heard about Being your own bank, Infinite Banking and the other terms used for this service I was intrigued. I watched Steve’s videos, did some research and was really excited to learn more. I’m so glad I did! This is one of the most important and useful tools we have to secure our money, leverage it and gain independence from the traditional banks, lenders and accounts.',
      },
    ],
    recentArticles: legacyRecentArticles,
    schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/stevegibbs',
    email: 'steve@insuranceandestates.com',
    // FILL IN: linkedinUrl (via /admin or here)
    /* Live's only experience claim: "recognized for his contributions and 15+
       years of experience". The previous "Since 2008" implied an unbroken run
       to today, but live says the 2008 law practice ran until 2023. */
    yearsExperience: '15+ years',
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
    // Live subtitle really does read "Practioner" (missing 't') — verbatim, do not fix.
    subtitle: 'Infinite Banking Practioner & Real Estate Strategist',
    intro:
      'Barry Brooksby is our resident Infinite Banking Practitioner and Real Estate Strategist. He has been helping clients take control of their wealth for over 25 years and offers clients an extensive background in large scale real estate investing and financial services.',
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
    achievements: {
      intro:
        "From teaching and financial services to managing large-scale real estate investments, Barry's journey has been driven by one goal: helping families achieve financial control and generational wealth.",
      items: [
        'Awarded Top Performer for several Top Mutual WL Companies',
        'Authorized Nelson Nash Infinite Banking Practitioner',
        'Author of several books on infinite banking and creating tax free income',
        'Creator of the Amazing Life Agent program',
        'Featured on several national podcasts',
      ],
    },
    bioSections: [
      {
        heading: 'Background and Expertise',
        wide: true,
        paragraphs: [
          'Nearly thirty years ago, Barry was the Director of the Guitar Education Program at Southern Utah University. His summers would slow down with the university schedule, and he was looking for more ways to help people and create additional income. A friend, who was a traditional financial advisor, introduced Barry to financial services.',
          /* Inline links below are live's own anchors — dropping them loses content. */
          [
            'Finances and investing resonated with Barry because he’d grown up in a household watching his parents, who were real estate investors, making very financially savvy decisions. So, he learned about ',
            {
              text: 'real estate flips and buy and hold strategies',
              href: '/using-life-insurance-to-buy-real-estate/',
            },
            ' at a young age and it wasn’t a stretch for Barry to dive into serving as a financial advisor.',
          ],
          'It didn’t take long before Barry was working regularly with clients, setting up IRAs, mutual funds and variable life products. But within a year or two, these financial clients began approaching him and asking, “Why am I not making money?”, “Why am I losing money?”, “Where are the great returns we thought we’d get?”. He approached his mentor in financial services who told Barry to tell clients, “They’re in it for the long haul”. This didn’t sit well with Barry and he began to lose sleep at night over the shortcomings of the conventional planning options he’d been trained to provide.',
          'Barry began to look for solutions and more solid investments. He became actively involved in large scale real estate ventures, co-founding a “trust-deed” investment company in Las Vegas and ultimately managing a portfolio in excess of 100 million dollars.',
          'In those days, Barry’s “trust-deed” investor clients were getting an average of 12% returns on their loan proceeds. But, that boom didn’t last long and in 2008-2009, Las Vegas was among the worst impacted by the housing market crash. Barry quickly pivoted into buying foreclosures, but not without a few battle scars. As he recovered, Barry was involved in many rehabs and flips during those “down market” years.',
          [
            'In 2010, Barry and a colleague started a whole life insurance business, which was mainstream in nature, offering products and solutions that were designed toward goals like estate planning. But his clients started asking Barry about Nelson Nash and a concept called “',
            {
              text: 'infinite banking',
              href: '/pros-and-cons-of-the-infinite-banking-concept/',
            },
            '”.',
          ],
          [
            'Barry was intrigued and as he looked into ',
            { text: 'Nash’s teaching', href: '/nelson-nash/' },
            ', something clicked as he realized that this was an approach he could use for real estate investing that could deliver no lost opportunity costs for his money.',
          ],
          'More specifically, Barry discovered that he could take the same money that he’d previously been investing in real estate and have it working in 2 places at the same time, both in his policy and his investments.',
          'Barry’s knowledge and prior experiences taught him that the wealthy leverage their assets and this fueled his belief and exploration into Nash’s concept. Eventually, he knew he’d found a new and better financial vehicle for helping people leverage their own money and since that time, Barry has never looked back.',
          [
            'Barry is a big believer in aggressively funding the cash value inside of policies – even at the expense of reduced commissions. He often debates others in the industry on this issue of ',
            {
              text: 'dividend paying whole life policy design',
              href: '/top-10-best-dividend-paying-whole-life-insurance-companies/',
            },
            ' and has held fast to his findings that aggressive cash value funding and term blending will deliver the best overall outcome for almost all clients.',
          ],
          'Barry’s sole focus remains giving clients the “best of the best” policy to suit their goals.',
        ],
      },
      {
        heading: 'Philosophy',
        paragraphs: [
          'Barry has built his expertise and career on always doing what is best for the client. He is a person of strong faith in God, and his moral compass has guided Barry throughout his financial coaching journey.',
          'Barry believes that people need to be in control of their money and that most people are led to relinquish that control to others. While he believes a team of experts is necessary, giving up total control to other “advisors” is unwise and makes others wealthy.',
          'So he prioritizes:',
        ],
        bullets: [
          'Delivering the right policy, proper strategy and clear training to empower every client to take control of his/her finances',
          'Vetting and updating best companies regularly to assure that clients are set up for success',
        ],
      },
      {
        heading: 'Current Focus',
        paragraphs: [],
        bullets: [
          'Creating amazing education programs and content to help consumers understand the benefits of properly designed whole life',
          'Giving clients the best chance at a better future through advantages like tax free retirement income',
        ],
      },
      {
        heading: 'Unique Perspective',
        paragraphs: [
          'Barry believes in relieving suffering by giving people a financial alternative that offers control and peace of mind. Barry also advocates the power of shifting your mindset, when faced with confounding problems or patterns that simply aren’t working whether mental, physical, emotional or spiritual.',
          'In his life endeavor of educating people in proper financial principles, Barry is relentless because he sees this as a spiritual endeavor. In Barry’s words, all truth, including financial truth is spiritual truth. He sees that people need a proper, secure foundation in financial wisdom and planning.',
        ],
      },
    ],
    expertiseAreas: [
      {
        title: 'Infinite Banking',
        text: 'Become your own banker and create tax-advantaged wealth that lasts for generations.',
      },
      {
        // Live really does read "assests" — verbatim, do not fix.
        title: 'Wealth Protection',
        text: 'Protect your assests and create financial certainty for you and your loved ones.',
      },
      {
        title: 'Real Estate Investing',
        text: 'Proven strategies for acquiring, funding and growing real estate investments.',
      },
      {
        title: 'Estate & Legacy Planning',
        text: 'Leave a lasting legacy with strategies that reduce taxes and preserve wealth',
      },
    ],
    /* FAQ intentionally UNSET. The live page shows five questions, but every
       answer is still the client's placeholder "Insert anser to this question
       here." Pending real answers from the client:
         1. What is Infinite Banking?
         2. How does Infinite Banking work with whole life insurance?
         3. Is Infinite Banking right for everyone?
         4. How can Infinite Banking help real estate investors?
         5. How do I get started with Barry?
       Fill `faq` (or the /admin override) once the client supplies them. */
    credentials: [
      'Awarded Top Performer for several Top Mutual WL Companies',
      'Authorized Nelson Nash Infinite Banking Practitioner',
      'Author of several books on infinite banking and creating tax free income',
      'Creator of the Amazing Life Agent program',
      'Featured on several national podcasts',
    ],
    testimonials: [
      {
        title: 'Barry is simply the best…',
        quote:
          'Barry is one of the best insurance agents by far. He is so professional and very knowledgeable – an expert. Barry has helped me and my husband with all our insurance needs. I trust him and he truly has become a part of my family and would definitely recommend him to anyone. Keep up the…',
      },
      {
        title: 'Barry and his team are fantastic!',
        quote:
          'Barry and his team are fantastic. Barry is incredibly knowledgeable in all things insurance, and walked me through the process step by step and was very patient. Would highly recommend!!',
      },
      {
        title: 'Perfect for business owners',
        quote:
          'Barry has expertise needed for business owners and found the best solutions for my situation. Professional and efficient.',
        attribution: 'Jerry M',
      },
      {
        title: 'I finally understand what it means to Be your own bank',
        quote:
          'When I heard about Being your own bank, Infinite Banking and the other terms used for this service I was intrigued. I watched Barry Brooksby’s videos, did some research and was really excited to learn more. Since most of us don’t know but about it there was skepticism from friends and family but with Barry’s…',
      },
      {
        title: 'The Best…',
        quote:
          'Barry is hands down the best advisor in whole life insurance and provides unbiased advice for whole life insurance policies for Cash Value life insurance for IBC or infinite banking. He’s equally intelligible about creating a trust to protect your family and legacy. He’s someone that genuinely cares about protecting my family’s future and legacy…',
      },
      {
        title: 'The Best!!!',
        quote:
          'Barry and his team are not only very knowledgeable, they are also attentive, responsive and very transparent in their dealings. I’m very satisfied with their communication, professionalism and overall service provided.',
      },
    ],
    schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/barrybrooksby',
    email: 'barry@insuranceandestates.com',
    linkedinUrl: 'https://www.linkedin.com/in/barrybrooksby/',
    youtubeUrl: 'https://www.youtube.com/@wealthoptimized',
    storyVideoUrl: 'https://www.youtube.com/watch?v=7xGv9_WNtmg&t=1664s',
    sameAs: ['https://www.youtube.com/@wealthoptimized'],
    // FILL IN: licenses (via /admin or here)
    /* Live's claim about client experience: "has been helping clients take
       control of their wealth for over 25 years". The old "30+ years" was not
       traceable to live — the "Nearly thirty years ago" in the Background
       narrative dates his university guitar program, not client work. */
    yearsExperience: '25+ years',
    publications: [
      {
        source: 'Book',
        title: 'Live Rich, Die Rich',
        href: 'https://lrdr.insuranceandestates.com/live-rich-die-rich-2025',
      },
    ],
    recentArticles: [
      {
        title: 'Comprehensive Guide to Life Insurance for High Net Worth Families',
        href: '/high-net-worth-life-insurance/',
      },
      {
        title: 'Infinite Banking with Indexed Universal Life Insurance for Early Cash Value',
        href: '/infinite-banking-indexed-universal-life/',
      },
    ],
    book: {
      eyebrow: "Barry's latest book",
      title: 'Live Rich, Die Rich',
      text: 'How to Use High Cash Value Life Insurance and the Infinite Banking Concept as a Tax-Free Strategy to Supercharge Your Wealth.',
      href: 'https://lrdr.insuranceandestates.com/live-rich-die-rich-2025',
      image: { src: '/wp-content/uploads/live_rich_die_rich2-160x200.webp', alt: 'Live rich die rich2' },
    },
  },
  jasonh: {
    slug: 'jasonh',
    /* Live's eyebrow is "Pro Client Guide"; "Overfunded Life Specialist" is the
       heading directly under the name. */
    role: 'Pro Client Guide',
    subtitle: 'Overfunded Life Specialist',
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
    /* Bio reproduced verbatim from the live capture, including the seven inline
       anchors live places mid-sentence. Internal targets are root-relative. */
    bioSections: [
      {
        heading: 'Why Jason',
        wide: true,
        paragraphs: [
          [
            'Most agents live in one camp. They’re either whole life guys or IUL guys. Jason has sat in over 400 meetings ',
            {
              text: 'designing IUL',
              href: '/indexed-universal-life-iul-insurance/',
            },
            ' and annuity-based retirement strategies for advisors and their clients. He knows the mechanics, the caps, the floors, the policy charges, and the fine print most agents gloss over.',
          ],
          [
            'But Jason also discovered something along the way: ',
            {
              text: 'whole life insurance',
              href: '/top-10-best-dividend-paying-whole-life-insurance-companies/',
            },
            ', when properly structured and overfunded, does things that universal life products simply cannot replicate — particularly when used as infrastructure for banking, cash flow, and generational wealth transfer.',
          ],
          'So now Jason does what almost nobody in the industry does. He sits across from a client, illustrates both policies side by side, and walks through the honest pros and cons of each — so the client can make a truly informed decision based on what they actually want to accomplish.',
          'No pitch. No agenda. Just deep clarity on which overfunded life policy is best suited for his client.',
        ],
      },
      {
        heading: 'Background',
        wide: true,
        paragraphs: [
          'Jason started in pharmaceutical sales, spending a decade working alongside doctors and their staffs. When industry changes prompted a career shift, a friend suggested he’d be a natural fit in life insurance.',
          'Two early experiences cemented his conviction. The father of Jason’s childhood friend passed away in his armchair one night — covered by nothing more than a $50,000 work policy. Shortly after entering the industry, Jason heard about a man in his mid-30s who died suddenly with only 1.5x salary coverage from his employer plan.',
          'Those stories never left him.',
          [
            'Jason launched his insurance career as a wholesaler with Hartford, building deep expertise in retirement income distribution strategies. When Hartford sold its life division in 2012, Prudential acquired the business and Jason transitioned into educating Prudential advisors and their clients on comprehensive income strategies — everything from simple protection plans to advanced ',
            { text: 'LIRP', href: '/lirp/' },
            ' distribution approaches.',
          ],
          'After years of expanding territory and influence, Jason wanted to get closer to the client. He stepped away from the wholesaler role, started working directly with consumers, and joined Insurance & Estate Strategies in 2017. He’s been instrumental in shaping the firm’s values, knowledge base, and expertise ever since.',
        ],
      },
      {
        heading: 'What Jason Specializes In',
        wide: true,
        paragraphs: [
          [
            'Jason designs ',
            {
              text: 'overfunded life insurance strategies',
              href: '/overfunded-life-insurance/',
            },
            ' built around what the client actually needs — not what pays the highest commission. His expertise spans the full spectrum of cash value life insurance:',
          ],
        ],
        bullets: [
          [
            {
              text: 'Indexed Universal Life (IUL)',
              href: '/indexed-universal-life-iul-insurance/',
            },
            ': Market-linked growth with downside protection, cap rate optimization, and income distribution design',
          ],
          [
            {
              text: 'Dividend-Paying Whole Life',
              href: '/top-10-best-dividend-paying-whole-life-insurance-companies/',
            },
            ': Guaranteed cash value growth, infinite banking structure, and generational wealth transfer',
          ],
          [
            { text: 'Side-by-Side Policy Comparison', bold: true },
            ': Honest illustration of both product types so clients see exactly what they’re getting',
          ],
          [
            { text: 'Retirement Income Distribution', bold: true },
            ': ',
            { text: 'LIRP strategies', href: '/lirp/' },
            ', guaranteed income, and tax-efficient withdrawal design',
          ],
          [
            { text: 'Estate Planning & Wealth Transfer', bold: true },
            ': Protection strategies most financial advisors overlook entirely',
          ],
        ],
      },
      {
        heading: 'Philosophy',
        paragraphs: [
          'Jason believes overfunded life insurance in the client’s best interest is always the right move — whether that’s whole life, IUL, or a combination. He’ll cost himself a sale before he’ll put a client in the wrong product.',
          'He also believes most people protect everything in their lives except what matters most. His job is to fix that.',
        ],
      },
      {
        heading: 'Personal',
        paragraphs: [
          'Jason has been married 25 years, has three daughters who keep him busy, and lives in Nashville with their dog Sadie. He prioritizes family time, schedules regular vacations, and spends time on mission trips putting his faith into action.',
        ],
      },
    ],
    credentials: [
      'Prudential Pinnacle Award recipient, 2014 and 2015',
      'Series 6, 63, and 65',
      'Licensed producer in all 50 states and DC',
      'Instructor with AFES (Adult Financial Education Services)',
      'National Association of Fixed Annuities (NAFA)',
      '16 years of experience across IULs, whole life, annuities, and advanced cash value strategies',
    ],
    testimonials: [
      {
        title: 'Excellent help, gave detailed explanation',
        quote:
          'Jason was very patient with all my questions (despite asking the same questions over and over!) and gave detailed explanation of everything he was sharing with me. He explained the whole process to me and simplified it for me to understand what I was signing up for. He was also very responsive via email and texts. Thank you.',
        attribution: 'Mrinalini',
      },
      {
        title: 'Great advice, great service, great experience',
        quote:
          'Jason was extremely helpful walking me through my options. He was quick to respond, very detailed and overall amazing to work with. I’m very pleased with the experience and happy to have my policy set up.',
        attribution: 'David',
      },
      {
        title: 'This was an amazing experience…',
        quote:
          'This was an amazing experience, when I first contacted Insurance and Estates, I barely knew anything about life insurance. Jason was very patient, informative and, clear in how he quickly educated me to make intelligent decisions on my financial future. I would definitely recommend Insurance and Estates to anyone.',
      },
      {
        title: 'Jason helped me with a whole life…',
        quote:
          'Jason helped me with a whole life policy, protecting my daughter as well as go through the process without disrupting my over the road work as a trucker. Some times as a trucker it’s hard to get on site medical while going state to state, as a non smoker I qualified, Jason is awesome',
      },
    ],
    recentArticles: legacyRecentArticles,
    schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/jasonherring',
    email: 'jason@insuranceandestates.com',
    // FILL IN: linkedinUrl (via /admin or here)
    /* Live: "has spent 16 years in life insurance and financial services" and
       "16 years of experience across IULs…". The trailing "+" was ours. */
    yearsExperience: '16 years',
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
    /* Live runs the bio as one block split by <br><br>; reproduced verbatim
       under a single heading, with live's inline "Volume-Based Banking" anchor
       restored. */
    bioSections: [
      {
        heading: 'Background',
        wide: true,
        paragraphs: [
          "He's the co-founder and CEO of Insurance & Estate Strategies, one of the most widely read independent education platforms in the life insurance and wealth strategy space. Before that he built and sold TermLife2Go — an earlier digital insurance platform — giving him a track record most advisors never achieve once, let alone twice.",
          [
            "Jason holds a JD from University of San Diego School of Law, has been licensed in life insurance since 2010, and holds a Master's in Business Leadership. But his real credential is the ",
            { text: 'Volume-Based Banking', href: '/volume-based-banking/' },
            ' methodology he developed — a framework that reframes whole life insurance not as a savings vehicle but as financial infrastructure, helping families build banking systems that compound across generations.',
          ],
          'His work sits at the intersection of Austrian economics, estate planning, and contrarian financial strategy. He writes, teaches, and now creates video content for people who sense something is deeply wrong with conventional financial advice — and are looking for the exit.',
        ],
      },
    ],
    credentials: [
      'JD, University of San Diego School of Law',
      'Life insurance licensed since 2010',
      "Master's in Business Leadership",
      'Developed the Volume-Based Banking methodology',
    ],
    testimonials: [
      {
        title: 'Excellent help, gave detailed explanation',
        quote:
          'Jason was very patient with all my questions (despite asking the same questions over and over!) and gave detailed explanation of everything he was sharing with me. He explained the whole process to me and simplified it for me to understand what I was signing up for. He was also very responsive via email and texts. Thank you.',
        attribution: 'Mrinalini',
      },
      {
        title: 'Great advice, great service, great experience',
        quote:
          'Jason was extremely helpful walking me through my options. He was quick to respond, very detailed and overall amazing to work with. I’m very pleased with the experience and happy to have my policy set up.',
        attribution: 'David',
      },
      {
        title: 'This was an amazing experience…',
        quote:
          'This was an amazing experience, when I first contacted Insurance and Estates, I barely knew anything about life insurance. Jason was very patient, informative and, clear in how he quickly educated me to make intelligent decisions on my financial future. I would definitely recommend Insurance and Estates to anyone.',
      },
      {
        title: 'Jason helped me with a whole life…',
        quote:
          'Jason helped me with a whole life policy, protecting my daughter as well as go through the process without disrupting my over the road work as a trucker. Some times as a trucker it’s hard to get on site medical while going state to state, as a non smoker I qualified, Jason is awesome',
      },
    ],
    recentArticles: legacyRecentArticles,
    // FOLLOW-UP: no booking widget or direct email surfaced on the live page — add if one exists.
    // FILL IN: linkedinUrl (via /admin or here)
    /* Live: "Jason Kenyon spent 20 years watching the conventional financial
       system fail…". The trailing "+" was ours. */
    yearsExperience: '20 years',
    licenses: ['Life insurance licensed since 2010'],
    education: ['JD, University of San Diego School of Law', "Master's in Business Leadership"],
  },
  denise: {
    slug: 'denise',
    role: 'Pro Client Guide',
    name: 'Denise Boisvert',
    firstName: 'Denise',
    /* Verbatim from live's hero paragraph. Note live contradicts itself on the
       year count: the hero says "15 years", the bio body below says "22 years".
       Both are reproduced as live has them; flagged for the client to resolve. */
    intro:
      'Denise Boisvert, Pro Client Guide, has 15 years of experience in the life industry. She specializes in educating clients on strategic ways to leverage life insurance to get out of debt, provide family protection, as well as maximize cash value accumulation to allow for self-funding opportunities, and tax-free lifetime income streams. She is dedicated to matching top-rated carriers and products to client’s goals and objectives. As an out-of-the-box thinker, she designs cases that are easily understood and easily executed by the client.',
    photo: {
      src: '/wp-content/uploads/Denise-1.webp',
      alt: 'Denise Boisvert',
    },
    initials: 'DB',
    specialties: [
      'Life Insurance',
      'Annuities',
      'Infinite Banking Concept (IBC)',
      'Life Insurance Retirement Planning (Social Security)',
      'College Funding',
    ],
    /* COPY FIX (2026-07-21): "Background and Expertise" had been rewritten —
       nine live sentences compressed into three — and "Unique Perspective" was
       partly dropped. Both are now reproduced verbatim from the live capture,
       with live's own headings. Live's bio has no inline text links. */
    bioSections: [
      {
        heading: 'Background and Expertise',
        wide: true,
        paragraphs: [
          'Denise Boisvert, Pro Client Guide, has 22 years of experience in the life industry.',
          'Denise’s unique journey began as a Human Resources professional in corporate America working with some interesting companies such as Yomega Yo Yo’s and Speidel Textron. After enjoying attending trade shows for “yo-yo’s with a brain” and watch-bands for a few years, Denise came to a crossroads due to a layoff in 2003.',
          'After some soul searching, Denise spent some time in long term care planning, before discovering her true calling.',
          'She describes “finding her path” as one of “helping people secure their futures”.',
          'In this mission, Denise prioritizes providing people with financial and protection strategies that do not encourage risk. She is passionate about helping people control their own destiny just as she learned to do many years ago.',
          'Denise is a licensed producer in all 50 states and DC and appointed with the top carriers in her specialty areas.',
        ],
      },
      {
        heading: 'Philosophy and Approach',
        paragraphs: [],
        bullets: [
          'Putting the client’s best interests and goals first',
          'Partnering with top mutual companies that have high Comdex (Financial Strength) scores',
          'Designing policies that maximize benefits for the client’s strategic goals',
        ],
      },
      {
        heading: 'Current Focus',
        paragraphs: [
          'Educating clients on strategic ways to leverage properly designed, cash value whole life insurance for:',
        ],
        bullets: [
          'Supporting small business operation and growth',
          'Recapturing debt',
          'Providing family legacy protection',
          'Maximizing cash value accumulation to allow for tax free retirement, leveraging social security or college funding',
        ],
      },
      {
        heading: 'Unique Perspective',
        wide: true,
        paragraphs: [
          'Denise is in her 4th year of RV-ing 8 months of the year with her trusted sidekick, 5 year old Goldendoodle, Ollie. Denise resides the other 4 months of the year in Austin TX, which is her home base. She describes her decision to “jump off the hamster wheel” when she decided she could “work surrounded by mountains, ocean, lakes and sunshine”. She now follows the nice weather and pursues a balanced life of work and adventure.',
          'Denise has also written 2 books and is currently working on a third. Prosperity Pals was written to educate children on the importance of money management at an early age. She also wrote a book called “Training Active Dogs” based on her experiences with Ollie.',
          'Denise’s is committed to helping her clients pursue sound wealth building and protection strategies that will afford the same opportunities that she’s been able to achieve in her own life.',
        ],
      },
    ],
    credentials: [
      'Over 16 years experience in infinite banking policy design',
      'Notable Member of the American Business Women\'s Association',
      'Completed the Pan Mass (200 Mile) Bike Challenge at age 50',
    ],
    /* Review bodies were previously truncated; restored verbatim from live,
       with live's review headlines as titles. */
    testimonials: [
      {
        title: 'Amazing experience with Denise Boisvert!',
        quote:
          'I had an amazing experience with Denise Boisvert! She was very informative and made the process of applying very easy and straightforward. Thank you Denise!',
      },
      {
        title: 'Denise was great and set us up with a great policy',
        quote:
          'Denise was great and set us up with a great policy. She took the time to listen and answer all questions. I’m glad I found them!',
        attribution: 'A. Smith',
      },
      {
        title: 'Great Experience with Denise Boisvert',
        quote:
          'I had (and continue to have) a great experience working with Denise Boisvert. She recently helped me complete the 1035 exchange process for an existing IBC-based whole life insurance policy that I have.',
      },
      {
        title: 'Great Communication, Service and Product',
        quote:
          'Denise is extremely helpful in my selection of the insurance policy. She set up a time with me to explain the different options of the insurance, and the feature of the policies. I feel like she really listen to my needs and found a policy that fit my request. She is also good at communicating and responding to my questions in a timely manner. She is also very willing to run the illustration in many ways to help me make the discussion. Highly recommended.',
      },
      {
        title: 'Denise Boisvert was such a…',
        quote:
          'Denise Boisvert was such a professional. She has explained clearly to us all available options and answered all of our questions and we learned so much in the process. Thank You so much Denise!!!',
      },
    ],
    recentArticles: legacyRecentArticles,
    schedulerUrl:
      'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/deniseboisvert',
    email: 'denise@insuranceandestates.com',
    // FILL IN: linkedinUrl (via /admin or here)
    /* Live's hero says "15 years of experience in the life industry"; the bio
       body says "22 years". The stat follows the hero (as Barry's does); both
       figures appear on our page exactly as they do on live. */
    yearsExperience: '15 years',
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
      eyebrow: "Denise's Latest Book",
      title: 'Designing a DEBT-FREE LIFE',
      text: 'How to Use High Cash Value Life Insurance and the Infinite Banking Concept as a Tax-Free Strategy for Financial Freedom',
      href: 'https://debtfreeibc.insuranceandestates.com/2025-5884',
      image: { src: '/wp-content/uploads/denise_book-136x200.webp', alt: 'Denise book' },
    },
  },
};
