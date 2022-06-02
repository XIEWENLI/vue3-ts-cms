import xwlRequest from '@/service'

export function getPageListData(url: string, queryInfo: any) {
  return xwlRequest.post({ url, data: queryInfo })
}
