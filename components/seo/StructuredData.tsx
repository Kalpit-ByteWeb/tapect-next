import Head from "next/head";
import {
  getDomain,
  getCountryByDomain,
  getLocaleByDomain,
} from "@/libs/Assets/DomainWiseData";
import { SEOData } from "@/libs/Assets/seo";

interface StructuredDataProps {
  pathname: string;
  seoData: SEOData | null;
}

const StructuredData = ({ pathname, seoData }: StructuredDataProps) => {
  if (!seoData) return null;

  const domain = getDomain(); // works SSR if you pass host from headers
  const baseUrl = `https://${domain}`;
  const country = getCountryByDomain(domain) || "USA";
  const locale = getLocaleByDomain(domain) || "en-US";

  const addressByCountry = {
    India: {
      addressLocality: "Vadodara",
      addressRegion: "Gujarat",
      postalCode: "391101",
      streetAddress: "323/324 One West, Bhayli Sevasi Canal Road",
    },
    USA: {
      addressLocality: "Newark",
      addressRegion: "Delaware",
      postalCode: "19702",
      streetAddress: "4 Peddlers Row, Unit #1218",
    },
    Germany: {
      addressLocality: "München",
      addressRegion: "Germany",
      postalCode: "81477",
      streetAddress: "Wilhelm-Busch-Straße 36",
    },
    Australia: {
      addressLocality: "Sydney",
      addressRegion: "Australia",
      postalCode: "2767",
      streetAddress: "Doonside 2767",
    },
  };

  const address =
    addressByCountry[country as keyof typeof addressByCountry] ||
    addressByCountry.USA;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Place",
        "@id": `${baseUrl}/#place`,
        address: {
          "@type": "PostalAddress",
          ...address,
          addressCountry: country,
        },
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Tapect",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#logo`,
          url: "https://assets.tapect.com/assets/TAPECT_logo_3b6aa72747.png",
          width: 156,
          height: 60,
        },
        sameAs: [
          "https://www.facebook.com/tapectofficial",
          "https://twitter.com/tapectofficial",
          "https://www.instagram.com/tapect.official/",
          "https://www.linkedin.com/company/tapect",
          "https://www.youtube.com/@Tapectcard",
        ],
        address: { "@id": `${baseUrl}/#place` },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Tapect",
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: locale,
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}${pathname}#webpage`,
        url: `${baseUrl}${pathname}`,
        name: seoData.metaTitle,
        description: seoData.metaDescription,
        isPartOf: { "@id": `${baseUrl}/#website` },
        inLanguage: locale,
      },
    ],
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Head>
  );
};

export default StructuredData;
