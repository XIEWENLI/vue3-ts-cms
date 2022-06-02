import { IForm } from '@/base-ui/form/types'

export const searchFormConfig: IForm = {
  labelWidth: '100px',
  responsiveLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  forms: [
    {
      field: 'id',
      type: 'input',
      label: 'ID',
      placeholder: '请输入ID'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '运动',
      options: [
        {
          id: '41',
          val: '篮球'
        },
        {
          id: '42',
          val: '足球'
        },
        {
          id: '43',
          val: '羽毛球'
        }
      ]
    },
    {
      field: 'createDate',
      type: 'daterange',
      label: '创建日期',
      otherOptions: {
        'start-placeholder': 'Start date',
        'end-placeholder': 'End date'
      }
    }
  ]
}
