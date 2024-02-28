import { ReactNode } from 'react';
import { IResponseBody } from '@/services';

export interface IProTableValueEnum {
  label: string | ReactNode;
  value: string | number;
  status?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

export type TProTableColumn = {
  valueType?: 'input' | 'select' | undefined;
  valueEnum?: Record<string, IProTableValueEnum>;
  key?: string;
  title?: string | ReactNode;
  hideInSearch?: boolean;
  fieldProps?: Record<string, any>;
  width?: number;
  render: (row: Record<string, any>, index: number) => ReactNode;
};

export interface TProTableOptions {
  reload?: boolean;
  setting?: boolean;
}

export interface ProTableRequestCallback {
  data: Record<string, any>[];
  total: number;
  pageNo: number;
  pageSize: number;
}

export type TProTableRequest = (
  params?: Record<string, any>
) => Promise<IResponseBody<ProTableRequestCallback>>;

export interface IProps {
  columns?: TProTableColumn[];
  options?: TProTableOptions;
  request?: TProTableRequest;
  params?: Record<string, any>;
  manualRequest?: boolean;
}

export interface ITableContext {
  columns: TProTableColumn[];
  request?: TProTableRequest;
}
