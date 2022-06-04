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
          <el-button type="primary" @click="handleSearchClick">搜索</el-button>
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
  emits: ['resetClick', 'searchClick'],
  setup(props, { emit }) {
    // 动态获取field的值
    const forms = props.searchFormConfig?.forms ?? []
    const formsField: any = {}
    for (const item of forms) {
      formsField[item.field] = ''
    }

    // 组件的v-model使用reactive使用有问题
    // 根据不同页面获取高级检索的搜索条件
    const formData = ref(formsField)

    /* 个人理解：
    不能直接formData.value={}，
    只能改属性，
    因为form.vue的setup只执行一遍,
    而form.vue的props.modelValue是响应式的，
    对于第一次赋值的{ ...props.modelValue}对象有响应式的依赖 */
    const handleResetOnclick = () => {
      for (const key in formsField) {
        formData.value[key] = ''
      }
      emit('resetClick')
    }

    // 搜索条件请求
    const handleSearchClick = () => {
      emit('searchClick', formData.value)
    }

    return {
      formData,
      handleResetOnclick,
      handleSearchClick
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
