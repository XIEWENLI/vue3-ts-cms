<template>
  <div class="page-content">
    <XWLTable
      v-model:page="pageInfo"
      :title="title"
      :propList="propList"
      :tableData="pageListData"
      :pageListCount="pageListCount"
      :showIndexColumn="showIndexColumn"
      :showSelectColumn="showSelectColumn"
      @handleSelectData="handleSelectData"
      :childrenProps="childrenProps"
      :showFooter="showFooter"
    >
      <!-- header插槽 -->
      <template #headerHandler>
        <el-button type="primary" v-if="isCreate" @click="handlerCreateClick"
          >创建用户</el-button
        >
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
      <template #handler="scope">
        <div>
          <el-button
            size="small"
            link
            type="primary"
            v-if="isUpdate"
            @click="handlerEditClick(scope.row)"
            ><el-icon><EditPen /></el-icon>编辑</el-button
          >
          <el-button
            size="small"
            link
            type="danger"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            ><el-icon><Delete /></el-icon>删除</el-button
          >
        </div>
      </template>

      <!-- 其它插槽,根据每个组件而定 -->
      <template
        v-for="item in otherSlots"
        :key="item.slotName"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </XWLTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useStore } from '@/store'

import XWLTable from '@/base-ui/table'

import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  props: {
    pageName: {
      type: String,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  components: {
    XWLTable
  },
  emits: ['modalEditClick', 'modalCreateClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 使用vuex，获取table列表数据,
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('systemModule/getPageListAction', {
        pageName: `${props.pageName}`,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 列表数据
    const pageListData = computed(() =>
      store.getters['systemModule/pageListData'](props.pageName)
    )

    // 总条数
    const pageListCount = computed(() =>
      store.getters['systemModule/pageListCount'](props.pageName)
    )

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

    // 获取其它插槽
    const otherSlots = (props.propList as any).filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })

    // 删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('systemModule/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    const handlerEditClick = (item: any) => {
      emit('modalEditClick', item)
    }

    const handlerCreateClick = () => {
      emit('modalCreateClick')
    }

    return {
      pageListData,
      pageListCount,
      title,
      showIndexColumn,
      showSelectColumn,
      selectData,
      pageInfo,
      otherSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleSelectData,
      getPageData,
      handleDeleteClick,
      handlerCreateClick,
      handlerEditClick
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
