import HeroBanner from '@/components/layouts/HeroBanner';
import OrderingExperience from '@/components/layouts/OrderingExperience';
import BenefitsPerks from '@/components/layouts/BenefitsPerks';
import AffilateCalculator from '@/components/layouts/Affilate/AffilateCalculator';
import {
  fetchAffilateProgram,
  fetchFeatures,
  fetchPages,
  fetchProductShowCase,
} from '@/components/api/ContentAPI';
import { getSEOData } from "@/libs/Assets/seo";
import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';

export const revalidate = 60;

const getPages = unstable_cache(fetchPages, ['affilate-pages'], { revalidate: 60 });
const getShowcase = unstable_cache(fetchProductShowCase, ['affilate-showcase'], { revalidate: 60 });
const getFeatures = unstable_cache(fetchFeatures, ['affilate-features'], { revalidate: 60 });
const getAffiliateProgram = unstable_cache(fetchAffilateProgram, ['affilate-calculator'], { revalidate: 60 });

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/affilate-program";
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

export default async function AffilateProgramPage() {
  let error: string | null = null;

  let pageData: any = null;
  let productshowcasedata: any = null;
  let productItems: any[] = [];

  let featureData: any = null;
  let featureItems: any[] = [];

  let calculatorData: any = null;
  let calculatorItems: any[] = [];

  try {
    const [
      pagesResponse,
      productShowCaseResponse,
      featuresResponse,
      calculatorResponse,
    ] = await Promise.all([
      getPages(),
      getShowcase(),
      getFeatures(),
      getAffiliateProgram(),
    ]);

    pageData = pagesResponse.data.find(
      (p: any) => p.PageName === 'Affilate Program',
    );

    productshowcasedata =
      productShowCaseResponse.data
        .find((p: any) => p.PageName === 'Affilate Program')
        ?.PageSections?.filter(
          (s: any) => s.__component === 'layout.product-show-case',
        ) || null;

    productItems =
      productshowcasedata?.flatMap((s: any) => s.IconBox) ?? [];

    featureData =
      featuresResponse.data
        .find((p: any) => p.PageName === 'Careers')
        ?.PageSections?.filter(
          (s: any) => s.__component === 'layout.features',
        ) || null;

    featureItems =
      featureData?.flatMap((s: any) => s.FeatureStructure) ?? [];

    calculatorData =
      calculatorResponse.data
        .find((p: any) => p.PageName === 'Affilate Program')
        ?.PageSections?.filter(
          (s: any) => s.__component === 'layout.affilate-calculator',
        ) || null;

    calculatorItems =
      calculatorData?.flatMap(
        (s: any) => s.AffilateCalculatorProduct,
      ) ?? [];
  } catch (e: any) {
    error = e.message || 'An error occurred while fetching data.';
  }

  if (error) return <div>{error}</div>;
  if (!pageData) return <div>No data found.</div>;

  const heroBanner = pageData.PageSections?.find(
    (s: any) => s.__component === 'layout.hero-banner',
  );

  const iconBoxData = productItems.map((i: any) => ({
    IconsListTitle: i.IconBoxTitle,
    IconsListDescription: i.IconBoxDescription?.[0]?.children?.[0]?.text ?? '',
    IconUrl: i.IconUrl?.url ?? '',
    IconAlt: i.IconBoxTitle,
  }));

  const benefitsPerksData = featureItems.slice(3).map((f: any) => ({
    IconUrl: f.FeatureImage?.[0]?.url,
    Title: f.FeatureTitle,
    Description: f.FeatureDescription?.[0]?.children?.[0]?.text,
  }));

  const affiliateProducts = calculatorItems.map((p: any) => ({
    id: p.ProductName,
    name: p.ProductName,
    price: p.ProductPrice,
    image: p.ProductImage?.url,
  }));

  return (
    <>
      {heroBanner && (
        <HeroBanner
          classname="HeroBanner-light flex justify-center"
          Title={heroBanner.Title}
          TitleHighlight={heroBanner.TitleHighlight}
          ButtonLabel={heroBanner.ButtonText}
          BannerHeight="xxl:h-[812px] h-screen"
          ButtonUrl={heroBanner.ButtonUrl}
          BannerImageVerticalAlign="herobannermax:bottom-0"
          BannerImageHorizontalAlign="herobannermax:right-[-20%]"
          ButtonIcon="/Icons/ButtonIconWhite.svg"
          BannerImageUrl={heroBanner.BannerImage?.url}
          BannerImageAlt={heroBanner.Title}
          BannerFullWidth
          BannerBackgroundImageUrl="#"
          ButtonPrimary
        />
      )}

      {productshowcasedata && (
        <OrderingExperience
          Title={productshowcasedata[0].Title}
          Description={
            productshowcasedata[0]?.Description?.[0]?.children?.[0]?.text
          }
          Iconlistdatas={iconBoxData}
          layout="WithoutImage"
          ViewProductBtnUrl={productshowcasedata[0].ButtonUrl}
          ViewProductBtnLabel={productshowcasedata[0].ButtonText}
          ViewProductBtnIconUrl="/Icons/ButtonIcon.svg"
        />
      )}

      {featureData && (
        <BenefitsPerks
          Title={featureData[0].Title}
          TitleHighlight={featureData[0].TitleHighlight}
          Description={featureData[0]?.Description?.[0]?.children?.[0]?.text}
          BenefitsPerks={benefitsPerksData}
        />
      )}

      {calculatorData && (
        <AffilateCalculator
          Title={calculatorData[0].Title}
          PreTitle={calculatorData[0].PreTitle}
          TitleHighlight={calculatorData[0].TitleHighlight}
          PostTitle={calculatorData[0].PostTitle}
          Product={affiliateProducts}
          ButtonLabel={calculatorData[0].ButtonText}
          ButtonUrl={calculatorData[0].ButtonURL}
        />
      )}
    </>
  );
}
