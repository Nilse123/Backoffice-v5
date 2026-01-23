<template>
  <div class="max-w-7xl mx-auto">
    <!-- Título -->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Bienvenido a tu Dashboard</h2>
      <p class="text-gray-600 dark:text-gray-400">Selecciona una de las siguientes opciones para comenzar</p>
    </div>

    <!-- Grid de Módulos -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Card Compañías -->
      <NuxtLink to="/dashboard/companies" class="group">
        <div class="bg-white dark:bg-[#1a2c32] rounded-2xl border border-gray-200 dark:border-[#2a3c42] p-8 hover:shadow-lg transition h-full">
          <!-- Icono -->
          <div class="w-16 h-16 bg-gray-100 dark:bg-[#2a3c42] rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition">
            <Icon name="heroicons:building-office-2" class="w-8 h-8" />
          </div>

          <!-- Contenido -->
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Compañías</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">Gestiona las compañías registradas en el sistema</p>

          <!-- Botón -->
          <div class="mt-6">
       <AppButton 
  custom
  
  class="w-full justify-center bg-white text-gray-900 border border-gray-300 hover:bg-[#030213] hover:text-white px-4 py-2"
>
 
  Acceder
</AppButton>
          </div>
        </div>
      </NuxtLink>

      <!-- Card Gerentes de Cuentas -->
      <NuxtLink to="/dashboard/managers" class="group">
        <div class="bg-white dark:bg-[#1a2c32] rounded-2xl border border-gray-200 dark:border-[#2a3c42] p-8 hover:shadow-lg transition h-full">
          <!-- Icono -->
          <div class="w-16 h-16 bg-gray-100 dark:bg-[#2a3c42] rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition">
            <Icon name="heroicons:users" class="w-8 h-8" />
          </div>

          <!-- Contenido -->
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Gerentes de cuentas</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">Administra los responsables de las compañías</p>

          <!-- Botón -->
          <div class="mt-6">
          <AppButton 
  custom
  class="w-full justify-center bg-white text-gray-900 border border-gray-300 hover:bg-[#030213] hover:text-white px-4 py-2"
>
  Acceder
</AppButton>

          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>
