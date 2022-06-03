<template>
  <div class="user">
    <!-- 高级检索组件 -->
    <page-search :searchFormConfig="searchFormConfig" />
    <!-- table组件 -->
    <page-content :propList="propList" pageName="user"></page-content>
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

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      searchFormConfig,
      propList
    }
  }
})
</script>

<style scoped lang="less">
.user {
  background: #fff;
}
</style>
