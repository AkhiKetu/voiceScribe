import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        demo: resolve(__dirname, 'demo/index.html'),
      },
      external: ['@huggingface/transformers', 'mediabunny', 'onnxruntime-web'],
    },
  },

  worker: {
    format: 'es',
    rollupOptions: {
      external: [],
    },
  },

  resolve: {
    alias: [
      {
        find: /^.*\.wasm(\?url)?$/,
        replacement: resolve(__dirname, 'src/lib/empty-wasm.js'),
      },
    ],
  },

  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },

  optimizeDeps: {
    exclude: ['@huggingface/transformers', 'mediabunny', 'onnxruntime-web'],
  },
})