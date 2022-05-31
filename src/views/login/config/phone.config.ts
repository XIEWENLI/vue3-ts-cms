export const phoneRules = {
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
