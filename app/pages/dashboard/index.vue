<template>
  <div class="max-w-7xl mx-auto">
    <!-- Estados de carga/error/empty -->
    <div v-if="isLoading" class="flex justify-center items-center py-16">
      <div class="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else-if="errorMsg" class="flex flex-col items-center py-16">
      <div class="text-red-600 font-semibold mb-2">{{ errorMsg }}</div>
      <button @click="fetchSummary" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Reintentar</button>
    </div>
    <div v-else-if="!summary" class="flex flex-col items-center py-16">
      <div class="text-gray-500">No hay datos para mostrar</div>
    </div>
    <!-- ...existing code... -->

    <!-- Header -->
     <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
      <div class="flex-1">
        <div class="flex items-center gap-4">
          <!-- Icon -->
          <div class="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center
               ">
            <Icon name="heroicons:squares-2x2" class="w-6 h-6 text-white dark:text-gray-300" />
          </div>
          <!-- Text -->
          <div>
            <h1 class="text-lg font-semibold
                 text-gray-900 dark:text-white leading-tight">
           Bienvenido a tu Dashboard
            </h1>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-snug">
              Gestiona compañías y usuarios del sistema
            </p>
          </div>
        </div>
      </div>
    </div>


    <!-- Layout principal con sidebar derecha -->
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sección principal con las cards -->
      <div class="lg:flex-1">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Card Compañías -->
          <NuxtLink to="/dashboard/companies"
            class="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 dark:focus-visible:ring-gray-300 rounded-xl">
            <div
              class="relative h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200">
              <div class="p-6">
                <!-- Header con icono y badge -->
                <div class="flex items-start justify-between mb-5">
                  <div
                    class="w-14 h-14 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                    <Icon name="heroicons:building-office-2"
                      class="w-7 h-7 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                  </div>
                  <div class="flex flex-col items-end gap-1">
                    <div
                      class="px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30">
                      <span class="text-xs font-medium text-green-700 dark:text-green-300">24</span>
                    </div>
                    <span class="text-xs text-gray-500 dark:text-gray-400">activas</span>
                  </div>
                </div>

                <!-- Contenido -->
                <div class="mb-4">
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-800 dark:group-hover:text-white">
                    Compañías
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Gestión completa de empresas y configuración corporativa del sistema.
                  </p>
                </div>

                <!-- Footer -->
                <div class="pt-5 border-t border-gray-100 dark:border-gray-700/50 mt-auto">
                  <button
                    class="border shadow-sm border-gray-300  w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 dark:bg-[#253439] hover:bg-[#030213] text-gray-700 dark:text-gray-300 hover:text-white rounded-xl transition-all duration-300 group/btn text-sm font-medium">
                    <span>Administrar</span>
                    <Icon name="heroicons:arrow-right-20-solid"
                      class="w-5 h-5 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </NuxtLink>

          <!-- Card Gerentes -->
          <NuxtLink to="/dashboard/managers"
            class="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 dark:focus-visible:ring-gray-300 rounded-xl">
            <div
              class="relative h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200">
              <div class="p-6">
                <!-- Header con icono y badges -->
                <div class="flex items-start justify-between mb-5">
                  <div
                    class="w-14 h-14 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                    <Icon name="heroicons:users"
                      class="w-7 h-7 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                  </div>
                  <div class="flex flex-col items-end gap-2">
                    <div class="flex items-center gap-2">
                      <div
                        class="px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30">
                        <span class="text-xs font-medium text-green-700 dark:text-green-300">15</span>
                      </div>
                      <div
                        class="px-2 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30">
                        <span class="text-xs font-medium text-amber-700 dark:text-amber-300">3</span>
                      </div>
                    </div>
                    <span class="text-xs text-gray-500 dark:text-gray-400 text-right">activos / pendientes</span>
                  </div>
                </div>

                <!-- Contenido -->
                <div class="mb-4">
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-800 dark:group-hover:text-white">
                    Gerentes de Cuentas
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Administración de usuarios con privilegios y gestión de permisos del sistema.
                  </p>
                </div>

                <!-- Footer -->
                <!-- Footer -->
                <div class="pt-5 border-t border-gray-100 dark:border-gray-700/50 mt-auto">
                  <button
                    class="border shadow-sm border-gray-300  w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 dark:bg-[#253439] hover:bg-[#030213] text-gray-700 dark:text-gray-300 hover:text-white rounded-xl transition-all duration-300 group/btn text-sm font-medium">
                    <span>Gestionar</span>
                    <Icon name="heroicons:arrow-right-20-solid"
                      class="w-5 h-5 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Sección de actividad reciente -->
        <div class="mt-8">
          <div
            class="bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Actividad Reciente
              </h3>
              <button
                class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Ver todo
              </button>
            </div>

            <div class="space-y-4">
              <div
                class="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <Icon name="heroicons:building-office-2" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Nueva compañía agregada</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">TechCorp S.A.</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500 dark:text-gray-400">Hace 2 horas</p>
                  <p class="text-xs font-medium text-green-600 dark:text-green-400">Completado</p>
                </div>
              </div>

              <div
                class="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <Icon name="heroicons:users" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Gerente actualizado</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">María González</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500 dark:text-gray-400">Hoy, 10:30 AM</p>
                  <p class="text-xs font-medium text-blue-600 dark:text-blue-400">En revisión</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar derecha -->
      <div class="lg:w-80">
        <!-- Panel de métricas rápidas -->
        <div class="sticky top-8 space-y-6">
          <!-- Estadísticas generales -->
          <div
            class="bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resumen Histórico
            </h3>

            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Icon name="heroicons:building-office" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Total Compañías</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Registradas</p>
                  </div>
                </div>
                <span class="text-lg font-bold text-gray-900 dark:text-white">24</span>
              </div>

              <div class="h-px bg-gray-200 dark:bg-gray-700"></div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Icon name="heroicons:user-group" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Gerentes Activos</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Con acceso</p>
                  </div>
                </div>
                <span class="text-lg font-bold text-gray-900 dark:text-white">15</span>
              </div>

              <div class="h-px bg-gray-200 dark:bg-gray-700"></div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Icon name="heroicons:clock" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Actividad Hoy</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Registros</p>
                  </div>
                </div>
                <span class="text-lg font-bold text-gray-900 dark:text-white">8</span>
              </div>
            </div>
          </div>
          <hr class="text-gray-200 my-6 py-1">
          <!-- Acciones rápidas -->
          <div
            class="bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Acciones Rápidas
            </h3>

            <div class="space-y-3">
              <button
                class="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Icon name="heroicons:plus" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Nueva Compañía</span>
                </div>
                <Icon name="heroicons:arrow-right"
                  class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </button>

              <button
                class="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Icon name="heroicons:user-plus" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Agregar Gerente</span>
                </div>
                <Icon name="heroicons:arrow-right"
                  class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </button>

              <button
                class="w-full flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Icon name="heroicons:document-chart-bar" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Generar Reporte</span>
                </div>
                <Icon name="heroicons:arrow-right"
                  class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </button>
            </div>
          </div>

          <!-- Última actualización -->
          <div
            class="bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Icon name="heroicons:information-circle" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">Sistema</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Versión Griky 5.0</p>
              </div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>• Base de datos sincronizada</p>
              <p>• Registro automáticos activos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dashboardService, type DashboardSummary } from '../../services/dashboard'

definePageMeta({
  layout: 'admin'
})

const summary = ref<DashboardSummary|null>(null)
const isLoading = ref(true)
const errorMsg = ref('')

async function fetchSummary() {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const data = await dashboardService.getSummary()
    summary.value = data
    // Considera vacío si todos los valores son 0
    if (Object.values(data).every(v => v === 0)) {
      summary.value = null
    }
  } catch (err: any) {
    errorMsg.value = err?.message || 'Error al cargar el dashboard'
  } finally {
    isLoading.value = false
  }
}

fetchSummary()
</script>