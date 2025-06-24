import { StrapiProduct } from "../../api/ProductsAPI";
import AdvanceFeatures from "../AdvanceFeatures";
import FAQSection from "../FAQSection";
import OrderingExperience from "../OrderingExperience";
import ProductCard from "../ProductCard";
import SalesTeam from "../SalesTeam";
import ProductInfo from "./ProductInfo";
import TableSection from "./TableSection";

interface AccordianType {
  ImageUrl: string;
  question: string;
  answer: string;
}

interface SingleProductProps {
  ProductInfoSection: ProductInfoProps;
  FAQSectionData: FAQSectionProps;
  AdvanceFeaturesData: AdvanceFeaturesProps;
  Productdatas: StrapiProduct[];
  OrderingExperienceData: OrderingExperienceProps;
  OrderCardCTA: OrderCardCTA;
}

interface ProductInfoProps {
  id: number;
  slideImages: string[];
  Accordian: AccordianType[];
  ProductName: string;
  ProductDescripton: string;
  ProductCurrency: string;
  ProductPrice: string;
  OfferPrice?: string;
  listinfo: string[];
  ctaTitle: string;
  ctaButtonLabel: string;
  ctaButtonUrl: string;
}

interface FAQSectionProps {
  Title: string;
  TitleHighlight: string;
  Faq: FAQItemType[];
}

interface FAQItemType {
  question: string;
  answer: string;
}
interface AdvanceFeaturesProps {
  Title: string;
  TitleHighlight: string;
  featuredata: AdvanceFeaturestype[];
}

interface AdvanceFeaturestype {
  FeatureTitle: string;
  FeatureDescription: string;
  FeatureImageUrl: string;
  FeatureImageAlt: string;
}

export interface OrderingExperienceProps {
  Title: string;
  Description: string;
  Iconlistdatas: IconslistDatatype[];
  layout?: "WithoutImage" | "WithImage";
  ViewProductBtnUrl?: string;
  ViewProductBtnLabel?: string;
  ViewProductBtnIconUrl?: string;
}

interface IconslistDatatype {
  IconUrl: string;
  IconAlt: string;
  IconsListTitle: string;
  IconsListDescription: string;
}

interface OrderCardCTA {
  featuredata: {
    Title: string;
    Description: string;
    ButtonText: string;
    ButtonURL: string;
    ImageUrl: string;
    ImageALT: string;
  }[];
}

const SingleProductlayout: React.FC<SingleProductProps> = ({
  ProductInfoSection,
  FAQSectionData,
  AdvanceFeaturesData,
  Productdatas,
  OrderingExperienceData,
  OrderCardCTA,
}) => {
  return (
    <>
      <ProductInfo
        id={ProductInfoSection.id}
        slideImages={ProductInfoSection.slideImages}
        Faq={ProductInfoSection.Accordian}
        ProductName={ProductInfoSection.ProductName}
        ProductDescripton={ProductInfoSection.ProductDescripton}
        ProductPrice={ProductInfoSection.ProductPrice}
        OfferPrice={ProductInfoSection.OfferPrice}
        ProductCurrency={ProductInfoSection.ProductCurrency}
        listinfo={ProductInfoSection.listinfo}
        ctaTitle={ProductInfoSection.ctaTitle}
        ctaButtonLabel={ProductInfoSection.ctaButtonLabel}
        ctaButtonUrl={ProductInfoSection.ctaButtonUrl}
      />

      <AdvanceFeatures
        Title={AdvanceFeaturesData.Title}
        TitleHighlight={AdvanceFeaturesData.TitleHighlight}
        featuredata={AdvanceFeaturesData.featuredata}
      />

      <OrderingExperience
        Title={OrderingExperienceData.Title}
        Description={OrderingExperienceData.Description}
        Iconlistdatas={OrderingExperienceData.Iconlistdatas}
        layout={OrderingExperienceData.layout}
        ViewProductBtnUrl={OrderingExperienceData.ViewProductBtnUrl}
        ViewProductBtnLabel={OrderingExperienceData.ViewProductBtnLabel}
        ViewProductBtnIconUrl={OrderingExperienceData.ViewProductBtnIconUrl}
      />

      <section className="container mx-auto space-y-12 py-60">
        <h3 className="TitleHeading text-center">
          You may <span className="text-primary">also like</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 herobannermax:grid-cols-3 gap-6">
          {Productdatas.map((Productdata, index) => (
            <ProductCard
              key={index}
              ProductImageUrl={Productdata.ProductImage[0].url}
              ProductImageAlt={Productdata.ProductImage[0].alternativeText}
              ProductName={Productdata.ProductName}
              ProductPrice={Productdata.ProductPrice}
              OfferPrice={Productdata.OfferPrice}
              ProductID={Productdata.ProductID}
              ProductCurrency={Productdata.Currency}
              ButtonLabel="Buy Now"
              ButtonIcon="/Icons/ButtonIconWhite.svg"
              layout="SingleProductShowcase"
            />
          ))}
        </div>
      </section>
      <TableSection />
      <SalesTeam
        Title={OrderCardCTA.featuredata[0].Title}
        Description={OrderCardCTA.featuredata[0].Description}
        ButtonText={OrderCardCTA.featuredata[0].ButtonText}
        ButtonURL={OrderCardCTA.featuredata[0].ButtonURL}
        ImageUrl={OrderCardCTA.featuredata[0].ImageUrl}
        ImageALT={OrderCardCTA.featuredata[0].ImageALT}
      />
      <FAQSection
        Title={FAQSectionData.Title}
        TitleHighlight={FAQSectionData.TitleHighlight}
        Faq={FAQSectionData.Faq}
      />
    </>
  );
};

export default SingleProductlayout;
