<template>
  <div class="page-modal">
    <!-- modal组件 -->
    <el-dialog
      v-model="centerDialogVisible"
      title="创建用户"
      width="30%"
      destroy-on-close
      center
    >
      <XWLForm v-bind="searchModalFormConfig" v-model="formData"></XWLForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDialogClickCancel">取消</el-button>
          <el-button type="primary" @click="handleDialogClickConfirm"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import XWLForm from '@/base-ui/form'

import { useStore } from '@/store'

export default defineComponent({
  name: 'page-modal',
  components: {
    XWLForm
  },
  props: {
    searchModalFormConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const centerDialogVisible = ref(false)
    const formData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.searchModalFormConfig.forms) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // Dialog 对话框上的取消按钮
    const handleDialogClickCancel = () => {
      centerDialogVisible.value = false
    }
    // Dialog 对话框上的确认按钮
    const store = useStore()
    const handleDialogClickConfirm = () => {
      centerDialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        console.log('编辑用户')
        store.dispatch('systemModule/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        console.log('新建用户')
        store.dispatch('systemModule/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      formData,
      centerDialogVisible,
      handleDialogClickCancel,
      handleDialogClickConfirm
    }
  }
})
</script>

<style scoped lang="less">
.page-modal {
  background: #fff;
}
</style>
