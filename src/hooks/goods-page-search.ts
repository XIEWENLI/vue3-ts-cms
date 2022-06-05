import { ref } from 'vue'

import PageContent from '@/components/page-content'

export function usePageSearch() {
  // 获取子组件实例
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  // 重置事件
  const handleResetOnclick = () => {
    pageContentRef.value?.getPageData()
  }
  // 搜索事件
  const handleSearchClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return {
    pageContentRef,
    handleResetOnclick,
    handleSearchClick
  }
}
