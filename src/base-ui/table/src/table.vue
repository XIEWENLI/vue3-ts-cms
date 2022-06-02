<template>
  <div class="table">
    <el-table :data="tableData" :border="true" style="width: 100%">
      <template v-for="item in propList" :key="item.prop">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth + ''"
          align="center"
        >
          <!-- <template #default="scope">是table内部组件的插槽 -->
          <template #default="scope">
            <!-- 这个slot是为user.vue组件预留的插槽 -->
            <slot :name="item.slotName" :row="scope.row">{{
              scope.row[item.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tableData: {
      type: Object,
      required: true
    },
    propList: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
