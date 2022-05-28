import { createStore } from 'vuex'

import type { IRootState } from './type'
import loginModule from './login/login'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'coderwhy',
      age: 18
    }
  },
  mutations: {},
  actions: {},
  modules: {
    loginModule
  }
})

// 用户刷新初始化vuex（localStorage->vuex）
export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
}

export default store
