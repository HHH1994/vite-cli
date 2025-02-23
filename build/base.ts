import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import unpluginAutoImport from 'unplugin-auto-import/vite';
import path from 'node:path';

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
                    'computed',
                    'watch',
                    'watchEffect',
                    'defineProps',
                    'defineEmit',
                    'defineModel',
                    'getCurrentInstance',
                    'onMounted'
                ]
               },
                'vue-router',
                {
                    from: 'pinia',
                    imports: ['StoreDefinition'],
                    type: true
                },
                {
                    from: 'vue',
                    imports: ['Ref', 'Reactive'],
                    type: true,
                   },
                {
                    from: 'vue-router',
                    imports: ['RouteComponent', 'RouteRecordRaw'],
                    type: true,
                },
            ],
            eslintrc: {
               enabled: true, 
            },
        })
    ]
}