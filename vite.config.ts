import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'plugin-inspect-react-code'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild, mode }) => ({
  // Absolute base. With a relative base ('./'), a deep link such as
  // /news/sb1507-explained resolves assets to /news/assets/*, which the SPA
  // rewrite answers with index.html - the browser then fails to parse HTML as
  // JavaScript and the page renders blank. Every route is served from the
  // domain root, so assets must resolve from the root too.
  base: '/',
  // inspectAttr stamps every element with a code-path attribute for the dev
  // inspector. In a production build that adds ~30% to the HTML of every page
  // and publishes internal file paths, so it is limited to `vite dev`.
  plugins: [mode === 'development' ? inspectAttr() : null, react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // The SSR bundle is a single Node module - splitting it serves no purpose.
          if (isSsrBuild) return;
          if (!id.includes('node_modules')) return;
          // three.js is only reached through the lazily-imported FluidBackground.
          if (/[\\/]node_modules[\\/]three[\\/]/.test(id)) return 'three';
          // Scroll/animation runtime, shared by every page but cacheable on its own.
          if (/[\\/]node_modules[\\/](gsap|lenis|normalize-wheel)[\\/]/.test(id)) return 'motion';
          // Framework core - changes rarely, so keep it in its own long-lived chunk.
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|react-helmet-async|scheduler)[\\/]/.test(id)) return 'react';
          // Everything else is left to Rollup's own chunking: a catch-all 'vendor'
          // chunk would drag page-specific libraries (recharts, for example) onto
          // every route instead of into the one lazy page that needs them.
          return undefined;
        },
      },
    },
  },
}));
