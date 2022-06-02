import { App } from 'vue'

import { utcFormat } from '@/utils/date-format'

export default function registerProperties(app: App): void {
  app.config.globalProperties.$filters = {
    formatTime(val: string) {
      return utcFormat(val)
    }
  }
}
