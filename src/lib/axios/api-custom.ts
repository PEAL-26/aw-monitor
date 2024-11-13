import { axios } from "./axios";
import type { ApiRequestConfig } from "./types";

export async function get<T = unknown>(
  url: string,
  configs: ApiRequestConfig = {},
) {
  const { ...config } = configs;
  return axios.get<T>(url, config).then((response) => {
    return response.data;
  });
}

export async function post<T = unknown>(
  url: string,
  data?: unknown,
  configs: ApiRequestConfig = {},
) {
  const { ...config } = configs;
  return axios.post<T>(url, data, config).then((response) => {
    return response.data;
  });
}

export async function put<T = unknown>(
  url: string,
  data?: unknown,
  configs: ApiRequestConfig = {},
) {
  const { ...config } = configs;
  return axios.put<T>(url, data, config).then((response) => {
    return response.data;
  });
}

export async function patch<T = unknown>(
  url: string,
  data?: unknown,
  configs: ApiRequestConfig = {},
) {
  const { ...config } = configs;
  return axios.patch<T>(url, data, config).then((response) => {
    return response.data;
  });
}

export async function apiDelete<T = unknown>(
  url: string,
  configs: ApiRequestConfig = {},
) {
  const { ...config } = configs;
  return axios.delete<T>(url, config).then((response) => {
    return response.data;
  });
}

export const api = { get, post, put, patch, delete: apiDelete };
