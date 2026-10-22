// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fruitiqueicecream.com',
  trailingSlash: 'always',
  // La línea de paletas non-dairy salió del catálogo (2026-10-21); su URL apunta a las paletas rellenas.
  redirects: {
    '/products/popsicles/': '/products/filled-popsicles/',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    // Pre-empaqueta estas dependencias al arrancar el dev server (evita 504 "Outdated Optimize Dep" al instalar paquetes con el server abierto).
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'gsap/SplitText'],
      // maplibre-gl v6 carga su worker por URL relativa: no debe pre-empaquetarse.
      exclude: ['maplibre-gl'],
    },
  },
  integrations: [
    sitemap(),
  ],
});
