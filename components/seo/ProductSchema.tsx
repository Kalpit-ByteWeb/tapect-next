
import { getDomain } from "../../libs/Assets/DomainWiseData";

interface ProductItem {
  ProductID: string;
  ProductName: string;
  ProductImage: { url: string }[];
  ProductPrice: string;
  Currency?: string;
}

interface ProductListingSchemaProps {
  products: ProductItem[];
}

export const getCurrencyCode = (symbol?: string): string => {
  switch (symbol) {
    case "₹":
      return "INR";
    case "$":
      return "USD";
    case "€":
      return "EUR";
    case "د.إ":
      return "AED";
    case "A$":
      return "AUD";
    default:
      return "USD";
  }
};

const ProductListingSchema = ({ products }: ProductListingSchemaProps) => {
  const domain = getDomain();
  const baseUrl = `https://${domain}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${baseUrl}/product`,
    name: "Tapect Product Listing",
    mainEntity: products.map((product) => {
      const image = product.ProductImage?.[0]?.url || "";
      const priceCurrency = getCurrencyCode(product.Currency);

      return {
        "@type": "Product",
        "@id": `${baseUrl}/product/${product.ProductID}`,
        name: product.ProductName,
        image: [image],
        description: `Tapect ${product.ProductName} available at best price.`,
        sku: product.ProductID,
        brand: {
          "@type": "Brand",
          name: "Tapect",
        },
        offers: {
          "@type": "Offer",
          url: `${baseUrl}/product/${product.ProductID}`,
          priceCurrency,
          price: product.ProductPrice,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
      };
    }),
  };

  return (
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
  );
};

export default ProductListingSchema;
