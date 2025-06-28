import { headers } from "next/headers";
import HeroBanner from "@/components/layouts/HeroBanner";
import OrderingExperience from "@/components/layouts/OrderingExperience";
import ProductCard from "@/components/layouts/ProductCard";
import SalesTeam from "@/components/layouts/SalesTeam";
import ShimmerCartPage from "@/components/layouts/Shimmar/ShimmerHomePage";
import ProductListingSchema from "@/components/seo/ProductSchema";

import { fetchProducts, StrapiProduct } from "@/components/api/ProductsAPI";
import {
  fetchPages,
  fetchFeatures,
  fetchProductShowCase,
} from "@/components/api/ContentAPI";

import { getDomain } from "@/libs/Assets/DomainWiseData";
import { Button, Image } from "@/libs/Index";
import Link from "next/link";
import { Metadata } from "next";
import { getSEOData } from "@/libs/Assets/seo";

export const revalidate = 60;
export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/product";
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

export default async function ProductPage() {
  const host = (await headers()).get("host") ?? "tapect.com";
  const domain = getDomain(host);

  try {
    const [productsRes, pagesRes, featuresRes, showcaseRes] = await Promise.all([
      fetchProducts(domain),
      fetchPages(domain),
      fetchFeatures(domain),
      fetchProductShowCase(domain),
    ]);

    const getPage = (res: any) => res.data.find((p: any) => p.PageName === "Product");

    const page = getPage(pagesRes);
    const hero = page?.PageSections?.find((s: any) => s.__component === "layout.hero-banner");

    const features =
      getPage(featuresRes)?.PageSections?.filter((s: any) => s.__component === "layout.features")
        ?.flatMap((s: any) => s.FeatureStructure) || [];

    const showcase =
      getPage(showcaseRes)?.PageSections?.filter(
        (s: any) => s.__component === "layout.product-show-case"
      ) || [];

    const showcaseItems =
      showcase?.flatMap((section: any) => section.IconBox) || [];

    const products: StrapiProduct[] = productsRes.data;

    const iconboxData = showcaseItems.map((item: any) => ({
      IconsListTitle: item?.IconBoxTitle,
      IconsListDescription: item?.IconBoxDescription?.[0]?.children?.[0]?.text || "",
      IconUrl: item?.IconUrl?.url || "",
      IconAlt: item?.IconBoxTitle,
    }));

    return (
      <>
        <ProductListingSchema products={products} />

        {hero && (
          <HeroBanner
            classname="HeroBanner h-[581px]"
            Title={hero.Title}
            TitleHighlight={hero.TitleHighlight}
            Description={hero.Description?.[0]?.children[0]?.text}
          />
        )}

        <div
          id="products"
          className="container mx-auto gap-6 py-88 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 px-6"
        >
          <div className="bg-secondary p-7 rounded-20 flex flex-col justify-between min-h-[453px]">
            <div>
              <Button type="button">
                <Link
                  href="/contact"
                  className="bg-product-customize flex gap-2 px-4 py-2 rounded-[80px] Description text-white"
                >
                  <Image src="/Icons/CustomizeButton.svg" alt="Customize Button" />
                  Custom your card
                </Link>
              </Button>
            </div>
            <div className="space-y-12">
              <h2 className="TitleHeading text-white">
                Let's create something new for you!
              </h2>
              <Button type="button" className="w-full">
                <Link
                  href="/contact"
                  className="bg-primary flex gap-2 px-4 py-2 rounded-[8px] Description text-white justify-center"
                >
                  Custom your card
                  <Image src="/Icons/ButtonIconWhite.svg" alt="Button Icon" />
                </Link>
              </Button>
            </div>
          </div>

          {products.map((product) => {
            const imageUrl = product.ProductImage?.[0]?.url || "";
            const imageAlt =
              product.ProductImage?.[0]?.alternativeText || product.ProductName;

            return (
              <ProductCard
                key={product.id}
                ProductID={product.ProductID}
                ProductImageUrl={imageUrl}
                ProductImageAlt={imageAlt}
                ProductName={product.ProductName}
                ProductPrice={product.ProductPrice}
                OfferPrice={product.OfferPrice}
                ProductCurrency={product.Currency}
                ButtonLabel="Buy Now"
                ButtonIcon="/Icons/ButtonIconWhite.svg"
                layout="Products"
              />
            );
          })}
        </div>

        {showcase.length > 0 && (
          <OrderingExperience
            Title={showcase[0]?.Title}
            Description={
              showcase[0]?.Description?.[0]?.children[0]?.text
            }
            Iconlistdatas={iconboxData}
            layout="WithoutImage"
            ViewProductBtnUrl={showcase[0]?.ButtonUrl}
            ViewProductBtnLabel={showcase[0]?.ButtonText}
            ViewProductBtnIconUrl="/Icons/ButtonIcon.svg"
          />
        )}

        {features.map((feature: any, index: number) => (
          <SalesTeam
            key={index}
            Title={feature?.FeatureTitle}
            Description={
              feature?.FeatureDescription?.[0]?.children?.[0]?.text
            }
            ButtonText={feature?.FeatureButtonText}
            ButtonURL={feature?.FeatureButtonUrl}
            ImageALT={feature?.FeatureTitle}
            ImageUrl={feature?.FeatureImage?.[0]?.url}
          />
        ))}
      </>
    );
  } catch (err) {
    console.error("Error loading Product page:", err);
    return <ShimmerCartPage />;
  }
}
