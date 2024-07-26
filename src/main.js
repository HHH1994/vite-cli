import { createApp } from 'vue'
import './style.css'
import '@/assets/scss/index.scss'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/src/index.scss';
import routes from './router/index'
import App from './App.vue'

const app = createApp(App)
.use(ElementPlus)
.use(routes)
.mount('#app')

console.log(window.appConf)

