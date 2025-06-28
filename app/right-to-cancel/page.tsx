import { Metadata } from "next";
import HeroBanner from "../../components/layouts/HeroBanner";
import { getSEOData } from "@/libs/Assets/seo";

export const revalidate = 60;
export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/right-to-cancel";
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

const RighttoCancel = () => {
  return (
    <>
      <HeroBanner
        classname="HeroBanner-light h-[300px]"
        Title="Right To Cancel"
      />
      <section className="py-120 md:px-0 px-6">
        <div className="container mx-auto space-y-6 Legal-data">
          <h2 className="Title-24">Right to cancel</h2>
          <p className="Description">
            You have the right to cancel this contract within 14 days without
            providing any reason.
          </p>
          <p className="Description">
            The cancellation period expires 14 days from the day you, or a third
            party indicated by you (other than the carrier), take physical
            possession of the last item.
          </p>
          <p className="Description">
            To exercise your right to cancel, you must inform us (tapect, a
            brand by ByteWeb IT Solutions Private Limited, at
            support@tapect.com) of your decision to cancel this contract through
            a clear statement (e.g., a letter sent by post, fax, or email).
            While you may use the attached model cancellation form, it is not
            mandatory. To meet the cancellation deadline, it is sufficient to
            send your communication regarding the exercise of the right to
            cancel before the cancellation period has expired.
          </p>

          <h2 className="Title-24">Effects of cancellation</h2>
          <p className="Description">
            If you cancel this contract, we will reimburse all payments received
            from you, including the costs of delivery (except for any
            supplementary costs if you chose a delivery method other than our
            least expensive standard delivery). However, we may deduct from the
            reimbursement any loss in value of the goods if the loss is due to
            unnecessary handling by you. The reimbursement will be processed
            without undue delay and no later than:
          </p>
          <p className="Description">
            a) 14 days after the day we receive the returned goods from you, or
          </p>
          <p className="Description">
            b) 14 days after you provide evidence that you have returned the
            goods, whichever is earlier, or
          </p>
          <p className="Description">
            c) if no goods were supplied, 14 days after the day we are informed
            of your decision to cancel this contract.
          </p>
          <p className="Description">
            The reimbursement will be made using the same payment method you
            used for the initial transaction, unless you have expressly agreed
            otherwise. In any case, you will not incur any fees as a result of
            the reimbursement.
          </p>
          <p className="Description">
            We may withhold reimbursement until we have received the goods back
            or you have provided evidence of having returned the goods,
            whichever comes first. You must send back the goods or hand them
            over to us without undue delay and in any event no later than 14
            days from the day you communicate your cancellation of this contract
            to us. The deadline is met if you send back the goods before the
            14-day period has expired.
          </p>
          <p className="Description">
            You will bear the direct cost of returning the goods.
          </p>
          <p className="Description">
            You are only liable for any diminished value of the goods resulting
            from handling other than what is necessary to establish the nature,
            characteristics, and functioning of the goods.
          </p>
        </div>
      </section>
    </>
  );
};

export default RighttoCancel;
