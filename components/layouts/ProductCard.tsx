import React from "react";
import Link from "next/link";import { Button, Image } from "../../libs/Index";

interface ProductDataType {
  ProductID?: string;
  ProductImageUrl: string;
  ProductImageAlt: string;
  ProductName: string;
  ProductPrice: string;
  OfferPrice?: string;
  ProductCurrency: string;
  ButtonLabel: string;
  ButtonIcon: string;
  layout?: "ProductShowcase" | "Products" | "SingleProductShowcase";
}

const ProductCard: React.FC<ProductDataType> = ({
  ProductID,
  ProductImageUrl,
  ProductImageAlt,
  ProductName,
  ProductPrice,
  OfferPrice,
  ProductCurrency,
  ButtonLabel,
  ButtonIcon,
  layout = "ProductShowcase",
}) => {
  return (
    <>
      {layout === "ProductShowcase" && (
        <div className="bg-[#FFFFFF1A] p-8 rounded-20 shadow-lg">
          <Image
            src={ProductImageUrl}
            alt={ProductImageAlt}
            className="w-full object-cover rounded-lg"
          />
          <div className="border-t border-[#FFFFFF1A] pt-4">
            <h3 className="Heading-20 text-white">{ProductName}</h3>
            {OfferPrice ? (
              <div className="flex items-center gap-1">
                <span className="text-[20px]/[30px] text-gray-400 mt-2 mb-5 line-through">
                  {ProductCurrency}
                  {ProductPrice}
                </span>
                <span className="font-bold text-[20px]/[30px] mt-2 mb-5 text-white">
                  {ProductCurrency}
                  {OfferPrice}
                </span>
              </div>
            ) : (
              <h4 className="font-bold text-[20px]/[30px] mt-2 mb-5 text-white">
                {ProductCurrency}
                {ProductPrice}
              </h4>
            )}
          </div>
          <Button type="button">
            <Link
              href={`/product/${ProductID}`}
              className="btn-primary px-4 py-2 flex items-center gap-[6px]">
              {ButtonLabel}
              <Image src={ButtonIcon} alt="Button Icon" />
            </Link>
          </Button>
        </div>
      )}

      {layout === "SingleProductShowcase" && (
        <div className="bg-[#F5F8FE] p-8 rounded-20">
          <Image
            src={ProductImageUrl}
            alt={ProductImageAlt}
            className="w-full object-cover rounded-lg"
          />
          <div className="border-t border-[#FFFFFF1A] pt-4">
            <h3 className="Heading-20 text-secondary">{ProductName}</h3>
            {OfferPrice ? (
              <div className="flex items-center gap-1">
                <span className="text-[20px]/[30px] text-gray-500 mt-2 mb-5 line-through">
                  {ProductCurrency}
                  {ProductPrice}
                </span>
                <span className="font-bold text-[20px]/[30px] mt-2 mb-5 text-secondary">
                  {ProductCurrency}
                  {OfferPrice}
                </span>
              </div>
            ) : (
              <h4 className="font-bold text-[20px]/[30px] mt-2 mb-5 text-secondary">
                {ProductCurrency}
                {ProductPrice}
              </h4>
            )}
          </div>
          <Button type="button">
            <Link
              href={`/product/${ProductID}`}
              className="btn-primary px-4 py-2 flex items-center gap-[6px]">
              {ButtonLabel}
              <Image src={ButtonIcon} alt="Button Icon" />
            </Link>
          </Button>
        </div>
      )}

      {layout === "Products" && (
        <>
          <Link href={`/product/${ProductID}`}>
            <div className="space-y-6">
              <div className="h-[398px] bg-[#f6f6f6] content-center rounded-20 overflow-hidden group">
                <Image
                  src={ProductImageUrl}
                  alt={ProductImageAlt}
                  className="w-full object-cover rounded-20 transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex justify-between">
                <h3 className="Heading-20 text-secondary">{ProductName}</h3>
                {OfferPrice ? (
                  <div className="flex items-center gap-1">
                    <span className="Heading-20 text-gray-400 line-through">
                      {ProductCurrency}
                      {ProductPrice}
                    </span>
                    <span className="Heading-20 text-secondary">
                      {ProductCurrency}
                      {OfferPrice}
                    </span>
                  </div>
                ) : (
                  <h4 className="Heading-20 text-secondary">
                    {ProductCurrency}
                    {ProductPrice}
                  </h4>
                )}
              </div>
            </div>
          </Link>
        </>
      )}
    </>
  );
};

export default ProductCard;
