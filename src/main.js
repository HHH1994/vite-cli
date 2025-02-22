import { createApp } from 'vue'
import '@/assets/scss/index.scss'
import ElementPlus from 'element-plus'
import {createPinia} from 'pinia';
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/src/index.scss';
import '@/assets/fonts/iconfont/iconfont.css';
import routes from './router/index'
import App from './App.vue'

const app = createApp(App)
.use(ElementPlus)
.use(routes)
.use(createPinia())
.mount('#app')

console.log(window.appConf)

