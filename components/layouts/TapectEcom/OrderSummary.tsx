'use client'
import { useMemo, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: string;
  currency: string;
  imageUrl: string;
  productdescription?: string;
  quantity: number; // ✅ Added quantity field
}

interface Props {
  cart: CartItem[];
  discount: number;
  shippingCost: number;
  couponApplied: boolean;
  couponCode: string;
  couponError: string;
  onApplyCoupon: (coupon: string) => void;
}

const OrderSummary: React.FC<Props> = ({
  cart,
  discount,
  shippingCost,
  couponApplied,
  couponCode,
  couponError,
  onApplyCoupon,
}) => {
  const [couponInput, setCouponInput] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + Number(item.price.replace(/[^0-9.]/g, "")) * item.quantity;
    }, 0);
  }, [cart]);

  const total = subtotal - (subtotal * discount) / 100 + shippingCost;

  const handleApplyClick = () => {
    if (couponInput && couponInput === couponCode) {
      setShowMessage(true);
      return;
    }
    onApplyCoupon(couponInput);
  };

  const handleOnChange = (e: any) => {
    setCouponInput(e.target.value);
    setShowMessage(false);
  };

  return (
    <div className="bg-[#F5F8FE] p-6 space-y-6 sticky top-24">
      {cart.map((item, index) => (
        <div key={index} className="flex items-center justify-between mb-4">
          <div className="flex justify-between w-full">
            <div className="flex lg:flex-row flex-col gap-4">
              <div className="lg:w-1/5 w-[35%] relative pt-[6px] pr-[6px]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="lg:w-[70px] lg:h-[70px] rounded-[8px] border"
                />
                <div className="absolute bg-secondary top-0 right-0 w-6 h-6 content-center text-center rounded-full">
                  <p className="text-[12px] font-medium leading-[18px] text-white">
                    {item.quantity}
                  </p>
                </div>
              </div>
              <div className="w-4/5">
                <p className="Heading-20">{item.name}</p>
                <p className="Description">
                  {item.productdescription &&
                  item.productdescription.length > 10
                    ? `${item.productdescription.substring(0, 70)}...`
                    : item.productdescription || ""}
                </p>
              </div>
            </div>
            <div>
              <p className="Heading-20">
                {item.currency}
                {item.price}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Discount Coupon Input */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            className="py-2 px-4 w-full rounded-[8px] text-secondary border"
            placeholder="Coupon Code"
            value={couponInput}
            onChange={handleOnChange}
          />
          <button
            onClick={handleApplyClick}
            className="bg-primary px-4 py-2 rounded-[8px] text-white">
            Apply
          </button>
        </div>
        {showMessage && couponApplied ? (
          <p className="text-green-500 text-sm">Coupon already applied.</p>
        ) : (
          couponError && <p className="text-red-500 text-sm">{couponError}</p>
        )}
      </div>

      {/* Subtotal & Total */}
      <div className="space-y-6">
        <p className="flex justify-between font-semibold">
          <span className="Heading-20 text-secondary">Subtotal:</span>
          <span>
            {cart.length && cart[0].currency}
            {subtotal.toFixed(2)}
          </span>
        </p>
        <p className="flex justify-between font-semibold">
          <span className="Heading-20 text-secondary">Shipping:</span>
          <span className="Heading-20 text-secondary">
            {cart.length && cart[0].currency}
            {shippingCost.toFixed(2)}
          </span>
        </p>
        {discount > 0 && (
          <p className="flex justify-between font-semibold">
            <span className="text-sm text-secondary">Discount:</span>
            <span className="text-sm text-primary">-{discount}%</span>
          </p>
        )}
        <p className="flex justify-between font-semibold text-xl mt-2">
          <span className="Heading-20 text-secondary">Total:</span>
          <span className="Heading-20 text-secondary">
            {cart.length && cart[0].currency}
            {total.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
