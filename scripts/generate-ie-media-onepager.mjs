/* Renders the GENERAL I&E media one-pager (client, 2026-08-21: the download
   on /media/ covers the experts generally — names, credentials, story, and
   the formats they offer — not just the Generation Wealth pairing) to
   public/media/ie-media-one-pager.pdf, plus a PNG proof beside the script.

   Every story sentence is verbatim from the site (Generation Wealth page
   bios for Barry/Steve, Erik's /proclientguide/erik-hayton/ profile);
   trimming means whole sentences cut, never reworded. Update here when the
   source copy changes and re-run.

   playwright-core is NOT a project dependency; run with:
     npm i --no-save playwright-core && node scripts/generate-ie-media-onepager.mjs
   (or copy next to an existing playwright-core install). Uses the
   environment's Chromium; override with CHROMIUM=/path/to/chromium. */
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const REPO = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const CHROMIUM = process.env.CHROMIUM ?? '/opt/pw-browsers/chromium';
const b64 = (path, mime) => `data:${mime};base64,${readFileSync(path).toString('base64')}`;

const logo = b64(`${REPO}/public/wp-content/uploads/ie_logo_web.webp`, 'image/webp');
const font400 = b64(`${REPO}/node_modules/@fontsource/figtree/files/figtree-latin-400-normal.woff2`, 'font/woff2');
const font600 = b64(`${REPO}/node_modules/@fontsource/figtree/files/figtree-latin-600-normal.woff2`, 'font/woff2');

const NAVY = '#0D1B3D';

const people = [
  {
    name: 'Barry Brooksby',
    cred: 'Authorized IBC Practitioner — Nelson Nash Institute',
    photo: b64(`${REPO}/public/wp-content/uploads/Barry-1-1.webp`, 'image/webp'),
    story:
      'Barry started in financial services on the strength of charts showing 12% and 18% returns. Within two years his own clients were calling to ask where the returns had gone, and his mentor told him to say they were in it for the long haul. He left. He co-founded a trust-deed investment company in Las Vegas and ran a portfolio past $100 million, until 2008 took the collateral under those loans. He rebuilt buying foreclosures, and has spent the eighteen years since designing high cash value policies for real estate investors and business owners, as an Authorized IBC Practitioner with the Nelson Nash Institute.',
    tail: 'Books: <em>Live Rich, Die Rich</em> (2025) &middot; <em>Tax-Free Money for Long-Term Care!</em> (co-author)',
  },
  {
    name: 'Steve Gibbs, JD, AEP&reg;',
    cred: 'Estate planning attorney — Accredited Estate Planner&reg;',
    photo: b64(`${REPO}/public/wp-content/uploads/steven_gibbs.webp`, 'image/webp'),
    story:
      'Steve was admitted to the bar in 1999 and has practiced for more than twenty-five years. He opened a Florida trusts and estates practice in 2008 and ran it until 2023, which is fifteen years of sitting with families after the person who built the thing was gone, holding a plan that read fine on paper and did not survive a tax bill, a soft market, or a brother who wanted out. He is admitted in three states, holds the Accredited Estate Planner designation, and is licensed as a life and annuity producer in all fifty states.',
    tail: 'Books: <em>What Do You Want Your Kids to Inherit?</em> (2025) &middot; <em>The Intentional Wealth Effect</em> (2024)',
  },
  /* Erik removed from the one-pager per Xander, 2026-08-21. */
];

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
           padding-top: 0.4in; padding-bottom: 0.16in; }
  header img { height: 26px; }
  header .tag { font-size: 10.5px; color: rgba(13,27,61,.55); letter-spacing: .08em;
                text-transform: uppercase; }
  h1 { font-size: 38px; font-weight: 600; letter-spacing: -0.03em; line-height: 1.05; }
  .sub { font-size: 13.5px; color: rgba(13,27,61,.7); margin-top: 6px; }
  .chips { display: flex; gap: 8px; margin-top: 11px; }
  .chip { background: #fff; border: 1px solid rgba(0,0,0,.06); border-radius: 999px;
          padding: 7px 18px; font-size: 12.5px; font-weight: 600; }
  .people { display: flex; flex-direction: column; gap: 0.16in; margin-top: 0.2in; }
  .person { background: #fff; border: 1px solid rgba(0,0,0,.05); border-radius: 14px;
            padding: 16px 20px; display: flex; gap: 16px; }
  .person img { width: 62px; height: 62px; border-radius: 50%; object-fit: cover;
                object-position: top; flex-shrink: 0; }
  .person .name { font-size: 16.5px; font-weight: 600; letter-spacing: -0.02em; }
  .person .cred { font-size: 10.5px; color: rgba(13,27,61,.6); margin-top: 2px; margin-bottom: 7px; }
  .person .story { font-size: 10.8px; line-height: 1.5; color: rgba(13,27,61,.72); }
  .person .tail { font-size: 10px; color: rgba(13,27,61,.6); border-top: 1px solid rgba(0,0,0,.06);
                  padding-top: 6px; margin-top: 7px; line-height: 1.45; }
  .person .tail em { color: ${NAVY}; font-style: italic; }
  .topics { background: #fff; border: 1px solid rgba(0,0,0,.05); border-radius: 14px;
            padding: 16px 20px; margin-top: 0.16in; flex: 1; }
  .topics h2 { font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
               color: rgba(13,27,61,.5); font-weight: 600; margin-bottom: 9px; }
  .topics li { font-size: 11.4px; line-height: 1.5; color: rgba(13,27,61,.78);
               margin-bottom: 8px; list-style: none; display: flex; gap: 8px; }
  .topics li::before { content: ''; width: 5px; height: 5px; border-radius: 50%;
                       background: #0D1B3D; margin-top: 6px; flex-shrink: 0; }
  .pad.grow { flex: 1; display: flex; flex-direction: column; }
  footer { margin-top: 0.2in; background: ${NAVY}; color: #fff; border-radius: 22px 22px 0 0;
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
  <h1>Insurance &amp; Estates &mdash; Media</h1>
  <p class="sub">Names, credentials, and stories for hosts, producers, and event organizers. Our experts are available for:</p>
  <div class="chips">
    <span class="chip">Podcasts</span>
    <span class="chip">YouTube</span>
    <span class="chip">Speaking</span>
  </div>
</div>

<div class="pad grow"><div class="people">
  ${people
    .map(
      (person) => `
  <div class="person">
    <img src="${person.photo}" alt="${person.name}">
    <div>
      <div class="name">${person.name}</div>
      <div class="cred">${person.cred}</div>
      <p class="story">${person.story}</p>
      <p class="tail">${person.tail}</p>
    </div>
  </div>`,
    )
    .join('')}
</div>

<div class="topics">
  <h2>What they talk about</h2>
  <ul>
    <li>Why a house costs eight times what you make and thirty years stopped being enough.</li>
    <li>Why the money doesn&rsquo;t survive your kids.</li>
    <li>What happens to the thing you built when you stop running it.</li>
    <li>The people writing the tax rules already restructured around them.</li>
    <li>Getting to your own money without asking anyone.</li>
  </ul>
</div>
</div>

<footer>
  <div>
    <div class="book">Book Now</div>
    <div class="mail">jasonk@insuranceandestates.com</div>
  </div>
  <div class="site">insuranceandestates.com/media/<br>Headshots and brand assets available on the media page.</div>
</footer>

</body></html>`;

const browser = await chromium.launch({ executablePath: CHROMIUM });
const page = await browser.newPage({ viewport: { width: 816, height: 1056 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.pdf({
  path: `${REPO}/public/media/ie-media-one-pager.pdf`,
  width: '8.5in',
  height: '11in',
  printBackground: true,
  pageRanges: '1',
});
await page.screenshot({ path: new URL('ie-onepager-proof.png', import.meta.url).pathname, fullPage: false });
await browser.close();
console.log('done');
