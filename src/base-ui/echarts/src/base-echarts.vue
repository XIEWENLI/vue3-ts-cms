<template>
  <div class="base-echarts">
    <div ref="divRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, withDefaults, defineProps, watchEffect } from 'vue'

import type { EChartsOption } from 'echarts'

import useEchart from '../hooks/useEcharts'

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
    const { setOptions } = useEchart(divRef.value)

    watchEffect(() => {
      setOptions(props.options)
    })
  }
})
</script>

<style lang="less" scoped></style>
