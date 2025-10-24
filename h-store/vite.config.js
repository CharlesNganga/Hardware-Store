import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ], 
  server: {
    host: true, // allow external access (important)
    allowedHosts: [
      'dalila-scrubbier-arrhythmically.ngrok-free.dev', // 👈 your ngrok domain
    ],
  },
})
