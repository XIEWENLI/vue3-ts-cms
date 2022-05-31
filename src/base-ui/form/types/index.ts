type IFormInputType = 'input' | 'password' | 'select' | 'daterange'

interface IResponsiveLayout {
  xl: number
  lg: number
  md: number
  sm: number
  xs: number
}

export interface IFormItem {
  id: number
  type: IFormInputType
  label: string
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
}

export interface IForm {
  labelWidth: string
  responsiveLayout: IResponsiveLayout
  forms: IFormItem[]
}
