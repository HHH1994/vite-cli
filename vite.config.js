import { defineConfig, mergeConfig } from 'vite'
import baseConf from './build/base'
import devConf from './build/dev'
import prodConf from './build/prod'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  console.log(mode);
  if (mode === 'development') {
    return mergeConfig(baseConf, devConf);
  } else {
    return mergeConfig(baseConf, prodConf);
  }
})
