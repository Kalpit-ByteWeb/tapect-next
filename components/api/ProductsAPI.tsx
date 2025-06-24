// components/api/ProductsAPI.ts
import axios from "axios";
import { getDomain, getLocaleByDomain } from "@/libs/Assets/DomainWiseData";

const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL;

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
