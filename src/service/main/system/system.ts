import xwlRequest from '@/service'

export function getPageListData(url: string, queryInfo: any) {
  return xwlRequest.post({ url, data: queryInfo })
}

// url: /users/id
export function deletePageData(url: string) {
  return xwlRequest.delete({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return xwlRequest.post({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return xwlRequest.patch({
    url: url,
    data: editData
  })
}
