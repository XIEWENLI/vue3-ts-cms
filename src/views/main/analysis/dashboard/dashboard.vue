<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <x-w-l-card title="分类商品数量(饼图)"></x-w-l-card>
      </el-col>
      <el-col :span="10">
        <x-w-l-card title="不同城市商品销量"></x-w-l-card>
      </el-col>
      <el-col :span="7">
        <x-w-l-card title="分类商品数量(玫瑰图)"></x-w-l-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <x-w-l-card title="分类商品的销量">
          <base-echarts :options="options"></base-echarts>
        </x-w-l-card>
      </el-col>
      <el-col :span="12">
        <x-w-l-card title="分类商品的收藏"></x-w-l-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

import XWLCard from '@/base-ui/card'
import BaseEcharts from '@/base-ui/echarts'
import type { EChartsOption } from 'echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    XWLCard,
    BaseEcharts
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getDashboardDataAction')

    // 指定图表的配置项和数据
    const options: EChartsOption = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }

    return { options }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
