'use client'
import { useEffect } from "react";

const PaymentScripts = () => {
  useEffect(() => {
    if (!document.querySelector("#razorpay-script")) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.id = "razorpay-script";
      script.async = true;
      document.body.appendChild(script);
    }

    if (!document.querySelector("#paypal-sdk")) {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AVrIO42VAMUGpnLP0GWZmqX8JeomtTqArTSiXfRd5n8ZLPZsCPZ5Yu8mgzVcUOn-J3CWmsOfqmGJurH8&currency=USD&intent=capture";
      script.id = "paypal-sdk";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
};

export default PaymentScripts;
