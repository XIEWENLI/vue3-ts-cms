import { Module } from 'vuex'

import { ISystemState } from './type'
import { IRootState } from '@/store/type'

import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changUserList(state, userList: any[]) {
      state.userList = userList
    },
    changUserCount(state, userCount: number) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )

      const { list, totalCount } = pageResult.data
      commit('changUserList', list)
      commit('changUserCount', totalCount)
    }
  }
}

export default systemModule
