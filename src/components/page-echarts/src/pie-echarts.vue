<template>
  <div class="pie-echarts">
    <base-echarts :options="option"></base-echarts>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import BaseEcharts from '@/base-ui/echarts'

import type { EChartsOption } from 'echarts'
import type { IDataType } from '../type'

const props = defineProps<{
  pieData: IDataType[]
}>()

const option = computed((): EChartsOption => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
