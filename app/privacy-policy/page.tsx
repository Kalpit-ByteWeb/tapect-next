import HeroBanner from "@/components/layouts/HeroBanner";
import StructuredData from "@/components/seo/StructuredData";
import { getSEOData } from "@/libs/Assets/seo";
import { Metadata } from "next";

export const revalidate = 60;
export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/privacy-policy";
  const seoData = await getSEOData(pathname);

  if (!seoData) {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    robots: seoData.metaRobots,
     alternates: {
    canonical: seoData.canonicalURL,
     },
    openGraph: {
      title: seoData.openGraph?.ogTitle || seoData.metaTitle,
      description: seoData.openGraph?.ogDescription || seoData.metaDescription,
      url: seoData.openGraph?.ogUrl || "",
      siteName: seoData.openGraph?.ogSiteName || "",
      images: seoData.openGraph?.ogImage?.url ? [seoData.openGraph.ogImage.url] : [],
      locale: seoData.openGraph?.ogLocale,
      type: seoData.openGraph?.ogType as any,
    },
    twitter: {
      card: seoData.twitter?.twitterCard as any,
      title: seoData.twitter?.twitterTitle || seoData.metaTitle,
      description: seoData.twitter?.twitterDescription || seoData.metaDescription,
      site: seoData.twitter?.twitterSite || "",
      creator: seoData.twitter?.twitterCreator || "",
      images: seoData.twitter?.twitterImage?.url ? [seoData.twitter.twitterImage.url] : [],
    },
    other: seoData.extraMeta || {},
  };
}

const PrivacyPolicy = async () => {
  const pathname = "/privacy-policy";
  const seoData = await getSEOData(pathname);
  return (
    <>
      <StructuredData pathname={pathname} seoData={seoData} />
      <HeroBanner
        classname="HeroBanner-light h-[300px]"
        Title="Privacy Policy"
      />
      <section className="py-120 md:px-0 px-6">
        <div className="container mx-auto space-y-6 Legal-data">
          <p className="Description">
            <span className="Title-24">Tapect</span> (“we”, “us” or “our”)
            operates the website at tapect.com (collectively, the “Website”) and
            is committed to protecting your privacy.
          </p>
          <p className="Description">
            This privacy policy outlines how we collect, use, process, store,
            share, and disclose your personal information through our Website
            (“Privacy Policy”). For our terms and conditions or to contact us,
            please reach out to support@tapect.com. Any capitalized terms used
            in this Privacy Policy have the same meaning as those defined in our
            terms and conditions.
          </p>
          <h2 className="Title-24">Openness and Transparency</h2>
          <p className="Description">
            We are committed to safeguarding your privacy and respecting your
            rights under the Australian Privacy Principles (“APPs”) contained in
            the Privacy Act 1988 (Cth) and the General Data Protection
            Regulation (EU 2016/679) (the “GDPR”) (collectively, “Privacy
            Laws”). As a data controller under the GDPR, we undertake all
            necessary steps to comply with these Privacy Laws and address any
            inquiries or complaints related to compliance.
          </p>
          <p className="Description">
            By accessing and using our Website, Products, and Services, you
            consent to the collection, use, processing, storage, and disclosure
            of your Personal Information as described in this Privacy Policy.
          </p>
          <h2 className="Title-24">Your Information</h2>
          <p className="Description">
            Under Section 6 of the Privacy Act, personal information is defined
            as information or an opinion about an identified individual, or an
            individual who is reasonably identifiable. An identifiable natural
            person can be identified directly or indirectly through identifiers
            such as a name, identification number, location data, online
            identifier, or factors specific to their physical, physiological,
            genetic, mental, economic, cultural, or social identity.
          </p>
          <p className="Description">
            Regarding your personal information: (a) We will collect personal
            information only by lawful and fair means and not in an unreasonably
            intrusive manner. (b) We will only collect personal information
            about you if you voluntarily provide it to us or if you explicitly
            consent to us collecting it. Providing us with personal information
            constitutes your consent. (c) We may also collect personal
            information when you: i. Complete a profile or set up an account to
            use our Services and Products; ii. Communicate with us; iii. Visit
            our Website; iv. Provide feedback; or v. Complete online surveys.
            (d) If you use a pseudonym or do not provide identifiable
            information, we may not be able to provide you with all of our
            Services and/or Products. To remain anonymous, do not sign in or
            provide any information that might identify you. (e) We require
            accurate, up-to-date, and complete personal information at the time
            of collection.
          </p>
          <p className="Description">
            We ask that you do not disclose sensitive personally identifiable
            information (e.g., racial or ethnic origin, religion, health,
            criminal background) on our Website. If you do provide sensitive
            personal information, you consent to its collection and handling as
            per this Privacy Policy.
          </p>
          <h2 className="Title-24">Information We May Collect</h2>
          <p className="Description">
            The personal information we collect includes, but is not limited to:
          </p>
          <ul>
            <li>Your full name;</li>
            <li>Email address;</li>
            <li>Phone number;</li>
            <li>
              Device ID, device type, geo-location information, computer and
              connection information, statistics on page views, traffic data, ad
              data, IP address, and standard web log information;
            </li>
            <li>
              Additional information you provide directly through our Website or
              other accounts from which we collect information;
            </li>
            <li>Information provided through customer surveys;</li>
            <li>
              Billing and payment information, including details collected
              through Stripe or Shopify; and
            </li>
            <li>
              Any other personal information necessary to facilitate your
              dealings with us.
            </li>
          </ul>
          <p className="Description">
            We may also ask for optional information such as:
          </p>
          <ul>
            <li>
              Social media profile details (LinkedIn, Instagram, Facebook);
            </li>
            <li>Company details (address, website, phone number);</li>
            <li>Job classification;</li>
            <li>Office phone number;</li>
            <li>Details of personal and professional connections;</li>
            <li>Files that may contain personal information;</li>
            <li>A personal headshot.</li>
          </ul>
          <p className="Description">
            Providing optional information is voluntary. If shared, you consent
            to its collection and handling according to this Privacy Policy.
          </p>
          <h2 className="Title-24">Information About Children Under 18</h2>
          <p className="Description">
            Our Website is not intended for individuals under the age of 18. We
            do not knowingly collect Personal Information from children under 18
            years old.
          </p>
          <h2 className="Title-24">Legal Basis for Processing Information</h2>
          <p className="Description">
            Under the GDPR, we must have a legal basis to process Personal
            Information from individuals in the European Union. Our legal bases
            include:
          </p>
          <ul>
            <li>
              Necessity for providing access to and use of our Products,
              Services, and Website;
            </li>
            <li>
              Our legitimate interests in operating and improving our Products,
              Services, and Website;
            </li>
            <li>
              Your explicit consent, which you may withdraw at any time; or
            </li>
            <li>
              Legal obligations requiring us to process your Personal
              Information.
            </li>
          </ul>
          <h2 className="Title-24">How Your Information Is Used</h2>
          <p className="Description">
            We use, process, and disclose your Personal Information or Optional
            Information for purposes including:
          </p>
          <ul>
            <li>Providing our Website, Products, and Services;</li>
            <li>
              Administering, protecting, improving, or optimizing our Website,
              Products, and Services;
            </li>
            <li>Billing you through Stripe or Shopify;</li>
            <li>
              Informing you about our Website, Products, Services, surveys, or
              promotional activities;
            </li>
            <li>Responding to inquiries or comments;</li>
            <li>Verifying your identity;</li>
            <li>Other purposes you consent to; and</li>
            <li>Uses required or authorized by relevant Privacy Laws.</li>
          </ul>
          <h2 className="Title-24">Disclosure of Personal Information</h2>
          <p className="Description">
            We may disclose your Personal Information to:
          </p>
          <ul>
            <li>Third parties performing functions on our behalf;</li>
            <li>
              Any person or entity you have consented to disclose your
              information to;
            </li>
            <li>
              External advisors, auditors, lawyers, insurers, and financiers;
            </li>
            <li>
              Payment processing service providers such as Stripe or Shopify;
            </li>
            <li>
              Persons or entities required or authorized under relevant Privacy
              Laws.
            </li>
          </ul>
          <p className="Description">
            If we no longer need your Personal Information for the purposes
            outlined, we will take reasonable steps to destroy or de-identify
            it.
          </p>
          <h2 className="Title-24">Direct Marketing</h2>
          <p className="Description">
            We may use your Personal Information for direct marketing if:
          </p>
          <ul>
            <li>
              We have your express consent (which you can withdraw at any time
              by contacting us);
            </li>
            <li>We have a legal basis; or</li>
            <li>Permitted by relevant Privacy Laws.</li>
          </ul>
          <p className="Description">
            You can opt out of direct marketing communications at any time by
            following the unsubscribe instructions or contacting us at
            support@tapect.com.
          </p>
          <h2 className="Title-24">Our Website</h2>
          <p className="Description">
            While we strive to protect your information, transmission over the
            internet is not always secure. We are not liable for breaches of
            security or unintended disclosures.
          </p>
          <h2 className="Title-24">Cookies</h2>
          <p className="Description">
            We use cookies, web beacons, and similar technologies (collectively,
            “Cookies”) on our Website. By using our Website, you consent to the
            use of Cookies.
          </p>
          <p className="Description">Cookies help us:</p>
          <ul>
            <li>Identify you as a user;</li>
            <li>Process user requests;</li>
            <li>Improve user experience;</li>
            <li>Remember preferences;</li>
            <li>Monitor and analyze website usage;</li>
            <li>Facilitate communication;</li>
            <li>Control access to content; and</li>
            <li>Protect our Website.</li>
          </ul>
          <p className="Description">
            You can delete or refuse Cookies through your browser settings,
            though this may affect website functionality.
          </p>
          <h2 className="Title-24">Data Storage</h2>
          <p className="Description">
            We store Personal Information electronically or in hard copy, taking
            reasonable steps to protect it. However, we cannot guarantee
            internet security. We may disclose information to third parties,
            including those outside the European Economic Area and Australia,
            but will ensure they adhere to relevant Privacy Laws.
          </p>
          <h2 className="Title-24">Access to Information</h2>
          <p className="Description">
            Under the GDPR, individuals in the EU have rights including:
          </p>
          <ul>
            <li>
              Correction of inaccurate or incomplete Personal Information;
            </li>
            <li>Deletion of Personal Information in certain situations;</li>
            <li>Data portability;</li>
            <li>Withdrawal of consent for processing;</li>
            <li>Objection to automated decisions;</li>
            <li>Restriction of processing in specific circumstances.</li>
          </ul>
          <p className="Description">
            You may request access to or correction of your Personal Information
            by contacting us. We may charge a reasonable fee for retrieving
            information but will not charge for making a request.
          </p>
          <h2 className="Title-24">Third-Party Sites</h2>
          <p className="Description">
            Our Website may link to third-party sites with their own privacy
            policies. We are not responsible for their practices.
          </p>
          <h2 className="Title-24">Contact Information</h2>
          <p className="Description">
            For questions or complaints regarding our Privacy Policy, contact us
            at support@tapect.com. If unresolved, you can lodge a complaint with
            the Office of the Australian Information Commissioner (“OAIC”) or
            the European Data Protection Supervisor (“EDPS”). Visit OAIC or EDPS
            for more information.
          </p>
          <h2 className="Title-24">Notices and Revisions</h2>
          <p className="Description">
            We may update this Privacy Policy from time to time. Non-material
            changes take immediate effect, while material changes will be
            effective 30 days after posting.
          </p>
          <h2 className="Title-24">Contact Information</h2>
          <p className="Description">
            We will cooperate with regulatory authorities to resolve complaints
            about personal information transfers.
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
