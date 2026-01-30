<template>
  <div class="space-y-4 py-32 flex flex-col justify-center items-center">
    <!-- Ícono vacío -->
    <div class="text-gray-400 dark:text-gray-600 mb-4">
      <Icon :name="icon" class="w-16 h-16" />
    </div>
    
    <!-- Mensaje vacío -->
    <div class="text-center">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ title }}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  title?: string
  message?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'heroicons:inbox',
  title: 'Sin datos',
  message: 'No hay información disponible en esta sección.'
})
</script>
