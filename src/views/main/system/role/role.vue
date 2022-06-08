<template>
  <div class="role">
    <!-- 高级检索组件 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetClick="handleResetOnclick"
      @searchClick="handleSearchClick"
    />
    <!-- table组件 -->
    <page-content
      :propList="propList"
      pageName="role"
      ref="pageContentRef"
      @modalCreateClick="modalCreateClick"
      @modalEditClick="modalEditClick"
    >
    </page-content>

    <!-- modal组件 -->
    <page-modal
      ref="pageModalRef"
      :otherInfo="otherInfo"
      :searchModalFormConfig="searchModalFormConfig"
      :defaultInfo="defaultInfo"
      pageName="role"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        node-key="id"
        :props="{
          children: 'children',
          label: 'name'
        }"
        show-checkbox
        @check="handleCheckChange"
      />
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

// form表单配置文件-content
import { searchFormConfig } from './config/search.config'
// table表单的配置文件
import { propList } from './config/table.config'
// form表单配置文件-modal
import { searchModalFormConfig } from './config/modal.config'

// hook
import { usePageSearch } from '@/hooks/user-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStore } from '@/store'
import { ElTree } from 'element-plus'
import { menuMapLeafKeys } from '@/utils/map-menu'

export default defineComponent({
  name: 'role',
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

    // 编辑权限时回显
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const { pageModalRef, modalCreateClick, modalEditClick, defaultInfo } =
      usePageModal(undefined, editCallback)

    // 权限menus
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    // 权限选中数据
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      propList,
      pageContentRef,
      pageModalRef,
      defaultInfo,
      searchModalFormConfig,
      menus,
      otherInfo,
      elTreeRef,
      handleResetOnclick,
      handleSearchClick,
      modalCreateClick,
      modalEditClick,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.role {
  background: #fff;
}
</style>
