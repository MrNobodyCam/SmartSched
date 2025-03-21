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

/* Auth API */
const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signup = async (userData: {
  full_name: string;
  email: string;
  hash_password: string;
}) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (otpData: { email: string; otp: string }) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/verified`, otpData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resendOtp = async (email: string) => {
  try {
    const response = await axios.get(`${AUTH_BASE_URL}/resend-otp`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signin = async (credentials: {
  email: string;
  hash_password: string;
}) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/signin`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/logout`);
    setAuthToken("");
    return response.data;
  } catch (error) {
    throw error;
  }
};
