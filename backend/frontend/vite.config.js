import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   server: {
    proxy: {
      '/api': 'https://nextstep-todo-app.netlify.app/api/v1', // or whatever port your backend runs on
    },
  }, 
})
