
// import { useEffect, useState } from "react";
// import { getLocaleByDomain } from "@/libs/Assets/DomainWiseData";
// import axios from "axios";

// const useSEO = (page: string) => {
//   const [seoData, setSeoData] = useState<any>(null);
//   const [hostname, setHostname] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const API_URL_ENV = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => {
//     setHostname(window.location.hostname.replace("www.", "").toLowerCase());
//   }, []);

//   useEffect(() => {
//     const fetchSEO = async () => {
//       if (!hostname || !page) return;

//       try {
//         setLoading(true);
//         const locale = getLocaleByDomain(hostname);

//         const params: any = {
//           "filters[page][$eq]": page,
//           "populate[seo][populate][0]": "metaImage",
//           "populate[seo][populate][1]": "openGraph.ogImage",
//           "populate[seo][populate][2]": "twitter.twitterImage",
//         };

//         if (locale) {
//           params["filters[locale][$eq]"] = locale;
//         }

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
//   }, [hostname, page]);

//   return { seoData, loading, error };
// };
