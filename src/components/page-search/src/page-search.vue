<template>
  <div class="page-search">
    <!-- form表单组件 -->
    <XWLForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="footer">
          <el-button>重置</el-button>
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
  setup() {
    // 组件的v-model使用reactive使用有问题
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createDate: ''
    })
    return {
      formData
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
