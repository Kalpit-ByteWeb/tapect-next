export interface BlogPost {
    id: number;
    documentId: string;
    slug: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Description: any;
    cover: BlogCoverImage[];
    category: {
      id: number;
      documentId: string;
      name: string;
      slug: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }
  
  interface BlogCoverImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      small: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      thumbnail: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  