import { ref } from 'vue'
import PageModal from '@/components/page-modal'

export function usePageModal() {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref<any>({})

  // table上的新建和编辑按钮
  const modalCreateClick = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) pageModalRef.value.centerDialogVisible = true
  }
  const modalEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) pageModalRef.value.centerDialogVisible = true
  }
  return { pageModalRef, modalCreateClick, modalEditClick, defaultInfo }
}
