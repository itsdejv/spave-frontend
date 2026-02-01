import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.tsx';
import { client } from './api/client.gen.ts';
import './index.css';
import { keycloak } from './keycloak.ts';

const root = createRoot(document.getElementById('root')!);
const queryClient = new QueryClient();

client.setConfig({
  baseUrl: 'api',
});

client.interceptors.request.use(async (request) => {
  try {
    await keycloak.updateToken(30);
  } catch (error) {
    console.error('Failed to refresh Keycloak token', error);
  }

  if (keycloak.token) {
    request.headers.set('Authorization', `Bearer ${keycloak.token}`);
  }
  return request;
});

keycloak
  .init({
    onLoad: 'login-required',
  })
  .then(() => {
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StrictMode>,
    );
  })
  .catch((error) => {
    console.error('Keycloak initialization failed', error);
  });
