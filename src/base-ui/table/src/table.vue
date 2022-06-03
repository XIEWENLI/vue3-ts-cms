<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="tableData"
      :border="true"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="50px"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        label="序号"
        type="index"
        align="center"
        width="60px"
      ></el-table-column>
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
    <div class="footer">
      <slot name="footer">
        <div class="footerPagination">
          <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[100, 200, 300, 400]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    tableData: {
      type: Object,
      required: true
    },
    propList: {
      type: Object,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const handleSelectionChange = (val: any) => {
      emit('handleSelectData', val)
    }

    // 分页
    const currentPage = ref(4)
    const pageSize = ref(100)
    const small = ref(false)
    const disabled = ref(false)
    const background = ref(false)
    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }

    return {
      currentPage,
      pageSize,
      small,
      disabled,
      background,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  // 设置分页布局靠右显示
  // 1、先定义主轴右->左，使分页（el-pagination）靠右边
  .footerPagination {
    display: flex;
    flex-direction: row-reverse;
    // 2、然后定义主轴左->右，使分页（el-pagination）的子元素不继承父元素的display设置，正常显示
    .el-pagination {
      text-align: right;
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
