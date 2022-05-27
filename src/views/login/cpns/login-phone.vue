<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="loginPhone">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="loginPhone.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="codeDiv">
          <el-input v-model="loginPhone.code" />
          <el-button class="codeBtn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const loginPhone = reactive({
      phone: '',
      code: ''
    })

    const rules = {
      phone: [
        { required: true, message: '电话号码不能为空~', trigger: 'blur' },
        {
          pattern: /^1[0-9]{10}$/,
          message: '数字1开头，长度11位的电话号码~',
          trigger: 'blur'
        }
      ],
      code: [
        { required: true, message: '验证码不能为空~', trigger: 'blur' },
        {
          pattern: /^[0-9]{4}$/,
          message: '输入4位验证码~',
          trigger: 'blur'
        }
      ]
    }

    return {
      loginPhone,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.codeDiv {
  display: flex;
}

.codeBtn {
  display: block;
  margin-left: 8px;
}
</style>
