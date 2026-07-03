import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import PageShell from '../../components/PageShell';
import PageHero from '../../components/PageHero';
import { getPageContent } from '../../lib/content';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('privacytou');
  return { title: content.title, description: content.description };
}

/* LEGAL PAGE — the text below is reproduced VERBATIM from the live page at
   insuranceandestates.com/privacytou/. Never summarize, paraphrase, or
   modernize this copy. */

type Block =
  | { t: 'h2'; text: string }
  | { t: 'p'; text: ReactNode }
  | { t: 'ul'; items: string[] };

const blocks: Block[] = [
  { t: 'h2', text: 'TERMS OF USE' },
  { t: 'p', text: 'Effective April 6, 2018.' },
  {
    t: 'p',
    text: 'The Terms of Use is an Agreement between you and Steven J. Gibbs, Insurance & Estate Strategies, collectively “I&E” and herein referred to as “I&E”.',
  },
  {
    t: 'p',
    text: 'These Terms of Use, together with I&E’s Privacy Policy, state the “Terms and Conditions” under which you, the website visitor (“You”) may use InsuranceandEstates.com (the “Site”).',
  },
  {
    t: 'p',
    text: 'Please read this page carefully. By using this Site, You agree to be bound by all of the Terms and Conditions set forth below. If You do not accept these Terms and Conditions, please do not use this Site. These Terms and Conditions supersede any other agreement you may have with I&E regarding this subject matter. I&E may, in its sole discretion, revise these Terms and Conditions at any time; therefore, You should visit this page periodically to review the Terms and Conditions.',
  },
  {
    t: 'p',
    text: 'The information presented on this Site is not an offer to solicit business. The material contained in this website is for informational purposes only and is only intended to provide a general description. All content is for informational purposes only. Statements on this website as to the content provided is general information only and we provide no warranty as to the accuracy. Users should consult with a licensed legal professional as to how the information presented here may pertain to their individual situation. Further, information provided on this website does not constitute professional advice. If you have legal, tax or financial planning questions, you need to contact a qualified professional.',
  },
  {
    t: 'p',
    text: (
      <em className="font-medium text-[#0D1B3D]">
        Life insurance policies are not investments and should not be purchased as an investment.
      </em>
    ),
  },
  { t: 'h2', text: 'AFFILIATE DISCLOSURE' },
  {
    t: 'p',
    text: 'Some of the links found on https://insuranceandestates.com are affiliate referral links. This means that if a reader clicks on text or an image, https://insuranceandestates.com may receive a commission from purchases. There is no additional cost to you, it simply helps pay for maintenance of our site.',
  },
  { t: 'p', text: 'For example, As an Amazon Associate we earn from qualifying purchases.' },
  { t: 'h2', text: 'COPYRIGHT' },
  {
    t: 'p',
    text: 'The contents of this Site, such as text, graphics, images, and other content (the “Site Material”) are protected by copyright under United States law. These Terms and Conditions do not grant You any license whatsoever to the Site Material. I&E authorizes You to view and download a single copy of the Site Material for your non-commercial personal use. Unauthorized use of the Site Material violates copyright and other laws. You agree to retain all copyright and other proprietary notices contained in the original Site Material on any copy of such material. Except as expressly provided herein, You may not sell or modify our Site Material or reproduce, display, distribute, or otherwise use the Site Material in any way for any public or commercial purpose. Use of the Site Material on any other site or in a networked environment is prohibited. I&E retains all intellectual property rights in the Site Material.',
  },
  { t: 'h2', text: 'TRADEMARKS' },
  {
    t: 'p',
    text: 'The names, marks and logos appearing on the Site are, unless otherwise noted, trademarks owned by or licensed to I&E. Your use of these marks, except as provided in these Terms and Conditions, is strictly prohibited. From time to time, I&E makes fair use in this Site of trademarks owned and used by third parties. I&E makes no claim to ownership of those marks.',
  },
  { t: 'h2', text: 'USER SUBMISSIONS' },
  {
    t: 'p',
    text: 'I&E welcomes your reviews and comments. However, You acknowledge that if You send us any reviews, comments, suggestions, ideas, notes, concepts or other information, (collectively, the “Information”), you grant I&E the irrevocable, perpetual right to use, alter, publish or delete the Information for any purpose whatsoever without compensation to You or the provider of the Information. Notwithstanding, I&E disclaims all liability for reviews and comments posted by users on the Site.',
  },
  {
    t: 'p',
    text: 'As a user of this Site, You are responsible for your own communications. Therefore, do not do any of the following things:',
  },
  {
    t: 'ul',
    items: [
      'transmit to us material that is copyrighted, unless You are the copyright owner or have the permission of the copyright owner;',
      'send material that reveals trade secrets, unless You own them or have the permission of the owner;',
      'send material that infringes on any other intellectual property rights of others or on the privacy or publicity rights of others;',
      'send material that is obscene, defamatory, threatening, harassing, abusive, hateful, or embarrassing to another user or any other person or entity;',
      'intentionally or unintentionally violate or encourage conduct that would violate any local, state, or federal law;',
      'attempt to breach the security of the Site;',
      'send advertisements or solicitations of business;',
      'send chain letters or pyramid schemes; or',
      'impersonate another person.',
    ],
  },
  {
    t: 'p',
    text: 'I&E reserves the right to expel You and to prevent You further access to this Site for violating these Terms and Conditions terms or the law. The violation of any of these Terms and Conditions shall result in the immediate revocation of your right to access or use the Site or Site Material and obligates You to immediately destroy any copies of the Site Material in your possession.',
  },
  {
    t: 'p',
    text: 'The customer reviews You see on this site are the result of direct feedback from former or current home services customers. We do not pay customers for reviews. If they participate, reviewers may have the opportunity to enter various contests to be randomly selected as a winner. We do not reward reviewers based on whether their written analysis is positive or negative. Rather, we publish full and complete reviews from individuals without alteration except to remove personally identifying information. We may elect not to publish reviews that contain inappropriate or irrelevant content. I&E is not responsible for any of the reviews or comments posted on this Site. I&E does not share the opinions, views, or commentary of any testimonials on this site, which are strictly the views of the reviewer.',
  },
  { t: 'h2', text: 'PRODUCT AND SERVICE RANKINGS' },
  {
    t: 'p',
    text: 'The Site offers a forum, which includes a product and service ranking (“Rankings”), where you may access recommendations of products and services by I&E.',
  },
  {
    t: 'p',
    text: 'The information in our Rankings is provided strictly as a source of information for You and is provided merely as a convenience. It represents our opinion and analysis based on subjective/ objective criteria. It is recommended that you do your own research and investigation before engaging services with any company regardless of their listing. You agree to not hold I&E, its members, managers, officers, directors, employees, or affiliates (collectively “Partners”) liable for any statements, representations, errors or omissions, descriptions, comments, or opinions posted on the Site.',
  },
  {
    t: 'p',
    text: 'By developing and posting such Rankings, I&E makes no representation or warranties as to the accuracy or factual basis of the Rankings. Our evaluation process is a continued development; we may experiment with new processes for our evaluations and add or remove specific elements at any time. I&E is a private company and is not affiliated with any government or non-profit organizations. I&E receives compensation from several of the companies which it ranks.',
  },
  {
    t: 'p',
    text: 'Advice, graphics, information, and images contained on this site are presented for general educational and informational purposes. They are not intended to be legal or other expert advice, recommendations, or services. The information contained on this site should not be considered exhaustive and should not be used in place of consultation with qualified professionals to meet your individual needs.',
  },
  {
    t: 'p',
    text: 'You assume the entire risk as to the accuracy, adequacy, completeness, currency, validity and quality of any information provided on this Site. While the information and recommendations contained on this site have been compiled from sources believed to be reliable, I&E makes no guarantee as to, and assumes no responsibility for, the correctness, sufficiency, or completeness of any such information or recommendations. I&E has no control over and does not warrant in any way that prices, taxes, products or descriptions provided by sellers, service providers, or other third parties, or any other content on this Site is accurate, complete, reliable, current, or error-free. I&E does not have any responsibility for, or liability related to, any products and services listed on this Site. You should direct any questions, complaints or claims related to any product or service to the appropriate seller or provider. I&E is not responsible or liable for any decisions or actions you take or authorize third parties to take on your behalf based on information you receive as a user of the Site. Any information on the Site can change without notice.',
  },
  { t: 'h2', text: 'LIMITATION OF LIABILITY' },
  {
    t: 'p',
    text: 'I&E DOES NOT WARRANT THAT THE SITE WILL OPERATE ERROR-FREE OR THAT THE SITE AND ITS SERVER ARE FREE OF COMPUTER VIRUSES OR OTHER HARMFUL MATERIAL. IF YOUR USE OF THE SITE OR THE SITE MATERIAL RESULTS IN ANY COSTS OR EXPENSES, INCLUDING, WITHOUT LIMITATION, THE NEED FOR SERVICING OR REPLACING EQUIPMENT OR DATA, I&E SHALL NOT BE RESPONSIBLE FOR THOSE COSTS OR EXPENSES.',
  },
  {
    t: 'p',
    text: 'THIS SITE AND ITS MATERIAL ARE PROVIDED ON AN “AS IS” AND “AT YOUR OWN RISK” BASIS WITHOUT ANY WARRANTIES OF ANY KIND. I&E, TO THE FULLEST EXTENT PERMITTED BY LAW, DISCLAIMS ALL WARRANTIES, INCLUDING THE WARRANTY OF MERCHANTABILITY AND NON-INFRINGEMENT OF THIRD PARTIES’ RIGHTS. I&E STRIVES TO PROVIDE THOROUGH AND ACCURATE MATERIALS ON ITS SITE. WE MAKE NO WARRANTIES ABOUT THE ACCURACY, RELIABILITY, COMPLETENESS, OR TIMELINESS OF THE MATERIAL, SERVICES, SOFTWARE, TEXT, GRAPHICS, AND LINKS.',
  },
  { t: 'h2', text: 'DISCLAIMER OF CONSEQUENTIAL DAMAGES' },
  {
    t: 'p',
    text: 'IN NO EVENT SHALL I&E, ITS AFFILIATES, OR ANY THIRD PARTIES MENTIONED ON THE SITE BE LIABLE FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, INCIDENTAL, INDIRECT, CONSEQUENTIAL OR PUNITIVE DAMAGES, LOST PROFITS, OR DAMAGES RESULTING FROM LOST DATA OR BUSINESS INTERRUPTION) RESULTING FROM THE USE OR INABILITY TO USE MATERIAL, ADVICE, GUIDANCE, OR SERVICES ON THIS SITE OR SITES LINKED TO THIS SITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT I&E IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
  },
  { t: 'h2', text: 'LINKS' },
  {
    t: 'p',
    text: 'This Site contains links to sites owned by third parties. These links are provided solely as a convenience to You and are not an endorsement by I&E of the contents on those other sites. I&E is not responsible for the content of any linked sites and makes no representations regarding the content or accuracy of materials on such sites. If You decide to visit any third-party sites using links from this Site, You do so at your own risk.',
  },
  { t: 'h2', text: 'INDEMNITY' },
  {
    t: 'p',
    text: 'By using this Site, You agree to defend, indemnify, and hold harmless I&E and its Partners from and against any and all losses, claims, damages, costs and expenses (including reasonable legal and accounting fees) that I&E may become obligated to pay arising or resulting from your use of the Site Material or your breach of these Terms and Conditions. I&E reserves the right to assume or participate, at your expense, in the investigation, settlement and defense of any such action or claim.',
  },
  { t: 'h2', text: 'DISPUTE RESOLUTION' },
  {
    t: 'p',
    text: 'These Terms and Conditions are governed by the substantive laws of the State of Florida, without respect to its conflict of laws principles. If any provision is found to be invalid by any court having competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of these Terms and Conditions, which shall remain in full force and effect. No waiver of any of these Terms and Conditions shall be deemed a further or continuing waiver of such term or any other term. Except as expressly provided elsewhere in our Site, these Terms and Conditions constitute the entire agreement between You and I&E with respect to your use of this Site.',
  },
  {
    t: 'p',
    text: 'TO THE FULLEST EXTENT PERMITTED BY LAW, THIS AGREEMENT PROVIDES THAT ALL DISPUTES BETWEEN YOU AND I&E WILL BE RESOLVED BY BINDING ARBITRATION AND NOT IN COURT OR BY JURY TRIAL. TO THE FULLEST EXTENT PERMITTED BY LAW, YOU GIVE UP YOUR RIGHT TO PARTICIPATE AS A CLASS REPRESENTATIVE OR CLASS MEMBER ON ANY CLASS CLAIM YOU MAY HAVE AGAINST I&E INCLUDING ANY RIGHT TO CLASS ARBITRATION OR ANY CONSOLIDATION OF INDIVIDUAL ARBITRATIONS.',
  },
  { t: 'h2', text: 'PRIVACY POLICY' },
  {
    t: 'p',
    text: (
      <>
        The purpose of this Privacy Policy is to give you a summary of the ways in which I&amp;E
        collects, maintains, and uses your information. Please feel free to contact us by email at{' '}
        <a
          href="mailto:info@insuranceandestates.com"
          className="underline underline-offset-2 hover:text-[#0D1B3D]"
        >
          info@insuranceandestates.com
        </a>{' '}
        with any questions or concerns about this Privacy Policy or the information we gather
        about you.
      </>
    ),
  },
  { t: 'h2', text: 'How We Collect Your Information' },
  {
    t: 'p',
    text: 'We gather information about you as you use our websites, contact our customer service representatives, fill out online order forms or information request sheets, and provide your information to our sales agents. We use cookies and pixel tags to track your usage of our websites. We also use online order forms and information request sheets to obtain information from you necessary to process your orders and provide you with requested information. When you call the numbers on our websites and speak with our customer service representatives, we collect information provided during the call to ensure the best quality of service and the correct processing of your orders.',
  },
  { t: 'h2', text: 'Information We Collect' },
  {
    t: 'p',
    text: 'We collect various types of Customer Information. A summary of the types of information that we collect is set forth below:',
  },
  {
    t: 'p',
    text: '-Customer Contact Information. Your Customer Contact Information is any information needed to contact you and fulfill your orders and requests such as your name, address, phone number, fax number, and email address.',
  },
  {
    t: 'p',
    text: '-Private Customer Information. Private Customer Information is that information that may be necessary to check credit and process payments. Such information includes your Social Security Number, credit card information, and banking and wiring information.',
  },
  {
    t: 'p',
    text: '-Customer Order Information. Customer Order Information is that information necessary to complete your orders and requests for information. Such information may include your Customer Contact Information, programming and packaging selections, your billing and shipping information, as well as other details pertaining to your order of products and services through us.',
  },
  {
    t: 'p',
    text: '-Demographical Information. Demographical Information is publicly available information that we may learn about you regarding such things as your age, income, home ownership, household size, etc. that helps us to provide you with better offers for products and services.',
  },
  {
    t: 'p',
    text: '-Website Usage Information. Website Usage Information is information that we collect, via anonymous third-party cookies, that tells us about the way you use and navigate through our websites.',
  },
  {
    t: 'p',
    text: '– This site uses proprietary analytics systems to help improve usability and the customer experience. We may record mouse clicks, mouse movements, scrolling activity, user agent, browser version, operating system, browser extensions installed, browser features enabled, and other non-personally identifiable behavioral and non-behavioral information. You can choose to disable these features by electing to use the private browser setting and/or disabling javascript. Note, that doing so will disable other features that this site may employ.',
  },
  { t: 'h2', text: 'Security Measures' },
  {
    t: 'p',
    text: 'I&E has implemented a variety of encryption and security technologies and procedures to protect information stored in our computer systems from unauthorized access. We also maintain procedural safeguards that restrict access to your Customer Information to employees (or people working on our behalf and under confidentiality agreements) who need to know your Customer Information in order to provide the products and services that you request.',
  },
  { t: 'h2', text: 'Use and sharing of customer information' },
  {
    t: 'p',
    text: 'All of your Customer Information is used in an effort to process your orders and requests and to provide you with the products and services you desire. We may share your Customer Information with third parties in order to complete your purchases of products and services as described below. In addition, your Customer Information may be used and shared in an effort to present to you other special offers and promotions that may become available. The extent to which we use and share your Customer Information depends upon the nature of and purpose for which we use and share it. A summary of how we share your Customer Information with third parties is set forth as follows:',
  },
  {
    t: 'p',
    text: '-With Third Party Product and Service Providers. We share your Customer Information, as needed, to the third parties who actually provide the products and services you request. We frequently act as a third party marketer and seller of various brand name products and services, and we provide these companies with the information necessary to carry out your orders. How these companies use your Customer Information, once we have passed it on to them, is governed by their respective privacy policies and procedures.',
  },
  {
    t: 'p',
    text: '-With Third Party Advertisers. Although we never share your Private Customer Information with any third parties, except with the Third Party Product and Service Providers described above, we may share other types of your Customer Information with third party advertisers who are able to use that information to provide you with special offers or promotions. The ways in which such advertisers may subsequently use your Customer Information is governed by their own privacy policies and procedures. You may opt out from having us share your Customer Information with Third Party Advertisers by following the steps in the next section.',
  },
  {
    t: 'p',
    text: '-With Third Party Cookies. We allow third-parties to collect anonymous information when you visit our website and to use that information to serve ads for our products or services when you visit the other websites. These third-parties may use anonymous information (e.g., navigational, non-personally identifiable information, click stream information, browser type, time and date, subject of advertisements clicked or scrolled over, etc.) during your visits to our website in order to provide advertisements about our goods and services likely to be of interest to you. These parties may use a cookie or a third party web beacon, or other technologies, to collect this information.',
  },
  { t: 'h2', text: 'Opt-out Procedures' },
  {
    t: 'p',
    text: '-Email Promotions. To opt out from receiving further email communications from us regarding other offers and promotions, you may email us at info@insuranceandestates.com.',
  },
  {
    t: 'p',
    text: '-Third Party Cookies. To opt-out of anonymous third-party advertising cookies, visit the Network Advertising Initiative website, click here http://www.networkadvertising.org/choices/.',
  },
  { t: 'h2', text: 'Google Adsense' },
  {
    t: 'p',
    text: 'Some of the ads may be served by Google. Google’s use of the DART cookie enables it to serve ads to Users based on their visit to our Site and other sites on the Internet. DART uses “non personally identifiable information” and does NOT track personal information about you, such as your name, email address, physical address, etc. You may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at http://www.google.com/privacy_ads.html',
  },
  { t: 'h2', text: 'Telemarketing' },
  {
    t: 'p',
    text: 'IMPORTANT – PLEASE READ: By providing your contact information, including your telephone number, on this Web site, you are expressly granting us permission to contact you even though you may have previously chosen to have your telephone number added to any Do-Not-Call List including lists maintained by us, or any local, state or federal government agency. In addition, your state may have laws that prevent us from calling you on your mobile/cellular telephone. If you use a mobile/cellular telephone as your primary means of communication, please call us toll-free in the U.S. and Canada at 1-855-586-5399.',
  },
  { t: 'h2', text: 'Changes to This Privacy Policy' },
  {
    t: 'p',
    text: 'We will update this Privacy Policy from time to time to reflect changes in our business. If we change how we use your Customer Information or the purposes or entities for and to which we disclose your Customer Information we will post the policy change notification on our web site.',
  },
  { t: 'h2', text: 'Access to information' },
  {
    t: 'p',
    text: 'Should you have any questions about the Customer Information we have about you or to access your information that we have on file, you may email us at info@insuranceandestates.com. We may ask you to pay an administrative fee for accessing or copying your information but will inform you of the anticipated charges and confirm that you want us to proceed before processing your request. If you believe that the Customer Information about you that we have collected is incomplete or inaccurate, I&E will correct the information upon verification of the omission or error and that the person requesting the change is the person about whom the Customer Information relates.',
  },
  { t: 'h2', text: 'If You Are a Resident of California or Delaware' },
  {
    t: 'p',
    text: 'If you are a California or Delaware resident, in addition to the rights set forth above, you have the right to request information from us regarding the manner in which we share certain categories of your Customer Information with third parties, for the third parties’ direct marketing purposes. California and Delaware law provides that you have the right to submit a request to us at the designated address and receive the following information:',
  },
  {
    t: 'ul',
    items: [
      'The categories of information we disclosed to third parties for the third parties direct marketing purposes during the preceding calendar year.',
      'The names and addresses of third parties that received such information.',
      'If the nature of a third party’s business cannot be reasonably determined from the third party’s name, examples of the products or services marketed.',
      'You are entitled to receive a copy of this information in a standardized format and the information will not be specific to you individually. Our designated email address for such requests is info@insuranceandestates.com.',
    ],
  },
  { t: 'h2', text: 'If you are a Purchaser in Washington State:' },
  {
    t: 'p',
    text: 'Washington State requires that sales or use tax is due on certain purchases. The seller may or may not collect and remit retail sales tax on a purchase. Washington state requires the purchaser to file a use tax return if retail sales tax is not assessed at the time of a taxable sale. If the seller to whom the purchaser is referred does not collect retail sales tax on a subsequent purchase, the seller may be required to provide information to the purchaser and the department about the potential sales or use tax liability.',
  },
  {
    t: 'p',
    text: 'This notice is provided under the requirements of L. 2017 Section 205(3). For additional information regarding whether and how to remit sales or use tax consumers may visit the Washington State Department of Revenue website at https://dor.wa.gov/.',
  },
  { t: 'h2', text: 'Changes to this privacy policy' },
  {
    t: 'p',
    text: 'Steven J. Gibbs, Insurance & Estate Strategies and insuranceandestates.com has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.',
  },
  { t: 'p', text: 'The Effective Date hereto shall be April 6, 2018.' },
];

export default async function PrivacyTouPage() {
  const content = await getPageContent('privacytou');
  return (
    <PageShell>
      <PageHero align="left" title={content.heroTitle} />

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-black/5 p-8 md:p-12">
          <div className="space-y-4">
            {blocks.map((block, i) => {
              if (block.t === 'h2') {
                return (
                  <h2
                    key={i}
                    className="text-xl font-medium text-[#0D1B3D] pt-4"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.t === 'ul') {
                return (
                  <ul key={i} className="space-y-2 pl-5 list-disc marker:text-[#0D1B3D]/40">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="text-[#0D1B3D]/70 text-sm md:text-base leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-[#0D1B3D]/70 text-sm md:text-base leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
