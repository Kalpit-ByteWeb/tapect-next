import axios from "axios";
import { getLocaleByDomain } from "@/libs/Assets/DomainWiseData";

export interface ImageData {
  url: string;
  alternativeText?: string;
}

export interface OpenGraph {
  id: number;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string | null;
  ogType: string;
  ogLocale: string;
  ogSiteName: string | null;
  ogImage?: ImageData;
}

export interface Twitter {
  id: number;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterSite: string | null;
  twitterCreator: string | null;
  twitterImage?: ImageData;
}

export interface SEOData {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string | null;
  metaRobots?: string;
  metaViewport: string | null;
  canonicalURL: string | null;
  structuredData: string | null;
  extraMeta: any;
  metaImage?: ImageData;
  openGraph: OpenGraph;
  twitter: Twitter;
}

export async function getSEOData(pagePath: string, hostname?: string): Promise<SEOData | null> {
  try {
    const API_URL_ENV = process.env.NEXT_PUBLIC_API_URL;
    
    const params: any = {
      "filters[page][$eq]": pagePath,
      "populate[seo][populate][0]": "metaImage",
      "populate[seo][populate][1]": "openGraph.ogImage",
      "populate[seo][populate][2]": "twitter.twitterImage",
    };

    if (hostname) {
      const locale = getLocaleByDomain(hostname);
      if (locale) {
        params["filters[locale][$eq]"] = locale;
      }
    }

    console.log("SEO API Params:", params);
    console.log("Fetching SEO for path:", pagePath);

    const response = await axios.get(`${API_URL_ENV}seos`, { params });
    const data = response.data.data;

    console.log("SEO API Response:", data);

    if (Array.isArray(data) && data.length > 0) {
      const seo = data[0].seo;
      return {
        ...seo,
        extraMeta: seo.extraMeta ? JSON.parse(seo.extraMeta) : {},
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return null;
  }
}