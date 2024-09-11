import node from '@astrojs/node';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  output: 'hybrid',
  site: 'https://impactfoundation.ru',
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    port: 4000,
    host: true,
  },
  vite: {
    ssr: {
      // noExternal: ['path-to-regexp'],
    },
    preview: {
      port: 4000,
      host: true,
    },
  },
});
