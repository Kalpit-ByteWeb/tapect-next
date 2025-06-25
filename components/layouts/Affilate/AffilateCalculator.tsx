'use client'
import { useState } from "react";
import Link from "next/link";
import { Image } from "../../../libs/Index";

interface AffilateCalculatorProps {
  Title: string;
  PreTitle: string;
  TitleHighlight: string;
  PostTitle: string;
  Product: Product[];
  ButtonUrl: string;
  ButtonLabel: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const AffilateCalculator: React.FC<AffilateCalculatorProps> = ({
  Title,
  PreTitle,
  TitleHighlight,
  PostTitle,
  Product,
  ButtonUrl,
  ButtonLabel,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(Product[0]);
  const [quantity, setQuantity] = useState(5);

  const commission = (selectedProduct.price * quantity * 0.1).toFixed(2);

  return (
    <section className="py-60 xxl:px-120">
      <div className="bg-secondary rounded-20 py-12 px-6">
        <div className="container mx-auto max-w-[1072px] space-y-12 px-6 lg:px-0">
          <div className="space-y-6">
            <h2 className="TitleHeading text-white text-center">{Title}</h2>
            <div className="bg-white py-4 text-center rounded-16">
              <h2 className="Title-24 text-secondary">
                {PreTitle}{" "}
                <span className="text-primary TitleHeading">
                  {TitleHighlight}
                </span>{" "}
                {PostTitle}
              </h2>
            </div>
          </div>

          {/* Card Selection */}
          <div className="flex flex-col items-center space-y-12">
            <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
              {Product.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`px-6 py-[26px] bg-[#FFFFFF1A] rounded-16 transition-all duration-300 border-2 ${
                    selectedProduct.id === product.id
                      ? "border-primary"
                      : "border-[#FFFFFF1A]"
                  }`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full"
                  />
                  <p className="mt-2 text-white text-center">{product.name}</p>
                </button>
              ))}
            </div>

            {/* Earnings Display */}
            <div className="text-center">
              <h2 className="text-white Title-24">
                How much you can <span className="text-primary">Earn?</span>
              </h2>
              <div className="mt-6">
                <p className="text-[64px] font-primary text-white font-semibold">
                  <span className="text-[24px] leading-33 font-semibold">
                    $
                  </span>
                  {commission}
                </p>
                <p className="Heading-20 text-white">Your Commission</p>
              </div>
            </div>

            {/* Quantity Slider */}
            <div className="relative w-full">
              {/* Slider Input */}
              <input
                type="range"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-[20px] bg-white rounded-full cursor-pointer accent-primary"
              />

              {/* Quantity Indicator Below the Slider */}
              <div
                className="absolute top-[40px] left-1/2 transform -translate-x-1/2 bg-white min-w-[80px] text-center py-2 rounded-[8px] text-secondary Description shadow-lg"
                style={{
                  left: `${(quantity / 100) * 100}%`,
                  transform: "translateX(-50%)",
                }}>
                {/* Arrow */}
                <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
                {quantity} cards
              </div>
            </div>

            {/* Join Now Button */}
          </div>
          <button className="w-full pt-10">
            <Link
              href={ButtonUrl}
              className="btn-primary px-8 py-4 rounded-[8px] justify-center  flex gap-[6px] w-fit mx-auto">
              {ButtonLabel}
              <Image src="/Icons/ButtonIconWhite.svg" alt="Button Icon" />
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AffilateCalculator;
