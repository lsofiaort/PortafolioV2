import { defineConfig } from 'vite';
import purgecss from '@fullhuman/postcss-purgecss';

export default defineConfig({
  base: './',
  css: {
    postcss: {
      plugins: [
        purgecss.default({
          content: ['./index.html', './src/**/*.{js,html}'],
          safelist: [/^fa-/, /^is-/, /^active$/]
        })
      ]
    }
  },
  build: {
    minify: true,
    cssMinify: true,
    assetsDir: 'assets'
  }
});