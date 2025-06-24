import React from "react";
import Link from "next/link";import { Button, Image } from "../../libs/Index";
import ProductCard from "./ProductCard";
import { StrapiProduct } from "../api/ProductsAPI";

interface ProductShowCaseType {
  Title: string;
  TitleHighlight: string;
  Description: string;
  Productdatas: StrapiProduct[];
  ViewProductBtnUrl: string;
  ViewProductBtnLabel: string;
  ViewProductBtnIconUrl: string;
}

const ProductShowCase: React.FC<ProductShowCaseType> = ({
  Title,
  TitleHighlight,
  Description,
  Productdatas,
  ViewProductBtnUrl,
  ViewProductBtnLabel,
  ViewProductBtnIconUrl,
}) => {
  return (
    <section className="py-60 px-0 md:px-6 productshowcasemax:px-120 relative">
      <div className="bg-secondary rounded-20 xl:px-0 px-6">
        <div className="md:container mx-auto py-12 space-y-12">
          {/* Heading Section */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-white font-semibold text-[40px]/[56px] mb-4">
              {Title} <span className="text-primary">{TitleHighlight}</span>
            </h2>
            <p className="Description text-white max-w-[856px]">
              {Description}
            </p>
          </div>

          {/* Products Grid */}
          <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Productdatas.map((Productdata, index) => (
                <ProductCard
                  key={index}
                  ProductImageUrl={Productdata.ProductImage[0].url}
                  ProductImageAlt={Productdata.ProductName}
                  ProductName={Productdata.ProductName}
                  ProductPrice={Productdata.ProductPrice}
                  OfferPrice={Productdata.OfferPrice}
                  ProductID={Productdata.ProductID}
                  ProductCurrency={Productdata.Currency}
                  ButtonLabel="Buy Now"
                  ButtonIcon="/Icons/ButtonIconWhite.svg"
                  layout="ProductShowcase"
                />
              ))}
            </div>
          </div>

          {/* View Products Button */}
          <div className="flex justify-center">
            <Button type="button">
              <Link
                href={ViewProductBtnUrl}
                className="btn-secondary px-8 py-4 flex items-center gap-[6px]">
                {ViewProductBtnLabel}
                <Image src={ViewProductBtnIconUrl} alt="Button Icon" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowCase;
