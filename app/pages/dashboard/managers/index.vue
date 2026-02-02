<template>
  <div class="bg-gray-50 dark:bg-[#0f1419]">
    <!-- Header con Título -->
  <!-- Header -->
    <div class="bg-white dark:bg-[#1a2c32] dark:border-[#2a3c42]">
      <div class="pb-4">
        <div class="flex items-center gap-4">
          <button @click="$router.back()" class="p-2 hover:bg-gray-100 dark:hover:bg-[#2a3c42] rounded-lg transition">
            <Icon name="heroicons:arrow-left" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Lista gerente de cuentas</h1>
         
          </div>
        </div>
      </div>
    </div>


    <!-- Contenido Principal -->
    <div>
      <!-- Loading State -->
      <div v-if="isLoading && managers.length === 0" class="flex flex-col items-center justify-center py-24">
        <span class="w-10 h-10 border-4 border-gray-300 border-t-[#030213] rounded-full animate-spin mb-4"></span>
        <span class="text-gray-700 dark:text-gray-200 text-base font-medium">Cargando gerentes...</span>
      </div>
      <!-- Error State -->
      <div v-else-if="hasError && managers.length === 0" class="flex flex-col items-center justify-center py-24">
        <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-500 mb-3" />
        <span class="text-red-600 dark:text-red-400 text-base font-semibold mb-2">Ocurrió un error al cargar gerentes</span>
        <button @click="loadManagers" class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition">Reintentar</button>
      </div>
      <!-- Empty State -->
      <div v-else-if="!isLoading && managers.length === 0" class="flex flex-col items-center justify-center py-24">
        <Icon name="heroicons:inbox" class="w-12 h-12 text-gray-400 mb-3" />
        <span class="text-gray-600 dark:text-gray-400 text-base font-semibold mb-2">No hay gerentes registrados</span>
        <button @click="openCreateModal" class="px-4 py-2 bg-gray-700 dark:bg-gray-700 text-white rounded-lg hover:bg-[#0a0420] dark:hover:bg-gray-600 transition">Crear el primer gerente</button>
      </div>
      <!-- Table State -->
      <AppTable
        v-else
        :headers="headers"
        :items="managers"
        addButtonLabel="Agregar Gerente"
        tableType="managers"
        @add="openCreateModal"
        @edit="selectedManager = $event; showModal = true"
        @delete="handleDeleteManager"
        @configure="handleDetails"
      >
        <!-- Celda personalizada para Compañía (con badge) -->
        <template #cell-company="{ item }">
          <NuxtLink
            :to="`/dashboard/companies/configure?id=${item.company}`"
            class="bg-gray-100 dark:bg-[#2a3c42] text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs inline-block hover:underline cursor-pointer"
          >
            {{ getCompanyName(item.company) }}
          </NuxtLink>
        </template>
      </AppTable>
    </div>

    <!-- Modal para Editar Gerente -->
    <Modal :is-open="showModal" title="Editar Gerente" @close="showModal = false">
      <div v-if="selectedManager" class="space-y-4">
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-900 dark:text-white">Nombre</label>
          <input v-model="selectedManager.name" type="text" placeholder="Ej: Juan Pérez" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-semibold text-gray-900 dark:text-white">Email</label>
          <input v-model="selectedManager.email" type="email" placeholder="juan@empresa.com" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Teléfono</label>
        <input v-model="selectedManager.phone" type="tel" placeholder="+1 (555) 123-4567" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Empresa</label>
        <select v-model="selectedManager.company" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#030213] outline-none transition">
          <option value="">Selecciona una empresa</option>
          <option v-for="company in availableCompanies" :key="company.id" :value="company.id">
            {{ company.name }}
          </option>
        </select>
      </div>
      <div class="flex gap-2 justify-end pt-4">
        <button @click="showModal = false" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-[#3a4c52] transition">Cancelar</button>
        <button @click="handleSaveManager" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-gray-700 text-white rounded-lg hover:bg-[#0a0420] transition">Guardar</button>
      </div>
    </div>
  </Modal>

  <!-- Modal para Crear Gerente -->
  <Modal :is-open="showCreateModal" title="Agregar Nuevo Gerente" @close="showCreateModal = false">
    <div class="space-y-4">
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Nombre</label>
        <input v-model="newManager.name" type="text" placeholder="Ej: Juan Pérez" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Email</label>
        <input v-model="newManager.email" type="email" placeholder="juan@empresa.com" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Teléfono</label>
        <input v-model="newManager.phone" type="tel" placeholder="+1 (555) 123-4567" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Empresa</label>
        <select v-model="newManager.company" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#030213] outline-none transition">
          <option value="">Selecciona una empresa</option>
          <option v-for="company in availableCompanies" :key="company.id" :value="company.id">
            {{ company.name }}
          </option>
        </select>
      </div>
      <div class="flex gap-2 justify-end pt-4">
        <button @click="showCreateModal = false" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-[#3a4c52] transition">Cancelar</button>
        <button @click="handleCreateManager" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-gray-700 text-white rounded-lg hover:bg-[#0a0420] transition">Crear Gerente</button>
      </div>
    </div>
  </Modal>

  <!-- Modal de Confirmación de Eliminación -->
  <Modal :is-open="showDeleteModal" title="Confirmar eliminación" @close="cancelDeleteManager">
    <div class="space-y-4">
      <p class="text-base text-gray-800 dark:text-white">¿Estás seguro de que deseas eliminar al gerente <span class="font-semibold">{{ managerToDelete?.name }}</span>? Esta acción no se puede deshacer.</p>
      <div class="flex gap-2 justify-end pt-2">
        <button @click="cancelDeleteManager" class="px-4 h-9 text-sm font-medium bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-[#3a4c52] transition">Cancelar</button>
        <button @click="confirmDeleteManager" class="px-4 h-9 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Eliminar</button>
      </div>
    </div>
  </Modal>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import type { Manager } from '~/types/manager'
import AppTable from '~/components/AppTable.vue'
import Modal from '~/components/Modal.vue'
import { list as listManagers, deleteManager } from '~/services/managers'
import { useSelectedEntity } from '~/composables/useSelectedEntity'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'admin'
})


const router = useRouter()
const { setSelectedManagerId } = useSelectedEntity()
const { showToast } = useToast()

const managers = ref<Manager[]>([])
const totalManagers = ref(0)
const page = ref(1)
const pageSize = ref(3)
const isLoading = ref(false)
const hasError = ref(false)
const search = ref('')

const showModal = ref(false)
const showCreateModal = ref(false)
const showDeleteModal = ref(false)
const managerToDelete = ref(null as any)
const selectedManager = ref(null as any)
const newManager = ref({
  name: '',
  email: '',
  phone: '',
  company: ''
})

// Compañías disponibles
const availableCompanies = [
  { id: '1', name: 'TechCorp Solutions' },
  { id: '2', name: 'InnovateLab' },
  { id: '3', name: 'GlobalTech Inc' }
]

// Helper para obtener nombre de compañía
const getCompanyName = (companyId: string | number) => {
  return availableCompanies.find(c => c.id === String(companyId))?.name || 'Desconocida'
}

// Headers de la tabla
const headers = [
  { label: 'Nombre', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Teléfono', key: 'phone' },
  { label: 'Compañía', key: 'company' },
  { label: 'Fecha de Creación', key: 'createdAt' },
  { label: 'Acciones', key: 'actions', center: true }
]

const handleDeleteManager = (manager: any) => {
  managerToDelete.value = manager
  showDeleteModal.value = true
}

const cancelDeleteManager = () => {
  showDeleteModal.value = false
  managerToDelete.value = null
}

const confirmDeleteManager = async () => {
  if (!managerToDelete.value) return
  isLoading.value = true
  try {
    const ok = await deleteManager(managerToDelete.value.id)
    if (ok) {
      await loadManagers()
      showDeleteModal.value = false
      managerToDelete.value = null
      showToast('Gerente eliminado correctamente', 'success')
    } else {
      showToast('No se pudo eliminar el gerente (no encontrado)', 'error')
    }
  } catch (e) {
    showToast('Error eliminando el gerente', 'error')
  } finally {
    isLoading.value = false
  }
}


const handleSaveManager = () => {
  // Aquí iría la lógica para guardar los cambios (mock local)
  showModal.value = false
}


const openCreateModal = () => {
  // Resetear formulario
  newManager.value = {
    name: '',
    email: '',
    phone: '',
    company: ''
  }
  showCreateModal.value = true
}


const handleCreateManager = () => {
  // Validar que los campos no estén vacíos
  if (!newManager.value.name || !newManager.value.email || !newManager.value.phone || !newManager.value.company) {
    showToast('Por favor completa todos los campos', 'error')
    return
  }
  // Simulación de agregar local
  const newId = Math.max(0, ...managers.value.map((m: any) => m.id)) + 1
  managers.value.unshift({
    id: newId,
    name: newManager.value.name,
    email: newManager.value.email,
    phone: newManager.value.phone,
    company: newManager.value.company,
    createdAt: new Date().toISOString().split('T')[0] || ''
  })
  totalManagers.value++
  showCreateModal.value = false
  showToast('Gerente creado correctamente', 'success')
}


const handleDetails = (manager: any) => {
  setSelectedManagerId(manager.id)
  router.push(`/dashboard/managers/accounts`)
}

// Cargar managers desde el servicio paginado
const loadManagers = async () => {
  isLoading.value = true
  hasError.value = false
  try {
    const res = await listManagers({ page: page.value, q: search.value })
    managers.value = res.items
    totalManagers.value = res.total
    pageSize.value = res.pageSize
  } catch (e) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadManagers()
})
</script>

