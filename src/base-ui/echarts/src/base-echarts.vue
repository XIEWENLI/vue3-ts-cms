<template>
  <div class="base-echarts">
    <div ref="divRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, withDefaults, defineProps } from 'vue'

import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const divRef = ref<HTMLElement>()

// ts
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

onMounted(() => {
  if (divRef.value) {
    const myCharts = echarts.init(divRef.value)

    myCharts.setOption(props.options)
  }
})
</script>

<style lang="less" scoped></style>
