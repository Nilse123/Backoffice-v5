<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-[#1a2c32] rounded-2xl border border-gray-200 dark:border-[#2a3c42] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#2a3c42]">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ title }}</h2>
            <button @click="close" class="p-2 hover:bg-gray-100 dark:hover:bg-[#2a3c42] rounded-lg transition">
              <Icon name="heroicons:x-mark" class="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95);
}
</style>
