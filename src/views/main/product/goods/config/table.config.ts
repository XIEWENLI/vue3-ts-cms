// table每列属性的数据
export const propList = [
  { prop: 'name', label: '商品名称', minWidth: '100' },
  { prop: 'oldPrice', label: '原价格', minWidth: '100', slotName: 'oldPrice' },
  { prop: 'newPrice', label: '现价格', minWidth: '100', slotName: 'newPrice' },
  { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
  { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
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
