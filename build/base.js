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
            scss: {}
        }
    },
    plugins: [
        vue(), 
        vueJSX()
    ]
}