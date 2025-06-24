// components/api/ProductsAPI.ts
import axios from "axios";
import { getDomain, getLocaleByDomain } from "@/libs/Assets/DomainWiseData";

const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL;
export interface StrapiProduct {
  id: number;
  ProductName: string;
  ProductID: string;
  ProductPrice: string;
  ProductDescription: string;
  ProductImage: ProductImageData[];
  Currency: string;
  single_product: SingleProductData | null;
  OfferPrice?: string;
}
interface ProductImageData {
  id: number;
  url: string;
  alternativeText: string;
  formats: any;
}

interface SingleProductData {
  id: number;
  documentId: string;
  ProductName: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  PageSections: PageSection[];
}

interface PageSection {
  __component: string;
  id: number;
  BulletPoints?: BulletPoint[];
  Title?: string | null;
  Image?: any | null;
  Accordian?: AccordionItem[];
  Description?: any | null;
  ButtonText?: string | null;
  ButtonUrl?: string | null;
  TitleHighlight?: string | null;
  FeatureStructure?: FeatureStructure[];
  IconBox?: IconBox[];
}

export interface BulletPoint {
  id: number;
  points: string;
}

export interface AccordionItem {
  id: number;
  Question: string;
  Answer: string;
  Image: ProductImageData | null;
}

export interface FeatureStructure {
  id: number;
  FeatureTitle: string;
  FeatureDescription: any[];
  FeatureButtonText?: string | null;
  FeatureButtonUrl?: string | null;
  FeatureImage?: ProductImageData[] | null;
}

export interface IconBox {
  id: number;
  IconBoxTitle: string;
  IconBoxDescription: any[];
  IconUrl?: ProductImageData | null;
}

interface ApiResponse {
  data: StrapiProduct[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
const getPopulateQuery = (): string => {
  return [
    "populate[ProductImage][populate]=*",
    "populate[single_product][populate][PageSections][populate]=*",
    "populate[single_product][populate][PageSections][on][layout.features][populate][FeatureStructure][populate]=*",
    "populate[single_product][populate][PageSections][on][layout.product-show-case][populate][IconBox][populate]=*",
    "populate[single_product][populate][PageSections][on][layout.faq][populate][Accordian][populate]=*",
    "populate[single_product][populate][PageSections][on][layout.product-bullet-point][populate]=*",
  ].join("&");
};

const buildProductUrl = (productId?: string, hostname?: string): string => {
  const domain = getDomain(hostname);
  const locale = getLocaleByDomain(domain);
  let url = `${API_URL_BASE}products?${getPopulateQuery()}`;
  if (locale) url += `&filters[locale][$eq]=${locale}`;
  if (productId) url += `&filters[ProductID][$eq]=${productId}`;
  return url;
};

export const fetchProducts = async (hostname?: string): Promise<any> => {
  try {
    const url = buildProductUrl(undefined, hostname);
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw new Error(error.message || "Failed to fetch products");
  }
};

export const fetchProduct = async (id: string, hostname?: string): Promise<any> => {
  try {
    const url = buildProductUrl(id, hostname);
    const response = await axios.get(url);
    const data = response.data.data.find((product: any) => product.ProductID === id);
    if (data) return data;
    throw new Error("Product not found");
  } catch (error: any) {
    console.error("Error fetching product:", error);
    throw new Error(error.message || "Failed to fetch product");
  }
};
