"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "./Slider";
import { Button } from "@/libs/Index";
import Accordion from "@/libs/Assets/Accordion";
import Link from "next/link";

// import PopLeadform from "./PopLeadform";

interface ProductInfoProps {
  slideImages: string[];
  Faq: faqType[];
  id: number;
  ProductName: string;
  ProductDescripton: string;
  ProductPrice: string;
  OfferPrice?: string;
  ProductCurrency: string;
  listinfo: string[];
  ctaTitle: string;
  ctaButtonLabel: string;
  ctaButtonUrl: string;
}

interface faqType {
  ImageUrl: string;
  question: string;
  answer: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  slideImages,
  Faq,
  id,
  ProductName,
  ProductDescripton,
  ProductPrice,
  OfferPrice,
  ProductCurrency,
  listinfo,
  ctaTitle,
  ctaButtonLabel,
  ctaButtonUrl,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const [, setCart] = useState<
    { id: number; name: string; price: string; quantity: number }[]
  >([]);

  const router = useRouter(); // ✅ use Next.js router

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      const currentItem = parsedCart.find((item: any) => item.id === id);
      if (currentItem?.quantity) {
        setQuantity(currentItem.quantity);
      }
      setCart(parsedCart);
    }
  }, [id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAction = () => {
    if (quantity > 25) {
      setShowPopup(true);
    } else {
      const newItem = {
        id: id,
        imageUrl: slideImages[0] || "",
        name: ProductName,
        price: OfferPrice || ProductPrice,
        currency: ProductCurrency,
        productdescription: ProductDescripton,
        quantity: quantity,
      };

      const storedCart = sessionStorage.getItem("cart");
      const updatedCart = storedCart ? JSON.parse(storedCart) : [];

      const existingIndex = updatedCart.findIndex(
        (item: any) => item.id === newItem.id
      );

      if (existingIndex === -1) {
        updatedCart.push({ ...newItem, quantity });
      } else {
        updatedCart[existingIndex].quantity = quantity;
      }

      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);

      router.push("/cart"); // ✅ Next.js navigation
    }
  };

  return (
    <>
      {/* <PopLeadform
        show={showPopup}
        onClose={() => setShowPopup(false)}
        quantity={quantity}
      /> */}
      <section className="lg:py-120 md:py-60 pt-5">
        <div className="flex container lg:flex-row flex-col lg:mx-auto md:px-6 herobannermax:px-0 mx-auto lg:gap-6 gap-12 relative">
          <div className="lg:w-3/5 w-full md:px-0 ">
            <div className="sticky top-4">
              <Slider slides={slideImages} />
            </div>
          </div>

          <div className="lg:w-2/5">
            <div>
              <h1 className="TitleHeading text-secondary mb-4">
                {ProductName}
              </h1>
              <p className="Description-dark mb-6">{ProductDescripton}</p>
              <div className="mb-4">
                {OfferPrice ? (
                  <div className="flex items-center gap-1">
                    <span className="Title-24 text-gray-500 line-through">
                      {ProductCurrency}
                      {ProductPrice}
                    </span>
                    <span className="Title-24 text-primary">
                      {ProductCurrency}
                      {OfferPrice}
                    </span>
                  </div>
                ) : (
                  <h3 className="Title-24 text-primary">
                    {ProductCurrency}
                    {ProductPrice}
                  </h3>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-6 mb-8">
              <div className="lg:w-1/4 w-32">
                <div className="flex items-center border border-[#E7E7E7] rounded-10 py-2 px-2 justify-between w-full">
                  <button onClick={decreaseQuantity} className="text-lg px-2">
                    –
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button onClick={increaseQuantity} className="text-lg px-2">
                    +
                  </button>
                </div>
              </div>
              <div className="w-9/12">
                <Button
                  type="button"
                  className="btn-primary w-full h-full"
                  onClick={handleAction}>
                  {quantity > 25 ? "Contact Us" : "Add to Cart"}
                </Button>
              </div>
            </div>

            <div className="border border-[#E5E5E5] p-4 rounded-16 mb-6">
              <ul className="list-disc list-inside">
                {listinfo.map((item, index) => (
                  <li key={index} className="Description-dark">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#E5E5E5] p-6 rounded-16 space-y-4">
              {Faq.map((item, index) => (
                <Accordion
                  key={index}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                  layout="WithIcon"
                />
              ))}
            </div>

            <div className="mt-6 bg-[url(/Icons/bigger-team-cta.png)] bg-no-repeat bg-center bg-secondary text-center text-white py-[22px] rounded-16 space-y-1">
              <div className="max-w-[379px] mx-auto">
                <h2 className="Heading-20">{ctaTitle}</h2>
                <Link href={ctaButtonUrl} className="Title-18 text-white underline">
                  {ctaButtonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductInfo;
