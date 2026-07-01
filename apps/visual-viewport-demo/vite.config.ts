import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/visual-viewport-demo/',
  resolve: {
    alias: {
      // Consume the workspace library straight from source for instant HMR.
      'react-vv': fileURLToPath(new URL('../../packages/react-vv/src/index.ts', import.meta.url))
    }
  },
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['.trycloudflare.com']
  }
})
