// icon图标注册
import { App } from 'vue'
import {
  UserFilled,
  Cellphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  EditPen,
  Delete
} from '@element-plus/icons-vue'

const components = [
  UserFilled,
  Cellphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Fold,
  Expand,
  EditPen,
  Delete
]

export default function IconMenusApp(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
