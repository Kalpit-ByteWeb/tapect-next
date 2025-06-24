// import { Helmet } from "react-helmet-async";

// interface ImageData {
//   url: string;
//   alternativeText?: string;
// }

// interface OpenGraph {
//   id: number;
//   ogTitle: string;
//   ogDescription: string;
//   ogUrl: string | null;
//   ogType: string;
//   ogLocale: string;
//   ogSiteName: string | null;
//   ogImage?: ImageData;
// }

// interface Twitter {
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
//   extraMeta: string | null;
//   metaImage?: ImageData;
//   openGraph: OpenGraph;
//   twitter: Twitter;
// }

// const SEO = ({ seoData }: { seoData: SEOData | null }) => {
//   if (!seoData) return null;

//   const {
//     metaTitle,
//     metaDescription,
//     metaRobots,
//     canonicalURL,
//     extraMeta,
//     openGraph,
//     twitter,
//   } = seoData;

//   return (
//     <Helmet>
//       {/* Basic Meta Tags */}
//       <title>{metaTitle}</title>
//       <meta name="description" content={metaDescription} />
//       {metaRobots && <meta name="robots" content={metaRobots} />}
//       {canonicalURL && <link rel="canonical" href={canonicalURL} />}

//       {/* Open Graph Meta Tags */}
//       {openGraph?.ogLocale && (
//         <meta property="og:locale" content={openGraph.ogLocale} />
//       )}
//       {openGraph?.ogType && (
//         <meta property="og:type" content={openGraph.ogType} />
//       )}
//       <meta property="og:title" content={openGraph?.ogTitle || metaTitle} />
//       <meta
//         property="og:description"
//         content={openGraph?.ogDescription || metaDescription}
//       />
//       {openGraph?.ogUrl && <meta property="og:url" content={openGraph.ogUrl} />}
//       {openGraph?.ogSiteName && (
//         <meta property="og:site_name" content={openGraph.ogSiteName} />
//       )}
//       {openGraph.ogImage?.url && (
//         <meta property="og:image" content={openGraph.ogImage?.url} />
//       )}

//       {/* Twitter Meta Tags */}
//       {twitter?.twitterCard && (
//         <meta name="twitter:card" content={twitter.twitterCard} />
//       )}
//       <meta
//         name="twitter:title"
//         content={twitter?.twitterTitle || openGraph?.ogTitle || metaTitle}
//       />
//       <meta
//         name="twitter:description"
//         content={
//           twitter?.twitterDescription ||
//           openGraph?.ogDescription ||
//           metaDescription
//         }
//       />
//       {twitter?.twitterSite && (
//         <meta name="twitter:site" content={twitter.twitterSite} />
//       )}
//       {twitter?.twitterCreator && (
//         <meta name="twitter:creator" content={twitter.twitterCreator} />
//       )}
//       {twitter.twitterImage?.url && (
//         <meta name="twitter:image" content={twitter.twitterImage?.url} />
//       )}

//       {/* Extra Meta Tags */}
//       {extraMeta &&
//         Object.entries(extraMeta).map(([name, content]) => (
//           <meta key={name} name={name} content={content.toString()} />
//         ))}
//     </Helmet>
//   );
// };

// export default SEO;
