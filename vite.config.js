import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// In production the app is served from the GitHub Pages sub-path
// (https://globustav.github.io/aplus/), so `base` must be '/aplus/'.
// In dev we serve from '/' for a simpler local URL.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/aplus/' : '/',
  plugins: [react(), tailwindcss()],
}))
