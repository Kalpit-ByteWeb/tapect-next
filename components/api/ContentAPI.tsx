// ProductsAPI.tsx

import axios from "axios";
import {
  buildApiUrl,
  buildAPIUrlfooter,
  buildAPIUrlheader,
} from "./DomainWiseAPI";

export interface StrapiPage {
  id: number;
  PageName: string;
  slug: string;
  PageSections: any[];
  locale: string;
}

interface ApiResponse {
  data: StrapiPage[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const fetchPages = async (domain?: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(buildApiUrl("", true, domain));
    return response.data;
  } catch (error: any) {
    console.error("Error fetching pages:", error);
    throw new Error(error.message || "Failed to fetch pages");
  }
};

export const fetchFeatures = async (domain?: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      buildApiUrl("[layout.features][populate][FeatureStructure]", true, domain)
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching features:", error);
    throw new Error(error.message || "Failed to fetch features");
  }
};

export const fetchProductShowCase = async (domain?: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      buildApiUrl("[layout.product-show-case][populate][IconBox]", true, domain)
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching ProductShowCase:", error);
    throw new Error(error.message || "Failed to fetch ProductShowCase");
  }
};


export const fetchTab = async (domain?: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      buildApiUrl("[layout.tab][populate][Tab]", true, domain)
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Tab:", error);
    throw new Error(error.message || "Failed to fetch Tab");
  }
};

export const fetchCentraliedSection = async (domain?: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      buildApiUrl("[layout.centralised-management]", true, domain)
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Centralised Section:", error);
    throw new Error(error.message || "Failed to fetch Centralised Section");
  }
};

export const fetchIconList = async (domain?: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      buildApiUrl("[layout.centralised-management][populate][IconList]", true, domain)
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching IconList:", error);
    throw new Error(error.message || "Failed to fetch IconList");
  }
};

export const fetchCounter = async (domain?: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(buildApiUrl("[layout.coutner]", true, domain));
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Counter:", error);
    throw new Error(error.message || "Failed to fetch Counter");
  }
};

export const fetchCounterIconBox = async (domain?: string): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      buildApiUrl("[layout.coutner][populate][IconBox]", true, domain)
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Counter IconBox:", error);
    throw new Error(error.message || "Failed to fetch Counter IconBox");
  }
};

export const fetchOurLocation = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      buildApiUrl("[layout.our-location][populate][OurLocation]")
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Our Location:", error);
    throw new Error(error.message || "Failed to fetch Our Location");
  }
};

export const fetchAffilateProgram = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      buildApiUrl(
        "[layout.affilate-calculator][populate][AffilateCalculatorProduct]"
      )
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Affilate Program:", error);
    throw new Error(error.message || "Failed to fetch Affilate Program");
  }
};
export const fetchNavbardata = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(
      buildAPIUrlheader("[Navbar][populate][DropDown]")
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Header data:", error);
    throw new Error(error.message || "Failed to fetch Header data");
  }
};
export const fetchHeaderdata = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(buildAPIUrlheader(""));
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Header data:", error);
    throw new Error(error.message || "Failed to fetch Header data");
  }
};
export const fetchCTAdata = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(buildAPIUrlfooter(""));
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Header data:", error);
    throw new Error(error.message || "Failed to fetch Header data");
  }
};
export const fetchFooterNavLinksdata = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(buildAPIUrlfooter("[FooterNavLinks]"));
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Header data:", error);
    throw new Error(error.message || "Failed to fetch Header data");
  }
};
export const fetchSocailMediadata = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(buildAPIUrlfooter("[SocailMedia]"));
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Header data:", error);
    throw new Error(error.message || "Failed to fetch Header data");
  }
};
