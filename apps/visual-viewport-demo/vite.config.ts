import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/visual-viewport-demo/',
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['.trycloudflare.com']
  }
})
