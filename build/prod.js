import { YSSplitChunkPlugin } from './plugin/splitPlugin';
import viteCompression from 'vite-plugin-compression';


export default {
    mode: 'production',
    define: {
        __APP_BASE_URL: '"/api"'
    },
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
                entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
                assetFileNames: (opt) => {
                    const ext = opt.name.split('.')[1];
                    const imgExts = ['png', 'jpeg', 'gif', 'svg', 'jpg', 'bpm', 'tiff'];
                    const fontExts =  ['eot', 'otf', 'ttf', 'ttc', 'woff'];
                    if (imgExts.includes(ext)) {
                        return 'image/[name]-[hash].[ext]';
                    }

                    if (fontExts.includes(ext)) {
                        return 'font/[name]-[hash].[ext]';
                    }
                    return '[ext]/[name]-[hash].[ext]';
                }
            }
        },
        reportCompressedSize: true
    },
    plugins: [
        YSSplitChunkPlugin({
            vendorSplitting: {
                'vue-vendor': ['/vue/', '/vue-router/'],
            },
            customSplitting: {
                'use-effect': ['/src/useEffect/']
            }
        }),
        viteCompression({
            threshold: 51200 // 对大于50K的文件进行压缩
        })
    ]
}