import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Set the output directory to 'dist'
    rollupOptions: {
      input: 'index.html',  // Use correct path to the index.html
    },
  }
  
})

