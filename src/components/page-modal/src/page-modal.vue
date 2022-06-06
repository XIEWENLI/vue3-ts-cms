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
    const handleDialogClickConfirm = () => {
      centerDialogVisible.value = false
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
