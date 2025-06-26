"use client"; 

import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation"; 
import { HiArrowNarrowLeft } from "react-icons/hi";
import ShippingBillingForm from "@/components/layouts/TapectEcom/ShippingBillingForm";
import OrderSummary from "@/components/layouts/TapectEcom/OrderSummary";
import PaymentMethod from "@/components/layouts/TapectEcom/PaymentMethod";
import UsersContact from "@/components/layouts/TapectEcom/UsersContact";
import ThankyouOrder from "@/components/layouts/TapectEcom/ThankyouOrder";
import CheckoutLocationPopup from "@/components/layouts/Popups/CheckoutLocationPopup";


import {
  getCurrencyCode,
  loadPayPalScript,
  loadRazorpayScript,
  initialOrderState,
  toggleCountryPopup,
  loadStripeScript,
} from "@/components/layouts/TapectEcom/checkoutUtils"; 
import { calculateShippingCost, getDomain } from "@/libs/Assets/DomainWiseData"; 


declare global {
  interface Window {
    Razorpay: any;
    paypal?: any;
  }
}

interface Address {
  FirstName: string;
  LastName: string;
  Country: string;
  StreetAddress: string;
  State: string;
  City: string;
  PostalCode: string;
  PhoneNumber: string;
}

const initialAddress: Address = {
  FirstName: "",
  LastName: "",
  Country: "",
  StreetAddress: "",
  State: "",
  City: "",
  PostalCode: "",
  PhoneNumber: "",
};


const scrollToFirstError = () => {
  const firstError = document.querySelector(
    "input.border-red-500, select.border-red-500"
  );
  if (firstError) {
    firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    (firstError as HTMLElement).focus();
  }
};

const API_URL_ENV = process.env.NEXT_PUBLIC_API_URL;
const RAZORPAY_API_KEY = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
  const host =
    typeof window !== "undefined" ? window.location.host : "tapect.com";
    const domain = getDomain(host);
const CheckoutPage = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [order, setOrder] = useState(initialOrderState());
  const [userId, setUserId] = useState<number | null>(null);
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupCountry, setShowPopupCountry] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [paypalReady, setPaypalReady] = useState(false);
  const paypalOrderIdRef = useRef<number | null>(null);
  const paypalScriptLoading = useRef(false);

  // Coupon States
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  // Validation Errors
  const [shippingPostalCodeError, setShippingPostalCodeError] = useState("");
  const [shippingPhoneNumberError, setShippingPhoneNumberError] = useState("");
  const [billingPostalCodeError, setBillingPostalCodeError] = useState("");
  const [billingPhoneNumberError, setBillingPhoneNumberError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const orderRef = useRef(order);
  const isEmailVerifiedRef = useRef(false);
  const formRef = useRef<any>(null);

  // --- Next.js Routing Hooks ---
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentStatus = searchParams.get("payment");
    const sessionId = searchParams.get("session_id");

    if (paymentStatus === "success" && sessionId) {
      setShowPopup(true);
      // Potentially clear cart and redirect or show success message
    }
  }, [searchParams]);

  useEffect(() => {
    orderRef.current = order;
  }, [order]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      const cartData = JSON.parse(storedCart);
      setCart(cartData);
      setOrder((prev) => ({
        ...prev,
        product_details: cartData.map((item: any) => item.id),
      }));
    }

    setDiscount(parseFloat(sessionStorage.getItem("discount") || "0"));
    setCouponApplied(sessionStorage.getItem("couponApplied") === "true");
    setCouponCode(sessionStorage.getItem("couponCode") || "");

    if (selectedPaymentMethod === "paypal") {
      loadPayPalScript(
        setPaypalReady,
        paypalScriptLoading,
        getCurrencyCode(cart)
      );
    }

    loadRazorpayScript();

    if (selectedPaymentMethod === "stripe" && STRIPE_PUBLIC_KEY) {
      loadStripeScript(STRIPE_PUBLIC_KEY);
    }
  }, []);

  useEffect(() => {
    setShippingCost(calculateShippingCost(domain));
    toggleCountryPopup(order.ShippingAddress.Country, setShowPopupCountry);
  }, [order.ShippingAddress, order.BillingAddress]);

  const validateField = (
    section: "ShippingAddress" | "BillingAddress",
    field: "PostalCode" | "PhoneNumber"
  ) => {
    const address =
      section === "ShippingAddress"
        ? order.ShippingAddress
        : order.BillingAddress;
    const value = address[field];

    if (field === "PostalCode") {
      const isValid = /^\d{4,10}$/.test(value);
      const msg = isValid ? "" : "Invalid postal code";
      section === "ShippingAddress"
        ? setShippingPostalCodeError(msg)
        : setBillingPostalCodeError(msg);
    }

    if (field === "PhoneNumber") {
      const digits = value.replace(/\D/g, "");
      const isValid = digits.length >= 10;
      const msg = isValid ? "" : "Invalid phone number";
      section === "ShippingAddress"
        ? setShippingPhoneNumberError(msg)
        : setBillingPhoneNumberError(msg);
    }
  };

  const clearFieldError = (
    section: "ShippingAddress" | "BillingAddress",
    field: "PostalCode" | "PhoneNumber"
  ) => {
    if (field === "PostalCode") {
      section === "ShippingAddress"
        ? setShippingPostalCodeError("")
        : setBillingPostalCodeError("");
    }

    if (field === "PhoneNumber") {
      section === "ShippingAddress"
        ? setShippingPhoneNumberError("")
        : setBillingPhoneNumberError("");
    }
  };

  const handleAddressChange = useCallback(
    (
      section: "ShippingAddress" | "BillingAddress",
      field: keyof Address,
      value: string
    ) => {
      setOrder((prev) => {
        const updated = {
          ...prev,
          BillingAddress: initialAddress,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
        if (useSameAddress && section === "ShippingAddress") {
          updated.BillingAddress = { ...updated.ShippingAddress };
        }
        return updated;
      });
    },
    [useSameAddress]
  );

  const handleApplyCoupon = useCallback(
    (coupon: string) => {
      if (couponApplied) return setCouponError("Coupon already applied.");

      if (coupon === "DISCOUNT10") {
        setDiscount(10);
        setCouponCode(coupon);
        setCouponApplied(true);
        setCouponError("");
        sessionStorage.setItem("discount", "10");
        sessionStorage.setItem("couponCode", coupon);
        sessionStorage.setItem("couponApplied", "true");
      } else {
        setDiscount(0);
        setCouponApplied(false);
        setCouponCode("");
        setCouponError("Invalid coupon code");
        sessionStorage.setItem("discount", "0");
        sessionStorage.setItem("couponCode", "");
        sessionStorage.setItem("couponApplied", "false");
      }
    },
    [couponApplied]
  );

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        data: {
          ...orderRef.current,
          PaymentStatus: "Pending Payment",
          OrderStatus: "Processing",
          ReminderSent: false,
          Customer: userId,
          product_details: order.product_details.map(Number),
        },
      };

      const response = await axios.post(
        `${API_URL_ENV}orders?populate=*`,
        orderData,
        {
          headers: {
            // Using the renamed environment variable
            Authorization: `Bearer ${STRAPI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data.documentId;
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order. Please try again.");
      return null;
    }
  };

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + Number(item.price.replace(/[^0-9.]/g, "")) * item.quantity,
    0
  );

  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shippingCost - discountAmount;

  const handleConfirmationEmail = async () => {
    try {
      const emailData = {
        orderId: orderRef.current.OrderId,
        productDetails: cart,
        billingAddress: orderRef.current.BillingAddress,
        shippingAddress: orderRef.current.ShippingAddress,
        customerEmail: sessionStorage.getItem("verifiedEmail"),
        subtotal,
        discount,
        shippingCost,
        total,
        currency: cart[0]?.currency,
      };

      await axios.post(
        `${API_URL_ENV}send-order-confirmation-email`,
        emailData
      );
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
      // Don't block the payment process if email fails
    }
  };

  const handlePayment = async () => {
    if (isProcessing) return;
    if (!STRAPI_API_KEY || !RAZORPAY_API_KEY || !STRIPE_PUBLIC_KEY || !API_URL_ENV) {
      alert("Configuration error: API keys are missing.");
      return;
    }
    setIsProcessing(true);

    try {
      const isValid = formRef.current?.validateForm?.();

      if (!selectedPaymentMethod || !isEmailVerifiedRef.current || !isValid) {
        scrollToFirstError();
        setIsProcessing(false);
        return;
      }

      const savedOrderId = await handlePlaceOrder();
      if (!savedOrderId) {
        setIsProcessing(false);
        return;
      }

      await handleConfirmationEmail();

      if (selectedPaymentMethod === "razorpay") {
        const { data: razorpayOrder } = await axios.post(
          `${API_URL_ENV}/razorpay-order-create`,
          {
            amount: total,
            currency: "INR",
            strapiOrderId: order.OrderId,
          }
        );

        const razorpay = new window.Razorpay({
          key: RAZORPAY_API_KEY,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Tapect Store",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: () => {
            setShowPopup(true);
            sessionStorage.clear();
          },
          prefill: {
            name: order.BillingAddress.FirstName,
            contact: order.BillingAddress.PhoneNumber,
            email: sessionStorage.getItem("verifiedEmail"),
          },
          theme: { color: "#652DBF" },
        });

        razorpay.open();
      }

      if (selectedPaymentMethod === "stripe") {
        const stripe = await loadStripeScript(STRIPE_PUBLIC_KEY);

        const sessionData = {
          order: {
            ...orderRef.current,
            OrderId: orderRef.current.OrderId,
            Customer: userId,
            PaymentStatus: "Pending Payment",
            OrderStatus: "Processing",
          },
          productDetails: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            currency: item.currency,
          })),
          total: total,
          currency: getCurrencyCode(cart),
          customerEmail: sessionStorage.getItem("verifiedEmail"),
          // window.location.origin is safe to use in a client component
          successUrl: `${window.location.origin}/checkout?payment=success&session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/checkout`,
          metadata: {
            orderId: orderRef.current.OrderId.toString(),
            userId: userId?.toString() || "guest",
          },
        };

        const { data: session } = await axios.post(
          `${API_URL_ENV}create-stripe-session`,
          sessionData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${STRAPI_API_KEY}`,
            },
            timeout: 30000,
          }
        );

        if (!session.id) {
          throw new Error("No session ID returned from Stripe");
        }

        await stripe.redirectToCheckout({ sessionId: session.id });
        return;
      }
    } catch (error) {
      console.error("Payment processing error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBeforePayPalClick = async (): Promise<boolean> => {
    if (isProcessing) return false;
    setIsProcessing(true);

    try {
      const isValid = formRef.current?.validateForm?.();
      if (!isValid || !isEmailVerifiedRef.current) {
        scrollToFirstError();
        setIsProcessing(false);
        return false;
      }

      const savedOrderId = await handlePlaceOrder();
      if (!savedOrderId) {
        setIsProcessing(false);
        return false;
      }
      paypalOrderIdRef.current = savedOrderId;

      // Send confirmation email before proceeding to PayPal
      await handleConfirmationEmail();
      
      setIsProcessing(false);
      return true;
    } catch (error) {
      console.error("PayPal pre-click error:", error);
      setIsProcessing(false);
      return false;
    }
  };

useEffect(() => {
  if (selectedPaymentMethod !== 'paypal') return;

  if (!window.paypal && !paypalScriptLoading.current) {
    loadPayPalScript(
      setPaypalReady,
      paypalScriptLoading,
      getCurrencyCode(cart),
    );
    return;
  }

  if (paypalReady && window.paypal) {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;

    if (container.childElementCount === 0) {
      const buttons = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'pill',
          label: 'paypal',
        },
        fundingSource: undefined,
        onClick: async (_: any, actions: any) => {
          const allowed = await handleBeforePayPalClick();
          return allowed ? actions.resolve() : actions.reject();
        },
        createOrder: (_: any, actions: any) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toFixed(2),
                  currency_code: getCurrencyCode(cart),
                },
                invoice_id: order.OrderId.toString(),
              },
            ],
          }),
        onApprove: async (_: any, actions: any) => {
          await actions.order.capture();
          setShowPopup(true);
          sessionStorage.clear();
        },
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          alert('PayPal payment failed. Please try again.');
        },
      });

      buttons.render(container);
      return () => {
        buttons.close && buttons.close();
        container.innerHTML = '';
      };
    }
  }
}, [
  selectedPaymentMethod,
  paypalReady,
  cart,
  total,
]);


  if (!cart.length) {
    return (
      <section className="py-120 flex flex-col items-center space-y-6">
        <p className="TitleHeading">
          Your session expired. Please add products again.
        </p>
        <Link href="/product" className="btn-primary px-4 py-6">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <>
      <CheckoutLocationPopup
        show={showPopupCountry}
        country={order.ShippingAddress.Country}
      />
      <ThankyouOrder show={showPopup} onClose={() => setShowPopup(false)} />
      <section className="md:py-120 py-60 px-6">
        <div className="md:container mx-auto space-y-12">
          <h1 className="TitleHeading">Checkout:</h1>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
            <div className="lg:w-3/5 space-y-6">
              <UsersContact
                onEmailVerified={(verified, id) => {
                  isEmailVerifiedRef.current = verified;
                  setUserId(id);
                }}
              />
              <ShippingBillingForm
                ref={formRef}
                shippingAddress={order.ShippingAddress}
                billingAddress={order.BillingAddress}
                useSameAddress={useSameAddress}
                setUseSameAddress={setUseSameAddress}
                onAddressChange={handleAddressChange}
                shippingPostalCodeError={shippingPostalCodeError}
                shippingPhoneNumberError={shippingPhoneNumberError}
                billingPostalCodeError={billingPostalCodeError}
                billingPhoneNumberError={billingPhoneNumberError}
                validateField={validateField}
                clearFieldError={clearFieldError}
              />

              <PaymentMethod onPaymentMethodSelect={setSelectedPaymentMethod} />

              {selectedPaymentMethod === "razorpay" && (
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Link href="/cart" className="flex items-center gap-1">
                    <HiArrowNarrowLeft />
                    <span>Return to shop</span>
                  </Link>
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="btn-primary py-4 sm:px-[110px] w-full sm:w-auto disabled:opacity-50">
                    {isProcessing ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              )}

              {selectedPaymentMethod === "paypal" && paypalReady && (
                <div className="space-y-4">
                  <Link href="/cart" className="flex items-center gap-1">
                    <HiArrowNarrowLeft />
                    <span>Return to shop</span>
                  </Link>

                  <div
                    id="paypal-button-container"
                    data-sdk-integration-source="button-factory"
                    style={{ minHeight: "200px" }}></div>
                </div>
              )}

              {selectedPaymentMethod === "stripe" && (
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Link href="/cart" className="flex items-center gap-1">
                    <HiArrowNarrowLeft />
                    <span>Return to shop</span>
                  </Link>
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="btn-primary py-4 sm:px-[110px] w-full sm:w-auto disabled:opacity-50">
                    {isProcessing ? "Processing..." : "Pay with Stripe"}
                  </button>
                </div>
              )}
            </div>

            <div className="lg:w-2/5 space-x-0 ">
              <OrderSummary
                cart={cart}
                discount={discount}
                shippingCost={shippingCost}
                couponApplied={couponApplied}
                couponCode={couponCode}
                couponError={couponError}
                onApplyCoupon={handleApplyCoupon}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;