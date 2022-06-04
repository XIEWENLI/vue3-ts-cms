<template>
  <div class="user">
    <!-- 高级检索组件 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetClick="handleResetOnclick"
      @searchClick="handleSearchClick"
    />
    <!-- table组件 -->
    <page-content
      :propList="propList"
      pageName="user"
      ref="pageContentRef"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

// form表单配置文件
import { searchFormConfig } from './config/search.config'
// table表单的配置文件
import { propList } from './config/table.config'

// hook
import { usePageSearch } from '@/hooks/user-page-search'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    // 重置和搜索事件
    const { pageContentRef, handleResetOnclick, handleSearchClick } =
      usePageSearch()

    return {
      searchFormConfig,
      propList,
      pageContentRef,
      handleResetOnclick,
      handleSearchClick
    }
  }
})
</script>

<style scoped lang="less">
.user {
  background: #fff;
}
</style>
