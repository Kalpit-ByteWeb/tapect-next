// import { Helmet } from "react-helmet-async";
// import {
//   getDomain,
//   getCountryByDomain,
//   getLocaleByDomain,
// } from "../../libs/Assets/DomainWiseData";
// import { BlogPost } from "../../Pages/Blog/blogData";
// import { useLocation } from "react-router-dom";
// import useSEO from "./SeoHook";

// const BlogListingSchema = ({ articles }: { articles: BlogPost[] }) => {
//   const { pathname } = useLocation();
//   const { seoData } = useSEO(pathname);

//   const domain = getDomain();
//   const baseUrl = `https://${domain}`;
//   const pageUrl = `${baseUrl}/blog`;
//   const country = getCountryByDomain(domain) || "USA";
//   const locale = getLocaleByDomain(domain) || "en-US";

//   const addressByCountry = {
//     India: {
//       addressLocality: "Vadodara",
//       addressRegion: "Gujarat",
//       postalCode: "391101",
//       streetAddress: "323/324 One West, Bhayli Sevasi Canal Road",
//     },
//     USA: {
//       addressLocality: "Newark",
//       addressRegion: "Delaware",
//       postalCode: "19702",
//       streetAddress: "4 Peddlers Row, Unit #1218",
//     },
//     Germany: {
//       addressLocality: "München",
//       addressRegion: "Germany",
//       postalCode: "81477",
//       streetAddress: "Wilhelm-Busch-Straße 36",
//     },
//     Australia: {
//       addressLocality: "Sydney",
//       addressRegion: "Australia",
//       postalCode: "2767",
//       streetAddress: "Doonside 2767",
//     },
//   };

//   const address =
//     addressByCountry[country as keyof typeof addressByCountry] ||
//     addressByCountry.USA;

//   const schema = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Place",
//         "@id": `${baseUrl}/#place`,
//         address: {
//           "@type": "PostalAddress",
//           ...address,
//           addressCountry: country,
//         },
//       },
//       {
//         "@type": "Organization",
//         "@id": `${baseUrl}/#organization`,
//         name: "Tapect",
//         url: baseUrl,
//         logo: {
//           "@type": "ImageObject",
//           "@id": `${baseUrl}/#logo`,
//           url: "https://assets.tapect.com/assets/TAPECT_logo_3b6aa72747.png",
//           width: 156,
//           height: 60,
//           caption: "Tapect",
//           inLanguage: locale,
//         },
//         description: seoData?.metaDescription,
//         sameAs: [
//           "https://www.instagram.com/tapect.official/",
//           "https://www.facebook.com/tapectofficial",
//           "https://twitter.com/tapectofficial",
//           "https://www.linkedin.com/company/tapect",
//           "https://www.youtube.com/@Tapectcard",
//           "https://www.tiktok.com/@tapect",
//         ],
//         address: {
//           "@id": `${baseUrl}/#place`,
//         },
//       },
//       {
//         "@type": "WebSite",
//         "@id": `${baseUrl}/#website`,
//         url: baseUrl,
//         name: "Tapect",
//         publisher: {
//           "@id": `${baseUrl}/#organization`,
//         },
//         inLanguage: locale,
//       },
//       {
//         "@type": "Person",
//         "@id": `${pageUrl}#author`,
//         name: "Tapect",
//         url: baseUrl,
//         image: {
//           "@type": "ImageObject",
//           url: "https://secure.gravatar.com/avatar/d3743e8375afe8b08c47e2102cf2734a87dade04cdf7747ba8a56168b2cdc69e?s=96&d=mm&r=g",
//           caption: "Tapect",
//         },
//         sameAs: [baseUrl],
//         worksFor: {
//           "@id": `${baseUrl}/#organization`,
//         },
//       },
//       {
//         "@type": "WebPage",
//         "@id": `${pageUrl}#webpage`,
//         url: pageUrl,
//         name: seoData?.metaTitle,
//         description: seoData?.metaDescription,
//         isPartOf: {
//           "@id": `${baseUrl}/#website`,
//         },
//         primaryImageOfPage: {
//           "@id": "https://assets.tapect.com/assets/TAPECT_logo_3b6aa72747.png",
//         },
//         inLanguage: locale,
//         datePublished: articles?.[0]?.publishedAt,
//         dateModified: new Date().toISOString(), // optional: use latest post date
//       },
//       {
//         "@type": "CollectionPage",
//         "@id": `${pageUrl}#richSnippet`,
//         url: pageUrl,
//         name: seoData?.metaTitle,
//         description: seoData?.metaDescription,
//         image: {
//           "@id": "https://assets.tapect.com/assets/TAPECT_logo_3b6aa72747.png",
//         },
//         publisher: {
//           "@id": `${baseUrl}/#organization`,
//         },
//         author: {
//           "@id": `${pageUrl}#author`,
//         },
//         inLanguage: locale,
//         mainEntity: {
//           "@type": "ItemList",
//           itemListElement: articles.map((article, index) => ({
//             "@type": "ListItem",
//             position: index + 1,
//             url: `${baseUrl}/${article.slug}`,
//           })),
//         },
//       },
//     ],
//   };

//   return (
//     <Helmet>
//       <script type="application/ld+json">{JSON.stringify(schema)}</script>
//     </Helmet>
//   );
// };

// export default BlogListingSchema;
