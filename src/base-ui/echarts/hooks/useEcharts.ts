import * as echarts from 'echarts'

import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const myEcharts = echarts.init(el)

  const setOptions = (option: echarts.EChartsOption) => {
    myEcharts.setOption(option)
  }

  const updateSize = () => {
    myEcharts.resize()
  }

  window.addEventListener('resize', () => {
    myEcharts.resize()
  })

  return {
    myEcharts,
    setOptions,
    updateSize
  }
}
