<template>
  <div class="space-y-4 py-32 flex flex-col justify-center items-center">
    <!-- Ícono de error -->
    <div class="text-red-600 dark:text-red-400 mb-4">
      <Icon name="heroicons:exclamation-triangle" class="w-16 h-16" />
    </div>
    
    <!-- Mensaje de error -->
    <div class="text-center">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ title }}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">{{ message }}</p>
    </div>
    
    <!-- Botón de reintentar -->
    <button 
      @click="$emit('retry')"
      class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
    >
      Reintentar
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  message?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Error al cargar datos',
  message: 'Ha ocurrido un error. Por favor, intenta nuevamente.'
})

defineEmits<{
  retry: []
}>()
</script>
