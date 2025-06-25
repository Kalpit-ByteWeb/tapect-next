import { getDomain } from "../../libs/Assets/DomainWiseData";

interface BlogPostSchemaProps {
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
}

const BlogPostSchema = ({
  title,
  description,
  slug,
  imageUrl,
  datePublished,
  dateModified,
  authorName = "Tapect",
}: BlogPostSchemaProps) => {
  const domain = getDomain();
  const baseUrl = `https://${domain}`;
  const postUrl = `${baseUrl}/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    headline: title,
    description: description,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: authorName,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Tapect",
      logo: {
        "@type": "ImageObject",
        url: "https://assets.tapect.com/assets/TAPECT_logo_3b6aa72747.png",
        width: 156,
        height: 60,
      },
    },
    datePublished: new Date(datePublished).toISOString(),
    dateModified: new Date(dateModified).toISOString(),
  };

  return (
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
  );
};

export default BlogPostSchema;
