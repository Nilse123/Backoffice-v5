<template>
  <div class="space-y-4 py-32 flex flex-col justify-center">
    <!-- Spinner animado -->
    <div class="flex justify-center">
      <div class="flex items-center justify-center">
        <div class="w-12 h-12 border-4 border-gray-200 dark:border-[#2a3c42] border-t-[#030213] dark:border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
    
    <!-- Texto de carga -->
    <div class="text-center">
      <p class="text-gray-600 dark:text-gray-400 font-medium">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Cargando datos...'
})
</script>
