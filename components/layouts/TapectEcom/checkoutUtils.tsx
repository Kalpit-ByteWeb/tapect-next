declare global {
  interface Window {
    Stripe?: any;
  }
}

export const getCurrencyCode = (cart: any[]): string => {
  if (!cart || cart.length === 0) return "USD";

  const symbol = cart[0]?.currency;
  switch (symbol) {
    case "₹":
      return "INR";
    case "$":
      return "USD";
    case "€":
      return "EUR";
    case "د.إ":
      return "AED";
    case "A$":
      return "AUD";
    default:
      return "USD";
  }
};

export const loadStripeScript = (publicKey: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!publicKey) {
      reject(new Error("Stripe public key is required"));
      return;
    }

    if (window.Stripe) {
      resolve(window.Stripe(publicKey));
      return;
    }

    // Remove existing script if any
    const existingScript = document.getElementById("stripe-js");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = "stripe-js";
    script.src = "https://js.stripe.com/v3/";
    script.onload = () => {
      if (window.Stripe) {
        resolve(window.Stripe(publicKey));
      } else {
        reject(new Error("Stripe SDK failed to load"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load Stripe SDK"));
    document.body.appendChild(script);
  });
};

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(false);
    document.body.appendChild(script);
  });
};

export const loadPayPalScript = (
  setReady: (ready: boolean) => void,
  loadingRef: React.MutableRefObject<boolean>,
  currencyCode: string
) => {
  if (document.getElementById("paypal-sdk")) {
    setReady(true);
    return;
  }

  if (loadingRef.current) return;

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_API_KEY;
  if (!paypalClientId) {
    console.error("PayPal client ID is missing");
    return;
  }

  loadingRef.current = true;
  const script = document.createElement("script");
  script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=${currencyCode}&intent=capture&components=buttons,funding-eligibility`;
  script.id = "paypal-sdk";
  script.async = true;
  script.onload = () => {
    setReady(true);
    loadingRef.current = false;
  };
  script.onerror = () => {
    console.error("Failed to load PayPal SDK");
    loadingRef.current = false;
  };
  document.body.appendChild(script);
};

export const isAddressValid = (address: {
  FirstName: string;
  LastName: string;
  Country: string;
  StreetAddress: string;
  State: string;
  City: string;
  PostalCode: string;
  PhoneNumber: string;
}): boolean => {
  return (
    !!address.FirstName &&
    !!address.LastName &&
    !!address.Country &&
    !!address.StreetAddress &&
    !!address.State &&
    !!address.City &&
    !!address.PostalCode &&
    !!address.PhoneNumber
  );
};

export const toggleCountryPopup = (
  country: string,
  setShowPopup: (val: boolean) => void
) => {
  const popupCountries = [
    "India",
    "Australia",
    "United Arab Emirates",
    "Germany",
  ];
  const domain = window.location.hostname.replace("www.", "").toLowerCase();
  if (domain === "tapect.com" && popupCountries.includes(country)) {
    setShowPopup(true);
  }
};

export const initialOrderState = () => ({
  OrderId: Math.floor(Math.random() * 10000),
  PaymentStatus: "",
  PaymentID: "",
  OrderStatus: "",
  ShippingAddress: {
    FirstName: "",
    LastName: "",
    Country: "",
    StreetAddress: "",
    State: "",
    City: "",
    PostalCode: "",
    PhoneNumber: "",
  },
  BillingAddress: {
    FirstName: "",
    LastName: "",
    Country: "",
    StreetAddress: "",
    State: "",
    City: "",
    PostalCode: "",
    PhoneNumber: "",
  },
  Customer: null,
  product_details: [] as number[],
});
