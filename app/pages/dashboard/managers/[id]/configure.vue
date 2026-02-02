<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#0f1419]">
    <!-- Header -->
    <div class="bg-white dark:bg-[#1a2c32] border-b border-gray-200 dark:border-[#2a3c42]">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center gap-4">
          <button @click="$router.back()" class="p-2 hover:bg-gray-100 dark:hover:bg-[#2a3c42] rounded-lg transition">
            <Icon name="heroicons:arrow-left" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ manager?.name }}</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">Configuración de Gerente</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Pestañas/Botones de Navegación -->
      <div class="flex gap-3 mb-4 overflow-x-auto pb-4">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition flex items-center gap-2',
            activeTab === tab.id
              ? 'bg-gray-700 text-white'
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
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Servicios Asociados</h2>
          <div class="space-y-4">
            <div
              v-for="service in services"
              :key="service.id"
              class="flex items-center justify-between p-4 border border-gray-200 dark:border-[#2a3c42] rounded-lg hover:bg-gray-50 dark:hover:bg-[#252f33] transition"
            >
              <div class="flex items-center gap-4">
                <Icon :name="service.icon" class="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">{{ service.name }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ service.description }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span :class="['px-2 py-1 rounded text-xs font-medium', service.status === 'activo' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400']">
                  {{ service.status }}
                </span>
                <button class="p-2 hover:bg-gray-200 dark:hover:bg-[#2a3c42] rounded-lg transition">
                  <Icon name="heroicons:ellipsis-vertical" class="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Compañía -->
        <div v-else-if="activeTab === 'company'">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Información de Compañía</h2>
          <div class="p-4 border border-gray-200 dark:border-[#2a3c42] rounded-lg">
            <div v-if="company" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Compañía</label>
                <p class="text-gray-900 dark:text-white font-semibold">{{ company.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <p class="text-gray-900 dark:text-white">{{ company.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Teléfono</label>
                <p class="text-gray-900 dark:text-white">{{ company.phone }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dirección</label>
                <p class="text-gray-900 dark:text-white">{{ company.address }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contactos -->
        <div v-else-if="activeTab === 'contacts'">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Contactos</h2>
          <div class="space-y-4">
            <div class="p-4 border border-gray-200 dark:border-[#2a3c42] rounded-lg">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" :value="manager?.email" disabled class="w-full px-3 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-gray-100 dark:bg-[#252f33] text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Teléfono</label>
                  <input type="tel" :value="manager?.phone" disabled class="w-full px-3 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-gray-100 dark:bg-[#252f33] text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Instancias -->
        <div v-else-if="activeTab === 'instances'">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Instancias</h2>
          <div class="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Gestiona las instancias del gerente aquí</p>
          </div>
        </div>

        <!-- Contratos -->
        <div v-else-if="activeTab === 'contracts'">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Contratos</h2>
          <div class="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Gestiona los contratos del gerente aquí</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const { managers } = useManagers()
const { companies } = useCompanies()

const activeTab = ref('services')

// Tabs disponibles
const tabs = [
  { id: 'services', label: 'Servicios', icon: 'heroicons:cog-6-tooth' },
  { id: 'company', label: 'Compañía', icon: 'heroicons:building-office' },
  { id: 'contacts', label: 'Contactos', icon: 'heroicons:envelope' },
  { id: 'instances', label: 'Instancias', icon: 'heroicons:server-stack' },
  { id: 'contracts', label: 'Contratos', icon: 'heroicons:document-text' }
]

// Obtener gerente actual
const manager = computed(() => {
  return managers.value.find(m => m.id === Number(route.params.id))
})

// Obtener compañía del gerente
const company = computed(() => {
  return companies.value.find(c => c.id === Number(manager.value?.company))
})

// Servicios disponibles
const services = [
  {
    id: 1,
    name: 'POK',
    description: 'Servicio de certificaciones',
    icon: 'heroicons:shield-check',
    status: 'inactivo'
  },
  {
    id: 2,
    name: 'SharePoint',
    description: 'Integración con SharePoint',
    icon: 'heroicons:share',
    status: 'inactivo'
  },
  {
    id: 3,
    name: 'OneDrive',
    description: 'Almacenamiento y sincronización de archivos en la nube',
    icon: 'heroicons:cloud',
    status: 'inactivo'
  }
]
</script>
