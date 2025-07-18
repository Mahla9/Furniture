// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
  minify: 'esbuild',
  rollupOptions: {
    treeshake: true,
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom', 'antd'], // جدا کردن chunk ها
      },
    },
  },
}

});