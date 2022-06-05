// table每列属性的数据
export const propList = [
  { prop: 'name', label: '菜单名称', minWidth: '100' },
  { prop: 'type', label: '类型', minWidth: '60' },
  { prop: 'url', label: '菜单url', minWidth: '120' },
  { prop: 'icon', label: '菜单icon', minWidth: '120' },
  { prop: 'permission', label: '按钮权限', minWidth: '100' },
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
    slotName: 'handler'
  }
]
