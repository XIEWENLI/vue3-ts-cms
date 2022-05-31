<template>
  <div class="xwl-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="form in forms" :key="form.id">
          <el-col v-bind="responsiveLayout" class="form-col">
            <el-form-item :label="form.label">
              <template
                v-if="form.type === 'input' || form.type === 'password'"
              >
                <el-input
                  style="width: 100%"
                  :placeholder="form.placeholder"
                  :show-password="form.type === 'password' ? true : false"
                />
              </template>
              <template v-else-if="form.type === 'select'">
                <el-select style="width: 100%">
                  <el-option
                    v-for="op in form.options"
                    :key="op.id"
                    :label="op.val"
                    :value="op.val"
                  />
                </el-select>
              </template>
              <template v-else-if="form.type === 'daterange'">
                <el-date-picker
                  style="width: 100%"
                  type="daterange"
                  range-separator="-"
                  v-bind="form.otherOptions"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IFormItem } from '../types'

export default defineComponent({
  props: {
    labelWidth: {
      type: String,
      default: '80px'
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
  setup() {
    return {}
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
