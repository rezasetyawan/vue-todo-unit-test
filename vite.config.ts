import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssNested from 'postcss-nested'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        postcssNested,
        autoprefixer,
      ]
    }
  },
  test: {
    include: ['src/tests/*'],
    globals: true, // allow the Vitest APIs to be accessible within the test files without importing them.
		environment: 'happy-dom', // jsdom
    coverage: {
      enable: true
    }
  }
})
