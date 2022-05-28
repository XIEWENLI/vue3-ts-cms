<template>
  <div class="login-panel">
    <h1 class="login-title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="LoginAccountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isChecked" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="loginBtn"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UserFilled, Cellphone } from '@element-plus/icons-vue'

import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    UserFilled,
    Cellphone,
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isChecked = ref(true)

    const currentTab = ref('account')

    /* LoginAccount是一个组件描述Demo{...}（<login-phone />创建了一个组件的实例）,
       InstanceType从类型里面取出 拥有构造函数的实例，例子如下：
          class Person{...}
          const p=ref<Person>()
        等同于下面：
          type Bar（Person本身） = ref<InstanceType<typeof Person>>()
          const p=ref<Bar>()
    */
    const LoginAccountRef = ref<InstanceType<typeof LoginAccount>>()

    const loginBtn = () => {
      if (currentTab.value) {
        LoginAccountRef.value?.loginAction(isChecked.value)
      } else {
        console.log('电话登录！！！')
      }
    }

    return { isChecked, currentTab, LoginAccountRef, loginBtn }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;

  .login-title {
    text-align: center;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;

    el-link {
      margin-top: 13px;
    }
  }

  .login-btn {
    width: 100%;
  }
}
</style>
