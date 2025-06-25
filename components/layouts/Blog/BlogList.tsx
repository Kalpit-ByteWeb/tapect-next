import React from "react";
import { BlogPost } from "@/app/blog/blogData";
import BlogPostCard from "./BlogPostCard";

interface BlogListProps {
  latestPost: BlogPost | null;
  posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ latestPost, posts }) => {
  if (posts.length === 0) return <p>No blog posts available.</p>;

  return (
    <div className="space-y-12">
      {latestPost && (
        <div className="flex flex-col h-full">
          <BlogPostCard
            key={latestPost.id}
            post={latestPost}
            layout="horizontal"
          />
        </div>
      )}

      <div className="grid herobannermax:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {posts.slice(1).map((post) => (
          <BlogPostCard key={post.id} post={post} layout="vertical" />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
