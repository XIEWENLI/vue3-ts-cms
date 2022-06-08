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
      :searchModalFormConfig="searchModalFormConfigRef"
      :defaultInfo="defaultInfo"
      pageName="user"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

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

import { useStore } from '@/store'

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
    const newCallback = () => {
      const passwordItem = searchModalFormConfig.forms.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) passwordItem.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = searchModalFormConfig.forms.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) passwordItem.isHidden = true
    }

    // 动态添加部门和角色列表
    const store = useStore()
    const searchModalFormConfigRef = computed(() => {
      // 部门
      const departmentItem = searchModalFormConfig.forms.find(
        (item) => item.field === 'departmentId'
      )
      if (departmentItem) {
        departmentItem.options = store.state.entireDepartment.map((item) => {
          return { title: item.name, value: item.id, label: item.name }
        })
      }

      // 角色
      const roleItem = searchModalFormConfig.forms.find(
        (item) => item.field === 'roleId'
      )
      if (roleItem) {
        roleItem.options = store.state.entireRole.map((item) => {
          return { title: item.name, value: item.id, label: item.name }
        })
      }

      return searchModalFormConfig
    })

    const { pageModalRef, modalCreateClick, modalEditClick, defaultInfo } =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      propList,
      pageContentRef,
      pageModalRef,
      defaultInfo,
      searchModalFormConfigRef,
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
