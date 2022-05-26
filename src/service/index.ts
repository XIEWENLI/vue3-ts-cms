// axios实例
import XWLRequest from './request'
import { BASE_URL } from './request/config'

const xwlRequest = new XWLRequest({
  baseURL: BASE_URL,
  interceptors: {
    requestInterceptors: (config) => {
      console.log('实例请求拦截！！！')
      return config
    },
    requestInterceptorsCatch: (err) => {
      return err
    },
    responseInterceptors: (config) => {
      console.log('实例响应拦截！！！')
      return config
    },
    responseInterceptorsCatch: (err) => {
      return err
    }
  }
})

export default xwlRequest
