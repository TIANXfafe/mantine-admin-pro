// ** Layouts
import BlankLayout from '@/layout/BlankLayout';
import BaseLayout from '@/layout/BaseLayout';

// ** Routes
import DashboardRoutes from '@/router/routes/Dashboards.tsx';

// ** Utils
import { isObjEmpty } from '@/utils/methods/utils.ts';

// ** Default Route
const DefaultRoute = '/dashboard/workplace';

// ** Merge Routes
const Routes = [...DashboardRoutes];

const getRoutes = () => {
  let AllRoutes = [];

  const BaseRoutes: any[] = [];
  const BlankRoutes: any[] = [];
  if (Routes && Routes.length) {
    Routes.forEach((route) => {
      if (
        !route.meta ||
        (route.meta && isObjEmpty(route.meta)) ||
        route.meta.layout
      ) {
        BaseRoutes.push(route);
      } else {
        BlankRoutes.push(route);
      }
    });
  }
  AllRoutes = [
    {
      path: '/',
      element: <BaseLayout />,
      children: BaseRoutes
    },
    {
      path: '/',
      element: <BlankLayout />,
      children: BlankRoutes
    }
  ];
  return AllRoutes;
};

export { DefaultRoute, Routes, getRoutes };
