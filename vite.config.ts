import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
    open: true,
  },
  // Absolute asset base: SPA deep links (e.g. /series/book-one/read/prologue) are
  // redirected by 404.html to /?/series/... — from which a relative './assets/...'
  // URL would resolve against the nested path and 404. '/assets/...' is correct on
  // both the custom domain and the project-pages root.
  base: '/',
})
