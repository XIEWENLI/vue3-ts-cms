import { IForm } from '@/base-ui/form/types'

export const searchModalFormConfig: IForm = {
  labelWidth: '80px',
  st: 'padding-top:0px',
  responsiveLayout: {},
  forms: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ]
}
