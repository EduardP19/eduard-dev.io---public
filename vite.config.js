import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteChatApiPlugin } from './dev/viteChatApiPlugin.js'
import { viteSeoPagesPlugin } from './dev/viteSeoPagesPlugin.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), viteChatApiPlugin(), viteSeoPagesPlugin()],
    build: {
      rollupOptions: {
        output: {
          // Split heavy vendors so the app shell caches independently.
          manualChunks: {
            react: ['react', 'react-dom'],
            motion: ['framer-motion', 'lenis'],
            supabase: ['@supabase/supabase-js'],
          },
        },
      },
    },
  }
})
