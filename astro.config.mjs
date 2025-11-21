// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import mermaid from 'astro-mermaid';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.nilushansilva.info',
  output: 'server', // Server mode with adapter for API routes
  adapter: node({
    mode: 'standalone' // Self-contained Node.js server
  }),

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // For production builds, bundle these packages
      noExternal: import.meta.env.PROD ? ['html-escaper', 'cookie', 'kleur'] : [],
      // For dev mode, externalize packages with CommonJS/ESM issues
      external: import.meta.env.DEV ? [] : undefined
    },
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
