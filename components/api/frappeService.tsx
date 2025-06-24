// src/services/frappeService.ts
import axios from "axios";

const FRAPPE_API_URL = "https://portal.byteweb.cloud/api";
const FRAPPE_API_KEY = "e12b363976bf58d";
const FRAPPE_API_SECRET = "e0a78c082735de5";

const api = axios.create({
  baseURL: FRAPPE_API_URL,

  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`,
    allow_cors: "*",
  },
});

export interface FrappeJobOpening {
  name: string;
  job_title: string;
  description: string;
  custom_experience: string;
  location: string;
  custom_job_timing: string;
  route: string;
  publish: number;
  [key: string]: any;
}

export const getJobOpenings = async (): Promise<FrappeJobOpening[]> => {
  try {
    const response = await api.get(
      `/resource/Job Opening?fields=["*"]&filters=[["company","=","Tapect%20Inc"]]`
    );
    return response.data.data as FrappeJobOpening[];
  } catch (error) {
    console.error("Error fetching job openings from Frappe:", error);
    throw error;
  }
};

export const getJobOpeningByRoute = async (
  route: string
): Promise<FrappeJobOpening | null> => {
  try {
    const response = await api.get(
      `/resource/Job Opening?filters=[["route","=", "${route}"]]&fields=["*"]`
    );
    const data = response.data.data as FrappeJobOpening[];
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error(
      `Error fetching job opening with route ${route} from Frappe:`,
      error
    );
    return null;
  }
};
// Function to create a new document in Frappe
export const createDoc = async (data: any): Promise<any> => {
  try {
    const response = await api.post(
      '/resource/Job Applicant?fields=["*"]',
      data
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating document in Frappe:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const uploadFileToFrappe = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("is_private", "1");

  try {
    const response = await api.post(`/method/upload_file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.message.file_url;
  } catch (error) {
    console.error("Error uploading file to Frappe:", error);
    throw error;
  }
};
