import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({

    resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },

})