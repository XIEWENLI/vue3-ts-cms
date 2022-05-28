import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

// 样式初始化(npm i normalize.css)
import 'normalize.css'
import './assets/css/base.less'

const app = createApp(App)

app.use(router)
app.use(store)
// 用户刷新初始化vuex（localStorage->vuex）
setupStore()

app.mount('#app')
