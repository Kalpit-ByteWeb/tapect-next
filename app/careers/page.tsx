import { headers } from "next/headers";
import HeroBanner from "@/components/layouts/HeroBanner";
import BenefitsPerks from "@/components/layouts/BenefitsPerks";
import JobOpenings from "@/components/layouts/Jobs/JobOpenings";
import WorkBetterSection from "@/components/layouts/Jobs/WorkBetterSection";
import ShimmerCartPage from "@/components/layouts/Shimmar/ShimmerHomePage";

import {
  fetchCentraliedSection as fetchCentral,
  fetchFeatures as fetchFeature,
  fetchPages as fetchPage,
} from "@/components/api/ContentAPI";
import { getSEOData as fetchSEO } from "@/libs/Assets/seo";
import { description } from "@/libs/Assets/helper";
import { getDomain } from "@/libs/Assets/DomainWiseData";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";

export const revalidate = 60;

const getPages = unstable_cache(fetchPage, ['careers-pages'], { revalidate });
const getFeatures = unstable_cache(fetchFeature, ['careers-features'], { revalidate });
const getCentral = unstable_cache(fetchCentral, ['careers-central'], { revalidate });
const getSEOData = unstable_cache(fetchSEO, ['careers-seo'], { revalidate });

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/careers";
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

export default async function CareersPage() {
  const host = (await headers()).get("host") ?? "tapect.com";
  const domain = getDomain(host);

  try {
    const [pagesRes, featuresRes, centralRes] = await Promise.all([
      getPages(domain),
      getFeatures(domain),
      getCentral(domain),
    ]);

    const getPage = (res: any) => res.data.find((p: any) => p.PageName === "Careers");

    const pageData = getPage(pagesRes);
    const featureDataRaw =
      getPage(featuresRes)?.PageSections?.filter(
        (s: any) => s.__component === "layout.features"
      ) || [];

    const featureItems =
      featureDataRaw?.flatMap((s: any) => s.FeatureStructure || []) || [];

    const centralData =
      getPage(centralRes)?.PageSections?.filter(
        (s: any) => s.__component === "layout.centralised-management"
      ) || [];

    const hero = pageData?.PageSections?.find(
      (s: any) => s.__component === "layout.hero-banner"
    );

    const featuresdata = featureItems.slice(0, 3).map((item: any) => ({
      IconUrl: item?.FeatureImage?.[0]?.url,
      FeatureTitle: item?.FeatureTitle,
      FeatureDescription: description(item?.FeatureDescription),
    }));

    const benefitsPerksData = featureItems.slice(3).map((item: any) => ({
      IconUrl: item?.FeatureImage?.[0]?.url,
      Title: item?.FeatureTitle,
      Description: description(item?.FeatureDescription),
    }));

    return (
      <>
        {hero && (
          <HeroBanner
            classname="HeroBanner-light flex justify-center"
            Title={hero.Title}
            BannerImageUrl={hero.BannerImage?.url}
            BannerImageAlt={hero.Title}
            BannerHeight="xl:h-[581px] justify-center"
            BannerImageHorizontalAlign="herobannermax:right-[-30%]"
            BannerFullWidth={true}
            ButtonLabel={hero.ButtonText}
            ButtonUrl={hero.ButtonUrl}
            ButtonIcon="/Icons/ButtonIconWhite.svg"
            ButtonPrimary={true}
            BannerSize="w-auto ml-auto hidden xl:block"
          />
        )}

        {featureDataRaw.length > 0 && (
          <WorkBetterSection
            Title={featureDataRaw[0]?.Title}
            Description={description(featureDataRaw[0]?.Description)}
            Feature={featuresdata}
          />
        )}

        {featureDataRaw.length > 1 && (
          <BenefitsPerks
            Title={featureDataRaw[1]?.Title}
            TitleHighlight={featureDataRaw[1]?.TitleHighlight}
            Description={description(featureDataRaw[1]?.Description)}
            BenefitsPerks={benefitsPerksData}
          />
        )}

        {centralData.length > 0 && (
          <JobOpenings
            Title={centralData[0]?.Title}
            TitleHighlight={centralData[0]?.TitleHighlight}
            Description={description(centralData[0]?.Description)}
          />
        )}
      </>
    );
  } catch (error) {
    console.error("Error loading careers page:", error);
    return <ShimmerCartPage />;
  }
}
