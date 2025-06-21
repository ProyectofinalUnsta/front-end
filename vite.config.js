import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['axios', 'js-cookie'],
  },
  test: {
    setupFiles: ['./src/tests/setup.js'],
    environment: 'jsdom',
  },
})

