import { getSEOData } from "@/libs/Assets/seo";
import HeroBanner from "../../components/layouts/HeroBanner";
import StructuredData from "../../components/seo/StructuredData";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/refund_policy";
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

const RefundPolicy = async () => {
  const pathname = "/refund_policy";
  const seoData = await getSEOData(pathname);
  return (
    <>
      <StructuredData pathname={pathname} seoData={seoData} />
      <HeroBanner
        classname="HeroBanner-light h-[300px]"
        Title="Refund Policy"
      />
      <section className="py-120 md:px-0 px-6">
        <div className="container mx-auto space-y-6 Legal-data">
          <h2 className="Title-24">Return Policy</h2>
          <p className="Description">
            This Refund Policy describes how we manage refunds.
          </p>
          <p className="Description">
            Your satisfaction is our top priority, and we take every possible
            step to ensure you are happy with your purchases. If for any reason
            you are not entirely satisfied with an item purchased through our
            website, we accept returns and offer replacements, provided that the
            terms and conditions outlined in this policy are met.
          </p>
          <p className="Description">
            Please note that{" "}
            <span className="font-bold text-primary">
              refunds are not available for completed services.
            </span>
            Additionally, items not received by us will not qualify for a
            replacement, and shipping and insurance charges are non-refundable.
          </p>
          <h2 className="Title-24">Acceptable Return Details</h2>
          <p className="Description">
            We accept product returns for a replacement under the following
            conditions:
          </p>
          <p className="Description">
            <span className="font-bold text-primary">
              Incorrect Order Received:
            </span>{" "}
            If the products you received are fundamentally different from what
            you ordered (e.g., incorrect branding or customization).
          </p>
          <p className="Description">
            <span className="font-bold text-primary"> Damages and Issues:</span>{" "}
            If a product is defective, your order will be replaced. All claims
            for damaged items must be made within 48 hours of receiving your
            order and must include photo proof. It is crucial to inspect your
            order immediately upon receipt and notify us of any damage. If no
            claim for damage is made within 48 hours of delivery, no action will
            be taken.
          </p>
          <p className="Description">
            <span className="font-bold text-primary">
              Under Supply of Products:
            </span>{" "}
            In the rare event that we supply fewer products than ordered, please
            notify us of this error within 48 hours of your order's arrival so
            that we can provide the additional units to complete the order.
          </p>
          <h2 className="Title-24">Refunds</h2>
          <p className="Description">
            We will notify you once we have received and inspected your return,
            informing you whether your refund has been approved. If approved,
            the refund will be automatically processed to your original payment
            method. Please note that it may take some time for your bank or
            credit card company to process and post the refund.
          </p>
          <p className="Description">
            At <span className="font-bold text-primary">tapect</span>, we take
            pride in offering high-quality customized products to our customers.
            However, due to the nature of these products, we do not offer
            refunds for customized items. Once an order for a customized product
            has been placed, our team immediately begins working on creating the
            unique design requested by the customer. This process is both
            time-consuming and labor-intensive, making it impractical to offer
            refunds for these products.
          </p>
          <p className="Description">
            We strongly recommend that customers carefully review their order
            and design specifications before placing an order for a customized
            product. If you have any questions or concerns about your order,
            please contact our customer service team prior to placing your
            order.
          </p>
        </div>
      </section>
    </>
  );
};

export default RefundPolicy;
