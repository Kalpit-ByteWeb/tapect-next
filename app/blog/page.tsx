import Link from 'next/link';

import BlogPageLayout from '@/components/layouts/Blog/BlogPageLayout';
import BlogList from '@/components/layouts/Blog/BlogList';
import {
  getArticles,               
} from '@/components/api/BlogApi';

export const dynamic = 'force-dynamic'; 

interface PageProps {
  searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: PageProps) {
  const postsPerPage = 7;
  const currentPage = Math.max(1, parseInt((searchParams.page) || '1', 10));

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
                  className={`px-4 py-2 rounded-8 border ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-white text-primary hover:bg-gray-100'
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
