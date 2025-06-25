'use client';

import React, { useMemo } from 'react';
import BlogPageLayout from '@/components/layouts/Blog/BlogPageLayout';
import Image from 'next/image';
import Link from 'next/link';
import BlogPostSchema from '@/components/seo/BlogPostSchema';

interface TocItem {
  id: string;
  level: number;
  text: string;
  children?: TocItem[];
  number?: number;
}

interface DescriptionChild {
  type: string;
  text?: string;
  children?: DescriptionChild[];
  url?: string;
}

interface DescriptionItem {
  type: string;
  level?: number;
  format?: 'ordered' | 'unordered';
  children?: DescriptionChild[];
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  Description: DescriptionItem[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: any[];
  category: { name: string };
}

interface Props {
  post: BlogPost;
  recentArticles: BlogPost[];
}

const BlogPostDetails: React.FC<Props> = ({ post, recentArticles }) => {
  const { toc, renderDescription } = useMemo(() => {
    const headings: { level: number; text: string }[] = [];

    function traverse(items: DescriptionItem[]) {
      items.forEach((item) => {
        if (item.type === 'heading') {
          const text =
            item.children?.map((c) => c.text || '').join('') || '';
          headings.push({ level: item.level || 2, text });
        } else if (item.children) {
          traverse(item.children as unknown as DescriptionItem[]);
        }
      });
    }
    traverse(post.Description);

    const tocTree: TocItem[] = [];
    const stack: TocItem[] = [];
    let h2Count = 0;

    headings.forEach((h, idx) => {
      const node: TocItem = {
        id: `heading-${idx + 1}`,
        level: h.level,
        text: h.text,
      };
      if (h.level === 2) node.number = ++h2Count;

      while (stack.length && stack[stack.length - 1].level >= h.level) {
        stack.pop();
      }
      if (stack.length) {
        const parent = stack[stack.length - 1];
        parent.children = parent.children || [];
        parent.children.push(node);
      } else {
        tocTree.push(node);
      }
      stack.push(node);
    });

    let headingIndex = 1;

    const renderText = (child: any) => {
      if (child.type === 'text') return child.text;
      if (child.type === 'link' && child.url) {
        return (
          <a href={child.url} target="_blank" rel="noopener noreferrer">
            {child.children?.map((c: any, i: number) => (
              <React.Fragment key={i}>{c.text}</React.Fragment>
            ))}
          </a>
        );
      }
      return null;
    };

    const renderList = (item: any, level = 1) => {
      const Tag = item.format === 'ordered' ? 'ol' : 'ul';
      return (
        <Tag key={Math.random()}>
          {item.children?.map((li: any, i: number) => (
            <li key={i} className={`list-item-level-${level}`}>
              {li.children?.map(renderText)}
              {li.type === 'list' && renderList(li, level + 1)}
            </li>
          ))}
        </Tag>
      );
    };

   
  const renderDescriptionItem = (item: DescriptionItem, index: number) => {
    if (item.type === "paragraph") {
      return (
        <p key={index}>
          {item.children?.map((child, childIndex) => (
            <React.Fragment key={childIndex}>
              {renderText(child)}
            </React.Fragment>
          ))}
        </p>
      );
    } else if (item.type === "heading") {
      const headingLevel = item.level || 2;
      const headingTag = `h${headingLevel}`;
      return React.createElement(
        headingTag,
        {
          key: index,
          id: `heading-${headingIndex++}`,
          className: "scroll-mt-20 text-lg font-heading leading-6 font-bold",
        },
        item.children?.map((child) => renderText(child))
      );
    } else if (item.type === "list") {
      return renderList(item, 1);
    }
    return null;
  };

    return {
      toc: tocTree,
      renderDescription: post.Description.map(renderDescriptionItem),
    };
  }, [post]);

  const renderTocItems = (items?: TocItem[]) =>
    items?.length ? (
      <ul className="text-secondary list-none">
        {items.map((it) => (
          <li key={it.id} className="mb-[10px] ml-5">
            <a
              href={`#${it.id}`}
              className="Description flex gap-2 py-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(it.id);
                if (el) {
                  window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                }
              }}
            >
              {it.text}
            </a>
            {renderTocItems(it.children)}
          </li>
        ))}
      </ul>
    ) : null;

  const cover = post.cover?.[0]?.url || '/Blogpage/dummy-blog.png';

  return (
    <>
      <BlogPostSchema
        title={post.title}
        description={post.Description?.[0]?.children?.[0]?.text || post.title}
        slug={post.slug}
        imageUrl={cover}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />

      <BlogPageLayout>
        {/* header */}
        <div className="space-y-12 pb-60">
          <div className="text-center space-y-2">
            <p className="text-primary Description">{post.category.name}</p>
            <h1 className="TitleHeading">{post.title}</h1>
            <p className="text-[12px] font-secondary">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>

          <Image
            src={cover}
            alt={post.title}
            width={1000}
            height={500}
            className="mx-auto rounded mb-6"
          />

          <div className="flex flex-col md:flex-row gap-6">
            {/* TOC */}
            <aside className="md:w-1/4 w-full">
              <div className="border rounded shadow-toc sticky top-[90px] p-4">
                <h3 className="text-primary Heading-20 mb-2">
                  Table of Contents
                </h3>
                {renderTocItems(toc)}
              </div>
            </aside>

            {/* article body */}
            <article className="md:w-3/4 w-full prose blog-description grid gap-6">
              {renderDescription}
            </article>
          </div>
        </div>

        {/* recent posts */}
        <section className="pt-60">
          <h3 className="TitleHeading text-center md:text-left mb-12">
            Recent News
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentArticles.map((r) => (
              <Link
                key={r.id}
                href={`/${r.slug}`}
                className="border rounded-16 block overflow-hidden"
              >
                <Image
                  src={
                    r.cover?.[0]?.formats?.small?.url ||
                    r.cover?.[0]?.url ||
                    '/Blogpage/dummy-blog.png'
                  }
                  alt={r.title}
                  width={400}
                  height={220}
                  className="w-full"
                />
                <div className="space-y-4 p-6">
                  <div className="flex gap-2 text-[12px] font-secondary">
                    <span className="flex gap-1">
                      <Image
                        src="/Icons/Date-Icon.svg"
                        alt="date"
                        width={12}
                        height={12}
                      />
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex gap-1">
                      <Image
                        src="/Icons/Category-Icon.svg"
                        alt="cat"
                        width={12}
                        height={12}
                      />
                      {r.category.name}
                    </span>
                  </div>
                  <h2 className="Heading-20">{r.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </BlogPageLayout>
    </>
  );
};

export default BlogPostDetails;
