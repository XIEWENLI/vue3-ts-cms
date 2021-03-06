<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <component
                class="icon"
                v-if="item.icon"
                :is="item.icon"
              ></component>
              <span class="span-left">{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="jumpRouter(subitem)"
              >
                <component
                  class="icon"
                  v-if="subitem.icon"
                  :is="subitem.icon"
                ></component>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <component
              class="icon"
              v-if="item.icon"
              :is="item.icon"
            ></component>
            <span class="span-left">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { pathToMenu } from '@/utils/map-menu'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    // 从userMenus取出icon名（格式：el-xxx）,转成Xxx变成组件名
    const userMenus = computed(() => store.state.loginModule.userMenus)
    for (const menu of userMenus.value) {
      let icon = menu.icon.split('-').slice(2)
      let i = ''
      if (icon.length > 1) {
        for (const item of icon) {
          i += item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase()
        }
        menu.icon = i
      } else {
        menu.icon = icon.join('')
      }
    }

    // 路由页面跳转
    const jumpRouter = (subitem: any) => {
      router.push({ path: subitem.url ?? '/not-found' })
    }

    // 刷新当前路由不变
    const activePath = route.path
    const menu = pathToMenu(userMenus.value, activePath)

    //选中的menu选项
    const defaultActive = ref(menu.id + '')

    return {
      userMenus,
      defaultActive,
      jumpRouter
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  /* 目录 */
  .el-sub-menu {
    background-color: #001529 !important;
    /* 二级菜单 ( 默认背景 ) */
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  /* hover 高亮 */
  .el-menu-item:hover {
    color: #fff !important; /* 菜单 */
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}

.icon {
  height: 18px;
  width: 18px;
  position: fixed;
}

.span-left {
  margin-left: 20px;
}
</style>
