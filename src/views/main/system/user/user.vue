<template>
  <div class="user">
    <!-- 高级搜索组件 -->
    <page-search :searchFormConfig="searchFormConfig" />
    <!-- table组件 -->
    <div class="content">
      <XWLTable :propList="propList" :tableData="userList">
        <template #status="scope">
          <el-button>{{ scope.row ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="scope">
          {{ scope.row.createAt }}
        </template>
        <template #updateAt="scope">
          {{ scope.row.updateAt }}
        </template>
      </XWLTable>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
// form表单配置文件
import { searchFormConfig } from './config/search.config'

import PageSearch from '@/components/page-search'
import XWLTable from '@/base-ui/table'
// table表单的配置文件
import { propList } from './config/table.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    XWLTable
  },
  setup() {
    const store = useStore()

    // 获取table列表数据
    store.dispatch('systemModule/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.systemModule.userList)
    // const userCount = computed(() => store.state.systemModule.userCount)

    return {
      searchFormConfig,
      userList,
      propList
    }
  }
})
</script>

<style scoped lang="less">
.user {
  background: #fff;

  .content {
    border-top: #f0f2f5 30px solid;
    padding: 10px 20px;
  }
}
</style>
