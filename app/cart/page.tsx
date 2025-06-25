"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Image } from "@/libs/Index";
import { fetchProducts, StrapiProduct } from "@/components/api/ProductsAPI";
import ProductCard from "@/components/layouts/ProductCard";
import DiscountCoupon from "@/components/layouts/DiscountCoupon";
import ShimmerCartPage from "@/components/layouts/Shimmar/ShimmerCartPage";
import PopLeadform from "@/components/layouts/SingleProductPage/PopLeadform";
import { calculateShippingCost, getDomain } from "@/libs/Assets/DomainWiseData";

interface CartItem {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  productdescription?: string;
  currency: string;
  quantity: number;
}

const CartPage = () => {
  const router = useRouter();
  const host =
    typeof window !== "undefined" ? window.location.host : "tapect.com";
    const domain = getDomain(host);
  const [products, setProducts] = useState<StrapiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [leadPopupQuantity, setLeadPopupQuantity] = useState(0);

  const hasLargeQuantity = cart.some((item) => item.quantity > 25);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
    setDiscount(parseFloat(sessionStorage.getItem("discount") || "0"));
    setCouponApplied(sessionStorage.getItem("couponApplied") === "true");
    setCouponCode(sessionStorage.getItem("couponCode") || "");
  }, []);

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id: number, delta: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleApplyCoupon = (coupon: string) => {
    if (couponApplied) return setCouponError("Coupon already applied.");
    if (coupon === "DISCOUNT10") {
      setDiscount(10);
      setCouponApplied(true);
      setCouponCode(coupon);
      setCouponError("");
      sessionStorage.setItem("discount", "10");
      sessionStorage.setItem("couponApplied", "true");
      sessionStorage.setItem("couponCode", coupon);
    } else {
      setCouponError("Invalid coupon code");
      setDiscount(0);
      setCouponApplied(false);
      setCouponCode("");
      sessionStorage.setItem("discount", "0");
      sessionStorage.setItem("couponApplied", "false");
      sessionStorage.setItem("couponCode", "");
    }
  };

  const handleCheckout = () => {
    const itemWithLargeQty = cart.find((item) => item.quantity > 25);
    if (itemWithLargeQty) {
      setLeadPopupQuantity(itemWithLargeQty.quantity);
      setShowPopup(true);
      return;
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    router.push("/checkout");
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
    0
  );

  const total =
    subtotal - (subtotal * discount) / 100 + calculateShippingCost(domain);

  if (loading) return <ShimmerCartPage />;
  if (error) return <p>Error: {error}</p>;
  if (cart.length === 0)
    return (
      <section className="py-120 flex flex-col items-center space-y-6">
        <p className="TitleHeading">Your cart is empty.</p>
        <Link href="/product" className="btn-primary px-4 py-6">
          Continue Shopping
        </Link>
      </section>
    );

  return (
    <>
      <PopLeadform
        show={showPopup}
        onClose={() => setShowPopup(false)}
        quantity={leadPopupQuantity}
        domain={domain}
      />
      <div className="container mx-auto md:py-120 py-60 px-6">
        <h1 className="TitleHeading mb-[48px]">Cart:</h1>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 mb-12">
          <div className="lg:col-span-2 w-full overflow-scroll lg:overflow-hidden">
            <div className="rounded-[10px] border border-[#E0E6ED]">
              <div className="overflow-x-auto">
                <table className="min-w-[500px] w-full text-left">
                  <thead>
                    <tr className="bg-[#F5F8FE]">
                      <th className="pl-6 pt-4 pb-2 Title-18">Product</th>
                      <th className="pt-4 pb-2 px-4 Title-18">Quantity</th>
                      <th className="pt-4 pb-2 pl-4 Title-18">Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="p-4">
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b border-[#E5E5E5]">
                        <td className="p-4 flex flex-col md:flex-row md:items-center gap-3">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            width={104}
                            height={104}
                            className="rounded-[14px]"
                          />
                          <div>
                            <p className="text-md leading-30 font-primary font-semibold">
                              {item.name}
                            </p>
                            <p className="text-md leading-30 font-primary font-semibold text-primary">
                              {products[0].Currency}
                              {Number(
                                item.price.replace(/[^0-9.]/g, "")
                              ).toFixed(2)}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="p-4 flex items-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="px-2"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="px-2"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="Description">
                            {item.currency}
                            {(
                              Number(item.price.replace(/[^0-9.]/g, "")) *
                              item.quantity
                            ).toFixed(2)}
                          </p>
                        </td>
                        <td className="p-4 w-[50px]">
                          <button onClick={() => handleRemoveItem(item.id)}>
                            <img
                              src="/Icons/cartDelete.svg"
                              height={25}
                              width={25}
                              className="w-[25px] h-[25px] flex-shrink-0"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-secondary text-white p-6 rounded-[6px] sticky top-0 h-fit">
            <h2 className="Heading-20 mb-1">Have a coupon?</h2>
            <p className="Description mb-4">
              If you have a coupon code, please apply it below.
            </p>
            <div className="flex gap-2 mb-6">
              <DiscountCoupon
                onApplyCoupon={handleApplyCoupon}
                couponApplied={couponApplied}
                couponCode={couponCode}
                couponError={couponError}
              />
            </div>
            <div className="space-y-6">
              <div className="flex justify-between">
                <p className="Heading-20">Subtotal:</p>
                <p className="Heading-20">
                  {products[0].Currency}
                  {subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="Heading-20">Shipping:</p>
                <p className="Heading-20">
                  {cart[0]?.currency}
                  {calculateShippingCost(domain)}
                </p>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <p className="text-sm leading-24 font-normal font-primary">
                    Discount:
                  </p>
                  <p className="text-sm leading-24 font-normal font-primary">
                    -{discount}%
                  </p>
                </div>
              )}
              <div className="flex justify-between">
                <p className="Heading-20">Total:</p>
                <p className="Heading-20">
                  {products[0].Currency}
                  {total.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-primary w-full py-4 rounded-[8px]"
              >
                {hasLargeQuantity ? "Contact Us" : "Checkout"}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <h2 className="TitleHeading mb-[48px]">Popular Picks:</h2>
          <div className="lg:container mx-auto gap-6 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
            {products.slice(0, 3).map((product) => {
              const imageUrl = product.ProductImage?.[0]?.url || "";
              const imageAlt =
                product.ProductImage?.[0]?.alternativeText ||
                product.ProductName;

              return (
                <ProductCard
                  key={product.id}
                  ProductID={product.ProductID}
                  ProductImageUrl={imageUrl}
                  ProductImageAlt={imageAlt}
                  ProductName={product.ProductName}
                  ProductPrice={product.ProductPrice}
                  ProductCurrency={product.Currency}
                  ButtonLabel="View Product"
                  ButtonIcon="/Icons/ButtonIconWhite.svg"
                  layout="Products"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
