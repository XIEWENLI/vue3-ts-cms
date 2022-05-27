import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// 样式初始化(npm i normalize.css)
import 'normalize.css'
import './assets/css/base.less'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
