import proxyConf from "../config/proxy-self";

export default {
    mode: 'development',
    define: {
        __APP_BASE_URL: '"/api"'
    },
    server: {
        host: '0.0.0.0',
        port: 9000,
        open: true,
        proxy: proxyConf
    }
}