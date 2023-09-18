import { request } from '@/services';

export interface ILoginParams {
  account?: string;
  password?: string;
  mobile?: string;
  captcha?: string;
  type?: 'mobile' | 'account';
  autoLogin: boolean;
}

export const loginApi = (data: ILoginParams) =>
  request({
    url: '/user/login',
    method: 'POST',
    data
  });
