<template>
  <div class="user">
    <XWLForm v-bind="searchFormConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import XWLForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    XWLForm
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped>
.user {
  background: #fff;
}
</style>
