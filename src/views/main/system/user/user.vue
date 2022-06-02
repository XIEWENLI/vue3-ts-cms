<template>
  <div class="user">
    <!-- 高级搜索组件 -->
    <page-search :searchFormConfig="searchFormConfig" />
    <!-- table组件 -->
    <div class="content">
      <XWLTable
        :title="title"
        :propList="propList"
        :tableData="userList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
        @handleSelectData="handleSelectData"
      >
        <!-- header插槽 -->
        <template #headerHandler>
          <el-button type="primary">创建用户</el-button>
        </template>
        <!-- table列插槽 -->
        <template #status="scope">
          <el-button
            plain
            size="small"
            :type="scope.row.enable ? 'success' : 'danger'"
          >
            {{ scope.row ? '启用' : '禁用' }}
          </el-button>
        </template>
        <template #createAt="scope">
          {{ $filters.formatTime(scope.row.createAt) }}
        </template>
        <template #updateAt="scope">
          {{ $filters.formatTime(scope.row.updateAt) }}
        </template>
        <template #handle>
          <div>
            <el-button size="small" link type="primary"
              ><el-icon><EditPen /></el-icon>编辑</el-button
            >
            <el-button size="small" link type="danger"
              ><el-icon><Delete /></el-icon>删除</el-button
            >
          </div>
        </template>
      </XWLTable>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
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

    const title = ref('用户列表')

    // 是否显示序号(默认为false，不显示)
    const showIndexColumn = true

    // 多选框列(默认为false，不显示)
    const showSelectColumn = true
    // emit获取table多选框选中的数据
    let selectData = ref(null)
    const handleSelectData = (val: any) => {
      selectData = val
    }

    return {
      searchFormConfig,
      userList,
      title,
      propList,
      showIndexColumn,
      showSelectColumn,
      selectData,
      handleSelectData
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
