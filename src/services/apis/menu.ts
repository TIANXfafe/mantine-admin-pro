import { IResponseBody, request } from '@/services';
import { TMenuItem } from '@/config/menu.ts';

export const getMenuData: () => Promise<IResponseBody<TMenuItem[]>> = () =>
  request({
    url: '/menu/list',
    method: 'GET'
  });
