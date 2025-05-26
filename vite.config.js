import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcsss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcsss()],
     optimizeDeps: {
    include: ['axios', 'js-cookie'],
  },
})

