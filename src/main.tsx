import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import { keycloak } from './keycloak.ts';

const root = createRoot(document.getElementById('root')!);

keycloak
  .init({
    onLoad: 'login-required',
  })
  .then(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  })
  .catch((error) => {
    console.error('Keycloak initialization failed', error);
  });
