import HeroBanner from "@/components/layouts/HeroBanner";
import TabSection from "@/components/layouts/TabSection";
import TapectLayout from "@/components/layouts/TapectLayout";
import TeamsBusinessForm from "@/components/layouts/TeamsBusinessForm";
import PlatformForTeams from "@/components/layouts/PlatformForTeams";
import FAQSection from "@/components/layouts/FAQSection";
import ShimmerCartPage from "@/components/layouts/Shimmar/ShimmerHomePage";
import StructuredData from "@/components/seo/StructuredData";

import {
  fetchPages,
  fetchTab,
  fetchFeatures,
  fetchProductShowCase,
} from "@/components/api/ContentAPI";
import { description } from "@/libs/Assets/helper";
import { headers } from "next/headers";
import { getDomain } from "@/libs/Assets/DomainWiseData";
import { getSEOData } from "@/libs/Assets/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/teams-business";
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

export default async function TeamsBusinessPage() {
  const host = (await headers()).get("host") ?? "tapect.com";
  const domain = getDomain(host);
  const pathname = "/teams-business";
  const seoData = await getSEOData(pathname);
  try {
    const [pagesRes, tabsRes, featuresRes, showcaseRes] = await Promise.all([
      fetchPages(domain),
      fetchTab(domain),
      fetchFeatures(domain),
      fetchProductShowCase(domain),
    ]);

    const getPage = (res: any) =>
      res.data.find((p: any) => p.PageName === "Teams and Business");

    const page = getPage(pagesRes);
    const tabs =
      getPage(tabsRes)?.PageSections?.find(
        (s: any) => s.__component === "layout.tab"
      )?.Tab || [];

    const features =
      getPage(featuresRes)
        ?.PageSections?.filter((s: any) => s.__component === "layout.features")
        ?.flatMap((s: any) => s.FeatureStructure || []) || [];

    const productShowcase =
      getPage(showcaseRes)?.PageSections?.filter(
        (s: any) => s.__component === "layout.product-show-case"
      ) || [];

    const hero = page?.PageSections?.find(
      (s: any) => s.__component === "layout.hero-banner"
    );

    const faq = page?.PageSections?.find(
      (s: any) => s.__component === "layout.faq"
    );

    const no1plateform = page?.PageSections?.find(
      (s: any) => s.__component === "layout.no1-plateform"
    );

    return (
      <>
        <StructuredData pathname={pathname} seoData={seoData} />

        {hero && (
          <HeroBanner
            classname="HeroBanner flex justify-center"
            Title={hero.Title}
            TitleHighlight={hero.TitleHighlight}
            Description={description(hero.Description)}
            ButtonLabel={hero.ButtonText}
            ButtonUrl={hero.ButtonUrl}
            BannerImageHorizontalAlign="herobannermax:right-[-20%]"
            BannerHeight="herobannermax:h-screen h-auto"
            ButtonIcon="/Icons/ButtonIcon.svg"
            BannerImageUrl={hero.BannerImage?.url}
            BannerImageAlt={hero.Title}
            BannerFullWidth={true}
          />
        )}

        <TabSection
          tabs={tabs.map((item: any) => ({
            TabTitle: item.TabTitle,
            TabDescription: description(item.TabDescription),
            imageUrl: item.TabImage?.url,
            altText: item.TabTitle,
          }))}
        />

        <div className="container mx-auto space-y-120 py-60">
          {features.slice(0, 4).map((item: any, i: number) => (
            <TapectLayout
              key={i}
              ImageUrl={item.FeatureImage?.[0]?.url}
              ImageAlt={item.FeatureTitle}
              Title={item.FeatureTitle}
              Description={description(item.FeatureDescription)}
              layout={i % 2 === 1 ? "Reverse" : undefined}
            />
          ))}
        </div>

        {productShowcase[0] && (
          <div id="teamsAndBusinessForm">
            <TeamsBusinessForm
              Title={productShowcase[0].Title}
              Description={description(productShowcase[0].Description)}
              Domain={domain}
            />
          </div>
        )}

        <div className="container mx-auto space-y-120 pb-120 pt-60">
          {features.slice(4, 6).map((item: any, i: number) => (
            <TapectLayout
              key={i}
              ImageUrl={item.FeatureImage?.[0]?.url}
              ImageAlt={item.FeatureTitle}
              Title={item.FeatureTitle}
              Description={description(item.FeatureDescription)}
              ButtonLabel={item.FeatureButtonText}
              ButtonUrl={item.FeatureButtonUrl}
              ButtonIcon="/Icons/ButtonIconWhite.svg"
              layout={i % 2 === 1 ? "Reverse" : undefined}
            />
          ))}
        </div>

        {no1plateform && (
          <PlatformForTeams
            PreTitle={no1plateform.PreTitle}
            TitleHighlight={no1plateform.TitleGradient}
            PostTitle={no1plateform.PostTitle}
            Descripiton={description(no1plateform.Description)}
            ButtonUrl={no1plateform.ButtonUrl}
            ButtonLabel={no1plateform.ButtonText}
            ButtonIcon="/Icons/ButtonIconWhite.svg"
            ImageUrl={no1plateform.Image?.url}
            ImageAlt={no1plateform.Image?.name}
          />
        )}

        <div className="container mx-auto space-y-120 pt-120 pb-60">
          {features.slice(6).map((item: any, i: number) => (
            <TapectLayout
              key={i}
              ImageUrl={item.FeatureImage?.[0]?.url}
              ImageAlt={item.FeatureTitle}
              Title={item.FeatureTitle}
              Description={description(item.FeatureDescription)}
              ButtonLabel={item.FeatureButtonText}
              ButtonUrl={item.FeatureButtonUrl}
              ButtonIcon="/Icons/ButtonIconWhite.svg"
            />
          ))}
        </div>

        {faq && (
          <FAQSection
            Title={faq.Title}
            TitleHighlight={faq.TitleHeading}
            Faq={faq.Accordian?.map((item: any) => ({
              question: item.Question,
              answer: item.Answer,
            }))}
          />
        )}
      </>
    );
  } catch (error) {
    console.error("Error loading Teams and Business page:", error);
    return <ShimmerCartPage />;
  }
}
