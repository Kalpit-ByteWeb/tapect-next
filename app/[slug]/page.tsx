import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostDetails from './BlogPostDetails';
import { getArticleBySlug, getArticles } from '@/components/api/BlogApi';
import { unstable_cache } from 'next/cache';

export const revalidate = 60;

const getPostCached = unstable_cache(
  (slug: string) => getArticleBySlug(slug),
  (slug: string) => ['article', slug],
  { revalidate: 60 }
);

const getRecentCached = unstable_cache(
  () => getArticles(1, 3),
  () => ['recent-articles', 3],   
  { revalidate: 60 }
);

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostCached(params.slug);
  if (!post) notFound();

  const recent = await getRecentCached();
  const recentArticles = recent?.articles ?? [];

  return <BlogPostDetails post={post} recentArticles={recentArticles} />;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostCached(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt || '',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      images: [
        {
          url: post.coverImage || '/default-og-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
