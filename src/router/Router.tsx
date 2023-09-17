// ** React imports
import { lazy } from 'react';

// ** Router imports
import { useRoutes } from 'react-router-dom';

// ** Layouts
import BaseLayout from '@/layout/BaseLayout';
import BlankLayout from '@/layout/BlankLayout';
// import MixLayout from '@/layout/MixLayout';
// import SideLayout from '@/layout/SideLayout';
// import TopLayout from '@/layout/TopLayout';

// ** Components
const DefaultError = lazy(() => import('@/pages/Error/DefaultError'));
const Login = lazy(() => import('@/pages/Login'));
const NotAuthorized = lazy(() => import('@/pages/Error/NotAuthorized'));

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <BaseLayout />
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
  ]);

  return routes;
};

export default Router;
