import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@hooks': '/src/hooks',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@redux': '/src/redux',
    },
  },
})
