import { headers } from "next/headers";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";

import HeroBanner from "@/components/layouts/HeroBanner";
import TapectLayout from "@/components/layouts/TapectLayout";
import Countersection from "@/components/layouts/AboutUs/Countersection";
import CurrenctOpeningCTA from "@/components/layouts/AboutUs/CurrenctOpeningCTA";
import ShimmerCartPage from "@/components/layouts/Shimmar/ShimmerHomePage";

import { fetchCounter, fetchCounterIconBox, fetchFeatures, fetchPages } from "@/components/api/ContentAPI";
import { getSEOData } from "@/libs/Assets/seo";
import { getDomain } from "@/libs/Assets/DomainWiseData";
import { description } from "@/libs/Assets/helper";

export const revalidate = 60;

const getPages = unstable_cache(fetchPages, ["about-pages"], { revalidate: 60 });
const getFeatures = unstable_cache(fetchFeatures, ["about-features"], { revalidate: 60 });
const getCounter = unstable_cache(fetchCounter, ["about-counter"], { revalidate: 60 });
const getCounterIcons = unstable_cache(fetchCounterIconBox, ["about-counter-icons"], { revalidate: 60 });

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/about-us";
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

export default async function AboutPage() {
  const host = (await headers()).get("host") ?? "tapect.com";
  const domain = getDomain(host);

  try {
    const [pagesRes, featuresRes, counterRes, counterIconRes] = await Promise.all([
      getPages(domain),
      getFeatures(domain),
      getCounter(domain),
      getCounterIcons(domain),
    ]);

    const getPage = (res: any) => res.data.find((p: any) => p.PageName === "About Us");

    const page = getPage(pagesRes);

    const featureItems =
      getPage(featuresRes)?.PageSections?.filter((s: any) => s.__component === "layout.features")
        ?.flatMap((s: any) => s.FeatureStructure || []) || [];

    const counterData =
      getPage(counterRes)?.PageSections?.filter((s: any) => s.__component === "layout.coutner") || [];

    const counterItems =
      getPage(counterIconRes)?.PageSections?.filter((s: any) => s.__component === "layout.coutner") || [];

    const hero = page?.PageSections?.find((s: any) => s.__component === "layout.hero-banner");
    const jobCTA = page?.PageSections?.find((s: any) => s.__component === "layout.job-openings-cta");

    const counterMapped = counterItems.flatMap((item: any) =>
      item?.IconBox?.map((icon: any) => ({
        ImageUrl: icon?.IconUrl?.url,
        CounterNumber: icon?.IconBoxTitle,
        CounterTitle: description(icon?.IconBoxDescription),
      })) || []
    );

    return (
      <>
        {hero && (
          <HeroBanner
            classname="HeroBanner-light flex justify-center"
            Title={hero.Title}
            TitleHighlight={hero.TitleHighlight}
            BannerHeight="lg:h-[581px]"
            TextContainerWidth="lg:w-[60%] w-full"
            BannerImageHorizontalAlign="herobannermax:right-[-5%]"
            BannerImageUrl={hero.BannerImage?.url}
            BannerImageAlt={hero.Title}
            BannerFullWidth={true}
            BannerSize="w-[65%] mx-auto lg:mx-0"
          />
        )}

        <div className="container mx-auto mt-120 mb-60">
          {featureItems.map((item, index) => (
            <TapectLayout
              key={index}
              ImageUrl={item?.FeatureImage?.[0]?.url}
              ImageAlt={item?.FeatureTitle}
              Title={item?.FeatureTitle}
              Description={description(item?.FeatureDescription)}
            />
          ))}
        </div>

        {counterData.length > 0 && (
          <Countersection
            Title={counterData[0]?.Title}
            Description={description(counterData[0]?.Description)}
            CounterData={counterMapped}
            bgImage={counterData[0]?.Image?.url}
          />
        )}

        {jobCTA && (
          <CurrenctOpeningCTA
            Title={jobCTA.Title}
            TitleHighlight={jobCTA.TitleHighlight}
            ButtonLabel={jobCTA.ButtonText}
            ButtonURL={jobCTA.ButtonUrl}
          />
        )}
      </>
    );
  } catch (err) {
    console.error("Error loading About page:", err);
    return <ShimmerCartPage />;
  }
}
