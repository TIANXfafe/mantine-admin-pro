import { Suspense, useEffect } from 'react';
import Router from './router/Router';
import { MantineProvider, useMantineTheme } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore.ts';

const App = () => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const { layout } = useAppSelector((state) => state.app);

  useEffect(() => {
    dispatch({ type: 'app/setThemeColor', payload: theme.colors });
  }, []);

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
