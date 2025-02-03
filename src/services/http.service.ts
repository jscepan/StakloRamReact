import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { ErrorResponseI } from '../models/error-response.interface';
import { ResponseI } from '../models/response.models';

export const ax = axios.create();

ax.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // config.
    if (config.url?.includes('/auth/login')) {
      //   config.withCredentials = true;
    } else {
      //
    }
    return config;
  },
  (error: ErrorResponseI) => {
    return Promise.reject(error);
  }
);

export const HttpService = {
  get: (
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<ResponseI<any>> => {
    return ax.get(url, config);
  },
  post: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<ResponseI<any>> => {
    return ax.post(url, data, config);
  },
  put: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResponseI<any>> => {
    return ax.put(url, data, config);
  },
  delete: (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseI<any>> => {
    return ax.delete(url, config);
  },
};
