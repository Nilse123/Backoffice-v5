<template>
  <div class=" bg-gray-50 dark:bg-[#0f1419]">
    <!-- Header -->
    <div class="bg-white dark:bg-[#1a2c32] border-b border-gray-200 dark:border-[#2a3c42]">
      <div class="pb-4">
        <div class="flex items-center gap-4">
          <button @click="$router.back()" class="p-2 hover:bg-gray-100 dark:hover:bg-[#2a3c42] rounded-lg transition">
            <Icon name="heroicons:arrow-left" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Configuración: {{ company?.name }}</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="py-8 bg-white">
      <!-- Pestañas/Botones de Navegación -->
      <div class="flex gap-3 mb-4 overflow-x-auto pb-4">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition flex items-center gap-2',
            activeTab === tab.id
              ? 'bg-[#030213] text-white'
              : 'bg-white dark:bg-[#1a2c32] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#2a3c42] hover:bg-gray-50 dark:hover:bg-[#252f33]'
          ]"
        >
          <Icon :name="tab.icon" class="w-5 h-5" />
          {{ tab.label }}
        </button>
      </div>
      <!-- Contenido de la Pestaña Activa -->
      <div class="bg-white dark:bg-[#1a2c32] rounded-lg border border-gray-200 dark:border-[#2a3c42] p-8">
        <!-- Servicios -->
        <div v-if="activeTab === 'services'">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Icon name="heroicons:cog-6-tooth" class="w-6 h-6" />
            Servicios Asociados
          </h2>
          <div class="space-y-6">
            <div
              v-for="service in services"
              :key="service.id"
              class="border border-gray-200 dark:border-[#2a3c42] rounded-lg p-6"
            >
              <!-- Header del Servicio -->
              <div class="flex items-center justify-between ">
                <div class="flex items-center gap-4 flex-1">
                  <Icon :name="service.icon" class="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="font-semibold text-gray-900 dark:text-white text-lg">{{ service.name }}</h3>
                     
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ service.description }}</p>
                  </div>
                </div>
                <!-- Toggle Switch -->
                <div class="flex items-center gap-3 ml-4">
                     <span :class="['px-3 py-1 rounded-full text-xs font-semibold', service.isActive ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400']">
                        {{ service.isActive ? 'Activo' : 'Inactivo' }}
                      </span>
                  <button 
                    @click="toggleService(service.id)"
                    :class="['relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2', service.isActive ? 'bg-green-600 dark:bg-green-600 focus:ring-green-500' : 'bg-gray-300 dark:bg-gray-600 focus:ring-gray-400']"
                  >
                    <span 
                      :class="['inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200', service.isActive ? 'translate-x-7' : 'translate-x-1']"
                    />
                  </button>
                </div>
              </div>

              <!-- Campos de Configuración (mostrar solo si está activo) -->
              <div v-if="service.isActive" class="space-y-4 pt-4 my-4 border-t border-gray-200 dark:border-[#2a3c42]">
                <!-- API Token -->
                <div>
                  <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">API Token</label>
                  <input 
                    v-model="service.apiToken"
                    type="password"
                    :placeholder="`Ingresa el ${service.name} API Token`"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
                  >
                </div>

                <!-- Signing Key (Webhook) -->
                <div>
                  <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Signing Key (Webhook)</label>
                  <input 
                    v-model="service.signingKey"
                    type="password"
                    :placeholder="`Ingresa el ${service.name} Signing Key`"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
                  >
                </div>

                <!-- Shared Key -->
                <div>
                  <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Shared Key</label>
                  <input 
                    v-model="service.sharedKey"
                    type="password"
                    :placeholder="`Ingresa el ${service.name} Shared Key`"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
                  >
                </div>

                <!-- Botón Guardar -->
                 <div class="flex justify-end w-full">
                <button 
                  @click="saveServiceConfig(service.id)"
                  class="w-50 text-sm mt-4 bg-[#030213] hover:bg-[#0a0420] text-white font-medium py-2 rounded-lg transition"
                >
                  Guardar Configuración
                </button></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gerentes -->
        <div v-else-if="activeTab === 'managers'">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Gerentes Asociados</h2>
          <div class="grid gap-4">
            <div
              v-for="manager in companyManagers"
              :key="manager.id"
              class="flex items-center justify-between p-4 border border-gray-200 dark:border-[#2a3c42] rounded-lg hover:bg-gray-50 dark:hover:bg-[#252f33] transition"
            >
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ manager.name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ manager.email }}</p>
              </div>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium">{{ manager.phone }}</span>
            </div>
            <div v-if="companyManagers.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
              No hay gerentes asociados
            </div>
          </div>
        </div>

        <!-- Contactos -->
        <div v-else-if="activeTab === 'contacts'">

          <!-- AppTable para Contactos -->
          <AppTable 
            title="Personas de Contacto"
            :items="companyContacts"
            :headers="contactTableHeaders"
            addButtonLabel="Agregar Contacto"
            @add="showContactModal = true"
            @edit="handleEditContact"
            @delete="handleDeleteContact"
          >
            <template #cell-status="{ item }">
              <span :class="['px-3 py-1 rounded-full text-xs font-semibold', item.status === 'Responsable' ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-gray-300']">
                {{ item.status }}
              </span>
            </template>
          </AppTable>
        </div>

        <!-- Instancias -->
        <div v-else-if="activeTab === 'instances'">

          <!-- AppTable para Instancias -->
          <AppTable 
            title="Gestión de Instancias"
            :items="companyInstances"
            :headers="instanceTableHeaders"
            addButtonLabel="Agregar Instancia"
            @add="showInstanceModal = true"
            @edit="handleEditInstance"
            @delete="handleDeleteInstance"
          >
            <template #cell-urlDefault="{ item }">
              <a :href="item.urlDefault" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">{{ item.urlDefault }}</a>
            </template>
            <template #cell-urlCustom="{ item }">
              <a :href="item.urlCustom" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">{{ item.urlCustom }}</a>
            </template>
            <template #cell-files="{ item }">
              {{ item.files?.length || 0 }} archivo(s)
            </template>
          </AppTable>
        </div>

        <!-- Contratos -->
        <div v-else-if="activeTab === 'contracts'">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <Icon name="heroicons:document-text" class="w-6 h-6" />
            Gestión de Contratos
          </h2>

          <!-- Lista de Contratos Existentes -->
          <div class="space-y-4 mb-8">
            <div v-for="contract in companyContracts" :key="contract.id" class="p-6 border border-gray-200 dark:border-[#2a3c42] rounded-lg hover:bg-gray-50 dark:hover:bg-[#252f33] transition">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-md font-semibold text-gray-900 dark:text-white">{{ contract.name }}</h3>
                   
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Tipo: {{ contract.type }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Sübido: {{ contract.uploadDate }}</p>
                </div>
            <div class="flex items-center ">
  <span :class="['px-3 py-1 rounded-full text-xs font-semibold shrink-0', 
    contract.status === 'Activo' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 
    contract.status === 'Firmado' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 
    'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400']">
    {{ contract.status }}
  </span>

  <button @click="handleDownloadContract(contract.id)" class="px-4 py-2 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-[#2a3c42] rounded-lg transition whitespace-nowrap">
    Descargar
  </button>
</div>
              </div>
            </div>
            <div v-if="companyContracts.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
              No hay contratos registrados
            </div>
          </div>

          <!-- Formulario para Subir Nuevo Contrato -->
          <div class="bg-white dark:bg-[#1a2c32] rounded-lg border border-gray-200 dark:border-[#2a3c42] p-8">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">Subir Nuevo Contrato</h3>
            
            <form @submit.prevent="handleUploadContract" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nombre del Contrato -->
                <div>
                  <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Nombre del Contrato</label>
                  <input 
                    v-model="newContract.name"
                    type="text" 
                    placeholder="Ej: Contrato de Servicios 2025" 
                    class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
                    required
                  >
                </div>

                <!-- Tipo -->
                <div>
                  <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Tipo</label>
                  <select 
                    v-model="newContract.type"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white focus:ring-2 focus:ring-[#030213] outline-none transition"
                    required
                  >
                    <option value="">Tipo de contrato</option>
                    <option value="Servicio">Servicio</option>
                    <option value="NDA">NDA</option>
                    <option value="Confidencialidad">Confidencialidad</option>
                    <option value="Soporte">Soporte</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <!-- Botón Subir -->
              <button 
                type="submit"
                class="w-full bg-[#030213] hover:bg-[#0a0420] text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Icon name="heroicons:arrow-up-tray" class="w-5 h-5" />
                Subir Contrato
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar contacto -->
    <div v-if="showContactModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-[#1a2c32] rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <!-- Header del Modal -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ isEditingContact ? 'Editar Contacto' : 'Nuevo Contacto' }}</h2>
          <button @click="showContactModal = false" class="p-1 hover:bg-gray-100 dark:hover:bg-[#2a3c42] rounded transition">
            <Icon name="heroicons:x-mark" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">{{ isEditingContact ? 'Actualiza los datos del contacto' : 'Completa los datos del nuevo contacto' }}</p>

        <!-- Formulario -->
        <form @submit.prevent="handleAddContact" class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Nombre</label>
            <input 
              v-model="newContact.name"
              type="text" 
              placeholder="Ej: María González" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
              required
            >
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email</label>
            <input 
              v-model="newContact.email"
              type="email" 
              placeholder="maria@empresa.com" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
              required
            >
          </div>

          <!-- Teléfono -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Teléfono</label>
            <input 
              v-model="newContact.phone"
              type="tel" 
              placeholder="+1 (555) 123-4567" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
              required
            >
          </div>

          <!-- Cargo -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Cargo</label>
            <input 
              v-model="newContact.position"
              type="text" 
              placeholder="Ej: CTO" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
              required
            >
          </div>

          <!-- Botones -->
          <div class="flex gap-3 pt-4">
            <button 
              type="submit"
              class="flex-1 bg-[#030213] hover:bg-[#0a0420] text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              Crear
            </button>
            <button 
              type="button"
              @click="showContactModal = false"
              class="flex-1 bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#3a4c52] font-semibold py-3 px-4 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Modal para agregar/editar instancia -->
    <div v-if="showInstanceModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-[#1a2c32] rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <!-- Header del Modal -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ isEditingInstance ? 'Editar Instancia' : 'Nueva Instancia' }}</h2>
          <button @click="showInstanceModal = false" class="p-1 hover:bg-gray-100 dark:hover:bg-[#2a3c42] rounded transition">
            <Icon name="heroicons:x-mark" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">{{ isEditingInstance ? 'Actualiza los datos de la instancia' : 'Completa los datos de la nueva instancia' }}</p>

        <!-- Formulario -->
        <form @submit.prevent="handleAddInstance" class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Nombre</label>
            <input 
              v-model="newInstance.name"
              type="text" 
              placeholder="Ej: Producción" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
              required
            >
          </div>

          <!-- Descripción -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Descripción</label>
            <textarea 
              v-model="newInstance.description"
              placeholder="Instancia principal de producción" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
              rows="2"
              required
            ></textarea>
          </div>

          <!-- URL Default -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">URL Default</label>
            <input 
              v-model="newInstance.urlDefault"
              type="url" 
              placeholder="https://..." 
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
              required
            >
          </div>

          <!-- URL Custom -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">URL Custom</label>
            <input 
              v-model="newInstance.urlCustom"
              type="url" 
              placeholder="https://..." 
              class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#030213] outline-none transition"
              required
            >
          </div>

          <!-- Archivos -->
          <div>
            <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Archivos</label>
            <div class="border-2 border-dashed border-gray-300 dark:border-[#3a4c52] rounded-lg p-4 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-400">Elegir archivos</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">Selecciona uno o más archivos de configuración</p>
            </div>
          </div>

          <!-- Botones -->
          <div class="flex gap-3 pt-4">
            <button 
              type="submit"
              class="flex-1 bg-[#030213] hover:bg-[#0a0420] text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              Crear
            </button>
            <button 
              type="button"
              @click="showInstanceModal = false"
              class="flex-1 bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#3a4c52] font-semibold py-3 px-4 rounded-lg transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'admin'
})

const { companies } = useCompanies()
const { managers } = useManagers()
const { selectedCompanyId } = useSelectedEntity()

const activeTab = ref('services')

// Modal y formulario para agregar contacto
const showContactModal = ref(false)
const isEditingContact = ref(false)
const editingContactId = ref<number | null>(null)
const newContact = ref({
  name: '',
  email: '',
  phone: '',
  position: ''
})

// Modal y formulario para agregar instancia
const showInstanceModal = ref(false)
const isEditingInstance = ref(false)
const editingInstanceId = ref<number | null>(null)
const newInstance = ref({
  name: '',
  description: '',
  urlDefault: '',
  urlCustom: '',
  files: [] as string[]
})

// Formulario para subir contrato
const newContract = ref({
  name: '',
  type: ''
})

// Tabs disponibles
const tabs = [
  { id: 'services', label: 'Servicios', icon: 'heroicons:cog-6-tooth' },
  { id: 'managers', label: 'Gerente', icon: 'heroicons:user-group' },
  { id: 'contacts', label: 'Contactos', icon: 'heroicons:envelope' },
  { id: 'instances', label: 'Instancias', icon: 'heroicons:server-stack' },
  { id: 'contracts', label: 'Contratos', icon: 'heroicons:document-text' }
]

// Headers para la tabla de contactos
const contactTableHeaders = [
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Teléfono' },
  { key: 'position', label: 'Cargo' },
  { key: 'status', label: 'Estado' },
  { key: 'actions', label: 'Acciones', center: true }
]

// Headers para la tabla de instancias
const instanceTableHeaders = [
  { key: 'name', label: 'Nombre' },
  { key: 'description', label: 'Descripción' },
  { key: 'urlDefault', label: 'URL Default' },
  { key: 'urlCustom', label: 'URL Custom' },
  { key: 'files', label: 'Archivos' },
  { key: 'actions', label: 'Acciones', center: true }
]

// Obtener compañía actual
const company = computed(() => {
  return companies.value.find(c => c.id === selectedCompanyId.value)
})

// Gerentes de esta compañía
const companyManagers = computed(() => {
  return managers.value.filter(m => m.company === String(company.value?.id))
})

// Contactos de esta compañía
const companyContacts = computed(() => {
  return contacts.value.filter(c => c.companyId === company.value?.id)
})

// Instancias de esta compañía
const companyInstances = computed(() => {
  return instances.value.filter(i => i.companyId === company.value?.id)
})

// Contratos de esta compañía
const companyContracts = computed(() => {
  return contracts.value.filter(c => c.companyId === company.value?.id)
})

// Servicios disponibles
const services = ref([
  {
    id: 1,
    name: 'POK',
    description: 'Servicio de certificaciones',
    icon: 'heroicons:shield-check',
    status: 'activo',
    isActive: true,
    apiToken: '',
    signingKey: '',
    sharedKey: ''
  },
  {
    id: 2,
    name: 'SharePoint',
    description: 'Integración con SharePoint',
    icon: 'heroicons:share',
    status: 'inactivo',
    isActive: false,
    apiToken: '',
    signingKey: '',
    sharedKey: ''
  },
  {
    id: 3,
    name: 'OneDrive',
    description: 'Almacenamiento y sincronización de archivos en la nube',
    icon: 'heroicons:cloud',
    status: 'inactivo',
    isActive: false,
    apiToken: '',
    signingKey: '',
    sharedKey: ''
  }
])

// Contactos mockados
const contacts = ref([
  {
    id: 1,
    companyId: 1,
    name: 'María González',
    email: 'maria@techcorp.com',
    phone: '+1 555-0101',
    position: 'CTO',
    status: 'Responsable'
  },
  {
    id: 2,
    companyId: 1,
    name: 'Juan Pérez',
    email: 'juan@techcorp.com',
    phone: '+1 555-0102',
    position: 'Desarrollador',
    status: 'Contacto'
  },
  {
    id: 3,
    companyId: 2,
    name: 'Laura Martínez',
    email: 'laura@innovate.com',
    phone: '+1 555-0103',
    position: 'Project Manager',
    status: 'Responsable'
  }
])

// Instancias mockadas
const instances = ref([
  {
    id: 1,
    companyId: 1,
    name: 'Producción',
    description: 'Instancia principal de producción',
    urlDefault: 'https://prod.griky.com',
    urlCustom: 'https://custom.techcorp.com',
    files: ['config-prod.json', 'env-prod.yaml']
  }
])

// Contratos mockados
const contracts = ref([
  {
    id: 1,
    companyId: 1,
    name: 'Contrato de Servicios 2024',
    type: 'Servicio',
    status: 'Activo',
    uploadDate: '2024-01-15',
    fileUrl: '/contratos/servicio-2024.pdf'
  },
  {
    id: 2,
    companyId: 1,
    name: 'Acuerdo de Confidencialidad',
    type: 'NDA',
    status: 'Firmado',
    uploadDate: '2024-01-10',
    fileUrl: '/contratos/nda-2024.pdf'
  }
])

// Función para agregar nuevo contacto
const handleAddContact = () => {
  if (newContact.value.name && newContact.value.email && newContact.value.phone && newContact.value.position) {
    if (isEditingContact.value && editingContactId.value) {
      // Editar contacto existente
      const contactToEdit = contacts.value.find(c => c.id === editingContactId.value)
      if (contactToEdit) {
        contactToEdit.name = newContact.value.name
        contactToEdit.email = newContact.value.email
        contactToEdit.phone = newContact.value.phone
        contactToEdit.position = newContact.value.position
      }
      isEditingContact.value = false
      editingContactId.value = null
    } else {
      // Agregar nuevo contacto
      contacts.value.push({
        id: Math.max(...contacts.value.map(c => c.id), 0) + 1,
        companyId: company.value?.id || 1,
        name: newContact.value.name,
        email: newContact.value.email,
        phone: newContact.value.phone,
        position: newContact.value.position,
        status: 'Contacto'
      })
    }
    
    // Limpiar formulario y cerrar modal
    newContact.value = {
      name: '',
      email: '',
      phone: '',
      position: ''
    }
    showContactModal.value = false
  }
}

// Función para editar contacto
const handleEditContact = (contact: any) => {
  isEditingContact.value = true
  editingContactId.value = contact.id
  newContact.value = {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    position: contact.position
  }
  showContactModal.value = true
}

// Función para eliminar contacto
const handleDeleteContact = (contactIdOrItem: any) => {
  const contactId = typeof contactIdOrItem === 'number' ? contactIdOrItem : contactIdOrItem.id
  if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
    contacts.value = contacts.value.filter(c => c.id !== contactId)
  }
}

// Función para cambiar estado (Responsable <-> Contacto)
const handleChangeStatus = (contactId: number, newStatus: string) => {
  const contact = contacts.value.find(c => c.id === contactId)
  if (contact) {
    contact.status = newStatus
  }
}

// Función para agregar/editar instancia
const handleAddInstance = () => {
  if (newInstance.value.name && newInstance.value.description && newInstance.value.urlDefault && newInstance.value.urlCustom) {
    if (isEditingInstance.value && editingInstanceId.value) {
      // Editar instancia existente
      const instanceToEdit = instances.value.find(i => i.id === editingInstanceId.value)
      if (instanceToEdit) {
        instanceToEdit.name = newInstance.value.name
        instanceToEdit.description = newInstance.value.description
        instanceToEdit.urlDefault = newInstance.value.urlDefault
        instanceToEdit.urlCustom = newInstance.value.urlCustom
        instanceToEdit.files = newInstance.value.files
      }
      isEditingInstance.value = false
      editingInstanceId.value = null
    } else {
      // Agregar nueva instancia
      instances.value.push({
        id: Math.max(...instances.value.map(i => i.id), 0) + 1,
        companyId: company.value?.id || 1,
        name: newInstance.value.name,
        description: newInstance.value.description,
        urlDefault: newInstance.value.urlDefault,
        urlCustom: newInstance.value.urlCustom,
        files: newInstance.value.files
      })
    }
    
    // Limpiar formulario y cerrar modal
    newInstance.value = {
      name: '',
      description: '',
      urlDefault: '',
      urlCustom: '',
      files: []
    }
    showInstanceModal.value = false
  }
}

// Función para editar instancia
const handleEditInstance = (instance: any) => {
  isEditingInstance.value = true
  editingInstanceId.value = instance.id
  newInstance.value = {
    name: instance.name,
    description: instance.description,
    urlDefault: instance.urlDefault,
    urlCustom: instance.urlCustom,
    files: instance.files || []
  }
  showInstanceModal.value = true
}

// Función para eliminar instancia
const handleDeleteInstance = (instanceIdOrItem: any) => {
  const instanceId = typeof instanceIdOrItem === 'number' ? instanceIdOrItem : instanceIdOrItem.id
  if (confirm('¿Estás seguro de que deseas eliminar esta instancia?')) {
    instances.value = instances.value.filter(i => i.id !== instanceId)
  }
}

// Función para descargar contrato
const handleDownloadContract = (contractId: number) => {
  const contract = contracts.value.find(c => c.id === contractId)
  if (contract) {
    // Simulamos la descarga
    console.log('Descargando:', contract.name)
    // En un caso real, aquí harías una petición para descargar el archivo
    alert(`Descargando: ${contract.name}`)
  }
}

// Función para subir nuevo contrato
const handleUploadContract = () => {
  if (newContract.value.name && newContract.value.type) {
    const today = new Date().toISOString().split('T')[0] || '2024-01-23'
    contracts.value.push({
      id: Math.max(...contracts.value.map(c => c.id), 0) + 1,
      companyId: company.value?.id || 1,
      name: newContract.value.name,
      type: newContract.value.type,
      status: 'Activo',
      uploadDate: today,
      fileUrl: `/contratos/${newContract.value.name.toLowerCase().replace(/\s+/g, '-')}.pdf`
    })
    
    // Limpiar formulario
    newContract.value = {
      name: '',
      type: ''
    }
    
    alert('Contrato subido exitosamente')
  }
}

// Función para alternar el estado de un servicio
const toggleService = (serviceId: number) => {
  const service = services.value.find(s => s.id === serviceId)
  if (service) {
    service.isActive = !service.isActive
    // Si se desactiva, limpiar los datos
    if (!service.isActive) {
      service.apiToken = ''
      service.signingKey = ''
      service.sharedKey = ''
    }
  }
}

// Función para guardar la configuración de un servicio
const saveServiceConfig = (serviceId: number) => {
  const service = services.value.find(s => s.id === serviceId)
  if (service) {
    // Aquí iría la llamada a la API para guardar la configuración
    console.log(`Guardando configuración del servicio ${service.name}:`, {
      apiToken: service.apiToken,
      signingKey: service.signingKey,
      sharedKey: service.sharedKey
    })
    alert(`Configuración de ${service.name} guardada exitosamente`)
  }
}
</script>
