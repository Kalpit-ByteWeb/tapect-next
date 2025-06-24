import SingleProductlayout from "@/components/layouts/SingleProductPage/SingleProductLayout";
import {
  fetchProduct,
  fetchProducts,
  AccordionItem,
  BulletPoint,
  FeatureStructure,
  IconBox,
} from "@/components/api/ProductsAPI";
import ShimmerSingleProduct from "@/components/layouts/Shimmar/ShimmerSingleProduct";
import SingleProductSchema from "@/components/seo/SingleProductSchema";
import { notFound } from "next/navigation";

export default async function SingleProductPage(props: {
  params: { id: string };
}) {
  const { id } = props.params;

  try {
    const [product, productsResponse] = await Promise.all([
      fetchProduct(id),
      fetchProducts(),
    ]);
    const products = productsResponse.data;

    if (!product) notFound();

    // Utility to get sections
    const findPageSections = (name: string) =>
      product.single_product?.PageSections?.filter(
        (section) => section.__component === name
      ) || [];

    // Extract data
    const productBulletPointSections = findPageSections(
      "layout.product-bullet-point"
    );
    const faqSections = findPageSections("layout.faq");
    const featuresSections = findPageSections("layout.features");
    const productShowCaseSections = findPageSections(
      "layout.product-show-case"
    );

    const productInfoSection = {
      id: product.id,
      slideImages: product.ProductImage?.map((image) => image.url) || [],
      Accordian:
        faqSections[0]?.Accordian?.map((item: AccordionItem) => ({
          ImageUrl: item?.Image?.url || "",
          question: item.Question,
          answer: item.Answer,
        })) || [],
      ProductName: product.ProductName,
      ProductDescripton: product.ProductDescription,
      ProductPrice: product.ProductPrice,
      OfferPrice: product.OfferPrice,
      ProductCurrency: product.Currency,
      listinfo:
        productBulletPointSections[0]?.BulletPoints?.map(
          (point: BulletPoint) => point.points
        ) || [],
      ctaTitle: featuresSections[0]?.Title || "",
      ctaButtonLabel: featuresSections[0]?.ButtonText || "",
      ctaButtonUrl: featuresSections[0]?.ButtonUrl || "",
    };

    const FAQSectionData = {
      Title: faqSections[1]?.Title || "Frequently Asked",
      TitleHighlight: faqSections[1]?.TitleHighlight || "Questions",
      Faq:
        faqSections[1]?.Accordian?.map((item: AccordionItem) => ({
          question: item.Question,
          answer: item.Answer,
        })) || [],
    };

    const AdvanceFeaturesData = {
      Title: featuresSections[1]?.Title || "Effortless Ordering",
      TitleHighlight: featuresSections[1]?.TitleHighlight || "Process",
      featuredata:
        featuresSections[1]?.FeatureStructure?.map(
          (feature: FeatureStructure) => ({
            FeatureTitle: feature.FeatureTitle,
            FeatureDescription: feature.FeatureDescription.map(
              (desc: any) => desc.children[0].text
            ).join(""),
            FeatureImageUrl: feature?.FeatureImage?.[0]?.url || "",
            FeatureImageAlt: feature.FeatureTitle,
          })
        ) || [],
    };

    const OrderingExperienceData = {
      Title:
        productShowCaseSections[0]?.Title || "Seamless Ordering Experience",
      Description:
        productShowCaseSections[0]?.Description?.map(
          (desc: any) => desc.children[0].text
        ).join("") || "",
      Iconlistdatas:
        productShowCaseSections[0]?.IconBox?.map((icon: IconBox) => ({
          IconUrl: icon?.IconUrl?.url || "/Icons/Get-a-Card.svg",
          IconAlt: icon.IconBoxTitle,
          IconsListTitle: icon.IconBoxTitle,
          IconsListDescription: icon.IconBoxDescription?.map(
            (desc: any) => desc.children[0].text
          ).join(""),
        })) || [],
      layout: "WithoutImage" as const,
      ViewProductBtnUrl: productShowCaseSections[0]?.ButtonUrl || "/product",
      ViewProductBtnLabel:
        productShowCaseSections[0]?.ButtonText || "View Product",
      ViewProductBtnIconUrl: "/Icons/ButtonIcon.svg",
    };

    const OrderingCTA = {
      featuredata:
        featuresSections[2]?.FeatureStructure?.map(
          (feature: FeatureStructure) => ({
            Title: feature.FeatureTitle,
            Description: feature.FeatureDescription.map(
              (desc: any) => desc.children[0].text
            ).join(""),
            ImageUrl: feature?.FeatureImage?.[0]?.url || "",
            ImageALT: feature.FeatureTitle,
            ButtonText: feature?.FeatureButtonText || "Learn More",
            ButtonURL: feature?.FeatureButtonUrl || "/product",
          })
        ) || [],
    };

    return (
      <>
        <SingleProductSchema
          slug={product.ProductID}
          name={product.ProductName}
          description={product.ProductDescription}
          images={product.ProductImage.map((img) => img.url)}
          price={product.ProductPrice}
          currency={product.Currency}
        />
        <SingleProductlayout
          ProductInfoSection={productInfoSection}
          FAQSectionData={FAQSectionData}
          AdvanceFeaturesData={AdvanceFeaturesData}
          Productdatas={products.slice(0, 3)}
          OrderingExperienceData={OrderingExperienceData}
          OrderCardCTA={OrderingCTA}
        />
      </>
    );
  } catch (err: any) {
    console.error(err);
    return <ShimmerSingleProduct />;
  }
}
