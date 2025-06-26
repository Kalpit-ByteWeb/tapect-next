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

export default async function ContactUsPage() {
  let pageData: any = null;
  let featureItems: any[] = [];
  let locationSections: any[] = [];
  let error: string | null = null;

  try {
    const [pagesRes, featuresRes, locationsRes] = await Promise.all([
      fetchPages(),
      fetchFeatures(),
      fetchOurLocation(),
    ]);

    const getPage = (res: any) =>
      res.data.find((p: any) => p.PageName === 'Contact');

    pageData = getPage(pagesRes);

    featureItems =
      getPage(featuresRes)
        ?.PageSections?.filter((s: any) => s.__component === 'layout.features')
        ?.flatMap((s: any) => s.FeatureStructure || []) || [];

    locationSections =
      getPage(locationsRes)?.PageSections?.filter(
        (s: any) => s.__component === 'layout.our-location',
      ) || [];
  } catch (e: any) {
    error = e.message || 'An error occurred while fetching content.';
  }

  if (error) return <div>{error}</div>;
  if (!pageData) return <div>No data found.</div>;

  const hero = pageData.PageSections?.find(
    (s: any) => s.__component === 'layout.hero-banner',
  );

  const contactInfo = featureItems.map((item: any) => ({
    icon: item?.FeatureImage?.[0]?.url,
    alt: item?.FeatureTitle,
    title: item?.FeatureTitle,
    description: description(item?.FeatureDescription),
    link: item?.FeatureButtonUrl,
    label: item?.FeatureButtonText,
  }));

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
      })) || [],
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
}
