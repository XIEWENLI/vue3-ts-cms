<template>
  <div class="page-content">
    <XWLTable
      :title="title"
      :propList="propList"
      :tableData="pageListData"
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
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'

import XWLTable from '@/base-ui/table'

export default defineComponent({
  props: {
    pageName: {
      type: String,
      required: true
    },
    propList: {
      type: Array,
      required: true
    }
  },
  components: {
    XWLTable
  },
  setup(props) {
    const store = useStore()

    // 获取table列表数据,保存到vuex
    store.dispatch('systemModule/getPageListAction', {
      pageName: `${props.pageName}`,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const pageListData = computed(() =>
      store.getters['systemModule/pageListData'](props.pageName)
    )
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
      pageListData,
      title,
      showIndexColumn,
      showSelectColumn,
      selectData,
      handleSelectData
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  border-top: #f0f2f5 30px solid;
  padding: 10px 20px;
}
</style>
