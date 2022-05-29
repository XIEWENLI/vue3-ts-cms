<template>
  <div class="nav-header">
    <i class="fold-menu" @click="handleFoldClick">
      <el-icon v-if="!isFold"><Fold /></el-icon>
      <el-icon v-else><Expand /></el-icon>
    </i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Fold, Expand } from '@element-plus/icons-vue'

export default defineComponent({
  emits: ['foldChange'],
  components: {
    Fold,
    Expand
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
