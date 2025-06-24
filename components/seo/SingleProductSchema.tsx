import {
  getDomain,
  getCountryByDomain,
  getLocaleByDomain,
} from "../../libs/Assets/DomainWiseData";
import { getCurrencyCode } from "./ProductSchema";

interface SingleProductSchemaProps {
  slug: string;
  name: string;
  description: string;
  images: string[];
  price: string;
  currency: string;
}

const SingleProductSchema = ({
  slug,
  name,
  description,
  images,
  price,
  currency,
}: SingleProductSchemaProps) => {
  const domain = getDomain();
  const baseUrl = `https://${domain}`;
  const productUrl = `${baseUrl}/product/${slug}`;
  const country = getCountryByDomain(domain) || "USA";
  const locale = getLocaleByDomain(domain) || "en-US";
  const currencyCode = getCurrencyCode(currency);

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
        sameAs: [
          "https://www.instagram.com/tapect.official/",
          "https://www.facebook.com/tapectofficial",
          "https://twitter.com/tapectofficial",
          "https://www.linkedin.com/company/tapect",
          "https://www.youtube.com/@Tapectcard",
          "https://www.tiktok.com/@tapect",
        ],
        logo: {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#logo`,
          url: "https://assets.tapect.com/Logo/Tapect-logo.svg",
          width: 156,
          height: 60,
        },
        address: {
          "@id": `${baseUrl}/#place`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Tapect",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        inLanguage: locale,
      },
      {
        "@type": "ItemPage",
        "@id": `${productUrl}/#webpage`,
        url: productUrl,
        name: name,
        datePublished: "2024-01-29",
        dateModified: "2025-04-17",
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        primaryImageOfPage: {
          "@id": images[0],
        },
        inLanguage: locale,
      },
      {
        "@type": "Product",
        "@id": `${productUrl}/#richSnippet`,
        name: name,
        description: description,
        image: images,
        brand: {
          "@type": "Brand",
          name: "Tapect",
        },
        category: "NFC Cards",
        offers: {
          "@type": "Offer",
          price: price,
          priceCurrency: currencyCode,
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          url: productUrl,
          seller: {
            "@type": "Organization",
            "@id": `${baseUrl}/#organization`,
          },
        },
        mainEntityOfPage: {
          "@id": `${productUrl}/#webpage`,
        },
      },
    ],
  };

  return (
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
  );
};

export default SingleProductSchema;
