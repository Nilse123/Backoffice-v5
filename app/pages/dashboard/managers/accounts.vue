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
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">{{ manager?.name }}</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">Cuentas Asignadas</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido Principal -->
    <div class="py-8 bg-white">
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
                <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">
                  <NuxtLink
                    :to="`/dashboard/companies/configure?id=${account.company}`"
                    class="hover:underline cursor-pointer"
                  >
                    {{ account.company }}
                  </NuxtLink>
                </td>
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
                    <!-- Botón desasignar -->
                    <button
                      class="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
                      title="Desasignar"
                      @click="handleUnassign(account)"
                      v-if="!account.unassignmentDate"
                    >
                      <Icon name="heroicons:x-mark" class="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                    <!-- Botón asignar (solo visible si está desasignada) -->
                    <button
                      class="p-2 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition"
                      title="Asignar"
                      @click="handleAssign(account)"
                      v-if="account.unassignmentDate"
                    >
                      <Icon name="heroicons:plus" class="w-4 h-4 text-green-600 dark:text-green-400" />
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
import { useAccounts } from '~/composables/useAccounts'
import { useManagers } from '~/composables/useManagers'
import { useSelectedEntity } from '~/composables/useSelectedEntity'

definePageMeta({
  layout: 'admin'
})

const { managers } = useManagers()
const { selectedManagerId } = useSelectedEntity()
const { listByManager, assignToManager, unassignFromManager } = useAccounts()

// Obtener gerente actual
const manager = computed(() => {
  return managers.value.find(m => m.id === selectedManagerId.value)
})

// Usar accounts.listByManager (mock, retorna todos). Pasamos el ref para mantener reactividad
const assignedAccounts = listByManager(selectedManagerId)

// Asignar cuenta (mock)
const handleAssign = async (account: any) => {
  // TODO: Integrar con backend aquí (POST a {{ACCOUNT_ASSIGNMENTS}})
  if (typeof selectedManagerId.value === 'number') {
    await assignToManager(selectedManagerId.value, account)
  }
}

// Desasignar cuenta (mock)
const handleUnassign = async (account: any) => {
  // TODO: Integrar con backend aquí (DELETE o PATCH a {{ACCOUNT_ASSIGNMENTS}})
  if (typeof selectedManagerId.value === 'number') {
    await unassignFromManager(selectedManagerId.value, account.id)
  }
}
</script>
