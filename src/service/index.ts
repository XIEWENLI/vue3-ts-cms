// axios实例
import XWLRequest from './request'
import { BASE_URL } from './request/config'

import localCache from '@/utils/cache'

const xwlRequest = new XWLRequest({
  baseURL: BASE_URL,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (config) => {
      return config.data
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default xwlRequest
