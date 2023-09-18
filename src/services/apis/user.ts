import { request } from '@/services';

export const loginApi = (data: any) =>
  request({
    url: '/user/login',
    method: 'POST',
    data
  });
