import { useStore } from '@/store'

export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  const permissions = store.state.loginModule.permissions
  const verifyPermission = `system:${
    pageName === 'user' ? pageName + 's' : pageName
  }:${hanldeName}`

  // name = "xwl"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item) => item === verifyPermission)
}
