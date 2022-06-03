// table每列属性的数据
export const propList = [
  { prop: 'name', label: '角色名', minWidth: '100' },
  { prop: 'intro', label: '权限介绍', minWidth: '100' },
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
