import './assets/main.css'
import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'

import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(router)

app.use(Antd).mount('#app')

app.config.errorHandler = (err) => {
  console.log(err, 'err ')
}
