<template>
  <router-link to="/main">main</router-link>
  <router-link to="/login">login</router-link>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import xwlRequest from './service'

export default defineComponent({
  name: 'App',
  setup() {
    interface dataType {
      data: any
    }

    xwlRequest
      .get<dataType>({
        url: '/getGoods',
        params: {
          name: 'lkt'
        }
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    return {}
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
