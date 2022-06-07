import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = () => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref<any>({})

  // table上的新建和编辑按钮
  const modalCreateClick = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) pageModalRef.value.centerDialogVisible = true
    newCb && newCb()
  }
  const modalEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) pageModalRef.value.centerDialogVisible = true
    editCb && editCb()
  }
  return { pageModalRef, modalCreateClick, modalEditClick, defaultInfo }
}
