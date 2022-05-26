import { AxiosRequestConfig, AxiosResponse } from 'axios'

interface XWLRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

interface XWLAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: XWLRequestInterceptors<T>
}

export { XWLRequestInterceptors, XWLAxiosRequestConfig }
