// src/api/apiMethods.js
import axiosInstance from './interceptor';
const handleError = (error) => {
  console.error('API Error:', error);
  const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred';
  throw new Error(errorMessage);
};

// GET request
export const getRequest = async (route, config = {}) => {
  try {
    const response = await axiosInstance.get(route, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// POST request
export const postRequest = async (route, data, config = {}) => {
  try {
    const response = await axiosInstance.post(route, data, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// PUT request
export const putRequest = async (route, data, config = {}) => {
  try {
    const response = await axiosInstance.put(route, data, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// DELETE request
export const delRequest = async (route, config = {}) => {
  try {
    const response = await axiosInstance.delete(route, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
