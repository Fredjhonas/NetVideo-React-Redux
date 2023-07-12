import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import store from './redux/createStore';
import App from './routes/App';

const queryClient = new QueryClient()
const container = document.getElementById('app');
const root = createRoot(container as HTMLElement);

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  </Provider>
)
