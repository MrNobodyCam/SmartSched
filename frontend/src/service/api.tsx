import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const fetchGetData = async (url: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    throw new Error((error as any).message);
  }
};

export const fetchPostData = async (url: string, data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${url}`, data);
    return response.data;
  } catch (error) {
    throw new Error((error as any).message);
  }
};

export const fetchUpdateData = async (url: string, data: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${url}`, data);
    return response.data;
  } catch (error) {
    throw new Error((error as any).message);
  }
};

// Add more API functions as needed
