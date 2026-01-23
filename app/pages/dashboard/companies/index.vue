<template>
  <AppTable
    title="Lista de Compañías"
    :headers="headers"
    :items="companies"
  >
    <!-- Botón para agregar en el header -->
    <template #header>
      <AppButton to="/dashboard/companies/create" icon="heroicons:plus">
        Agregar Compañía
      </AppButton>
    </template>

    <!-- Celda personalizada para Acciones -->
    <template #cell-actions="{ item }">
      <div class="flex justify-center gap-2">
        <!-- Editar -->
        <NuxtLink :to="`/dashboard/companies/${item.id}`" class="p-2 hover:bg-gray-200 dark:hover:bg-[#3a4c52] rounded-lg transition">
          <Icon name="heroicons:pencil" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </NuxtLink>
        
        <!-- Eliminar -->
        <button @click="deleteCompany(Number(item.id))" class="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition">
          <Icon name="heroicons:trash" class="w-5 h-5 text-red-600 dark:text-red-400" />
        </button>

        <!-- Configurar -->
        <button class="p-2 hover:bg-gray-200 dark:hover:bg-[#3a4c52] rounded-lg transition">
          <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { companies, deleteCompany } = useCompanies()

// Headers de la tabla
const headers = [
  { label: 'Nombre', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Teléfono', key: 'phone' },
  { label: 'Dirección', key: 'address' },
  { label: 'Fecha de Creación', key: 'createdAt' },
  { label: 'Acciones', key: 'actions', center: true }
]
</script>

