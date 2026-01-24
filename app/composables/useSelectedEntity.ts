import { ref } from 'vue'

const selectedCompanyId = ref<number | null>(null)
const selectedManagerId = ref<number | null>(null)

export const useSelectedEntity = () => {
  const setSelectedCompanyId = (id: number | null) => {
    selectedCompanyId.value = id
  }

  const setSelectedManagerId = (id: number | null) => {
    selectedManagerId.value = id
  }

  return {
    selectedCompanyId,
    selectedManagerId,
    setSelectedCompanyId,
    setSelectedManagerId
  }
}
