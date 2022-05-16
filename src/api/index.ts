import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { history } from '../router';

const BASE_URL = 'http://localhost:3000';

export const authApi = axios.create({
  baseURL: BASE_URL,
});
export const baseApi = axios.create({
  baseURL: BASE_URL,
});

baseApi.interceptors.request.use(async (config) => {
  const formattedConfig = { ...config };

  const token = window.localStorage.getItem('accessToken');

  if (!token) history.push('/auth/login');

  const now = +(dayjs().add(3, 'seconds'));

  const decoded = jwtDecode(token || '');

  if (decoded) {
    const { exp } = decoded as {
      id: number
      exp: number
    };

    if (exp && now > exp * 1000) {
      try {
        const refreshResponse = await authApi.get<{
          accessToken: string
        }>('/account/refresh', {
          withCredentials: true,
        });

        if (refreshResponse.data && formattedConfig.headers) {
          formattedConfig.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
          window.localStorage.setItem('accessToken', refreshResponse.data.accessToken);

          return formattedConfig;
        }
      } catch (e) {
        return history.push('/auth/login');
      }
    }
  }

  if (formattedConfig.headers) {
    const authToken = window.localStorage.getItem('accessToken');
    formattedConfig.headers.Authorization = `Bearer ${authToken}`;
  }

  return formattedConfig;
});

export type TExecuteResponse<T> = {
  httpData: Omit<AxiosResponse, 'data'>,
  data: T | null
}

export class HttpService {
  api: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance;
  }

  async execute<T extends object>(options: AxiosRequestConfig): Promise<TExecuteResponse<T>> {
    const {
      data,
      ...httpData
    } = await this.api.request(options);

    return {
      httpData,
      data: data as T ?? null,
    };
  }
}
