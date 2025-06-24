import { useEffect, useRef } from "react";

const PayPalButtonContainer = ({
  createOrder,
  onApprove,
  handleBeforePayPalClick,
}: any) => {
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paypalContainerRef.current || window.paypal === undefined) {
      console.error("PayPal SDK not loaded or container missing.");
      return;
    }

    // Clear existing PayPal buttons before rendering a new one
    paypalContainerRef.current.innerHTML = "";

    try {
      window.paypal
        .Buttons({
          onClick: (_data: any, actions: any) => {
            if (!handleBeforePayPalClick()) {
              return actions.reject();
            }
          },
          createOrder,
          onApprove,
        })
        .render(paypalContainerRef.current);
    } catch (error) {
      console.error("Error rendering PayPal button:", error);
    }

    return () => {
      if (paypalContainerRef.current) {
        paypalContainerRef.current.innerHTML = "";
      }
    };
  }, [createOrder, onApprove, handleBeforePayPalClick]);

  return <div ref={paypalContainerRef} />;
};

export default PayPalButtonContainer;
