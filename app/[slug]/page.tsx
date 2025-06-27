import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostDetails from './BlogPostDetails';
import { getArticleBySlug, getArticles } from '@/components/api/BlogApi';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { slug: string } }): Promise<any> {
  const post = await getArticleBySlug(params.slug);
  if (!post) notFound();

  const recent = await getArticles(1, 3);
  const recentArticles = recent?.articles ?? [];

  return (
    <BlogPostDetails
      post={post}
      recentArticles={recentArticles}
    />
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getArticleBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

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