<template>
  <transition name="toast-fade">
    <div v-if="visible" :class="['fixed z-50 top-6 right-6 px-4 py-3 rounded shadow-lg flex items-center gap-3',
      type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white']">
      <span v-if="type === 'success'" class="text-green-200">
        ✓
      </span>
      <span v-else class="text-red-200">
        ⚠
      </span>
      <span>{{ message }}</span>
      <button @click="close" class="ml-4 text-white/80 hover:text-white">&times;</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  message: string
  type: 'success' | 'error'
  duration?: number
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const visible = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val && props.duration !== 0) {
    setTimeout(() => {
      close()
    }, props.duration || 2500)
  }
})

function close() {
  visible.value = false
  emit('update:modelValue', false)
}
</script>

<style scoped>
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.3s;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
}
</style>
