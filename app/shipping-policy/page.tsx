import { Metadata } from "next";
import HeroBanner from "../../components/layouts/HeroBanner";
import { getSEOData } from "@/libs/Assets/seo";

export const revalidate = 60;
export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/shipping-policy";
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

const ShippingPolicy = () => {
  return (
    <>
      <HeroBanner
        classname="HeroBanner-light h-[300px]"
        Title="Shipping Policy"
      />
      <section className="py-120 md:px-0 px-6">
        <div className="container mx-auto space-y-6 Legal-data">
          <h2 className="Title-24">Processing your Order</h2>
          <p className="Description">
            Upon placing your order, a confirmation email will be sent to your
            provided email address. Please retain this email as proof of your
            purchase.
          </p>
          <p className="Description">
            We are happy to accommodate special instructions as specified.
            However, if you select a safe drop option and are not present at the
            delivery location, we cannot assume responsibility for the package
            once it has been dropped off.
          </p>
          <p className="Description">
            Deliveries are typically made between Monday and Friday. Exceptions
            may occur based on the chosen delivery method, which might include
            weekend deliveries.
          </p>
          <p className="Description">
            <span className="text-primary font-bold">Please note:</span> Due to
            high demand and workplace social distancing requirements, our
            distribution centre may take slightly longer to process and send
            orders than usual. We appreciate your understanding and patience
            during this time.
          </p>
          <h2 className="Title-24">Tracking Orders</h2>
          <p className="Description">
            All orders include automatic tracking. If your order has not
            arrived, please contact our customer service team for tracking
            assistance at support@tapect.com.
          </p>
          <p className="Description">
            International orders are shipped using the Standard Airmail service,
            which includes tracking. You will receive your tracking number once
            your order has been dispatched. If you request alternative shipping
            arrangements, we cannot guarantee tracking and are not responsible
            for the delivery of such international orders.
          </p>
          <p className="Description">
            If your order does not arrive within 12 business days, please reach
            out to us so we can follow up with our logistics partners.
          </p>

          <h2 className="Title-24">Delivery Times</h2>
          <p className="Description">
            We strive to dispatch orders within 7-10 business days to ensure you
            receive your items as soon as possible. Once dispatched, the
            delivery time will depend on the selected delivery service and your
            location, typically ranging from 2 to 10 days.
          </p>
          <p className="Description">
            <span className="font-bold text-primary">Important Reminders:</span>
          </p>
          <ol>
            <li>
              <span className="text-primary font-bold">Order Accuracy:</span>{" "}
              Upon receiving your order, please verify that all items are
              correct. If you receive an incorrect item, do not open it. We
              cannot accept returns or provide refunds for items that have been
              opened, tampered with, or are not in their original condition.
            </li>
            <li>
              <span className="text-primary font-bold">Damaged Items:</span> If
              you receive a damaged item, contact us within 4 days of delivery.
              Do not dispose of the item, as we will require proof of the damage
              (e.g., images or videos emailed to us).
            </li>
          </ol>
          <p className="Description">
            For assistance or inquiries, please reach out to our customer
            service team.
          </p>
        </div>
      </section>
    </>
  );
};

export default ShippingPolicy;
