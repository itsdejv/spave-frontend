import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: process.env.VITE_BACKEND_GENERATE_URL || 'http://localhost:3000/swagger-json',
  output: {
    postProcess: ['prettier'],
    path: './src/api',
  },
  client: 'fetch',
  types: {
    enums: 'typescript',
  },
});
