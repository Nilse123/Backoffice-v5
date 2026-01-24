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
      <AppTable
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
          <span class="bg-gray-100 dark:bg-[#2a3c42] text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs inline-block">
            {{ getCompanyName(item.company) }}
          </span>
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
        <button @click="handleSaveManager" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-[#030213] text-white rounded-lg hover:bg-[#0a0420] transition">Guardar</button>
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
        <button @click="handleCreateManager" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-[#030213] text-white rounded-lg hover:bg-[#0a0420] transition">Crear Gerente</button>
      </div>
    </div>
  </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppTable from '~/components/AppTable.vue'
import Modal from '~/components/Modal.vue'
import { useManagers } from '~/composables/useManagers'
import { useSelectedEntity } from '~/composables/useSelectedEntity'

definePageMeta({
  layout: 'admin'
})

const router = useRouter()
const { managers, deleteManager, addManager } = useManagers()
const { setSelectedManagerId } = useSelectedEntity()

const showModal = ref(false)
const showCreateModal = ref(false)
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
  if (confirm(`¿Estás seguro de que quieres eliminar a ${manager.name}?`)) {
    deleteManager(Number(manager.id))
  }
}

const handleSaveManager = () => {
  // Aquí iría la lógica para guardar los cambios
  console.log('Guardando gerente:', selectedManager.value)
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
    alert('Por favor completa todos los campos')
    return
  }
  
  // Agregar gerente a la lista
  addManager({
    name: newManager.value.name,
    email: newManager.value.email,
    phone: newManager.value.phone,
    company: newManager.value.company
  })
  
  // Cerrar modal
  showCreateModal.value = false
}

const handleDetails = (manager: any) => {
  setSelectedManagerId(manager.id)
  router.push('/dashboard/managers/accounts')
}
</script>

