<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="rules"
      :model="userAccount"
      ref="formRef"
    >
      <el-form-item label="账户" prop="username">
        <el-input v-model="userAccount.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userAccount.password" type="password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'

export default defineComponent({
  setup() {
    const userAccount = reactive({
      username: '',
      password: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    // 判断form表单是否输入正确规则的方法
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('真正执行登录逻辑')
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
