// ** React imports
import { lazy, ReactNode } from 'react';

// ** Router imports
import { Navigate, useRoutes } from 'react-router-dom';

// ** Layouts
import BlankLayout from '@/layout/BlankLayout';

// ** Routes
import { DefaultRoute, getRoutes } from './guardRoutes';

// ** Components
const Login = lazy(() => import('@/pages/Login'));
const DefaultError = lazy(() => import('@/pages/Error/DefaultError'));
const NotAuthorized = lazy(() => import('@/pages/Error/NotAuthorized'));

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

  const getHomeRoute = () => {
    const user = true;
    if (user) {
      return DefaultRoute;
    } else {
      return '/login';
    }
  };

  return useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <DefaultError /> }]
    },
    ...allRoutes
  ]);
};

export default Router;
