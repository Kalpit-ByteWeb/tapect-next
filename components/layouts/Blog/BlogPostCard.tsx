import React from "react";
import Link  from "next/link";
import { BlogPost } from "@/app/blog/blogData";
import { Image } from "../../../libs/Index";

interface BlogPostCardProps {
  post: BlogPost;
  layout?: "vertical" | "horizontal";
}

const extractDescription = (description: any[]) => {
  if (!description || description.length === 0)
    return "No description available.";

  const firstParagraph = description.find((item) => item.type === "paragraph");

  if (!firstParagraph || !firstParagraph.children)
    return "No description available.";

  const text = firstParagraph.children
    .map((child: any) => child.text)
    .join(" ");

  return text.length > 120 ? text.substring(0, 120) + "..." : text;
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  layout = "vertical",
}) => {
  const imageUrl = post.cover?.[0]?.url || "/Blogpage/dummy-blog.png";

  if (layout === "horizontal") {
    return (
      <div className="px-6 py-4 bg-[#1A1A1A] rounded-16 flex lg:flex-row flex-col md:gap-3 gap-6 text-white">
        <div className="h-auto lg:w-1/2 w-full rounded-xl overflow-hidden bg-white rounded-16">
          <Image
            src={imageUrl}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="lg:w-1/2 w-full content-center space-y-6">
          <div className="space-y-2">
            <div className="bg-white px-2 py-1 w-fit rounded-[6px]">
              <p className="text-[12px] leading-[16px] font-semibold font-secondary text-secondary">
                New
              </p>
            </div>
            <p className="text-[12px] leading-[16px] font-semibold font-secondary text-white">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-4">
            <h1 className="Title-24">{post.title}</h1>
            <p className="Description">
              {extractDescription(post.Description)}
            </p>
          </div>

          <button type="button">
            <Link
              href={`/${post.slug}`}
              className="btn-primary py-4 px-8 flex gap-2">
              Get Started Now
              <Image src="/Icons/ButtonIconWhite.svg" alt="Button Icon" />
            </Link>
          </button>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/${post.slug}`} className="border border-[#E7E7E7] rounded-16">
      <div className="text-secondary">
        <Image
          src={imageUrl}
          alt={post.title}
          className="w-full h-auto rounded-t-16"
        />
        <div className="content-center space-y-4 p-6">
          <div className="flex gap-2">
            <div className="text-[12px] leading-[16px] font-normal font-secondary flex gap-1">
              <Image src="/Icons/Date-Icon.svg" alt="Date Icon" />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div className="text-[12px] leading-[16px] font-normal font-secondary flex gap-1">
              <Image src="/Icons/Category-Icon.svg" alt="Date Icon" />
              {post.category.name}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="Heading-20">{post.title}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
