import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

// 样式初始化(npm i normalize.css)
import 'normalize.css'
import './assets/css/base.less'

import { IconMenusApp } from '@/global'

const app = createApp(App)

// 用户刷新初始化vuex（localStorage->vuex）
/* setupStore()要放在app.use(router)的前面，
因为开始注册的路由时 p1->comp1，
后面动态路由注册时输入有 p1->comp2，
但是第一个生效*/
setupStore()
app.use(router)
app.use(store)

// 图标icom
app.use(IconMenusApp)

app.mount('#app')
