import { App } from 'vue'
import IconMenusApp from './register-icon-element'
import registerProperties from './register-properties'

// 定义了全局方法之后需要扩充类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}

export default function globalRegister(app: App): void {
  // 注册全局图标
  app.use(IconMenusApp)
  app.use(registerProperties)
}
