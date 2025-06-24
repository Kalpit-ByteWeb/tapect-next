// import { getLocaleByDomain } from "@/libs/Assets/DomainWiseData";
// import axios from "axios";
// import { useState, useEffect } from "react";

// export interface ImageData {
//   url: string;
//   alternativeText?: string;
// }

// export interface OpenGraph {
//   id: number;
//   ogTitle: string;
//   ogDescription: string;
//   ogUrl: string | null;
//   ogType: string;
//   ogLocale: string;
//   ogSiteName: string | null;
//   ogImage?: ImageData;
// }

// export interface Twitter {
//   id: number;
//   twitterCard: string;
//   twitterTitle: string;
//   twitterDescription: string;
//   twitterSite: string | null;
//   twitterCreator: string | null;
//   twitterImage?: ImageData;
// }

// export interface SEOData {
//   id: number;
//   metaTitle: string;
//   metaDescription: string;
//   keywords: string | null;
//   metaRobots?: string;
//   metaViewport: string | null;
//   canonicalURL: string | null;
//   structuredData: string | null;
//   extraMeta: any;
//   metaImage?: ImageData;
//   openGraph: OpenGraph;
//   twitter: Twitter;
// }



// const useSEO = (page: string, initialHostname?: string) => {
//   const [seoData, setSeoData] = useState<SEOData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [mounted, setMounted] = useState(false);
//   const API_URL_ENV = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     const fetchSEO = async () => {
//       if (!mounted || !page) return;

//       try {
//         setLoading(true);
//         const hostname = initialHostname || 
//           (typeof window !== 'undefined' ? window.location.hostname : '');
        
//         if (!hostname) {
//           setLoading(false);
//           return;
//         }

//         const cleanHostname = hostname.replace("www.", "").toLowerCase();
//         const locale = getLocaleByDomain(cleanHostname);

//         const params: any = {
//           "filters[page][$eq]": page,
//           "populate[seo][populate][0]": "metaImage",
//           "populate[seo][populate][1]": "openGraph.ogImage",
//           "populate[seo][populate][2]": "twitter.twitterImage",
//         };

//         if (locale) {
//           params["filters[locale][$eq]"] = locale;
//         }

//         console.log(params);

//         const response = await axios.get(`${API_URL_ENV}seos`, { params });
//         const data = response.data.data;

//         if (Array.isArray(data) && data.length > 0) {
//           const seo = data[0].seo;
//           setSeoData({
//             ...seo,
//             extraMeta: seo.extraMeta ? JSON.parse(seo.extraMeta) : {},
//           });
//         } else {
//           setSeoData(null);
//         }
//         setLoading(false);
//       } catch (err) {
//         setError(err as Error);
//         setLoading(false);
//       }
//     };

//     fetchSEO();
//   }, [mounted, page, initialHostname, API_URL_ENV]);

//   return { seoData, loading, error, mounted };
// };
// export default useSEO;