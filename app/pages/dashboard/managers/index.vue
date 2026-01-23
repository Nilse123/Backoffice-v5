<template>
  <AppTable
    title="Gerentes de Cuentas"
    :headers="headers"
    :items="managers"
  >
    <!-- Botón para agregar en el header -->
    <template #header>
      <AppButton to="/dashboard/managers/create" icon="heroicons:plus">
        Agregar Gerente
      </AppButton>
    </template>

    <!-- Celda personalizada para Compañía (con badge) -->
    <template #cell-company="{ item }">
      <span class="bg-gray-100 dark:bg-[#2a3c42] text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs inline-block">
        {{ getCompanyName(item.company) }}
      </span>
    </template>

    <!-- Celda personalizada para Acciones -->
    <template #cell-actions="{ item }">
      <div class="flex justify-center gap-2">
        <!-- Ver -->
        <button class="p-2 hover:bg-gray-200 dark:hover:bg-[#3a4c52] rounded-lg transition">
          <Icon name="heroicons:eye" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <!-- Editar -->
        <NuxtLink :to="`/dashboard/managers/${item.id}`" class="p-2 hover:bg-gray-200 dark:hover:bg-[#3a4c52] rounded-lg transition">
          <Icon name="heroicons:pencil" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </NuxtLink>
        
        <!-- Eliminar -->
        <button @click="deleteManager(Number(item.id))" class="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition">
          <Icon name="heroicons:trash" class="w-5 h-5 text-red-600 dark:text-red-400" />
        </button>
      </div>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { managers, deleteManager } = useManagers()

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
</script>

