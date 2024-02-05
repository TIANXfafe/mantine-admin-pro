// ** Layouts
import BlankLayout from '@/layout/BlankLayout';
import BaseLayout from '@/layout/BaseLayout';

// ** Routes
import DashboardRoutes from '@/router/guardRoutes/modules/Dashboards.tsx';
import GuardRoute from '@/components/GuardRoute.tsx';
import RecordRoute from '@/components/RecordRoute.tsx';

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
      route.element = <GuardRoute>{route.element}</GuardRoute>;
      if (route.meta && route.meta.layout === false) {
        BlankRoutes.push(route);
      } else {
        BaseRoutes.push(route);
      }
    });
  }
  AllRoutes = [
    {
      path: '/',
      element: (
        <RecordRoute>
          <BaseLayout />
        </RecordRoute>
      ),
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
