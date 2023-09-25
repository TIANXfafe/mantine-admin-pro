import { IResponseBody } from './../index';
import { request } from '@/services';

export interface ILoginParams {
  account?: string;
  password?: string;
  mobile?: string;
  captcha?: string;
  type?: 'mobile' | 'account';
  autoLogin: boolean;
}
export interface ILoginRes {
  accessToken: string | null;
}

// 登录
export const loginApi: (
  data: ILoginParams
) => Promise<IResponseBody<ILoginRes>> = (data) =>
  request({
    url: '/user/login',
    method: 'POST',
    data
  });

// 发送验证码
export const sendCaptchaApi: (data: {
  mobile: string | number;
}) => Promise<IResponseBody<boolean>> = (data) =>
  request({
    url: '/user/sendCaptcha',
    method: 'POST',
    data
  });
