import { createApp } from 'vue'
import './style.css'
import '@/assets/scss/index.scss'
import routes from './router/index'
import App from './App.vue'

createApp(App)
.use(routes)
.mount('#app')

console.log(window.appConf)

