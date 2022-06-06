<template>
  <div class="xwl-form">
    <slot name="header"></slot>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="form in forms" :key="form.label">
          <el-col v-bind="responsiveLayout" class="form-col" :style="st">
            <el-form-item :label="form.label">
              <template
                v-if="form.type === 'input' || form.type === 'password'"
              >
                <el-input
                  style="width: 100%"
                  :placeholder="form.placeholder"
                  :show-password="form.type === 'password' ? true : false"
                  v-model="formData[`${form.field}`]"
                />
              </template>
              <template v-else-if="form.type === 'select'">
                <el-select
                  style="width: 100%"
                  v-model="formData[`${form.field}`]"
                >
                  <el-option
                    v-for="op in form.options"
                    :key="op.title"
                    :label="op.value"
                    :value="op.value"
                  />
                </el-select>
              </template>
              <template v-else-if="form.type === 'daterange'">
                <el-date-picker
                  style="width: 100%"
                  type="daterange"
                  range-separator="-"
                  v-bind="form.otherOptions"
                  v-model="formData[`${form.field}`]"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    st: {
      type: String
    },
    responsiveLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    forms: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 组件的v-model使用reactive使用有问题
    const formData = ref({ ...props.modelValue })

    watch(
      formData,
      (newVal) => {
        emit('update:modelValue', newVal)
      },
      { deep: true }
    )

    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.xwl-form {
  padding: 20px 30px 20px 0px;

  .form-col {
    padding-top: 20px;
  }
}
</style>
