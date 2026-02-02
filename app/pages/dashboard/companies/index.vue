<template>
  <div class="bg-gray-50 dark:bg-[#0f1419] min-h-screen">
    <!-- Header con Título -->
    <div class="bg-white dark:bg-[#1a2c32]  dark:border-[#2a3c42]">
      <div class="pb-4">
        <div class="flex items-center gap-4">
          <button @click="$router.back()" class="p-2 hover:bg-gray-100 dark:hover:bg-[#2a3c42] rounded-lg transition">
            <Icon name="heroicons:arrow-left" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Lista de compañias</h1>
          </div>
        </div>
      </div>
    </div>


    <!-- Contenido Principal -->
    <div>
      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-24">
        <span class="w-10 h-10 border-4 border-gray-300 border-t-[#030213] rounded-full animate-spin mb-4"></span>
        <span class="text-gray-700 dark:text-gray-200 text-base font-medium">Cargando compañías...</span>
      </div>
      <!-- Error State -->
      <div v-else-if="hasError" class="flex flex-col items-center justify-center py-24">
        <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-500 mb-3" />
        <span class="text-red-600 dark:text-red-400 text-base font-semibold mb-2">Ocurrió un error al cargar compañías</span>
        <button @click="retryLoad" class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition">Reintentar</button>
      </div>
      <!-- Table State -->
      <AppTable
        v-else
        :headers="headers"
        :items="companies"
        addButtonLabel="Agregar Compañía"
        tableType="companies"
        @add="openCreateModal"
        @edit="selectedCompany = $event; showModal = true"
        @delete="handleDeleteCompany"
        @configure="handleConfigure"
      />
    </div>

    <!-- Modal para Editar Compañía -->
    <Modal :is-open="showModal" title="Editar Compañía" @close="showModal = false">
      <div v-if="selectedCompany" class="space-y-4">
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-900 dark:text-white">Nombre de la Compañía</label>
          <input v-model="selectedCompany.name" type="text" placeholder="Ej: TechCorp Solutions" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
        </div>
        <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Email</label>
        <input v-model="selectedCompany.email" type="email" placeholder="ej@empresa.com" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Teléfono</label>
        <input v-model="selectedCompany.phone" type="tel" placeholder="+1 (555) 123-4567" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Dirección</label>
        <input v-model="selectedCompany.address" type="text" placeholder="123 Business Ave, Suite 100" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="flex gap-2 justify-end pt-4">
        <button @click="showModal = false" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-[#3a4c52] transition">Cancelar</button>
        <button @click="handleSaveCompany" :disabled="isSaving" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-gray-700 text-white rounded-lg hover:bg-[#0a0420] transition">
          <span v-if="isSaving" class="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
          Guardar
        </button>
      </div>
    </div>
  </Modal>

  <!-- Modal para Crear Compañía -->
  <Modal :is-open="showCreateModal" title="Agregar Nueva Compañía" @close="showCreateModal = false">
    <div class="space-y-4">
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Nombre de la Compañía</label>
        <input v-model="newCompany.name" type="text" placeholder="Ej: TechCorp Solutions" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" :disabled="isCreating" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Email</label>
        <input v-model="newCompany.email" type="email" placeholder="ej@empresa.com" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" :disabled="isCreating" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Teléfono</label>
        <input v-model="newCompany.phone" type="tel" placeholder="+1 (555) 123-4567" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" :disabled="isCreating" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Dirección</label>
        <input v-model="newCompany.address" type="text" placeholder="123 Business Ave, Suite 100" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" :disabled="isCreating" />
      </div>
      <div class="flex gap-2 justify-end pt-4">
        <button @click="showCreateModal = false" :disabled="isCreating" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-[#3a4c52] transition">Cancelar</button>
        <button @click="handleCreateCompany" :disabled="isCreating" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-gray-700 text-white rounded-lg hover:bg-[#0a0420] transition">
          <span v-if="isCreating" class="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
          Crear Compañía
        </button>
      </div>
    </div>
  </Modal>

  <!-- Notificación -->
  <div v-if="notification" :class="['fixed z-50 top-6 right-6 px-4 py-2 rounded shadow-lg transition', notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white']">
    {{ notification.message }}
  </div>

  <!-- Modal de Confirmación de Eliminación -->
  <Modal :is-open="showDeleteModal" title="Confirmar eliminación" @close="cancelDeleteCompany">
    <div class="space-y-4">
      <p class="text-base text-gray-800 dark:text-white">¿Estás seguro de que deseas eliminar la compañía <span class="font-semibold">{{ companyToDelete?.name }}</span>? Esta acción no se puede deshacer.</p>
      <div class="flex gap-2 justify-end pt-2">
        <button @click="cancelDeleteCompany" class="px-4 h-9 text-sm font-medium bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-[#3a4c52] transition">Cancelar</button>
        <button @click="confirmDeleteCompany" class="px-4 h-9 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Eliminar</button>
      </div>
    </div>
  </Modal>
</div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppTable from '~/components/AppTable.vue'
import Modal from '~/components/Modal.vue'
import { useCompanies } from '~/composables/useCompanies'
import { useSelectedEntity } from '~/composables/useSelectedEntity'

definePageMeta({
  layout: 'admin'
})

const router = useRouter()
const { companies, deleteCompany, addCompany, updateCompany, reloadCompanies } = useCompanies()

const isLoading = ref(true)
const hasError = ref(false)

const loadCompanies = async () => {
  isLoading.value = true
  hasError.value = false
  try {
    await reloadCompanies()
    // Si reloadCompanies lanza error, capturamos abajo
  } catch (e) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

const retryLoad = () => {
  loadCompanies()
}

onMounted(async () => {
  await loadCompanies()
})
const { setSelectedCompanyId } = useSelectedEntity()

const showModal = ref(false)
const showCreateModal = ref(false)
const showDeleteModal = ref(false)
const selectedCompany = ref(null as any)
const companyToDelete = ref<any>(null)
const newCompany = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

// Headers de la tabla
const headers = [
  { label: 'Nombre', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Teléfono', key: 'phone' },
  { label: 'Dirección', key: 'address' },
  { label: 'Fecha de Creación', key: 'createdAt' },
  { label: 'Acciones', key: 'actions', center: true }
]

const handleDeleteCompany = (company: any) => {
  companyToDelete.value = company
  showDeleteModal.value = true
}

const confirmDeleteCompany = async () => {
  if (!companyToDelete.value) return
  const result = await deleteCompany(Number(companyToDelete.value.id))
  if (result.success) {
    notification.value = { type: 'success', message: 'Compañía eliminada exitosamente' }
  } else {
    notification.value = { type: 'error', message: result.error || 'Error al eliminar compañía' }
  }
  setTimeout(() => (notification.value = null), 2500)
  showDeleteModal.value = false
  companyToDelete.value = null
}

const cancelDeleteCompany = () => {
  showDeleteModal.value = false
  companyToDelete.value = null
}

const isSaving = ref(false)
const handleSaveCompany = async () => {
  if (!selectedCompany.value?.id || !selectedCompany.value.name || !selectedCompany.value.email || !selectedCompany.value.phone || !selectedCompany.value.address) {
    notification.value = { type: 'error', message: 'Por favor completa todos los campos' }
    setTimeout(() => (notification.value = null), 2500)
    return
  }
  isSaving.value = true
  const result = await updateCompany(selectedCompany.value.id, {
    name: selectedCompany.value.name,
    email: selectedCompany.value.email,
    phone: selectedCompany.value.phone,
    address: selectedCompany.value.address
  })
  isSaving.value = false
  if (result.success) {
    notification.value = { type: 'success', message: 'Compañía actualizada exitosamente' }
    showModal.value = false
    // Refrescar lista (mock: ya está actualizada, con API real usar reloadCompanies())
  } else {
    notification.value = { type: 'error', message: result.error || 'Error al actualizar compañía' }
  }
  setTimeout(() => (notification.value = null), 2500)
}

const openCreateModal = () => {
  // Resetear formulario
  newCompany.value = {
    name: '',
    email: '',
    phone: '',
    address: ''
  }
  showCreateModal.value = true
}

const isCreating = ref(false)
const notification = ref<{ type: 'success' | 'error'; message: string } | null>(null)

const handleCreateCompany = async () => {
  // Validar que los campos no estén vacíos
  if (!newCompany.value.name || !newCompany.value.email || !newCompany.value.phone || !newCompany.value.address) {
    notification.value = { type: 'error', message: 'Por favor completa todos los campos' }
    setTimeout(() => (notification.value = null), 2500)
    return
  }
  isCreating.value = true
  const result = await addCompany({
    name: newCompany.value.name,
    email: newCompany.value.email,
    phone: newCompany.value.phone,
    address: newCompany.value.address
  })
  isCreating.value = false
  if (result.success) {
    notification.value = { type: 'success', message: 'Compañía creada exitosamente' }
    showCreateModal.value = false
    // Refrescar lista (mock: ya está actualizada, con API real usar reloadCompanies())
  } else {
    notification.value = { type: 'error', message: result.error || 'Error al crear compañía' }
  }
  setTimeout(() => (notification.value = null), 2500)
}

const handleConfigure = (company: any) => {
  setSelectedCompanyId(company.id)
  router.push('/dashboard/companies/configure')
}
</script>

