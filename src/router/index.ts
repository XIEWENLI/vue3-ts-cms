import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'

// import { fistRoute } from '@/utils/map-menu'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  // 一开始显示界面
  if (to.path === '/main') {
    // 该页面未开发
    // return fistRoute.url
    return '/main/system/user'
  }
})

export default router
