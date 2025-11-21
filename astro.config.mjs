// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import mermaid from 'astro-mermaid';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.nilushansilva.info',
  // output: 'static' is default - API routes use prerender: false for SSR

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-components': ['@radix-ui/react-dropdown-menu', '@radix-ui/react-slot']
          }
        }
      }
    }
  },

  integrations: [
    react(),
    mdx(),
    mermaid({
      // Use base theme for custom theming with DaisyUI colors
      theme: 'base',
    }),
    sitemap({
      filter: (page) => !page.includes('/admin'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ]
});
