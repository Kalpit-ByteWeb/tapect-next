'use client'
import { useState, useEffect } from "react";

interface DiscountCouponProps {
  onApplyCoupon: (coupon: string) => void; // Expect a string
  couponApplied: boolean;
  couponCode: string;
  couponError: string;
}

const DiscountCoupon: React.FC<DiscountCouponProps> = ({
  onApplyCoupon,
  couponApplied,
  couponCode,
  couponError,
}) => {
  const [coupon, setCoupon] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // If a coupon code exists (applied), set the input field to the coupon code
    if (couponCode) {
      setCoupon(couponCode);
    }
  }, [couponCode]);

  const handleApplyCoupon = () => {
    if (coupon && coupon === couponCode) {
      setShowMessage(true);
      return;
    }
    onApplyCoupon(coupon); // Pass the coupon code as a string
  };

  const handleOnChange = (e: any) => {
    setCoupon(e.target.value);
    setShowMessage(false); // Hide the message when the input is changed
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          className="py-2 px-4 w-full rounded-[8px] text-secondary border"
          placeholder="Coupon Code"
          value={coupon}
          onChange={handleOnChange}
        />
        <button
          onClick={handleApplyCoupon}
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
  );
};

export default DiscountCoupon;
