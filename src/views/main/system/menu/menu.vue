<template>
  <div class="menu">
    <!-- table组件 -->
    <page-content
      :propList="propList"
      pageName="menu"
      :childrenProps="childrenProps"
      :showFooter="showFooter"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'

// table表单的配置文件
import { propList } from './config/table.config'

export default defineComponent({
  name: 'xwl-menu',
  components: {
    PageContent
  },
  setup() {
    const childrenProps = {
      // 数据本身就有children属性，所以不需要tree-props。（table树形数据有两种方式）
      rowKey: 'id'
    }

    // 是否显示footer
    const showFooter = false

    return {
      propList,
      childrenProps,
      showFooter
    }
  }
})
</script>

<style scoped lang="less">
.menu {
  background: #fff;
}
</style>
