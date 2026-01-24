<template>
  <div class="bg-gray-50 dark:bg-[#0f1419]">
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
      <AppTable
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
        <button @click="handleSaveCompany" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-[#030213] text-white rounded-lg hover:bg-[#0a0420] transition">Guardar</button>
      </div>
    </div>
  </Modal>

  <!-- Modal para Crear Compañía -->
  <Modal :is-open="showCreateModal" title="Agregar Nueva Compañía" @close="showCreateModal = false">
    <div class="space-y-4">
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Nombre de la Compañía</label>
        <input v-model="newCompany.name" type="text" placeholder="Ej: TechCorp Solutions" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Email</label>
        <input v-model="newCompany.email" type="email" placeholder="ej@empresa.com" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Teléfono</label>
        <input v-model="newCompany.phone" type="tel" placeholder="+1 (555) 123-4567" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-semibold text-gray-900 dark:text-white">Dirección</label>
        <input v-model="newCompany.address" type="text" placeholder="123 Business Ave, Suite 100" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition" />
      </div>
      <div class="flex gap-2 justify-end pt-4">
        <button @click="showCreateModal = false" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-[#3a4c52] transition">Cancelar</button>
        <button @click="handleCreateCompany" class="cursor-pointer flex items-center gap-2 px-4 h-9 text-sm font-medium bg-[#030213] text-white rounded-lg hover:bg-[#0a0420] transition">Crear Compañía</button>
      </div>
    </div>
  </Modal>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppTable from '~/components/AppTable.vue'
import Modal from '~/components/Modal.vue'
import { useCompanies } from '~/composables/useCompanies'
import { useSelectedEntity } from '~/composables/useSelectedEntity'

definePageMeta({
  layout: 'admin'
})

const router = useRouter()
const { companies, deleteCompany, addCompany } = useCompanies()
const { setSelectedCompanyId } = useSelectedEntity()

const showModal = ref(false)
const showCreateModal = ref(false)
const selectedCompany = ref(null as any)
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
  if (confirm(`¿Estás seguro de que quieres eliminar a ${company.name}?`)) {
    deleteCompany(Number(company.id))
  }
}

const handleSaveCompany = () => {
  // Aquí iría la lógica para guardar los cambios
  console.log('Guardando compañía:', selectedCompany.value)
  showModal.value = false
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

const handleCreateCompany = () => {
  // Validar que los campos no estén vacíos
  if (!newCompany.value.name || !newCompany.value.email || !newCompany.value.phone || !newCompany.value.address) {
    alert('Por favor completa todos los campos')
    return
  }
  
  // Agregar compañía a la lista
  addCompany({
    name: newCompany.value.name,
    email: newCompany.value.email,
    phone: newCompany.value.phone,
    address: newCompany.value.address
  })
  
  // Cerrar modal
  showCreateModal.value = false
}

const handleConfigure = (company: any) => {
  setSelectedCompanyId(company.id)
  router.push('/dashboard/companies/configure')
}
</script>

