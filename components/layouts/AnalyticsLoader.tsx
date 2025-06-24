// components/AnalyticsLoader.tsx
"use client";

import { useEffect } from "react";
import { getDomain, getTrackingIdByDomain } from "@/libs/Assets/DomainWiseData";

export default function AnalyticsLoader() {
  useEffect(() => {
    const domain = getDomain(
      typeof window !== "undefined" ? window.location.host : undefined
    );
    const trackingId = getTrackingIdByDomain(domain);
    if (!trackingId) return;

    // inject the gtag.js script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.async = true;
    document.head.appendChild(script);

    // insert your inline config
    const inline = document.createElement("script");
    inline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}');
    `;
    document.head.appendChild(inline);
  }, []);

  return null;
}
