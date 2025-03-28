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
export const fetchGetRequestData = async (url: string, params: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${url}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message || "An error occurred"
    );
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
    console.log("Verification response:", response);
    localStorage.setItem("id", response.data.id);
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
    localStorage.setItem("id", response.data.$user.id.toString());
    localStorage.setItem("access_token", response.data.access_token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    console.log("Logout response:", response);
    localStorage.clear();
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* Contact Us API */
export const sendContactUsMessage = async (contactData: {
  email: string;
  title: string;
  text: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contactUs`, contactData);
    return response.data;
  } catch (error) {
    throw new Error(
      (error as any).response?.data?.message || "Failed to send contact message"
    );
  }
};
