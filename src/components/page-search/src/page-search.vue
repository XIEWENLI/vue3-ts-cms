<template>
  <div class="page-search">
    <!-- form表单组件 -->
    <XWLForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="footer">
          <el-button @click="handleResetOnclick">重置</el-button>
          <el-button type="primary">搜索</el-button>
        </div>
      </template>
    </XWLForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import XWLForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: { XWLForm },
  setup(props) {
    const forms = props.searchFormConfig?.forms ?? []
    const formsField: any = {}
    for (const item of forms) {
      formsField[item.field] = ''
    }

    // 组件的v-model使用reactive使用有问题
    // 根据不同页面获取高级检索的搜索条件
    const formData = ref(formsField)

    const handleResetOnclick = () => {
      for (const key in formsField) {
        formData.value[key] = ''
      }
    }

    return {
      formData,
      handleResetOnclick
    }
  }
})
</script>

<style scoped lang="less">
.page-search {
  .footer {
    text-align: right;
    padding: 0 30px 0px 0;
  }
}
</style>
