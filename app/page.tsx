import { headers } from "next/headers";
import HeroBanner from "@/components/layouts/HeroBanner";
import FeatureSection from "@/components/layouts/FeatureSection";
import ProductShowCase from "@/components/layouts/ProductShowCase";
import FeatureCardSection from "@/components/layouts/FeatureCardSection";
import OrderingExperience from "@/components/layouts/OrderingExperience";
import Abouttapect from "@/components/layouts/Abouttapect";
import FAQSection from "@/components/layouts/FAQSection";
import ShimmerCartPage from "@/components/layouts/Shimmar/ShimmerHomePage";
import { fetchProducts } from "@/components/api/ProductsAPI";
import { fetchPages, fetchFeatures, fetchProductShowCase } from "@/components/api/ContentAPI";
import { description } from "@/libs/Assets/helper";
import { getDomain } from "@/libs/Assets/DomainWiseData";
import { getSEOData } from "@/libs/Assets/seo";
import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/";
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

export default async function Home() {
  const host = (await headers()).get("host") ?? "tapect.com";
  const domain = getDomain(host);
  const pathname = "/";
  const seoData = await getSEOData(pathname);
  
  try {
    const [productsRes, pagesRes, featuresRes, showcaseRes] = await Promise.all([
      fetchProducts(domain),
      fetchPages(domain),
      fetchFeatures(domain),
      fetchProductShowCase(domain),
    ]);
    
    // Your logic to organize fetched data...
    const homePage = (arr: any[]) => arr.find((p) => p.PageName === "Home");
    
    const page = homePage(pagesRes.data);
    const featureSections = homePage(featuresRes.data)?.PageSections?.filter(
      (s: any) => s.__component === "layout.features"
    ) || [];

    const showcaseSections = homePage(showcaseRes.data)?.PageSections?.filter(
      (s: any) => s.__component === "layout.product-show-case"
    ) || [];

    const iconBoxItems = showcaseSections.flatMap((s: any) => s.IconBox || []);
    const featureItems = featureSections.flatMap((s: any) => s.FeatureStructure || []);
    const faq = page?.PageSections?.find((s: any) => s.__component === "layout.faq");
    const hero = page?.PageSections?.find((s: any) => s.__component === "layout.hero-banner");

    const wantedProductNames = [
      "Tapect Lite - Black",
      "Tapect White Label Card",
      "Tapect Metal Card",
    ];

    const selectedProducts = productsRes.data
      .filter((product) => wantedProductNames.includes(product.ProductName))
      .sort(
        (a, b) =>
          wantedProductNames.indexOf(a.ProductName) -
          wantedProductNames.indexOf(b.ProductName)
      );

    const featureData = featureSections?.[1];

    const mappedFeatures = (items: any[], layout: "Vertical" | "Horizontal") =>
      items.map((item: any) => ({
        title: item.FeatureTitle,
        description: description(item.FeatureDescription),
        imageUrl: item.FeatureImage?.[0]?.url,
        imageAlt: item.FeatureTitle,
        layout,
      }));

    return (
      <>
       <StructuredData pathname={pathname} seoData={seoData} />
        {hero && (
          <HeroBanner
            classname="HeroBanner mb-120"
            Title={hero.Title}
            TitleHighlight={hero.TitleHighlight}
            Description={description(hero.Description)}
            ButtonLabel={hero.ButtonText}
            ButtonUrl={hero.ButtonUrl}
            BannerHeight="herobannermax:h-screen h-auto"
            ButtonIcon="/Icons/ButtonIcon.svg"
            BannerImageHorizontalAlign="herobannermax:right-[-20%]"
            BannerImageVerticalAlign="herobannermax:bottom-0"
            BannerImageUrl={hero.BannerImage?.url}
            BannerImageAlt={hero.Title}
            BannerFullWidth={true}
          />
        )}

        {featureItems.slice(0, 1).map((item, i) => (
          <FeatureSection
            key={i}
            title={item.FeatureTitle}
            titleHighlight={item.TitleHighlight}
            description={description(item.FeatureDescription)}
            buttonLabel={item.FeatureButtonText}
            buttonUrl={item.FeatureButtonUrl}
            imageUrl={item.FeatureImage?.[0]?.url}
            imageAlt={item.FeatureTitle}
            buttonIcon="/Icons/ButtonIconWhite.svg"
            layout="Horizontal"
          />
        ))}

        <div className="pb-60 container mx-auto gap-6 flex lg:flex-row flex-col md:px-6 herobannermax:px-0">
          {featureItems.slice(1, 3).map((item, i) => (
            <div key={i} className={`lg:w-${i === 0 ? "3/5" : "2/5"} flex`}>
              <FeatureSection
                title={item.FeatureTitle}
                titleHighlight={item.TitleHighlight}
                description={description(item.FeatureDescription)}
                imageUrl={item.FeatureImage?.[0]?.url}
                imageAlt={item.FeatureTitle}
                layout="Vertical"
              />
            </div>
          ))}
        </div>

        {showcaseSections.length > 0 && (
          <ProductShowCase
            Title={showcaseSections[0].Title}
            TitleHighlight={showcaseSections[0].TitleHighlight}
            Description={description(showcaseSections[0].Description)}
            Productdatas={selectedProducts}
            ViewProductBtnUrl={showcaseSections[0].ButtonUrl}
            ViewProductBtnLabel={showcaseSections[0].ButtonText}
            ViewProductBtnIconUrl="/Icons/ButtonIcon.svg"
          />
        )}

        {featureData?.Description?.length > 0 && (
          <FeatureCardSection
            Title={featureData.Title}
            TitleHighlight={featureData.TitleHighlight}
            Description={description(featureData.Description)}
            featureData={[
              ...mappedFeatures(featureItems.slice(3, 5), "Vertical"),
              ...mappedFeatures(featureItems.slice(5, 6), "Horizontal"),
              ...mappedFeatures(featureItems.slice(6, 8), "Vertical"),
            ]}
            btnURL={featureData.ButtonUrl}
            btntitle={featureData.ButtonText}
          />
        )}

        <OrderingExperience
          Title={showcaseSections[1]?.Title}
          Description={description(showcaseSections[1]?.Description)}
          Iconlistdatas={iconBoxItems.map((item) => ({
            IconsListTitle: item.IconBoxTitle,
            IconsListDescription: description(item.IconBoxDescription),
            IconUrl: item.IconUrl?.url,
            IconAlt: item.IconBoxTitle,
          }))}
          layout="WithoutImage"
          ViewProductBtnUrl={showcaseSections[1]?.ButtonUrl}
          ViewProductBtnLabel={showcaseSections[1]?.ButtonText}
          ViewProductBtnIconUrl="/Icons/ButtonIcon.svg"
        />

        <Abouttapect
          aboutTapect={featureItems.slice(8, 10).map((item, idx) => ({
            Title: item.FeatureTitle,
            Description: description(item.FeatureDescription),
            ImageUrl: item.FeatureImage?.[0]?.url,
            ImageAlt: item.FeatureTitle,
            ButtonUrl: item.FeatureButtonUrl,
            ButtonLabel: item.FeatureButtonText,
            ButtonIcon: "/Icons/ButtonIconWhite.svg",
            layout: idx % 2 === 1 ? "Reverse" : undefined,
          }))}
        />

        {faq && (
          <FAQSection
            Title={faq.Title}
            TitleHighlight={faq.TitleHeading}
            Faq={faq.Accordian.map((item: any) => ({
              question: item.Question,
              answer: item.Answer,
            }))}
          />
        )}
      </>
    );
  } catch (err) {
    console.error("Error:", err);
    return <ShimmerCartPage />;
  }
}
