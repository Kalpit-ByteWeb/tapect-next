import { notFound } from 'next/navigation';
import BlogPostDetails from './BlogPostDetails';
import { getArticleBySlug, getArticles } from '@/components/api/BlogApi';

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
    
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
