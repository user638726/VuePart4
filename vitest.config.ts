import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults } from 'vitest/config'
import { mergeConfig } from 'vite'
import viteConfig from './vite.config'

export default mergeConfig(
  typeof viteConfig === 'function'
    ? viteConfig({ command: 'serve', mode: 'development' })
    : viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
