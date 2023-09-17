import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/redux';
import '@/assets/styles/index.css';

// ** Lazy load app
const LazyApp = lazy(() => import('./App'));

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyApp />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
