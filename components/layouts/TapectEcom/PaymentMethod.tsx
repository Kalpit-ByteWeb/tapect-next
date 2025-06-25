'use client'
import { useEffect, useState } from "react";
import { Image } from "../../../libs/Index";

interface Props {
  onPaymentMethodSelect: (paymentMethod: string) => void;
}

const PaymentMethod: React.FC<Props> = ({ onPaymentMethodSelect }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    const host = window.location.hostname.replace("www.", "").toLowerCase();
    setDomain(host);

    const isIndiaDomain = host === "tapect.in";
    const defaultMethod = isIndiaDomain ? "razorpay" : "paypal";
    setSelectedPaymentMethod(defaultMethod);
    onPaymentMethodSelect(defaultMethod);
  }, []);

  return (
    <div className="border p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Payment</h2>

      <div>
        {domain === "tapect.in" ? (
          <div className="border border-[#E5E5E5] px-6 py-3 rounded-[5px]">
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="razorpay"
                  checked={selectedPaymentMethod === "razorpay"}
                  onChange={() => {
                    setSelectedPaymentMethod("razorpay");
                    onPaymentMethodSelect("razorpay");
                  }}
                  className="mr-2"
                />
                Razorpay
              </label>
              <Image
                src="/Logo/Razorpay-logo.svg"
                alt="RazorPay"
                className="w-[85px] h-[22px]"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="border border-[#E5E5E5] border-b-none px-6 py-3 rounded-[5px] rounded-b-[0px]">
              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="paypal"
                    checked={selectedPaymentMethod === "paypal"}
                    onChange={() => {
                      setSelectedPaymentMethod("paypal");
                      onPaymentMethodSelect("paypal");
                    }}
                    className="mr-2"
                  />
                  PayPal
                </label>
                <Image src="/Logo/PayPal-logo.svg" alt="PayPal" />
              </div>
            </div>
            <div className="border border-t-0 border-[#E5E5E5] px-6 py-3 rounded-[5px] rounded-t-[0px]">
              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="stripe"
                    checked={selectedPaymentMethod === "stripe"}
                    onChange={() => {
                      setSelectedPaymentMethod("stripe");
                      onPaymentMethodSelect("stripe");
                    }}
                    className="mr-2"
                  />
                  Stripe
                </label>
                <Image
                  src="/Logo/Stripe-logo.svg"
                  alt="Stripe"
                  className="w-[85px] h-[22px]"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
