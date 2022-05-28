import xwlRequest from '@/service/index'

import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  UserLoginUrl = '/login',
  UserAccpuntInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

export function accountLoginRequest(userAccount: IAccount) {
  return xwlRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.UserLoginUrl,
    data: userAccount
  })
}

export function requestUserInfoById(id: number) {
  return xwlRequest.get<IDataType>({
    url: LoginAPI.UserAccpuntInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return xwlRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
