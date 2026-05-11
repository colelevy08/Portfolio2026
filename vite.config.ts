import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Minimal ambient declaration so we don't have to pull in @types/node just for this file.
declare const process: { env: Record<string, string | undefined> }

// Vercel sets VERCEL=1 during its build; gh-pages builds locally without it.
// Keeps both deploy targets working at their natural URL.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VERCEL ? '/' : '/Portfolio2026/',
})
