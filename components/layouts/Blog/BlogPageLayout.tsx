import React from "react";

interface BlogPageLayoutProps {
  children: React.ReactNode;
}

const BlogPageLayout: React.FC<BlogPageLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-6 py-60 md:py-120">{children}</div>
  );
};

export default BlogPageLayout;
