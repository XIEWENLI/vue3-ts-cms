import type { Module } from 'vuex'
import type { ISystemState } from './type'
import type { IRootState } from '@/store/type'

import { getPageListData } from '@/service/main/system/system'
import { firstCapitalize } from '@/utils/first-capitalize'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changUserList(state, userList: any[]) {
      state.userList = userList
    },
    changUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageUrl = `/${
        payload.pageName === 'user' ? payload.pageName + 's' : payload.pageName
      }/list`

      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      const { list, totalCount } = pageResult.data

      // 首字母大写
      const pageName = firstCapitalize(payload.pageName)

      commit(`chang${pageName}List`, list)
      commit(`chang${pageName}Count`, totalCount)
    }
  }
}

export default systemModule
