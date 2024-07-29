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
                additionalData: '@use "@/assets/scss/variable.scss" as *;@use "@/assets/scss/mixin.scss" as *;' // 设置sass变量
            }
        }
    },
    plugins: [
        vue(), 
        vueJSX()
    ]
}