<template>
  <div class="goods">
    <!-- 高级检索组件 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetClick="handleResetOnclick"
      @searchClick="handleSearchClick"
    />
    <!-- table组件 -->
    <page-content :propList="propList" pageName="goods" ref="pageContentRef">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          :initial-index="0"
          fit="cover"
          :preview-teleported="true"
        />
      </template>
      <template #oldPrice="scope">{{ '¥' + scope.row.oldPrice }}</template>
      <template #newPrice="scope">{{ '¥' + scope.row.newPrice }}</template>
    </page-content>
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
import { usePageSearch } from '@/hooks/goods-page-search'

export default defineComponent({
  name: 'goods',
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
.goods {
  background: #fff;
}
</style>
