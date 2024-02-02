import { init} from 'es-module-lexer';
export const YSSplitChunkPlugin = function(conf) {
    const vGroups = {};
    const cGroups = {};
    const cache = {};

    for(const key in conf.customSplitting) {
        if (!cGroups[key]) {
            cGroups[key] = conf.customSplitting[key];
        } else {
            cGroups[key] = cGroups[key].concat(conf.customSplitting[key]);
        }
    }

    for(const key in conf.vendorSplitting) {
        if (!vGroups[key]) {
            vGroups[key] = conf.vendorSplitting[key];
        } else {
            vGroups[key] = vGroups[key].concat(conf.vendorSplitting[key]);
        }
    }

    return {        
        name: "ys-plugin-chunk-split",
        async config(c) {
            await init;
            return {
                build: {
                    rollupOptions: {
                        output: {
                            manualChunks(id) {
                                if (cache[id]) return;
                                for (const group in vGroups) {
                                    const paths = vGroups[group];
                                    for (let i = 0; i < paths.length; i++) {
                                        const path = paths[i];
                                        if (id.includes('/node_modules/') && id.includes(path)) {
                                            cache[id] = true;
                                            return group;
                                        }   
                                    }
                                }

                                for (const group in cGroups) {
                                    const paths = cGroups[group];
                                    for (let i = 0; i < paths.length; i++) {
                                        const path = paths[i];
                                        if (id.includes(path)) {
                                            cache[id] = true;
                                            return group;
                                        }   
                                    }
                                }
                            }
                        }
                    }
                }
            };
        },
    }
}