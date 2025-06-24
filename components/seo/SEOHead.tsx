// components/SEOHead.tsx
import Head from "next/head";
import { SEOData } from "@/libs/Assets/seo";

interface SEOHeadProps {
  seoData: SEOData | null;
}

const SEOHead = ({ seoData }: SEOHeadProps) => {
  if (!seoData) return null;

  const {
    metaTitle,
    metaDescription,
    metaRobots,
    canonicalURL,
    extraMeta,
    openGraph,
    twitter,
    structuredData,
  } = seoData;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {metaRobots && <meta name="robots" content={metaRobots} />}
      {canonicalURL && <link rel="canonical" href={canonicalURL} />}

      {/* Open Graph Meta Tags */}
      {openGraph?.ogLocale && (
        <meta property="og:locale" content={openGraph.ogLocale} />
      )}
      {openGraph?.ogType && (
        <meta property="og:type" content={openGraph.ogType} />
      )}
      <meta property="og:title" content={openGraph?.ogTitle || metaTitle} />
      <meta
        property="og:description"
        content={openGraph?.ogDescription || metaDescription}
      />
      {openGraph?.ogUrl && <meta property="og:url" content={openGraph.ogUrl} />}
      {openGraph?.ogSiteName && (
        <meta property="og:site_name" content={openGraph.ogSiteName} />
      )}
      {openGraph?.ogImage?.url && (
        <meta property="og:image" content={openGraph.ogImage.url} />
      )}

      {/* Twitter Meta Tags */}
      {twitter?.twitterCard && (
        <meta name="twitter:card" content={twitter.twitterCard} />
      )}
      <meta
        name="twitter:title"
        content={twitter?.twitterTitle || openGraph?.ogTitle || metaTitle}
      />
      <meta
        name="twitter:description"
        content={
          twitter?.twitterDescription ||
          openGraph?.ogDescription ||
          metaDescription
        }
      />
      {twitter?.twitterSite && (
        <meta name="twitter:site" content={twitter.twitterSite} />
      )}
      {twitter?.twitterCreator && (
        <meta name="twitter:creator" content={twitter.twitterCreator} />
      )}
      {twitter?.twitterImage?.url && (
        <meta name="twitter:image" content={twitter.twitterImage.url} />
      )}

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}

      {/* Extra Meta Tags */}
      {extraMeta &&
        Object.entries(extraMeta).map(([name, content]) => (
          <meta
            key={name}
            name={name}
            content={
              typeof content === "string"
                ? content
                : typeof content === "number" || typeof content === "boolean"
                ? content.toString()
                : ""
            }
          />
        ))}
    </Head>
  );
};

export default SEOHead;