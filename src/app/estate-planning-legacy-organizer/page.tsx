import type { Metadata } from 'next';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import { SalesSection, SalesHeading, SalesSubheading, SalesProse, SalesCta } from '../../components/EbookLanding';

/* 1:1 rebuild of the live (noindexed) /estate-planning-legacy-organizer/
   download page: congratulations block, the five numbered empowerment points,
   the PDF download link, and the full Adobe Reader troubleshooting copy —
   all reproduced verbatim in the site's design idiom. */

const TITLE = 'Estate Planning Legacy Organizer – I&E | Whole Life & Infinite Banking Strategies';
const DESCRIPTION =
  'Congratulations on Taking a Huge Step Toward Taking Control of Your Estate and Life Legacy Plan! Estate Planning Legacy Organizer was developed based upon years';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  alternates: { canonical: '/estate-planning-legacy-organizer/' },
};

const PDF_HREF = '/wp-content/uploads/EstatePlanningLegacyOrganizer-InsuranceandEstates.com-FINAL.pdf';

export default function EstatePlanningLegacyOrganizerPage() {
  return (
    <PageShell>
      <PageHero title="Estate Planning Legacy Organizer" />

      <SalesSection tone="navy">
        <SalesHeading light>
          Congratulations on Taking a Huge Step Toward Taking Control of Your Estate and Life
          Legacy Plan!
        </SalesHeading>
        <SalesProse light>
          <p>
            Estate Planning Legacy Organizer was developed based upon years of experience, meeting
            with thousands of clients, and observing the need for a step by step manual for people
            to follow in order to understand, gather, and clarify their unique estate and legacy
            planning process.
          </p>
          <p>By using the Estate Planning Legacy Organizer as your guide, you are empowering yourself concerning the:</p>
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
        <div className="mt-8">
          <SalesCta light href={PDF_HREF}>
            Download the Estate Planning Legacy Organizer
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
          <strong>Downloading my Estate Planning Legacy Organizer</strong>
        </SalesSubheading>
        <SalesProse>
          <p>
            Click the BUTTON below to download Your Estate Planning Legacy Organizer.&nbsp; Make
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
          <strong>Opening my Estate Planning Legacy Organizer</strong>
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
          <strong>Printing my Legacy Organizer</strong>
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
              I downloaded a copy of my Legacy Organizer but now I can&rsquo;t find it on my
              computer &ndash; what do I do?
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
          <p>There is no hard copy of the Legacy Organizer available at this time.</p>
          <p>
            <strong>The links in my Legacy Organizer won&rsquo;t work</strong>
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
            <strong>I can&rsquo;t print my Legacy Organizer/ it stops printing at a certain page.</strong>
          </p>
          <p>
            Two things we can offer with what is most likely your computer acting up rather than
            the Legacy Organizer file.
          </p>
          <p>
            <strong>Try restarting your computer and printer.</strong>
          </p>
          <p>If that doesn&rsquo;t work&hellip;.</p>
          <p>
            <strong>
              When you have the Legacy Organizer open in Acrobat &mdash; go to File, Click Print,
              then down in the middle where it says &ldquo;Print Range&rdquo; fill in Pages from
              with about 20 or 30 pages (example 45-75).
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
