

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup
// eslint.config.ts
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  // 忽略這些目錄
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // Vue 基本設定
  pluginVue.configs['flat/essential'],

  // 取消單一檔名檢查（像 App.vue）
  {
    rules: { 'vue/multi-word-component-names': 0 },
  },

  // Vue + TS 建議規則
  vueTsConfigs.recommended,

  // 測試檔案規則
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  // Oxlint 建議規則
  ...pluginOxlint.configs['flat/recommended'],

  // Prettier skip formatting
  skipFormatting,
)

