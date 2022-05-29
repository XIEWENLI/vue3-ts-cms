import { createStore, Store, useStore as useVuxStore } from 'vuex'

import { IRootState, IStoreType } from './type'
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

export function useStore(): Store<IStoreType> {
  return useVuxStore()
}

export default store
