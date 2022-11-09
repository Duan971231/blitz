import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import rootRoutes from './router/index'

const app = createApp(App)
app.use(rootRoutes)
app.mount('#app')
