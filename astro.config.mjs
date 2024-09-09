import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  // site: 'https://impact-astro-064416-5a924a-37-143-10-41.traefik.me',
  integrations: [tailwind(), svelte()],
  output: 'server',
  site: 'https://example.com',
  adapter: netlify(),
  server: {
    port: 4000,
    host: true
  },
  vite: {
    ssr: {
      noExternal: ['path-to-regexp']
    },
    preview: {
      port: 4000,
      host: true
    }
  }
});