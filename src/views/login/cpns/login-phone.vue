<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="phoneRules" :model="loginPhone">
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
import { phoneRules } from '../config/phone.config'

export default defineComponent({
  setup() {
    const loginPhone = reactive({
      phone: '',
      code: ''
    })

    return {
      loginPhone,
      phoneRules
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
