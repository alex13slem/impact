import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://impact-astro-064416-5a924a-37-143-10-41.traefik.me',
  integrations: [tailwind(), svelte()],
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    port: 3001,
    host: true,
  },
  vite: {
    preview: {
      port: 3002,
      host: true,
    },
  },
});
