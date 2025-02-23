import { YSSplitChunkPlugin } from './plugin/splitPlugin';
import viteCompression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy';


export default {
    mode: 'production',
    define: {
        __APP_BASE_URL: '"/api"'
    },
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js', // 引入文件名的名称
                entryFileNames: 'static/js/[name]-[hash].js', // 包的入口文件名称
                assetFileNames: (opt) => {
                    const ext = opt.name.split('.')[1];
                    const imgExts = ['png', 'jpeg', 'gif', 'svg', 'jpg', 'bpm', 'tiff'];
                    const fontExts =  ['eot', 'otf', 'ttf', 'ttc', 'woff'];
                    if (imgExts.includes(ext)) {
                        return 'static/image/[name]-[hash].[ext]';
                    }

                    if (fontExts.includes(ext)) {
                        return 'static/font/[name]-[hash].[ext]';
                    }
                    return 'static/[ext]/[name]-[hash].[ext]';
                }
            }
        },
        reportCompressedSize: true
    },
    plugins: [
        YSSplitChunkPlugin({
            vendorSplitting: {
                'element-ui': ['/element-plus/','/@element-plus/'],
                'vue-vendor': ['/vue/', '/vue-router/', '/@vue/']
            },
            customSplitting: {
                'use-effect': ['/src/useEffect/']
            }
        }),
        viteCompression({
            threshold: 51200 // 对大于50K的文件进行压缩
        }),
        // legacy({
        //     targets: ['chrome < 60', 'edge < 15'],
        //     additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        //     renderLegacyChunks: false
        // })
    ]
}