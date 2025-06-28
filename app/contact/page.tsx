import { description } from '@/libs/Assets/helper';
import HeroBanner from '@/components/layouts/HeroBanner';
import ContactForm from '@/components/layouts/ContactForm';
import OurLocations from '@/components/layouts/OurLocations';
import {
  fetchPages,
  fetchFeatures,
  fetchOurLocation,
} from '@/components/api/ContentAPI';
import { getSEOData } from "@/libs/Assets/seo";
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/contact";
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
      images: seoData.openGraph?.ogImage?.url
        ? [seoData.openGraph.ogImage.url]
        : [],
      locale: seoData.openGraph?.ogLocale,
      type: seoData.openGraph?.ogType as any,
    },
    twitter: {
      card: seoData.twitter?.twitterCard as any,
      title: seoData.twitter?.twitterTitle || seoData.metaTitle,
      description:
        seoData.twitter?.twitterDescription || seoData.metaDescription,
      site: seoData.twitter?.twitterSite || "",
      creator: seoData.twitter?.twitterCreator || "",
      images: seoData.twitter?.twitterImage?.url
        ? [seoData.twitter.twitterImage.url]
        : [],
    },
    other: seoData.extraMeta || {},
  };
}

export default async function ContactUsPage() {
  try {
    const [pagesRes, featuresRes, locationsRes] = await Promise.all([
      fetchPages(),
      fetchFeatures(),
      fetchOurLocation(),
    ]);

    const findPage = (res: any) =>
      res.data.find((p: any) => p.PageName === "Contact");

    const pageData = findPage(pagesRes);
    const featuresPage = findPage(featuresRes);
    const locationsPage = findPage(locationsRes);

    if (!pageData) return <div>No page content found.</div>;

    const hero = pageData.PageSections?.find(
      (s: any) => s.__component === 'layout.hero-banner'
    );

    const featureItems =
      featuresPage?.PageSections
        ?.filter((s: any) => s.__component === 'layout.features')
        ?.flatMap((s: any) => s.FeatureStructure || []) || [];

    const contactInfo = featureItems.map((item: any) => ({
      icon: item?.FeatureImage?.[0]?.url,
      alt: item?.FeatureTitle,
      title: item?.FeatureTitle,
      description: description(item?.FeatureDescription),
      link: item?.FeatureButtonUrl,
      label: item?.FeatureButtonText,
    }));

    const locationSections =
      locationsPage?.PageSections?.filter(
        (s: any) => s.__component === 'layout.our-location'
      ) || [];

    const mappedLocations = locationSections.flatMap(
      (section: any) =>
        section?.OurLocation?.map((loc: any) => ({
          LocationName: loc.Country,
          LocationFlagImage: loc.Flag?.url,
          Address: loc.Address,
          PhoneIcon: loc.PhoneIcon?.url,
          PhoneNumber: loc.PhoneNumber,
          EmailIcon: loc.EmailIcon?.url,
          EmailId: loc.EmailAddress,
        })) || []
    );

    return (
      <>
        {hero && (
          <HeroBanner
            classname="HeroBanner"
            Title={hero.Title}
            TitleHighlight={hero.TitleHighlight}
            Description={description(hero.Description)}
            BannerImageUrl="#"
            BannerImageAlt=""
            BannerHeight="herobannermax:h-[581px] justify-center pb-4"
            BannerFullWidth
            BannerSize="hidden"
            BannerBackgroundImageUrl="#"
          />
        )}

        <ContactForm ContactInfo={contactInfo} />

        <OurLocations
          Title="Our"
          TitleHightlight="Locations"
          Locations={mappedLocations}
        />
      </>
    );
  } catch (e: any) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-red-600">
        Failed to load contact page: {e.message || "Unknown error"}
      </div>
    );
  }
}
