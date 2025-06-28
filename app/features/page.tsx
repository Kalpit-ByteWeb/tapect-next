import HeroBanner from "@/components/layouts/HeroBanner";
import TabSection from "@/components/layouts/TabSection";
import TapectLayout from "@/components/layouts/TapectLayout";
import ProductShowCase from "@/components/layouts/ProductShowCase";
import AdvanceFeatures from "@/components/layouts/AdvanceFeatures";
import CentralisedConsole from "@/components/layouts/CentralisedConsole";
import FeatureSection from "@/components/layouts/FeatureSection";
import FAQSection from "@/components/layouts/FAQSection";
import ShimmerCartPage from "@/components/layouts/Shimmar/ShimmerHomePage";
import StructuredData from "@/components/seo/StructuredData";
import OrderingExperience from "@/components/layouts/OrderingExperience";

import { fetchProducts, StrapiProduct } from "@/components/api/ProductsAPI";
import {
  fetchCentraliedSection,
  fetchFeatures,
  fetchIconList,
  fetchPages,
  fetchProductShowCase,
  fetchTab,
} from "@/components/api/ContentAPI";
import { description } from "@/libs/Assets/helper";
import { headers } from "next/headers";
import { getDomain } from "@/libs/Assets/DomainWiseData";
import { getSEOData } from "@/libs/Assets/seo";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/features";
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

export default async function FeaturesPage() {
  const host = (await headers()).get("host") ?? "tapect.com";
  const domain = getDomain(host);
  const pathname = "/features";

  try {
    const [
      productsRes,
      pagesRes,
      featuresRes,
      tabsRes,
      showcaseRes,
      centralRes,
      iconRes,
    ] = await Promise.all([
      fetchProducts(domain),
      fetchPages(domain),
      fetchFeatures(domain),
      fetchTab(domain),
      fetchProductShowCase(domain),
      fetchCentraliedSection(domain),
      fetchIconList(domain),
    ]);

    const wantedProductNames = [
      "Tapect Lite - Black",
      "Tapect White Label Card",
      "Tapect Metal Card",
    ];

    const selectedProducts = productsRes.data
      .filter((p: StrapiProduct) => wantedProductNames.includes(p.ProductName))
      .sort(
        (a, b) =>
          wantedProductNames.indexOf(a.ProductName) -
          wantedProductNames.indexOf(b.ProductName)
      );

    const getPage = (res: any) =>
      res.data.find((p: any) => p.PageName === "Features");

    const pageData = getPage(pagesRes);
    const hero = pageData?.PageSections?.find(
      (s: any) => s.__component === "layout.hero-banner"
    );
    const faq = pageData?.PageSections?.find(
      (s: any) => s.__component === "layout.faq"
    );

    const featuresPageSections = getPage(featuresRes)?.PageSections || [];
    const featureComponents = featuresPageSections.filter(
      (s: any) => s.__component === "layout.features"
    );
    const features = featureComponents.flatMap((s: any) => s.FeatureStructure || []);

    const tabs = getPage(tabsRes)?.PageSections?.find(
      (s: any) => s.__component === "layout.tab"
    )?.Tab || [];

    const productShowcaseSections = getPage(showcaseRes)?.PageSections?.filter(
      (s: any) => s.__component === "layout.product-show-case"
    ) || [];

    const iconBoxes = productShowcaseSections.flatMap((s: any) => s.IconBox || []);

    const centralisedData = getPage(centralRes)?.PageSections?.filter(
      (s: any) => s.__component === "layout.centralised-management"
    ) || [];

    const iconListData = getPage(iconRes)?.PageSections?.filter(
      (s: any) => s.__component === "layout.centralised-management"
    )?.flatMap((s: any) => s.IconList || []) || [];

    const seoData = await getSEOData(pathname);

    return (
      <>
        <StructuredData pathname={pathname} seoData={seoData} />

        {hero && (
          <HeroBanner
            classname="HeroBanner flex justify-center"
            Title={hero.Title}
            TitleHighlight={hero.TitleHighlight}
            Description={description(hero.Description)}
            BannerImageHorizontalAlign="herobannermax:right-[-20%]"
            BannerHeight="herobannermax:h-screen h-auto"
            ButtonLabel={hero.ButtonText}
            ButtonUrl={hero.ButtonUrl}
            ButtonIcon="/Icons/ButtonIcon.svg"
            BannerImageUrl={hero.BannerImage?.url}
            BannerImageAlt={hero.Title}
            BannerFullWidth
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
          {features.slice(0, 2).map((item: any, index: number) => (
            <TapectLayout
              key={index}
              ImageUrl={item.FeatureImage?.[0]?.url}
              ImageAlt={item.FeatureTitle}
              Title={item.FeatureTitle}
              Description={description(item.FeatureDescription)}
              ButtonLabel={item.FeatureButtonText}
              ButtonUrl={item.FeatureButtonUrl}
              ButtonIcon="/Icons/ButtonIconWhite.svg"
              layout={index === 1 ? "Reverse" : undefined}
            />
          ))}
        </div>

        {productShowcaseSections[0] && (
          <ProductShowCase
            Title={productShowcaseSections[0].Title}
            TitleHighlight={productShowcaseSections[0].TitleHighlight}
            Description={description(productShowcaseSections[0].Description)}
            Productdatas={selectedProducts}
            ViewProductBtnUrl={productShowcaseSections[0].ButtonUrl}
            ViewProductBtnLabel={productShowcaseSections[0].ButtonText}
            ViewProductBtnIconUrl="/Icons/ButtonIcon.svg"
          />
        )}

        {features.length > 5 && featureComponents[1] && (
          <AdvanceFeatures
            Title={featureComponents[1]?.Title}
            TitleHighlight={featureComponents[1]?.TitleHighlight}
            Description={description(featureComponents[1]?.Description)}
            featuredata={features.slice(2, 5).map((item: any) => ({
              FeatureTitle: item.FeatureTitle,
              FeatureDescription: description(item.FeatureDescription),
              FeatureImageUrl: item.FeatureImage?.[0]?.url,
              FeatureImageAlt: item.FeatureTitle,
            }))}
          />
        )}

        {centralisedData[0] && (
          <CentralisedConsole
            Title={centralisedData[0].Title}
            TitleHighlight={centralisedData[0].TitleHighlight}
            Description={description(centralisedData[0].Description)}
            ImageUrl={centralisedData[0].Image?.url}
            IconList={iconListData.map((item: any) => ({
              IconsListTitle: item.IconListTitle,
              IconListImageUrl: item.IconListImage?.url,
              IconListImageAlt: item.IconListTitle,
            }))}
          />
        )}

        <div className="bg-Feature-bg py-12 px-0 md:px-0 md:mx-6 lg:mx-0">
          <div className="container mx-auto gap-6 grid md:grid-cols-2 grid-cols-1">
            {features.slice(5).map((item: any, i: number) => (
              <FeatureSection
                key={i}
                title={item.FeatureTitle}
                description={description(item.FeatureDescription)}
                imageUrl={item.FeatureImage?.[0]?.url}
                imageAlt={item.FeatureTitle}
                layout="Vertical2"
              />
            ))}
          </div>
        </div>

        {productShowcaseSections[1] && (
          <OrderingExperience
            Title={productShowcaseSections[1].Title}
            Description={description(productShowcaseSections[1].Description)}
            Iconlistdatas={iconBoxes.map((item: any) => ({
              IconsListTitle: item.IconBoxTitle,
              IconsListDescription: description(item.IconBoxDescription),
              IconUrl: item.IconUrl?.url,
              IconAlt: item.IconBoxTitle,
            }))}
            layout="WithoutImage"
            ViewProductBtnUrl={productShowcaseSections[1].ButtonUrl}
            ViewProductBtnLabel={productShowcaseSections[1].ButtonText}
            ViewProductBtnIconUrl="/Icons/ButtonIcon.svg"
          />
        )}

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
  } catch (err) {
    console.error("Error loading Features page:", err);
    return <ShimmerCartPage />;
  }
}
