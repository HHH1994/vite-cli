const proxyConf = {
    '^/api/product-map': {
        target: "http://dcrz-test-xk-k3s.hsjdata.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/product-map/, ''),
    }
}

export default proxyConf;