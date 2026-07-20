import type { AdvisorProfile, ArticleCard } from '../app/proclientguide/ProfileLayout';

/* The "Recent Articles" grid shared by every profile except Barry's, verbatim
   from the live pages. Thumbnails are localized under public/wp-content. */
const sharedArticles: ArticleCard[] = [
  {
    href: '/preparing-heirs/',
    img: '/wp-content/uploads/Preparing-Heirs-for-Generational-Wealth-150x150.webp',
    alt: "Why Financial Literacy Isn't the Answer",
    title: 'Preparing Heirs: Why Formation Matters More Than Financial Literacy',
  },
  {
    href: '/keep-family-land/',
    img: '/wp-content/uploads/How-to-Keep-Family-Land-in-the-Family-150x150.webp',
    alt: 'Three generations of a family farming together representing how to keep family land in the family across generations',
    title: 'How to Keep Family Land in the Family: The 8 Threats and the Plan That Actually Works',
  },
  {
    href: '/401k-worldview/',
    img: '/wp-content/uploads/401k-Not-An-Investment-1-1-150x150.webp',
    alt: '401k Not An Investment',
    title: 'The 401k Is Not an Investment. It Is Price Support.',
  },
  {
    href: '/family-bank/',
    img: '/wp-content/uploads/Family-Trust-Benefits-150x100.jpg',
    alt: 'Family Bank Benefits',
    title: 'The Family Bank: What Most Generational Wealth Strategies Are Missing',
  },
  {
    href: '/whole-life-insurance-retirement/',
    img: '/wp-content/uploads/whole-life-insurance-retirement-1-150x150.webp',
    alt: 'Chart showing how a $30,000 annual whole life insurance premium over 25 years generates $110,000 per year in tax-free retirement income — $750K in, $2.3M out',
    title: 'Whole Life Insurance for Retirement: How to Create Tax-Free Income for Life',
  },
  {
    href: '/asset-classes/',
    img: '/wp-content/uploads/asset-classes-150x150.webp',
    alt: 'Eight major asset classes compared including stocks, bonds, real estate, business, gold, oil and gas, and cash value life insurance',
    title: 'The Asset Class Nobody Told You About (And Why Banks Hold $205 Billion of It)',
  },
  {
    href: '/cash-value-life-insurance/',
    img: '/wp-content/uploads/cash-value-life-insurance-2-150x150.webp',
    alt: 'Cash value life insurance guide by Insurance and Estates — how cash value works, grows, and how to access it',
    title: 'Cash Value Life Insurance: How It Works, How It Grows, and How to Access It',
  },
  {
    href: '/infinite-banking/',
    img: '/wp-content/uploads/Infinite-Banking-3-150x113.jpg',
    alt: 'Infinite Banking Concept — how dividend-paying whole life insurance works as a personal banking system',
    title: 'Infinite Banking Concept: How It Works and Why It Changes Everything',
  },
];

const HOURS = '10am-6:30pm ET (M-F)';
/** Eyebrow colour on the live pages */
const ACCENT_BLUE = '#98C4DF';
const ACCENT_CORAL = '#efc2bd';

export const advisorDefaults: Record<string, AdvisorProfile> = {
  steve: {
    slug: 'steve',
    role: 'Chief Strategic Partnerships Officer',
    name: 'Steve Gibbs, JD, AEP®',
    firstName: 'Steve',
    intro:
      'Steven Gibbs is the CSPO, Co-Owner and Co-Founder of Insurance and Estate Strategies LLC (I&E), having recently pivoted after serving as CEO since 2018, to focus on building external strategic partnerships, and serving as a coach and mentor for our growing community of partners, clients and experts.',
    photo: {
      src: '/wp-content/uploads/steven_gibbs-153x200.webp',
      alt: 'Steven Gibbs',
    },
    initials: 'SG',
    accent: ACCENT_BLUE,
    hours: HOURS,
    bio: [
      {
        t: 'p',
        runs: [
          'Steven Gibbs is the CSPO, Co-Owner and Co-Founder of Insurance and Estate Strategies LLC (I&E), having recently pivoted after serving as CEO since 2018, to focus on building external strategic partnerships, and serving as a coach and mentor for our growing community of partners, clients and experts.',
        ],
      },
      {
        t: 'p',
        runs: [
          'During his early years, Steve’s involvements unfolded to include  small business startups, real estate development, trust and estate planning law, and asset protection.  Notably, in 2008, Steve launched a FL trusts and estates law practice which he operated until 2023.',
        ],
      },
      {
        t: 'p',
        runs: [
          'He has earned legal licenses and earned various accreditations in CA, FL and MN Steve’s legal practice over 15 years connected him with thousands of people and landed him in countless meetings with both wealthy and average people alike.  These experiences acclimated Steve to a full gamut of estate planning, asset protection, real estate, small business, wealth transfer and a myriad of other concerns.',
        ],
      },
      {
        t: 'p',
        runs: [
          'In 2018, Steve and an attorney-colleague set out to revolutionize the permanent life insurance sector, co-founding I&E with a singular mission to create the top platform on the web promoting cash value life insurance and other permanent products in powerful ways. Out of the gate, Steve became a top producing agent and Penn Mutual recognized him as among their top rising stars in 2021, having earned the prestigious Century Club award. Since that time, I&E has attracted some of the top experts in the industry, allowing Steve to segue into his current coaching and training role.',
        ],
      },
      { t: 'h', text: 'Professional Achievements' },
      {
        t: 'ul',
        items: [
          ['AEP® Certification for Multi-Disciplinary Estate Planning Expertise, 2024'],
          ['Penn Mutual’s Century Club Award, 2021'],
          ['State Bar Admission in CA and FL'],
          ['Licensed Life & Annuity Producer in all 50 States and DC Since 2017'],
          ['Author of Several Books and Contributor to National Publications such as ThinkAdvisor'],
          ['NBI Presenter and Contributor'],
        ],
      },
      { t: 'h', text: 'Areas of Expertise' },
      {
        t: 'ul',
        items: [
          ['Wealth Transfer Coaching'],
          ['Estate Planning Coaching and Training'],
          ['Strategic Life Insurance Design'],
          ['Business Succession and Exit Strategies'],
        ],
      },
      {
        t: 'p',
        runs: [
          'Steve’s knowledge base brings together multiple unique disciplines, drawing from both his legal experience and his “hands on” involvements in various business sectors such as real estate development, business startups and exit strategies. ',
          { text: 'Philosophy and Approach', bold: true },
          ' Steve believes that most “enterprising” people operate with the offense calling all the plays defense lingering in the background, if even on the field. He also sees that modern estate planning is in trouble because it leaves many critical questions unanswered. ',
          { text: 'So he prioritizes:', bold: true },
        ],
      },
      {
        t: 'ul',
        items: [
          ['Helping clients understand the need for a well thought out defensive plan'],
          ['Addressing preventative gaps that almost all typical experts miss or ignore completely'],
          ['Partnering with the best companies offering both protection and leverage'],
          ['Promoting communication, legacy and charitable goals for families'],
          ['Encouraging true wealth building approach that avoid unwarranted risks'],
        ],
      },
      { t: 'h', text: 'Current Focus' },
      {
        t: 'p',
        runs: [
          'Steve’s passion is bringing his unique depth of experience to coaching families in legacy preservation and wealth transfer concerns that often extend way beyond the documents.  Steve was recently recognized for his contributions and 15+ years of experience and awarded the ',
          { text: 'AEP® Certification *.', bold: true },
        ],
      },
      /* MISSING ASSET: the live Accredited Estate Planner badge
         (wp-content/uploads/image-10.webp) is not in the localized image set. */
      {
        t: 'p',
        runs: [
          '* The AEP® designation is a graduate-level specialization designed to recognize educated, knowledgeable, experienced, and ethical professionals within the multi-disciplinary profession of estate planning. This designation embodies the ever-important values of NAEPC and the estate planning councils from across the country; collaboration; education; and the cultivation of multi-disciplinary relationships.',
        ],
      },
    ],
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
        heading: 'Thank You Steve!',
        quote:
          'When I heard about Being your own bank, Infinite Banking and the other terms used for this service I was intrigued. I watched Steve’s videos, did some research and was really excited to learn more. I’m so glad I did! This is one of the most important and useful tools we have to secure our money, leverage it and gain independence from the traditional banks, lenders and accounts.',
      },
    ],
    schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/stevegibbs',
    email: 'steve@insuranceandestates.com',
    webinarsHeading: "Steve's Top Webinars",
    articlesHeading: 'Recent Articles',
    articles: sharedArticles,
    // FILL IN: linkedinUrl (via /admin or here)
    yearsExperience: 'Since 2008',
    licenses: [
      'State Bar admission in CA and FL',
      'Licensed Life & Annuity Producer in all 50 states + DC',
    ],
    publications: [{ source: 'ThinkAdvisor', title: 'Contributor to national publications' }],
  },

  barry: {
    slug: 'barry',
    role: 'Pro Client Guide',
    name: 'Barry Brooksby',
    firstName: 'Barry',
    intro:
      'Barry Brooksby, Pro Client Guide, is our resident Infinite Banking Practitioner and Real Estate Strategist. He has been helping clients take control of their wealth for over 25 years and offers clients an extensive background in large scale real estate investing and financial services.',
    photo: {
      src: '/wp-content/uploads/Barry-1-2-163x200.webp',
      alt: 'Barry 1.webp',
    },
    initials: 'BB',
    accent: ACCENT_BLUE,
    hours: HOURS,
    topScheduleButton: true,
    bio: [
      {
        t: 'p',
        runs: [
          'Barry Brooksby, Pro Client Guide, is our resident Infinite Banking Practitioner and Real Estate Strategist. He has been helping clients take control of their wealth for over 25 years and offers clients an extensive background in large scale real estate investing and financial services.',
        ],
      },
      { t: 'h', text: 'Background and Expertise' },
      {
        t: 'p',
        runs: [
          'Nearly thirty years ago, Barry was the Director of the Guitar Education Program at Southern Utah University. His summers would slow down with the university schedule, and he was looking for more ways to help people and create additional income. A friend, who was a traditional financial advisor, introduced Barry to financial services.',
        ],
      },
      {
        t: 'p',
        runs: [
          'Finances and investing resonated with Barry because he’d grown up in a household watching his parents, who were real estate investors, making very financially savvy decisions. So, he learned about ',
          {
            text: 'real estate flips and buy and hold strategies',
            href: '/using-life-insurance-to-buy-real-estate/',
          },
          ' at a young age and it wasn’t a stretch for Barry to dive into serving as a financial advisor.',
        ],
      },
      {
        t: 'p',
        runs: [
          'It didn’t take long before Barry was working regularly with clients, setting up IRAs, mutual funds and variable life products. But within a year or two, these financial clients began approaching him and asking, “Why am I not making money?”, “Why am I losing money?”, “Where are the great returns we thought we’d get?”. He approached his mentor in financial services who told Barry to tell clients, “They’re in it for the long haul”. This didn’t sit well with Barry and he began to lose sleep at night over the shortcomings of the conventional planning options he’d been trained to provide.',
        ],
      },
      {
        t: 'p',
        runs: [
          'Barry began to look for solutions and more solid investments. He became actively involved in large scale real estate ventures, co-founding a “trust-deed” investment company in Las Vegas and ultimately managing a portfolio in excess of 100 million dollars.',
        ],
      },
      {
        t: 'p',
        runs: [
          'In those days, Barry’s “trust-deed” investor clients were getting an average of 12% returns on their loan proceeds. But, that boom didn’t last long and in 2008-2009, Las Vegas was among the worst impacted by the housing market crash. Barry quickly pivoted into buying foreclosures, but not without a few battle scars. As he recovered, Barry was involved in many rehabs and flips during those “down market” years.',
        ],
      },
      {
        t: 'p',
        runs: [
          'In 2010, Barry and a colleague started a whole life insurance business, which was mainstream in nature, offering products and solutions that were designed toward goals like estate planning. But his clients started asking Barry about Nelson Nash and a concept called “',
          { text: 'infinite banking', href: '/pros-and-cons-of-the-infinite-banking-concept/' },
          '”.',
        ],
      },
      {
        t: 'p',
        runs: [
          'Barry was intrigued and as he looked into ',
          { text: 'Nash’s teaching', href: '/nelson-nash/' },
          ', something clicked as he realized that this was an approach he could use for real estate investing that could deliver no lost opportunity costs for his money.',
        ],
      },
      {
        t: 'p',
        runs: [
          'More specifically, Barry discovered that he could take the same money that he’d previously been investing in real estate and have it working in 2 places at the same time, both in his policy and his investments.',
        ],
      },
      {
        t: 'p',
        runs: [
          'Barry’s knowledge and prior experiences taught him that the wealthy leverage their assets and this fueled his belief and exploration into Nash’s concept. Eventually, he knew he’d found a new and better financial vehicle for helping people leverage their own money and since that time, Barry has never looked back.',
        ],
      },
      {
        t: 'p',
        runs: [
          'Barry is a big believer in aggressively funding the cash value inside of policies – even at the expense of reduced commissions. He often debates others in the industry on this issue of ',
          {
            text: 'dividend paying whole life policy design',
            href: '/top-10-best-dividend-paying-whole-life-insurance-companies/',
          },
          ' and has held fast to his findings that aggressive cash value funding and term blending will deliver the best overall outcome for almost all clients.',
        ],
      },
      {
        t: 'p',
        runs: ['Barry’s sole focus remains giving clients the “best of the best” policy to suit their goals.'],
      },
      { t: 'h', text: 'Professional Achievements' },
      {
        t: 'ul',
        items: [
          ['Awarded Top Performer for several Top Mutual WL Companies'],
          ['Authorized Nelson Nash Infinite Banking Practitioner'],
          ['Author of several books on infinite banking and creating tax free income'],
          ['Creator of the Amazing Life Agent program'],
          ['Featured on several national podcasts'],
        ],
      },
      { t: 'h', text: 'Areas of Expertise' },
      {
        t: 'ul',
        items: [
          ['Real Estate Consulting'],
          ['Wealth Accumulation Mentorship'],
          ['Infinite Banking Coaching'],
          ['Agent Training'],
        ],
      },
      { t: 'h', text: 'Philosophy' },
      {
        t: 'p',
        runs: [
          'Barry has built his expertise and career on always doing what is best for the client. He is a person of strong faith in God, and his moral compass has guided Barry throughout his financial coaching journey.',
        ],
      },
      {
        t: 'p',
        runs: [
          'Barry believes that people need to be in control of their money and that most people are led to relinquish that control to others. While he believes a team of experts is necessary, giving up total control to other “advisors” is unwise and makes others wealthy.',
        ],
      },
      { t: 'h', text: 'So he prioritizes:' },
      {
        t: 'ul',
        items: [
          [
            'Delivering the right policy, proper strategy and clear training to empower every client to take control of his/her finances',
          ],
          ['Vetting and updating best companies regularly to assure that clients are set up for success'],
        ],
      },
      { t: 'h', text: 'Current Focus' },
      {
        t: 'ul',
        items: [
          [
            'Creating amazing education programs and content to help consumers understand the benefits of properly designed whole life',
          ],
          ['Giving clients the best chance at a better future through advantages like tax free retirement income'],
        ],
      },
      { t: 'h', text: 'Unique Perspective' },
      {
        t: 'p',
        runs: [
          'Barry believes in relieving suffering by giving people a financial alternative that offers control and peace of mind. Barry also advocates the power of shifting your mindset, when faced with confounding problems or patterns that simply aren’t working whether mental, physical, emotional or spiritual.',
        ],
      },
      {
        t: 'p',
        runs: [
          'In his life endeavor of educating people in proper financial principles, Barry is relentless because he sees this as a spiritual endeavor. In Barry’s words, all truth, including financial truth is spiritual truth. He sees that people need a proper, secure foundation in financial wisdom and planning.',
        ],
      },
    ],
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
        heading: 'Barry and his team are fantastic!',
        quote:
          'Barry and his team are fantastic. Barry is incredibly knowledgeable in all things insurance, and walked me through the process step by step and was very patient. Would highly recommend!!',
      },
      {
        heading: 'Perfect for business owners',
        quote:
          'Barry has expertise needed for business owners and found the best solutions for my situation. Professional and efficient.',
        attribution: 'Jerry M',
      },
      {
        heading: 'The Best…',
        quote:
          'Barry is hands down the best advisor in whole life insurance and provides unbiased advice for whole life insurance policies for Cash Value life insurance for IBC or infinite banking. He’s equally intelligible about creating a trust to protect your family and legacy. He’s someone that genuinely cares about protecting my family’s future and legacy and someone I would call a genuine friend. I will definitely be working with him again in the future as my needs continue to grow.',
      },
      {
        heading: 'The Best!!!',
        quote:
          'Barry and his team are not only very knowledgeable, they are also attentive, responsive and very transparent in their dealings. I’m very satisfied with their communication, professionalism and overall service provided.',
      },
      {
        heading: 'Barry is simply the best…',
        quote:
          'Barry is one of the best insurance agents by far. He is so professional and very knowledgeable – an expert. Barry has helped me and my husband with all our insurance needs. I trust him and he truly has become a part of my family and would definitely recommend him to anyone. Keep up the great work.',
      },
    ],
    schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/barrybrooksby',
    email: 'barry@insuranceandestates.com',
    webinarsHeading: "Barry's Top Webinars",
    articlesHeading: "Barry's Recent Articles",
    articles: [
      {
        href: '/high-net-worth-life-insurance/',
        img: '/wp-content/uploads/High-Net-Worth-Life-Insurance-150x150.jpg',
        alt: 'High net worth estate planning consultation room with leather chairs, floor-to-ceiling bookshelves, and rich burgundy tones',
        title: 'Comprehensive Guide to Life Insurance for High Net Worth Families',
      },
      {
        href: '/infinite-banking-indexed-universal-life/',
        img: '/wp-content/uploads/indexed-universal-life-infinite-banking-150x84.jpg',
        alt: 'infinite banking indexed universal life',
        title: 'Infinite Banking with Indexed Universal Life Insurance for Early Cash Value',
      },
    ],
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
      eyebrow: "Barry's Latest Book",
      title: 'Live Rich, Die Rich',
      text: 'How to Use High Cash Value Life Insurance and the Infinite Banking Concept as a Tax-Free Strategy to Supercharge Your Wealth',
      // Intentional external link — the live book funnel subdomain
      href: 'https://lrdr.insuranceandestates.com/live-rich-die-rich-2025',
      image: {
        src: '/wp-content/uploads/live_rich_die_rich2-160x200.webp',
        alt: 'Live rich die rich2',
      },
    },
  },

  jasonh: {
    slug: 'jasonh',
    role: 'Pro Client Guide',
    name: 'Jason Herring',
    firstName: 'Jason',
    intro:
      'Jason Herring has spent 16 years in life insurance and financial services — most of them deep inside the universal life and indexed universal life world. That experience is exactly what makes him different.',
    photo: {
      src: '/wp-content/uploads/Jason-2-167x200.webp',
      alt: 'Jason.webp',
    },
    initials: 'JH',
    accent: ACCENT_BLUE,
    hours: HOURS,
    topScheduleButton: true,
    bio: [
      { t: 'h', text: 'Overfunded Life Specialist', big: true },
      {
        t: 'p',
        runs: [
          'Jason Herring has spent 16 years in life insurance and financial services — most of them deep inside the universal life and indexed universal life world. That experience is exactly what makes him different.',
        ],
      },
      { t: 'h', text: 'Why Jason', big: true },
      {
        t: 'p',
        runs: [
          'Most agents live in one camp. They’re either whole life guys or IUL guys. Jason has sat in over 400 meetings ',
          { text: 'designing IUL', href: '/indexed-universal-life-iul-insurance/' },
          ' and annuity-based retirement strategies for advisors and their clients. He knows the mechanics, the caps, the floors, the policy charges, and the fine print most agents gloss over.',
        ],
      },
      {
        t: 'p',
        runs: [
          'But Jason also discovered something along the way: ',
          {
            text: 'whole life insurance',
            href: '/top-10-best-dividend-paying-whole-life-insurance-companies/',
          },
          ', when properly structured and overfunded, does things that universal life products simply cannot replicate — particularly when used as infrastructure for banking, cash flow, and generational wealth transfer.',
        ],
      },
      {
        t: 'p',
        runs: [
          'So now Jason does what almost nobody in the industry does. He sits across from a client, illustrates both policies side by side, and walks through the honest pros and cons of each — so the client can make a truly informed decision based on what they actually want to accomplish.',
        ],
      },
      {
        t: 'p',
        runs: [
          'No pitch. No agenda. Just deep clarity on which overfunded life policy is best suited for his client.',
        ],
      },
      { t: 'h', text: 'Background', big: true },
      {
        t: 'p',
        runs: [
          'Jason started in pharmaceutical sales, spending a decade working alongside doctors and their staffs. When industry changes prompted a career shift, a friend suggested he’d be a natural fit in life insurance.',
        ],
      },
      {
        t: 'p',
        runs: [
          'Two early experiences cemented his conviction. The father of Jason’s childhood friend passed away in his armchair one night — covered by nothing more than a $50,000 work policy. Shortly after entering the industry, Jason heard about a man in his mid-30s who died suddenly with only 1.5x salary coverage from his employer plan.',
        ],
      },
      { t: 'p', runs: ['Those stories never left him.'] },
      {
        t: 'p',
        runs: [
          'Jason launched his insurance career as a wholesaler with Hartford, building deep expertise in retirement income distribution strategies. When Hartford sold its life division in 2012, Prudential acquired the business and Jason transitioned into educating Prudential advisors and their clients on comprehensive income strategies — everything from simple protection plans to advanced ',
          { text: 'LIRP', href: '/lirp/' },
          ' distribution approaches.',
        ],
      },
      {
        t: 'p',
        runs: [
          'After years of expanding territory and influence, Jason wanted to get closer to the client. He stepped away from the wholesaler role, started working directly with consumers, and joined Insurance & Estate Strategies in 2017. He’s been instrumental in shaping the firm’s values, knowledge base, and expertise ever since.',
        ],
      },
      { t: 'h', text: 'Credentials', big: true },
      {
        t: 'ul',
        items: [
          ['Prudential Pinnacle Award recipient, 2014 and 2015'],
          ['Series 6, 63, and 65'],
          ['Licensed producer in all 50 states and DC'],
          ['Instructor with AFES (Adult Financial Education Services)'],
          ['National Association of Fixed Annuities (NAFA)'],
          ['16 years of experience across IULs, whole life, annuities, and advanced cash value strategies'],
        ],
      },
      { t: 'h', text: 'What Jason Specializes In', big: true },
      {
        t: 'p',
        runs: [
          'Jason designs ',
          { text: 'overfunded life insurance strategies', href: '/overfunded-life-insurance/' },
          ' built around what the client actually needs — not what pays the highest commission. His expertise spans the full spectrum of cash value life insurance:',
        ],
      },
      {
        t: 'ul',
        items: [
          [
            {
              text: 'Indexed Universal Life (IUL)',
              href: '/indexed-universal-life-iul-insurance/',
              bold: true,
            },
            { text: ':', bold: true },
            ' Market-linked growth with downside protection, cap rate optimization, and income distribution design',
          ],
          [
            {
              text: 'Dividend-Paying Whole Life',
              href: '/top-10-best-dividend-paying-whole-life-insurance-companies/',
              bold: true,
            },
            { text: ':', bold: true },
            ' Guaranteed cash value growth, infinite banking structure, and generational wealth transfer',
          ],
          [
            { text: 'Side-by-Side Policy Comparison:', bold: true },
            ' Honest illustration of both product types so clients see exactly what they’re getting',
          ],
          [
            { text: 'Retirement Income Distribution:', bold: true },
            ' ',
            { text: 'LIRP strategies', href: '/lirp/' },
            ', guaranteed income, and tax-efficient withdrawal design',
          ],
          [
            { text: 'Estate Planning & Wealth Transfer:', bold: true },
            ' Protection strategies most financial advisors overlook entirely',
          ],
        ],
      },
      { t: 'h', text: 'Philosophy', big: true },
      {
        t: 'p',
        runs: [
          'Jason believes overfunded life insurance in the client’s best interest is always the right move — whether that’s whole life, IUL, or a combination. He’ll cost himself a sale before he’ll put a client in the wrong product.',
        ],
      },
      {
        t: 'p',
        runs: [
          'He also believes most people protect everything in their lives except what matters most. His job is to fix that.',
        ],
      },
      { t: 'h', text: 'Personal', big: true },
      {
        t: 'p',
        runs: [
          'Jason has been married 25 years, has three daughters who keep him busy, and lives in Nashville with their dog Sadie. He prioritizes family time, schedules regular vacations, and spends time on mission trips putting his faith into action.',
        ],
      },
    ],
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
        ],
      },
      {
        heading: 'Background',
        paragraphs: [
          'Jason began in pharmaceutical sales before transitioning to life insurance. He worked with Hartford as a wholesaler on retirement income distribution strategies, then transitioned to Prudential when Hartford sold its life division in 2012.',
          "He joined Insurance & Estate Strategies in 2017 and has been instrumental in shaping the firm's values and expertise ever since.",
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
        heading: 'Excellent help, gave detailed explanation',
        quote:
          'Jason was very patient with all my questions (despite asking the same questions over and over!) and gave detailed explanation of everything he was sharing with me. He explained the whole process to me and simplified it for me to understand what I was signing up for. He was also very responsive via email and texts. Thank you.',
        attribution: 'Mrinalini',
      },
      {
        heading: 'Great advice, great service, great experience',
        quote:
          'Jason was extremely helpful walking me through my options. He was quick to respond, very detailed and overall amazing to work with. I’m very pleased with the experience and happy to have my policy set up.',
        attribution: 'David',
      },
      {
        heading: 'This was an amazing experience…',
        quote:
          'This was an amazing experience, when I first contacted Insurance and Estates, I barely knew anything about life insurance. Jason was very patient, informative and, clear in how he quickly educated me to make intelligent decisions on my financial future. I would definitely recommend Insurance and Estates to anyone.',
      },
      {
        heading: 'Jason helped me with a whole life…',
        quote:
          'Jason helped me with a whole life policy, protecting my daughter as well as go through the process without disrupting my over the road work as a trucker. Some times as a trucker it’s hard to get on site medical while going state to state, as a non smoker I qualified, Jason is awesome',
      },
    ],
    schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/jasonherring',
    email: 'jason@insuranceandestates.com',
    webinarsHeading: "Jason's Top Webinars",
    articlesHeading: 'Recent Articles',
    articles: sharedArticles,
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
      src: '/wp-content/uploads/jasonk-1-153x200.webp',
      alt: 'Jasonk',
    },
    initials: 'JK',
    accent: ACCENT_BLUE,
    bio: [
      {
        t: 'p',
        runs: [
          'Jason Kenyon spent 20 years watching the conventional financial system fail the people it was supposed to serve. That frustration built a business.',
        ],
      },
      {
        t: 'p',
        runs: [
          "He's the co-founder and CEO of Insurance & Estate Strategies, one of the most widely read independent education platforms in the life insurance and wealth strategy space. Before that he built and sold TermLife2Go — an earlier digital insurance platform — giving him a track record most advisors never achieve once, let alone twice.",
        ],
      },
      {
        t: 'p',
        runs: [
          "Jason holds a JD from University of San Diego School of Law, has been licensed in life insurance since 2010, and holds a Master's in Business Leadership. But his real credential is the ",
          { text: 'Volume-Based Banking', href: '/volume-based-banking/' },
          ' methodology he developed — a framework that reframes whole life insurance not as a savings vehicle but as financial infrastructure, helping families build banking systems that compound across generations.',
        ],
      },
      {
        t: 'p',
        runs: [
          'His work sits at the intersection of Austrian economics, estate planning, and contrarian financial strategy. He writes, teaches, and now creates video content for people who sense something is deeply wrong with conventional financial advice — and are looking for the exit.',
        ],
      },
    ],
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
          'His work sits at the intersection of Austrian economics, estate planning, and contrarian financial strategy.',
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
        heading: 'Excellent help, gave detailed explanation',
        quote:
          'Jason was very patient with all my questions (despite asking the same questions over and over!) and gave detailed explanation of everything he was sharing with me. He explained the whole process to me and simplified it for me to understand what I was signing up for. He was also very responsive via email and texts. Thank you.',
        attribution: 'Mrinalini',
      },
      {
        heading: 'Great advice, great service, great experience',
        quote:
          'Jason was extremely helpful walking me through my options. He was quick to respond, very detailed and overall amazing to work with. I’m very pleased with the experience and happy to have my policy set up.',
        attribution: 'David',
      },
      {
        heading: 'This was an amazing experience…',
        quote:
          'This was an amazing experience, when I first contacted Insurance and Estates, I barely knew anything about life insurance. Jason was very patient, informative and, clear in how he quickly educated me to make intelligent decisions on my financial future. I would definitely recommend Insurance and Estates to anyone.',
      },
      {
        heading: 'Jason helped me with a whole life…',
        quote:
          'Jason helped me with a whole life policy, protecting my daughter as well as go through the process without disrupting my over the road work as a trucker. Some times as a trucker it’s hard to get on site medical while going state to state, as a non smoker I qualified, Jason is awesome',
      },
    ],
    // FOLLOW-UP: no booking widget, hours or direct email surfaced on the live page.
    webinarsHeading: "Jason's Top Webinars",
    articlesHeading: 'Recent Articles',
    articles: sharedArticles,
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
      src: '/wp-content/uploads/Denise-2-150x200.webp',
      alt: 'Denise.webp',
    },
    initials: 'DB',
    accent: ACCENT_CORAL,
    hours: HOURS,
    topScheduleButton: true,
    bio: [
      {
        t: 'p',
        runs: ['Denise Boisvert, Pro Client Guide, has 22 years of experience in the life industry.'],
      },
      { t: 'h', text: 'Background and Expertise' },
      {
        t: 'p',
        runs: [
          'Denise’s unique journey began as a Human Resources professional in corporate America working with some interesting companies such as Yomega Yo Yo’s and Speidel Textron.  After enjoying attending trade shows for “yo-yo’s with a brain” and watch-bands for a few years, Denise came to a crossroads due to a layoff in 2003.',
        ],
      },
      {
        t: 'p',
        runs: [
          'After some soul searching, Denise spent some time in long term care planning, before discovering her true calling.',
        ],
      },
      {
        t: 'p',
        runs: ['She describes “finding her path” as one of  “helping people secure their futures”.'],
      },
      {
        t: 'p',
        runs: [
          'In this mission, Denise prioritizes providing people with financial and protection strategies that do not encourage risk. She is passionate about helping people control their own destiny just as she learned to do many years ago.',
        ],
      },
      {
        t: 'p',
        runs: [
          'Denise is a licensed producer in all 50 states and DC and appointed with the top carriers in her specialty areas.',
        ],
      },
      { t: 'h', text: 'Notable Achievements' },
      {
        t: 'ul',
        items: [
          ['Over 16 years experience in infinite banking policy design'],
          ['Notable Member of the American Business Women’s Association'],
          ['Completed the Pan Mass (200 Mile) Bike Challenge at age 50'],
        ],
      },
      { t: 'h', text: 'Specialties' },
      {
        t: 'ul',
        items: [
          ['Life Insurance'],
          ['Annuities'],
          ['Infinite Banking Concept (IBC)'],
          ['Life Insurance Retirement Planning (Social Security)'],
          ['College Funding'],
        ],
      },
      { t: 'h', text: 'Philosophy and Approach' },
      {
        t: 'ul',
        items: [
          ['Putting the client’s best interests and goals first'],
          ['Partnering with top mutual companies that have high Comdex (Financial Strength) scores'],
          ['Designing policies that maximize benefits for the client’s strategic goals'],
        ],
      },
      { t: 'h', text: 'Current Focus' },
      {
        t: 'p',
        runs: [
          'Educating clients on strategic ways to leverage properly designed, cash value whole life insurance for:',
        ],
      },
      {
        t: 'ul',
        items: [
          ['Supporting small business operation and growth'],
          ['Recapturing debt'],
          ['Providing family legacy protection'],
          [
            'Maximizing cash value accumulation to allow for tax free retirement, leveraging social security or college funding',
          ],
        ],
      },
      { t: 'h', text: 'Unique Perspective' },
      {
        t: 'p',
        runs: [
          'Denise is in her 4th year of RV-ing 8 months of the year with her trusted sidekick, 5 year old Goldendoodle, Ollie.  Denise resides the other 4 months of the year in Austin TX, which is her home base.  She describes her decision to “jump off the hamster wheel” when she decided she could “work surrounded by mountains, ocean, lakes and sunshine”.  She now follows the nice weather and pursues a balanced life of work and adventure.',
        ],
      },
      {
        t: 'p',
        runs: [
          'Denise has also written 2 books and is currently working on a third.  Prosperity Pals was written to educate children on the importance of money management at an early age.  She also wrote a book called “Training Active Dogs” based on her experiences with Ollie.',
        ],
      },
      {
        t: 'p',
        runs: [
          'Denise’s is committed to helping her clients pursue sound wealth building and protection strategies that will afford the same opportunities that she’s been able to achieve in her own life.',
        ],
      },
    ],
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
    ],
    credentials: [
      'Over 16 years experience in infinite banking policy design',
      "Notable Member of the American Business Women's Association",
      'Completed the Pan Mass (200 Mile) Bike Challenge at age 50',
    ],
    testimonials: [
      {
        heading: 'Amazing experience with Denise Boisvert!',
        quote:
          'I had an amazing experience with Denise Boisvert! She was very informative and made the process of applying very easy and straightforward. Thank you Denise!',
      },
      {
        heading: 'Denise was great and set us up with a great policy',
        quote:
          'Denise was great and set us up with a great policy. She took the time to listen and answer all questions. I’m glad I found them!',
        attribution: 'A. Smith',
      },
      {
        heading: 'Great Experience with Denise Boisvert',
        quote:
          'I had (and continue to have) a great experience working with Denise Boisvert. She recently helped me complete the 1035 exchange process for an existing IBC-based whole life insurance policy that I have.',
      },
      {
        heading: 'Great Communication, Service and Product',
        quote:
          'Denise is extremely helpful in my selection of the insurance policy. She set up a time with me to explain the different options of the insurance, and the feature of the policies. I feel like she really listen to my needs and found a policy that fit my request. She is also good at communicating and responding to my questions in a timely manner. She is also very willing to run the illustration in many ways to help me make the discussion. Highly recommended.',
      },
      {
        heading: 'Denise Boisvert was such a…',
        quote:
          'Denise Boisvert was such a professional. She has explained clearly to us all available options and answered all of our questions and we learned so much in the process. Thank You so much Denise!!!',
      },
    ],
    schedulerUrl: 'https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/deniseboisvert',
    email: 'denise@insuranceandestates.com',
    webinarsHeading: "Denise's Top Webinars",
    articlesHeading: 'Recent Articles',
    articles: sharedArticles,
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
      eyebrow: "Denise's Latest Book",
      title: 'Designing a DEBT-FREE LIFE',
      text: 'How to Use High Cash Value Life Insurance and the Infinite Banking Concept as a Tax-Free Strategy for Financial Freedom',
      // Intentional external link — the live book funnel subdomain
      href: 'https://debtfreeibc.insuranceandestates.com/2025-5884',
      image: {
        src: '/wp-content/uploads/denise_book-136x200.webp',
        alt: 'Denise book',
      },
    },
  },
};
