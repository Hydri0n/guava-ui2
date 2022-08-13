import { createApp } from 'vue'
import './assets/my-theme/theme/index.css'
import ElementPlus from 'element-plus'
import App from './App.vue'


const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.mount('#app')