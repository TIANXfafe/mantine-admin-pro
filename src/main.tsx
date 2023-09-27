import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import { Toaster } from 'react-hot-toast';
import store from '@/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import '@/locales';
import '@/mock';
import '@/assets/styles/index.css';

// ** Lazy load app
const LazyApp = lazy(() => import('./App'));

const container = document.getElementById('root');
const root = createRoot(container!);

const persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={<div>redux loading...</div>} persistor={persistor}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Notifications position="top-right" />
          <Toaster position="top-center" />
          <LazyApp />
        </Suspense>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
