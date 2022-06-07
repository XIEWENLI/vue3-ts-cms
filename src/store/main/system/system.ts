import type { Module } from 'vuex'
import type { ISystemState } from './type'
import type { IRootState } from '@/store/type'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

import { firstCapitalize } from '@/utils/first-capitalize'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
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
    },
    changGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
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
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和id
      // pageName -> /users
      // id -> /users/id
      const { pageName, id } = payload
      const pageUrl = `/${
        pageName === 'user' ? pageName + 's' : pageName
      }/${id}`

      // 2.调用删除网络请求,user id小于10不允许删除
      const res = await deletePageData(pageUrl)
      console.log(res)

      // 3.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName === 'user' ? pageName + 's' : pageName}`
      const res = await createPageData(pageUrl, newData)
      console.log(res)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${
        pageName === 'user' ? pageName + 's' : pageName
      }/${id}`
      const res = await editPageData(pageUrl, editData)
      console.log(res)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
