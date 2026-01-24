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
            <p class="text-sm text-gray-600 dark:text-gray-400">Cuentas Asignadas</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-white dark:bg-[#1a2c32] rounded-lg border border-gray-200 dark:border-[#2a3c42] overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <!-- Header -->
            <thead class="bg-gray-50 dark:bg-[#252f33] border-b border-gray-200 dark:border-[#2a3c42]">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Compañía</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Fecha de Asignación</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Último Contacto</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Contactos</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Fecha de Desasignación</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>

            <!-- Body -->
            <tbody class="divide-y divide-gray-200 dark:divide-[#2a3c42]">
              <tr v-for="account in assignedAccounts" :key="account.id" class="hover:bg-gray-50 dark:hover:bg-[#252f33] transition">
                <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{{ account.company }}</td>
                <td class="px-6 py-4 text-sm">
                  <span :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    account.status === 'Activa'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
                  ]">
                    {{ account.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ account.assignmentDate }}</td>
                <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ account.lastContact }}</td>
                <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ account.contacts }}</td>
                <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{{ account.unassignmentDate || '-' }}</td>
                <td class="px-6 py-4 text-sm">
                  <div class="flex items-center gap-2">
                    <button class="p-2 hover:bg-gray-200 dark:hover:bg-[#2a3c42] rounded-lg transition" title="Actualizar">
                      <Icon name="heroicons:arrow-path" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button class="p-2 hover:bg-gray-200 dark:hover:bg-[#2a3c42] rounded-lg transition" title="Agregar">
                      <Icon name="heroicons:plus" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Mensaje cuando no hay cuentas -->
              <tr v-if="assignedAccounts.length === 0">
                <td colspan="7" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No hay cuentas asignadas a este gerente
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const { managers } = useManagers()

// Obtener gerente actual
const manager = computed(() => {
  return managers.value.find(m => m.id === Number(route.params.id))
})

// Datos de cuentas asignadas (mock data)
const assignedAccounts = computed(() => {
  return [
    {
      id: 1,
      company: 'TechCorp Solutions',
      status: 'Activa',
      assignmentDate: '2024-01-15',
      lastContact: '2024-03-10',
      contacts: '15 contactos',
      unassignmentDate: null
    },
    {
      id: 2,
      company: 'InnovateLab',
      status: 'Activa',
      assignmentDate: '2024-02-20',
      lastContact: '2024-03-12',
      contacts: '8 contactos',
      unassignmentDate: null
    },
    {
      id: 3,
      company: 'GlobalTech Inc',
      status: 'Inactiva',
      assignmentDate: '2024-03-01',
      lastContact: '2024-03-05',
      contacts: '3 contactos',
      unassignmentDate: '2024-03-15'
    }
  ]
})
</script>
