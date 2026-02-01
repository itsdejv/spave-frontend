import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: process.env.VITE_BACKEND_GENERATE_URL || 'http://localhost:3000/swagger-json',
  output: {
    format: 'prettier',
    path: './src/api',
  },
  plugins: [
    '@hey-api/client-fetch',
    {
      name: '@hey-api/sdk',
      asResponse: false,
    },
    {
      name: '@tanstack/react-query',
      outputs: {
        queries: true,
        mutations: true,
      },
    },
  ],
});
