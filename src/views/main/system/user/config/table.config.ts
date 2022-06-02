// table每列属性的数据
export const propList = [
  { prop: 'name', label: '用户名', minWidth: '100' },
  { prop: 'realname', label: '真实姓名', minWidth: '100' },
  { prop: 'cellphone', label: '手机号码', minWidth: '120' },
  { prop: 'enable', label: '状态', minWidth: '80', slotName: 'status' },
  {
    prop: 'createAt',
    label: '创建事件',
    minWidth: '200',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新事件',
    minWidth: '200',
    slotName: 'updateAt'
  },
  {
    label: '操作',
    minWidth: '100',
    slotName: 'handle'
  }
]
