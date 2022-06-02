// 封装axios
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { XWLRequestInterceptors, XWLAxiosRequestConfig } from './type'

class XWLRequest {
  instance: AxiosInstance
  interceptors?: XWLRequestInterceptors

  constructor(config: XWLAxiosRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 收集每个实例拦截器执行函数
    this.interceptors = config.interceptors

    // 单独个实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全部实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
  }

  // 数据请求方法
  request<T = any>(config: XWLAxiosRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: XWLAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: XWLAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: XWLAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: XWLAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default XWLRequest
