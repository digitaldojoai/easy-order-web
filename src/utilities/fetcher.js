import axios from "axios";
import { baseUrl } from "./constants";

export const AxiosPost = async (path, data, headers, setRes) => {
  const newHeaders = headers || {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  };

  try {
    setRes((prev) => ({
      ...prev,
      isLoading: true,
      data: null,
      error: null,
    }));
    const response = await axios.post(`${baseUrl}${path}`, data, {
      headers: {
        ...newHeaders,
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    setRes((prev) => ({
      ...prev,
      isLoading: false,
      data: response.data,
      error: null,
    }));
    return response.data;
  } catch (error) {
    console.error("Error in AxiosPost:", error);
    setRes((prev) => ({
      ...prev,
      isLoading: false,
      data: null,
      error: error.response || error,
    }));
    throw error.response || error;
  }
};

export const AxiosGet = async (path, headers, setRes) => {
  const newHeaders = headers || {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  };

  try {
    setRes((prev) => ({
      ...prev,
      isLoading: true,
      data: null,
      error: null,
    }));
    const response = await axios.get(`${baseUrl}${path}`, {
      headers: {
        ...newHeaders,
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    setRes((prev) => ({
      ...prev,
      isLoading: false,
      data: response.data,
      error: null,
    }));
    return response.data;
  } catch (error) {
    console.error("Error in AxiosGet:", error);
    setRes((prev) => ({
      ...prev,
      isLoading: false,
      data: null,
      error: error.response || error,
    }));
    throw error.response || error;
  }
};

export const AxiosDelete = async (path, headers, setRes) => {
  console.log("delete hit");

  const newHeaders = headers || {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  };

  console.log(newHeaders);

  try {
    setRes((prev) => ({
      ...prev,
      isLoading: true,
      data: null,
      error: null,
    }));
    const response = await axios.delete(`${baseUrl}${path}`, {
      headers: {
        ...newHeaders,
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    setRes((prev) => ({
      ...prev,
      isLoading: false,
      data: response.data,
      error: null,
    }));
    return response.data;
  } catch (error) {
    console.error("Error in AxiosDelete:", error);
    setRes((prev) => ({
      ...prev,
      isLoading: false,
      data: null,
      error: error.response || error,
    }));
    throw error.response || error;
  }
};
