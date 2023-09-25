import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import { notifications } from '@mantine/notifications';
import { MantineTheme } from '@mantine/core';

export interface IResponseBody<T = any> {
  code: number;
  msg: string;
  data?: T;
}

export interface IRequest<T = any, R = any> {
  url: string;
  data?: T;
  params?: R;
  method?: string;
}

const baseURL = '/api';
const instance = axios.create({
  baseURL,
  timeout: 60000
});
export const notificationStyle = (theme: MantineTheme) => ({
  root: {
    backgroundColor: theme.colors.red[6],
    borderColor: theme.colors.red[6],
    '&::before': { backgroundColor: theme.white }
  },
  title: { color: theme.white },
  description: { color: theme.white },
  closeButton: {
    color: theme.white,
    '&:hover': { backgroundColor: theme.colors.red[7] }
  }
});

const requestHandle = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};

const responseHandle = async (
  response: any
): Promise<IResponseBody<any> | AxiosResponse<any> | any> => {
  return response.data;
};

const errorHandle = async (error: AxiosError): Promise<any> => {
  if (error.response) {
    const { data, status, statusText } =
      error.response as AxiosResponse<IResponseBody>;
    if (status === 401) {
      notifications.show({
        title: 401,
        message: data?.msg || statusText,
        styles: notificationStyle
      });
    } else if (status === 403) {
      notifications.show({
        title: 403,
        message: data?.msg || statusText,
        styles: notificationStyle
      });
    } else if (status === 500) {
      notifications.show({
        title: 500,
        message: data?.msg || statusText,
        styles: notificationStyle
      });
    } else if (status === 404) {
      notifications.show({
        title: 404,
        message: data?.msg || statusText,
        styles: notificationStyle
      });
    } else {
      notifications.show({
        title: 500,
        message: data?.msg || statusText,
        styles: notificationStyle
      });
    }
  }
  return Promise.reject(error);
};

instance.interceptors.request.use(requestHandle);
instance.interceptors.response.use(responseHandle, errorHandle);

export default instance;

export const request = <T = any>({
  url,
  data,
  params,
  method = 'GET'
}: IRequest): Promise<IResponseBody<T>> => {
  return instance.request({
    url,
    method,
    data,
    params
  });
};
