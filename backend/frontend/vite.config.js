import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   server: {
    proxy: {
      '/api': 'https://to-do-app-nv7j.onrender.com/api/v1', // or whatever port your backend runs on
    },
  }, 
})
