import { App } from 'vue'
import { Monitor, Setting, Goods, ChatLineRound } from '@element-plus/icons-vue'

const components = [Monitor, Setting, Goods, ChatLineRound]

export function IconMenusApp(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
