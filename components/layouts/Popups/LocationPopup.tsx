'use client'
import React, { useEffect, useState } from "react";
import { getUserCountry } from "../../../libs/Assets/Geolocation";
import { getDomain } from "../../../libs/Assets/DomainWiseData";

const LocationPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [flagUrl, setFlagUrl] = useState<string>("");
  const [buttonUrl, setButtonUrl] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  useEffect(() => {
    const checkPopupStatus = async () => {
      const lastDismissedDate = localStorage.getItem("locationPopupDismissed");
      const today = new Date().toDateString();
      if (lastDismissedDate === today) return;

      const userCountry = await getUserCountry();
      const domain = getDomain();

      const domainToCountryMap: Record<string, string> = {
        "tapect.in": "IN",
        "tapect.au": "AU",
        "tapect.de": "DE",
        "tapect.ae": "AE",
      };

      const redirectToLocal: Record<string, string> = {
        IN: "https://www.tapect.in/",
        AU: "https://www.tapect.au/",
        DE: "https://www.tapect.de/",
        AE: "https://www.tapect.ae/",
      };

      const flagMap: Record<
        string,
        { name: string; flag: string; currency: string }
      > = {
        IN: {
          name: "India",
          flag: "/Icons/IndiaFlag.svg",
          currency: "INR ₹",
        },
        DE: {
          name: "Germany",
          flag: "/Icons/GermanyFlag.svg",
          currency: "Euro €",
        },
        AU: {
          name: "Australia",
          flag: "/Icons/AustraliaFlag.svg",
          currency: "AUD AU$",
        },
        AE: {
          name: "UAE",
          flag: "/Icons/UnitedArabEmiratesFlag.svg",
          currency: "AED د.إ",
        },
      };

      let shouldShowPopup = false;
      let redirectUrl = "";

      if (domain === "tapect.com") {
        // Show popup ONLY for supported countries
        if (["IN", "AU", "DE", "AE"].includes(userCountry)) {
          shouldShowPopup = true;
          redirectUrl = redirectToLocal[userCountry];
        }
      } else {
        const allowedCountry = domainToCountryMap[domain];
        if (userCountry !== allowedCountry) {
          shouldShowPopup = true;
          redirectUrl = "https://www.tapect.com/";
        }
      }

      if (shouldShowPopup) {
        const config = flagMap[userCountry] || {
          name: "Global",
          flag: "/Icons/Global-Icon.svg",
          currency: "$",
        };
        setTimeout(() => {
        setCountry(config.name);
        setFlagUrl(config.flag);
        setButtonUrl(redirectUrl);
        setCurrency(config.currency);
        setShowPopup(true);
      }, 3000);
      }
    };

    checkPopupStatus();
  }, []);

  // Function to dismiss the popup and store the timestamp
  const handleDismiss = () => {
    localStorage.setItem("locationPopupDismissed", new Date().toDateString());
    setShowPopup(false);
  };

  if (!showPopup || !country) return null; // Don't render if popup shouldn't be shown

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-12 w-[726px] border border-primary rounded-16">
        <div className="space-y-6">
          <img src={flagUrl} alt={country} className="mx-auto" />
          <h2 className="TitleHeading text-secondary text-center">
            Your location is set to{" "}
            <span className="text-primary">{country}</span>
          </h2>
          <div className="space-y-2">
            <p className="Heading-20 text-secondary">• Shop in {currency}</p>
            <p className="Heading-20 text-secondary">
              • Get shipping options for {country}
            </p>
          </div>
          <a href={buttonUrl} className="block">
            <button className="btn-primary text-white w-full py-4 rounded-[8px] text-md font-semibold font-primary">
              Continue
            </button>
          </a>
          <button
            onClick={handleDismiss}
            className="block text-secondary mx-auto Description underline">
            Continue with Existing Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPopup;
