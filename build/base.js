import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import path from 'path';

export default {
    base: '/',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, '../src')
        }
    },
    build: {
        modulePreload: false
    },
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: '@import "@/assets/scss/variable.scss";' // 设置sass变量
                additionalData: '@use "@/assets/scss/variable.scss" as *;' // 设置sass变量
            }
        }
    },
    plugins: [
        vue(), 
        vueJSX()
    ]
}