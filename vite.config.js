import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/careerfair2026/' // 請填入您未來在 GitHub 上要建立的專案名稱
   })
