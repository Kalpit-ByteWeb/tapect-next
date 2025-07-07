// components/LocationPopup.tsx
"use client";

import { useEffect, useState } from "react";
import { getUserCountry } from "@/libs/Assets/Geolocation";
import { getDomain } from "@/libs/Assets/DomainWiseData";

export default function LocationPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [flagUrl, setFlagUrl] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    async function checkPopupStatus() {
      const lastDismissed = localStorage.getItem("locationPopupDismissed");
      const today = new Date().toDateString();
      if (lastDismissed === today) return;

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
      const flagMap: Record<string, { name: string; flag: string; currency: string }> = {
        IN: { name: "India", flag: "/Icons/IndiaFlag.svg", currency: "INR ₹" },
        DE: { name: "Germany", flag: "/Icons/GermanyFlag.svg", currency: "Euro €" },
        AU: { name: "Australia", flag: "/Icons/AustraliaFlag.svg", currency: "AUD AU$" },
        AE: { name: "UAE", flag: "/Icons/UnitedArabEmiratesFlag.svg", currency: "AED د.إ" },
      };

      let shouldShow = false;
      let redirectUrl = "";

      if (domain === "tapect.com") {
        if (["IN", "AU", "DE", "AE"].includes(userCountry)) {
          shouldShow = true;
          redirectUrl = redirectToLocal[userCountry];
        }
      } else {
        const allowed = domainToCountryMap[domain];
        if (userCountry !== allowed) {
          shouldShow = true;
          redirectUrl = "https://www.tapect.com/";
        }
      }

      if (shouldShow) {
        const cfg = flagMap[userCountry] ?? {
          name: "Global",
          flag: "/Icons/Global-Icon.svg",
          currency: "$",
        };
        setTimeout(() => {
          setCountry(cfg.name);
          setFlagUrl(cfg.flag);
          setButtonUrl(redirectUrl);
          setCurrency(cfg.currency);
          setShowPopup(true);
        }, 3000);
      }
    }

    checkPopupStatus();
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("locationPopupDismissed", new Date().toDateString());
    setShowPopup(false);
  };

  if (!showPopup || !country) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-12 w-[726px] border border-primary rounded-16 space-y-6">
        <img src={flagUrl} alt={country} className="mx-auto" />
        <h2 className="TitleHeading text-secondary text-center">
          Your location is set to <span className="text-primary">{country}</span>
        </h2>
        <div className="space-y-2">
          <p className="Heading-20 text-secondary">• Shop in {currency}</p>
          <p className="Heading-20 text-secondary">• Get shipping options for {country}</p>
        </div>
        <a href={buttonUrl} className="block">
          <button className="btn-primary text-white w-full py-4 rounded-[8px] text-md font-semibold font-primary">
            Continue
          </button>
        </a>
        <button
          onClick={handleDismiss}
          className="block text-secondary mx-auto Description underline"
        >
          Continue with Existing Site
        </button>
      </div>
    </div>
  );
}
