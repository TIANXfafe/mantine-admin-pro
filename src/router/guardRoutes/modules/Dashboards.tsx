import { lazy } from 'react';
import { IRoute } from '@/router/Router.tsx';

const DashboardWorkplace = lazy(() => import('@/pages/Dashboard/Workplace'));
const DashboardAnalytics = lazy(() => import('@/pages/Dashboard/Analytics'));
const Home = lazy(() => import('@/pages/Home'));
const Test = lazy(() => import('@/pages/Test'));

const DashboardRoutes: IRoute[] = [
  {
    path: '/dashboard/workplace',
    element: <DashboardWorkplace />,
    meta: {
      title: '工作台'
    }
  },
  {
    path: '/dashboard/analytics',
    element: <DashboardAnalytics />,
    meta: {
      // layout: false,
      title: '数据趋势'
    }
  },
  {
    path: '/dashboard/home',
    element: <Home />,
    meta: {
      title: 'home页'
    }
  },
  {
    path: '/dashboard/test',
    element: <Test />,
    meta: {
      title: 'Test页'
    }
  }
];

export default DashboardRoutes;
