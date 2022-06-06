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
      @modalCreateClick="modalCreateClick"
      @modalEditClick="modalEditClick"
    ></page-content>

    <!-- modal组件 -->
    <page-modal
      ref="pageModalRef"
      :searchModalFormConfig="searchModalFormConfig"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

// form表单配置文件-content
import { searchFormConfig } from './config/search.config'
// table配置文件
import { propList } from './config/table.config'
// form表单配置文件-modal
import { searchModalFormConfig } from './config/modal.config'

// hook
import { usePageSearch } from '@/hooks/user-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 重置和搜索事件
    const { pageContentRef, handleResetOnclick, handleSearchClick } =
      usePageSearch()

    // modal
    const { pageModalRef, modalCreateClick, modalEditClick, defaultInfo } =
      usePageModal()

    return {
      searchFormConfig,
      searchModalFormConfig,
      propList,
      pageContentRef,
      pageModalRef,
      defaultInfo,
      handleResetOnclick,
      handleSearchClick,
      modalCreateClick,
      modalEditClick
    }
  }
})
</script>

<style scoped lang="less">
.user {
  background: #fff;
}
</style>
