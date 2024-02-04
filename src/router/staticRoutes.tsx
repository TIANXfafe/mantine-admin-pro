import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import BlankLayout from '@/layout/BlankLayout';
import { DefaultRoute } from '@/router/guardRoutes';

// ** Components
const Login = lazy(() => import('@/pages/Login'));
const DefaultError = lazy(() => import('@/pages/Error/DefaultError'));
const NotAuthorized = lazy(() => import('@/pages/Error/NotAuthorized'));

export const getHomeRoute = () => {
  const user = true;
  if (user) {
    return DefaultRoute;
  } else {
    return '/login';
  }
};

export default [
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
  }
];
