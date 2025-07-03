import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
      output: {
        format: 'iife',
        entryFileNames: `[name].js`,
      },
    },
  },
})
