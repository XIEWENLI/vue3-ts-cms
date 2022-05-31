<template>
  <div class="nav-header">
    <i class="fold-menu" @click="handleFoldClick">
      <el-icon v-if="!isFold"><Fold /></el-icon>
      <el-icon v-else><Expand /></el-icon>
    </i>

    <div class="content">
      <el-breadcrumb separator="/">
        <template v-for="item in breadcrumbs" :key="item.name">
          <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import UserInfo from './user-info.vue'
import { pathMapBreadCrumb } from '@/utils/map-menu'
import { useStore } from '@/store'

export default defineComponent({
  emits: ['foldChange'],
  components: {
    UserInfo
  },
  setup(props, { emit }) {
    // 是否隐藏
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.loginModule.userMenus
      const route = useRoute()
      const activePath = route.path
      return pathMapBreadCrumb(userMenus, activePath)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
