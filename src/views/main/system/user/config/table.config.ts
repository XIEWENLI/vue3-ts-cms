export const propList = [
  { prop: 'name', label: '用户名', minWidth: '100' },
  { prop: 'realname', label: '真实姓名', minWidth: '100' },
  { prop: 'cellphone', label: '手机号码', minWidth: '100' },
  { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
  {
    prop: 'createAt',
    label: '创建事件',
    minWidth: '250',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新事件',
    minWidth: '250',
    slotName: 'updateAt'
  }
]