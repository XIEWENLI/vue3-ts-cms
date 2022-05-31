import { RouteRecordRaw } from 'vue-router'

import { IBreadCrumb } from '@/base-ui/breadcreumb/types'

export let fistRoute: any = null

// 筛选符合角色权限的路由routes
export function mapMenus(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // webpack递归(第二个参数true)获取映射ts文件内容
  const allRoutes: RouteRecordRaw[] = [] //所有的映射routes
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 筛选出符合权限的路由映射
  const _getRoutes = (menus: any[]) => {
    menus.forEach((menu) => {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => {
          return route.path === menu.url
        })
        if (route) routes.push(route)
        // 记录第一个路由，用户一开始显示页面
        if (!fistRoute) {
          fistRoute = menu
        }
      } else {
        _getRoutes(menu.children)
      }
    })
  }

  _getRoutes(userMenus)

  return routes
}

// 面包屑
export function pathMapBreadCrumb(userMenus: any[], activePath: string): any {
  const breadcrumbs: IBreadCrumb[] = []
  pathToMenu(userMenus, activePath, breadcrumbs)
  return breadcrumbs
}

// 页面刷新，当前显示页面不变
export function pathToMenu(
  userMenus: any[],
  activePath: string,
  breadcrumbs?: IBreadCrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathToMenu(menu.children ?? [], activePath)
      if (findMenu) {
        // 上面pathMapBreadCrumb（）方法-面包屑数据
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === activePath) {
      return menu
    }
  }
}
