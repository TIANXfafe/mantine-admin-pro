import { IResponseBody, request } from '@/services';

interface ITableListParams {
  pageNo?: number;
  pageSize?: number;
}

interface ITableListRes {
  data: any[];
  total: number;
  pageNo: number;
  pageSize: number;
}

export const tableListApi: (
  data: ITableListParams
) => Promise<IResponseBody<ITableListRes>> = (data) =>
  request({
    url: '/table/list',
    method: 'POST',
    data
  });
