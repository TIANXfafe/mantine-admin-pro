import { ReactNode } from 'react';
import { useRoutes } from 'react-router-dom';
import StaticRoutes from '@/router/staticRoutes.tsx';
import { getRoutes } from './guardRoutes';

export interface IRoute {
  path: string;
  element?: ReactNode;
  index?: boolean;
  meta?: {
    layout?: boolean;
    title?: string;
  };
  children?: IRoute[];
}

const Router = () => {
  const allRoutes = getRoutes();

  return useRoutes([...StaticRoutes, ...allRoutes]);
};

export default Router;
