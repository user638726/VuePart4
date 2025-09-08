import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ command }) => {
  const isProduction = command === 'build'

  return {
    base: isProduction ? '/VuePart4/' : '/',
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://data.kcg.gov.tw',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(
              /^\/api/,
              '/Json/Get/9f1cd868-d6dd-4892-b03c-6c9cf2c47bff'
            ),
        },
      },
    },
  }
})

