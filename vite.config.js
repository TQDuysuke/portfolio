import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [
      'tqduy.id.vn',
      'portfolio.tqduy.id.vn' // Allow subdomains if needed
    ]
  },
  build: {
    outDir: 'dist',
  }
})
