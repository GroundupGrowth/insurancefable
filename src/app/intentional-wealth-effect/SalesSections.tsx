import { SalesSection, SalesHeading, SalesProse, SalesCta } from '../../components/EbookLanding';

/* Live sales copy for /intentional-wealth-effect/ — reproduced verbatim from
   extraction/parsed/intentional-wealth-effect.json plus the loose intro text in
   the rendered DOM (extraction/site/pages/intentional-wealth-effect.html); the
   page's only live section. This title is sold on Amazon, so both live buttons
   go to the Amazon listing; live's "Get Your Copy Today!" button has a broken
   href in the source markup and is pointed at the same listing. The full-size
   marketing graphic is not localized; the local 600x362 variant stands in. */

const AMAZON_URL = 'https://amzn.to/3UgeUor';

export default function SalesSections() {
  return (
    <SalesSection>
      <SalesHeading>Get Your Copy of The Intentional Wealth Effect</SalesHeading>
      <a href={AMAZON_URL} className="inline-block mb-8">
        <img
          src="/wp-content/uploads/The-Intentional-Wealth-Effect-Marketing-Page-Graphic-2-600x362.webp"
          alt="The Intentional Wealth Effect Marketing Page Graphic (2)"
          className="max-w-full w-[36rem] h-auto rounded-2xl"
        />
      </a>
      <div className="mb-8">
        <SalesCta href={AMAZON_URL}>Get Your Copy Today!</SalesCta>
      </div>
      <SalesProse>
        <p>
          If you&rsquo;re stressed about your finances; let me tell you, my early financial life
          was anything but a smooth ride. Picture this: the inevitable ups and downs of my
          dad&rsquo;s real estate business shaping my financial destiny. It was like being on a
          rollercoaster, but without the fun. But fear not! I found my way to the
          &ldquo;safer&rdquo; profession of law, where I learned some crucial principles that
          changed my perspective on building wealth. Contracts became my new best friends, and I
          realized that our entire economic system operates on these crafty little documents. Now,
          here&rsquo;s where it gets interesting.
        </p>
        <p>
          My uncle Jake, the wise financial practitioner, introduced me to both offense and defense
          in financial decision making. He explained that most people only focus on making money
          (offense), but he showed me the importance of protecting what you have (defense). At
          first, I was skeptical about his whole life insurance recommendation. But it all clicked
          years later when I discovered Nelson Nash&rsquo;s infinite banking concept. Understanding
          Nash&rsquo;s concept inspired me to embark on a new mission to educate people on the art
          of recapturing their hard-earned money and turning it into an endless stream of wealth
          building momentum. &ldquo;The Intentional Wealth Effect&rdquo; is a culmination of this
          mission to date, harnessing the philosophical and practical lessons that took me many
          years to recognize. I hope it inspires you in your learning process.
        </p>
      </SalesProse>
      <div className="mt-8">
        <SalesCta href={AMAZON_URL}>Buy Now</SalesCta>
      </div>
    </SalesSection>
  );
}
