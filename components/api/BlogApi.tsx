import axios from "axios";
import { BlogPost } from "../../Pages/Blog/blogData";
import { getDomain, getLocaleByDomain } from "../../libs/Assets/DomainWiseData";
const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

interface StrapiArticleResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const buildArticleURL = (slug?: string, page = 1, pageSize = 6): string => {
  const domain = getDomain();
  const locale = getLocaleByDomain(domain);
  const base = `${API_URL_BASE}articles?populate=*&sort[createdAt]=desc&[locale]=${locale}`;

  if (slug) {
    return `${base}&filters[slug][$eq]=${slug}`;
  }

  return `${base}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
};

export const getArticles = async (
  page = 1,
  pageSize = 6
): Promise<{ articles: BlogPost[]; total: number } | null> => {
  try {
    const url = buildArticleURL(undefined, page, pageSize);
    const { data } = await api.get<StrapiArticleResponse<BlogPost>>(url);

    if (data?.data) {
      return {
        articles: data.data,
        total: data.meta.pagination.total,
      };
    }

    console.warn("No articles found.");
    return null;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return null;
  }
};

export const getArticleBySlug = async (
  slug: string
): Promise<BlogPost | null> => {
  try {
    const url = buildArticleURL(slug);
    const { data } = await api.get<StrapiArticleResponse<BlogPost>>(url);

    if (data?.data?.length > 0) {
      return data.data[0];
    }

    console.warn("No article found with slug:", slug);
    return null;
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
};
