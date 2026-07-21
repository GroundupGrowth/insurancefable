import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import { SalesSection, SalesHeading, SalesSubheading, SalesProse, SalesCta } from '../../components/EbookLanding';

/* 1:1 rebuild of the live (noindexed) /life-insurance-essentials-guide/
   download page. All copy verbatim — including the leftover
   "EstatePlanningLegacyOrganizer" filename references that live carries over
   from its sibling page. Live's cover image is Life-Insurance-Essentials-Report.jpg
   (not localized); the localized 165x200 small copy of the same cover is used. */

const TITLE = 'Life Insurance Essentials Guide – I&E | Whole Life & Infinite Banking Strategies';
const DESCRIPTION =
  'Congratulations on Taking a Huge Step Toward Taking Control of Your Estate and Life Legacy Plan! The Life Insurance Essentials Guide was developed based upon ye';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: '/life-insurance-essentials-guide/' },
};

const PDF_HREF = '/wp-content/uploads/Life-Insurance-Essentials-Report.pdf';

export default function LifeInsuranceEssentialsGuidePage() {
  return (
    <PageShell>
      <PageHero title="Life Insurance Essentials Guide" />

      <SalesSection tone="navy">
        <SalesHeading light>
          Congratulations on Taking a Huge Step Toward Taking Control of Your Estate and Life
          Legacy Plan!
        </SalesHeading>
        <div className="md:flex md:items-start md:gap-10">
          <img
            src="/wp-content/uploads/Life-Insurance-Essentials-Report-small-copy-165x200.jpg"
            alt=""
            className="w-32 md:w-40 rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.35)] mb-6 md:mb-0 shrink-0"
          />
          <SalesProse light>
            <p>
              The Life Insurance Essentials Guide was developed based upon years of experience,
              meeting with thousands of clients, and observing the need for a step by step manual
              for people to follow in order to understand, gather, and clarify their unique life
              insurance needs.
            </p>
            <p>By using the Life Insurance Essentials Guide, you are empowering yourself concerning the:</p>
            <p>
              1.&nbsp; Protection of your loved ones
              <br />
              2.&nbsp; Protection of your assets
              <br />
              3.&nbsp; Controlling your tax exposure
              <br />
              4.&nbsp; Sharing your unique history
              <br />
              5.&nbsp; Defining your values for future generations
              <br />
              &hellip;and More!
            </p>
          </SalesProse>
        </div>
        <div className="mt-8">
          <SalesCta light href={PDF_HREF}>
            Download the Life Insurance Essentials Guide
          </SalesCta>
        </div>
      </SalesSection>

      <SalesSection>
        <SalesProse>
          <p>If you have issues downloading the guide, please read and follow the troubleshooting steps below.</p>
          <p>
            *Before* emailing for technical support &mdash; there is a 99% chance the answer to
            your question is *found below*.
          </p>
        </SalesProse>

        <SalesSubheading>
          <strong>Downloading the Life Insurance Essentials Guide</strong>
        </SalesSubheading>
        <SalesProse>
          <p>
            Click the BUTTON below to download Your Life Insurance Essentials Guide.&nbsp; Make
            sure you save the files (by following the instructions on the download page) to your
            hard drive in a place you can find them before you do *anything* else.
          </p>
          <p>
            You should save the file to your &ldquo;desktop&rdquo; so you can find it easily and
            quickly once you have finished downloading.
          </p>
          <p>
            Unless you change the name of the pdf file you downloaded, it is named
            EstatePlanningLegacyOrganizer &mdash; this is important to know if you have a problem
            finding the file later.
          </p>
        </SalesProse>

        <SalesSubheading>
          <strong>Opening my Life Insurance Essentials Guide</strong>
        </SalesSubheading>
        <SalesProse>
          <p>
            Once you have downloaded the Organizer to your computer&rsquo;s desktop (or whatever
            folder you saved it in) then simply double click the file and it should open in Adobe
            Acrobat Reader.
          </p>
          <p>
            If it does not open automatically in Adobe Acrobat Reader &ndash;then open Adobe
            Acrobat Reader by clicking &ldquo;Start&rdquo; then &ldquo;Programs&rdquo; then
            &ldquo;Adobe Acrobat&rdquo; then &ldquo;Acrobat Reader&rdquo;
          </p>
          <p>
            Once you open the Adobe Acrobat Reader program click &ldquo;File&rdquo;
            &ldquo;Open&rdquo; then (if you save the file to your desktop) go to your desktop and
            open the file named &ldquo;EstatePlanningLegacyOrganizer&nbsp; &rdquo;
            <br />
            This should open the ebook file in your Adobe Acrobat Reader.
          </p>
        </SalesProse>

        <SalesSubheading>
          <strong>Downloading &amp; Using Adobe Acrobat Reader</strong>
        </SalesSubheading>
        <SalesProse>
          <p>
            If you need Adobe Acrobat Reader (or if you need to upgrade) you can download the FREE
            Reader software / upgrade by going to
            <br />
            http://www.adobe.com/products/acrobat/readstep.html
          </p>
          <p>
            You can get the latest version of Adobe Acrobat Reader FREE Adobe Acrobat Reader comes
            with an extensive &ldquo;Help&rdquo; file &ndash; if you have questions about how to
            operate the program &mdash; please open the Adobe Acrobat Reader program, click
            &ldquo;Help&rdquo; and make the appropriate selection.
          </p>
        </SalesProse>

        <SalesSubheading>
          <strong>Printing my Life Insurance Essentials Guide</strong>
        </SalesSubheading>
        <SalesProse>
          <p>
            Open Adobe Acrobat Reader by clicking &ldquo;Start&rdquo; then &ldquo;Programs&rdquo;
            then &ldquo;Adobe Acrobat&rdquo; then &ldquo;Acrobat Reader&rdquo;
            <br />
            Once you open the Adobe Acrobat Reader program click &ldquo;File&rdquo; then
            &ldquo;Open&rdquo; then (if you save the file to your desktop) go to your desktop and
            open the file named &ldquo;CHANGE TO YOUR FILENAME&rdquo;
            <br />
            Then click &ldquo;File&rdquo; then &ldquo;Print&rdquo;
          </p>
        </SalesProse>

        <SalesSubheading>
          <strong>Frequent Questions / Common Issues</strong>
        </SalesSubheading>
        <SalesProse>
          <p>
            <strong>
              I downloaded a copy of my Life Insurance Essentials Guide but now I can&rsquo;t find
              it on my computer &ndash; what do I do?
            </strong>
          </p>
          <p>
            When you originally downloaded the files you should have saved the ebook files to your
            &ldquo;desktop&rdquo;.
            <br />
            If you did not, and if you cannot find them, the easiest thing to do is a search for
            them.
            <br />
            Click the Windows &ldquo;Start&rdquo; button then click &ldquo;Search&rdquo; then
            click &ldquo;For Files or Folders&rdquo;.
            <br />
            Where it says &ldquo;Search for files or folders named:&rdquo; type in
            EstatePlanningLegacyOrganizer
            <br />
            Make sure it says &ldquo;Look in: &lsquo;Local Hard Drives&#39;&rdquo; on the pull
            down menu right below.
            <br />
            Click &ldquo;Search Now&rdquo;.
            <br />
            Double click the file in the search results and the file should open in Adobe Acrobat
            Reader.
            <br />
            If it does not open automatically &mdash; make a note of where the file is located
            &mdash; then follow the instructions in #2 above.
          </p>
          <p>
            <strong>Is there a &ldquo;Hard Copy&rdquo;?</strong>
          </p>
          <p>There is no hard copy of the Life Insurance Essentials Guide available at this time.</p>
          <p>
            <strong>The links in my Life Insurance Essentials Guide won&rsquo;t work</strong>
          </p>
          <p>
            If you click the &ldquo;web&rdquo; links in the ebook (blue underlined links) and they
            don&rsquo;t take you to a web page &mdash; Make sure your computer is *online and
            connected to the web*.
            <br />
            If you get an error that says something to the effect that no web browser is
            configured to work with Adobe Acrobat Reader then try this:
            <br />
            In Adobe Acrobat Reader go to &ldquo;File&rdquo; then &ldquo;Preferences&rdquo; then
            &ldquo;Web Link&rdquo; and choose your browser in the WWW Browser Application.
            <br />
            You will need to find the .exe file for the browser by clicking the
            &ldquo;browse&rdquo; button.
            <br />
            Your browser .exe file (usually either FireFox or Internet Explorer) can sometimes be
            found in your &ldquo;Program Files&rdquo; folder.
            <br />
            Any more tech support on this issue should come from Adobe or your computer vendor,
            (or AOL if you use them) since we cannot be sure where to tell you to look on your
            hard drive for your browser&rsquo;s .exe file.
            <br />
            This should solve the problem of being able to click directly on the links and have
            them take you to the web.
          </p>
          <p>
            <strong>
              I can&rsquo;t print my Life Insurance Essentials Guide/ it stops printing at a
              certain page.
            </strong>
          </p>
          <p>
            Two things we can offer with what is most likely your computer acting up rather than
            the Life Insurance Essentials Guide file.
          </p>
          <p>
            <strong>Try restarting your computer and printer.</strong>
          </p>
          <p>If that doesn&rsquo;t work&hellip;.</p>
          <p>
            <strong>
              When you have the Life Insurance Essentials Guide open in Acrobat &mdash; go to
              File, Click Print, then down in the middle where it says &ldquo;Print Range&rdquo;
              fill in Pages from with about 20 or 30 pages (example 45-75).
            </strong>
          </p>
          <p>Try printing the book out chapter by chapter.</p>
          <p>
            If none of these answer your specific question then please contact us at
            info@insuranceandestates.com.&nbsp; We will respond as quickly as possible.
          </p>
        </SalesProse>
      </SalesSection>
    </PageShell>
  );
}
