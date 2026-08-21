/* Renders the Generation Wealth media one-pager to
   public/media/generation-wealth-media-kit.pdf (plus a PNG proof beside the
   script). Copy mirrors /generation-wealth/ verbatim — when the page copy
   changes, update the strings here too and re-run. Formats list (Podcasts,
   YouTube, Speaking) supplied by the client (2026-08-21).

   playwright-core is NOT a project dependency; run with:
     npm i --no-save playwright-core && node scripts/generate-media-onepager.mjs
   It uses the environment's Chromium (set CHROMIUM below if yours differs). */
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const REPO = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const CHROMIUM = process.env.CHROMIUM ?? '/opt/pw-browsers/chromium';
const b64 = (path, mime) => `data:${mime};base64,${readFileSync(path).toString('base64')}`;

const barry = b64(`${REPO}/public/wp-content/uploads/Barry-1-1.webp`, 'image/webp');
const steve = b64(`${REPO}/public/wp-content/uploads/steven_gibbs.webp`, 'image/webp');
const logo = b64(`${REPO}/public/wp-content/uploads/ie_logo_web.webp`, 'image/webp');
const font400 = b64(`${REPO}/node_modules/@fontsource/figtree/files/figtree-latin-400-normal.woff2`, 'font/woff2');
const font600 = b64(`${REPO}/node_modules/@fontsource/figtree/files/figtree-latin-600-normal.woff2`, 'font/woff2');

const NAVY = '#0D1B3D';

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: Figtree; src: url(${font400}) format('woff2'); font-weight: 400; }
  @font-face { font-family: Figtree; src: url(${font600}) format('woff2'); font-weight: 600; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 8.5in; height: 11in; overflow: hidden; }
  body { font-family: Figtree, sans-serif; color: ${NAVY}; background: #F5F5F5;
         display: flex; flex-direction: column; }
  .pad { padding-left: 0.55in; padding-right: 0.55in; }
  header { display: flex; align-items: center; justify-content: space-between;
           padding-top: 0.42in; padding-bottom: 0.18in; }
  header img { height: 26px; }
  header .tag { font-size: 10.5px; color: rgba(13,27,61,.55); letter-spacing: .08em;
                text-transform: uppercase; }
  h1 { font-size: 46px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.02; }
  .sub { font-size: 14px; color: rgba(13,27,61,.7); margin-top: 7px; }
  .hook { font-size: 16px; font-weight: 600; letter-spacing: -0.01em; margin-top: 11px; }
  .guests { display: flex; gap: 0.18in; margin-top: 0.16in; }
  .card { background: #fff; border: 1px solid rgba(0,0,0,.05); border-radius: 14px;
          padding: 16px 18px; flex: 1; }
  .who { display: flex; align-items: center; gap: 11px; margin-bottom: 9px; }
  .who img { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; object-position: top; }
  .who .name { font-size: 16.5px; font-weight: 600; letter-spacing: -0.02em; }
  .who .cred { font-size: 10.5px; max-width: 3in; color: rgba(13,27,61,.6); margin-top: 2px; line-height: 1.35; }
  .card p.bio { font-size: 11px; line-height: 1.5; color: rgba(13,27,61,.72); margin-bottom: 6px; }
  .books { font-size: 10.2px; color: rgba(13,27,61,.6); border-top: 1px solid rgba(0,0,0,.06);
           padding-top: 7px; margin-top: 3px; line-height: 1.5; }
  .books em { color: ${NAVY}; font-style: italic; }
  .row2 { display: flex; gap: 0.18in; margin-top: 0.16in; flex: 1; align-items: stretch; margin-bottom: 0.24in; }
  .panel { background: #fff; border: 1px solid rgba(0,0,0,.05); border-radius: 14px; padding: 15px 18px; }
  .panel h2 { font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
              color: rgba(13,27,61,.5); font-weight: 600; margin-bottom: 8px; }
  .formats { width: 2.5in; }
  .chip { display: block; background: #F5F5F5; border-radius: 999px; padding: 10px 14px;
          font-size: 13px; font-weight: 600; margin-bottom: 6px; text-align: center; }
  .topics { flex: 1; }
  .topics li { font-size: 11.6px; line-height: 1.45; color: rgba(13,27,61,.78);
               margin-bottom: 5px; list-style: none; display: flex; gap: 7px; }
  .topics li { margin-bottom: 8px; }
  .topics li::before { content: ''; width: 5px; height: 5px; border-radius: 50%;
                       background: ${NAVY}; margin-top: 5px; flex-shrink: 0; }
  .appear { font-size: 10.2px; color: rgba(13,27,61,.55); margin-top: 9px;
            border-top: 1px solid rgba(0,0,0,.06); padding-top: 7px; line-height: 1.5; }
  footer { margin-top: auto; background: ${NAVY}; color: #fff; border-radius: 22px 22px 0 0;
           padding: 0.22in 0.55in; display: flex; align-items: center; justify-content: space-between; }
  footer .book { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
  footer .mail { font-size: 12px; color: rgba(255,255,255,.85); margin-top: 3px; }
  footer .site { font-size: 10.5px; color: rgba(255,255,255,.55); text-align: right; line-height: 1.5; }
</style></head><body>

<header class="pad">
  <img src="${logo}" alt="Insurance &amp; Estates">
  <span class="tag">Media one-pager</span>
</header>

<div class="pad">
  <h1>Generation Wealth</h1>
  <p class="sub">Barry Brooksby &amp; Steve Gibbs, JD, AEP&reg; &mdash; booked as a pair.</p>
  <p class="hook">Barry built it and lost it. Steve spent fifteen years cleaning up after people who did.</p>
</div>

<div class="pad guests">
  <div class="card">
    <div class="who">
      <img src="${barry}" alt="Barry Brooksby">
      <div>
        <div class="name">Barry Brooksby</div>
        <div class="cred">Authorized IBC Practitioner &mdash; Nelson Nash Institute</div>
      </div>
    </div>
    <p class="bio">Barry started in financial services on the strength of charts showing 12% and 18% returns. Within two years his own clients were calling to ask where the returns had gone, and his mentor told him to say they were in it for the long haul. He left.</p>
    <p class="bio">He co-founded a trust-deed investment company in Las Vegas and ran a portfolio past $100 million, until 2008 took the collateral under those loans. He lost over $1.4 million and moved his family out of state. He rebuilt buying foreclosures, and has spent the eighteen years since designing high cash value policies for real estate investors and business owners, as an Authorized IBC Practitioner with the Nelson Nash Institute. He still argues in public for funding them in the way that pays him least.</p>
    <p class="books">Books: <em>Live Rich, Die Rich</em> (2025) &middot; <em>Tax-Free Money for Long-Term Care!</em> (co-author)</p>
  </div>
  <div class="card">
    <div class="who">
      <img src="${steve}" alt="Steve Gibbs, JD, AEP">
      <div>
        <div class="name">Steve Gibbs, JD, AEP&reg;</div>
        <div class="cred">Estate planning attorney &mdash; Accredited Estate Planner&reg;</div>
      </div>
    </div>
    <p class="bio">Steve was admitted to the bar in 1999 and has practiced for more than twenty-five years. He opened a Florida trusts and estates practice in 2008 and ran it until 2023, which is fifteen years of sitting with families after the person who built the thing was gone, holding a plan that read fine on paper and did not survive a tax bill, a soft market, or a brother who wanted out.</p>
    <p class="bio">He is admitted in three states, holds the Accredited Estate Planner designation, and is licensed as a life and annuity producer in all fifty states.</p>
    <p class="books">Books: <em>What Do You Want Your Kids to Inherit?</em> (2025) &middot; <em>The Intentional Wealth Effect</em> (2024)</p>
  </div>
</div>

<div class="pad row2">
  <div class="panel formats">
    <h2>Formats</h2>
    <span class="chip">Podcasts</span>
    <span class="chip">YouTube</span>
    <span class="chip">Speaking</span>
  </div>
  <div class="panel topics">
    <h2>What they talk about</h2>
    <ul>
      <li>Why a house costs eight times what you make and thirty years stopped being enough.</li>
      <li>Why the money doesn&rsquo;t survive your kids.</li>
      <li>What happens to the thing you built when you stop running it.</li>
      <li>The people writing the tax rules already restructured around them.</li>
      <li>Getting to your own money without asking anyone.</li>
    </ul>
    <p class="appear">Prior appearances include BetterWealth, Capital Gains Tax Solutions, Expert CRE Secrets, and The Wealth and Freedom Nexus. Steve hosted The Lovable Lawyer Podcast and lectures for the National Business Institute.</p>
  </div>
</div>

<footer>
  <div>
    <div class="book">Book Now</div>
    <div class="mail">jasonk@insuranceandestates.com</div>
  </div>
  <div class="site">insuranceandestates.com/generation-wealth/<br>Headshots and short-form bios on request.</div>
</footer>

</body></html>`;

const browser = await chromium.launch({ executablePath: CHROMIUM });
const page = await browser.newPage({ viewport: { width: 816, height: 1056 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.pdf({
  path: `${REPO}/public/media/generation-wealth-media-kit.pdf`,
  width: '8.5in',
  height: '11in',
  printBackground: true,
  pageRanges: '1',
});
await page.screenshot({ path: new URL('onepager-proof.png', import.meta.url).pathname, fullPage: false });
await browser.close();
console.log('done');
