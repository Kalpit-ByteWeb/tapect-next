// libs/Assets/DomainWiseData.ts

export type DomainConfig = {
  locale: string | null;
  shippingCost: number;
  country: string;
  leadSource: string;
  gaTrackingId: string;
};

const DOMAIN_CONFIG: Record<string, DomainConfig> = {
  "tapect.com": {
    locale: "en",
    shippingCost: 30,
    country: "",
    leadSource: "Website",
    gaTrackingId: "G-6B5QGMBZCD",
  },
  "tapect.in": {
    locale: "en-IN",
    shippingCost: 0,
    country: "India",
    leadSource: "WebsiteIN",
    gaTrackingId: "G-7JWF80EP1D",
  },
  "tapect.de": {
    locale: "de",
    shippingCost: 30,
    country: "Germany",
    leadSource: "WebsiteDE",
    gaTrackingId: "G-3F1X251Z2H",
  },
  "tapect.ae": {
    locale: "en",
    shippingCost: 40,
    country: "United Arab Emirates",
    leadSource: "WebsiteAE",
    gaTrackingId: "G-DHYY9019Q7",
  },
  "tapect.au": {
    locale: "en-AU",
    shippingCost: 40,
    country: "Australia",
    leadSource: "WebsiteAU",
    gaTrackingId: "G-BCMS52CLHE",
  },
};

const DEFAULT_DOMAIN = "tapect.com";

// ✅ Now supports server-side rendering
export const getDomain = (hostname?: string): string => {
  const domain = hostname?.replace("www.", "").toLowerCase() ?? DEFAULT_DOMAIN;
  return DOMAIN_CONFIG[domain] ? domain : DEFAULT_DOMAIN;
};

export const getLocaleByDomain = (domain: string): string | null =>
  DOMAIN_CONFIG[domain]?.locale ?? DOMAIN_CONFIG[DEFAULT_DOMAIN].locale;

export const calculateShippingCost = (domain: string): number =>
  DOMAIN_CONFIG[domain]?.shippingCost ?? DOMAIN_CONFIG[DEFAULT_DOMAIN].shippingCost;

export const getCountryByDomain = (domain: string): string =>
  DOMAIN_CONFIG[domain]?.country ?? DOMAIN_CONFIG[DEFAULT_DOMAIN].country;

export const getLeadSourceByDomain = (domain: string): string =>
  DOMAIN_CONFIG[domain]?.leadSource ?? DOMAIN_CONFIG[DEFAULT_DOMAIN].leadSource;

export const getTrackingIdByDomain = (domain: string): string =>
  DOMAIN_CONFIG[domain]?.gaTrackingId ?? DOMAIN_CONFIG[DEFAULT_DOMAIN].gaTrackingId;
