import { Suspense, useEffect } from 'react';
import Router, { IRoute } from './router/Router';
import { MantineProvider, useMantineTheme } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore.ts';
import { useLocation } from 'react-router-dom';
import { flattenTree } from '@/utils/methods/tree.ts';
import { getRoutes } from '@/router/guardRoutes';

const App = () => {
  const location = useLocation();
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const { layout } = useAppSelector((state) => state.app);
  const allRoutes = getRoutes();

  useEffect(() => {
    dispatch({ type: 'app/setThemeColor', payload: theme.colors });
  }, []);

  useEffect(() => {
    const routeArr = flattenTree(allRoutes);
    const curRoute = routeArr.find(
      (item: IRoute) => item.path === location.pathname
    );
    let title = layout.title;
    if (curRoute && curRoute.meta && curRoute.meta.title) {
      title = `${title} - ${curRoute.meta.title}`;
    }
    document.title = title!;
  }, [location]);

  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={{
        shadows: {
          layout: 'var(--pro-admin-layout-box-shadow)',
          darkLayout: 'var(--pro-admin-dark-layout-box-shadow)'
        },
        colorScheme: layout.layoutStyle === 'dark' ? 'dark' : 'light',
        transitionTimingFunction: 'linear',
        primaryColor: layout.primaryColor
      }}
    >
      <Suspense fallback={null}>
        <Router />
      </Suspense>
    </MantineProvider>
  );
};

export default App;
