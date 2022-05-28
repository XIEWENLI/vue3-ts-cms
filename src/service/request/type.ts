import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface XWLRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface XWLAxiosRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: XWLRequestInterceptors<T>
}
