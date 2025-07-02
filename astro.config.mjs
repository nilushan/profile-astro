// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
// import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    // Starlight docs mounted at /docs/
    // starlight(
    //   {
    //     title: "Knowledge Base",

    //     // head: [
    //     //   // Example: add Fathom analytics script tag.
    //     //   {
    //     //     tag: 'script',
    //     //     attrs: {
    //     //       src: 'https://cdn.usefathom.com/script.js',
    //     //       'data-site': 'MY-FATHOM-ID',
    //     //       defer: true,
    //     //     },
    //     //   },
    //     // ],
    //     sidebar:[
    //       {label: 'Home', link: 'docs'},
    //       {label: 'Welcome' , link: 'welcome' },
    //       {label: 'Architecture' , autogenerate: { directory: 'kb/architecture'}},
    //       {label: 'Cloud', autogenerate: {directory: 'kb/cloud'}  },
    //       {label: 'Guides', autogenerate: { directory: 'kb/guides'}}
    //     ],
    //     customCss:['./src/styles/global.css']
    //   },
    // ),
    mdx(),
  ]
});
