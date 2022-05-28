<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="rules"
      :model="userAccount"
      ref="formRef"
    >
      <el-form-item label="账户" prop="name">
        <el-input v-model="userAccount.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userAccount.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'

import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    // 用户账户密码数据
    const userAccount = reactive({
      name: '',
      password: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()
    // 判断form表单是否输入正确规则的方法
    const loginAction = (isChecked: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1、是否记住密码，保存在localStorage中
          if (isChecked) {
            localCache.setCache('name', userAccount.name)
            localCache.setCache('password', userAccount.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }

          // 2、开始进行登录验证
          store.dispatch('loginModule/accountLoginAction', { ...userAccount })
        }
      })
    }

    return {
      userAccount,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
