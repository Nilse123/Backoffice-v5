import { ref } from 'vue'

export type ToastType = 'success' | 'error'

const toastMessage = ref('')
const toastType = ref<ToastType>('success')
const toastVisible = ref(false)
const toastDuration = ref(2500)

export function useToast() {
  function showToast(message: string, type: ToastType = 'success', duration = 2500) {
    toastMessage.value = message
    toastType.value = type
    toastDuration.value = duration
    toastVisible.value = true
  }
  function hideToast() {
    toastVisible.value = false
  }
  return {
    toastMessage,
    toastType,
    toastVisible,
    toastDuration,
    showToast,
    hideToast
  }
}
