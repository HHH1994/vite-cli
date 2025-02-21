import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import unpluginAutoImport from 'unplugin-auto-import/vite';
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
        vueJSX(),
        unpluginAutoImport({
            include: [],
            imports: [
               {
                'vue':  [
                    'reactive',
                    'ref',
                    'watch',
                    'defineProps',
                    'defineEmit',
                    'defineModel',
                    'getCurrentInstance',
                    'onMounted'
                ]
               },
                'vue-router'
            ],
            eslintrc: {
               enabled: true, 
            },
        })
    ]
}