import Link from 'next/link';

import BlogPageLayout from '@/components/layouts/Blog/BlogPageLayout';
import BlogList from '@/components/layouts/Blog/BlogList';
import { getArticles } from '@/components/api/BlogApi';

export const dynamic = 'force-dynamic';

import { getSEOData } from "@/libs/Assets/seo";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/blog";
  const seoData = await getSEOData(pathname);

  if (!seoData) {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    robots: seoData.metaRobots,
     alternates: {
    canonical: seoData.canonicalURL,
     },
    openGraph: {
      title: seoData.openGraph?.ogTitle || seoData.metaTitle,
      description: seoData.openGraph?.ogDescription || seoData.metaDescription,
      url: seoData.openGraph?.ogUrl || "",
      siteName: seoData.openGraph?.ogSiteName || "",
      images: seoData.openGraph?.ogImage?.url ? [seoData.openGraph.ogImage.url] : [],
      locale: seoData.openGraph?.ogLocale,
      type: seoData.openGraph?.ogType as any,
    },
    twitter: {
      card: seoData.twitter?.twitterCard as any,
      title: seoData.twitter?.twitterTitle || seoData.metaTitle,
      description: seoData.twitter?.twitterDescription || seoData.metaDescription,
      site: seoData.twitter?.twitterSite || "",
      creator: seoData.twitter?.twitterCreator || "",
      images: seoData.twitter?.twitterImage?.url ? [seoData.twitter.twitterImage.url] : [],
    },
    other: seoData.extraMeta || {},
  };
}

interface PageProps {
  searchParams: { page?: string } | Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const postsPerPage = 7;
  const currentPage = Math.max(
    1,
    parseInt(params?.page ?? '1', 10)
  );

  let latestPost: any | null = null;
  let articles: any[] = [];
  let totalPosts = 0;
  let error: string | null = null;

  try {
    const latest = await getArticles(1, 1);
    latestPost = latest?.articles?.[0] ?? null;

    const data = await getArticles(currentPage, postsPerPage);
    articles   = data?.articles ?? [];
    totalPosts = data?.total    ?? 0;
  } catch (e: any) {
    error = e.message || 'Failed to load articles.';
  }

  if (error) return <div>Error: {error}</div>;

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <>

      <BlogPageLayout>
        <BlogList latestPost={latestPost} posts={articles} />

        {totalPages > 1 && (
          <nav className="flex gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              const isActive = page === currentPage;
              return (
                  <Link
                  key={page}
                  href={`/blog?page=${page}`}
                  className={`px-4 py-2 rounded-10 border ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-[#652DBF0F] text-black hover:bg-gray-100'
                  }`}
                >
                  {page}
                </Link>
              );
            })}
          </nav>
        )}
      </BlogPageLayout>
    </>
  );
}
