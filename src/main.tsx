import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import store from '@/redux';
import '@/locales';
import '@/assets/styles/index.css';

// ** Lazy load app
const LazyApp = lazy(() => import('./App'));

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Notifications position="top-right" />
        <LazyApp />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
