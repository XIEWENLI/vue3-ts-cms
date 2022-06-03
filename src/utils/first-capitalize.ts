// 首字字母大写
export function firstCapitalize(str: string): string {
  let s = ''
  s = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
  return s
}
