import { lazy } from 'react';

const DashboardWorkplace = lazy(() => import('@/pages/Dashboard/Workplace'));
const DashboardAnalytics = lazy(() => import('@/pages/Dashboard/Analytics'));

const DashboardRoutes: any[] = [
  {
    path: '/dashboard/workplace',
    element: <DashboardWorkplace />
  },
  {
    path: '/dashboard/analytics',
    element: <DashboardAnalytics />,
    meta: {
      layout: false
    }
  }
];

export default DashboardRoutes;
