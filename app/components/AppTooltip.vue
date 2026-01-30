<template>
  <div class="relative inline-block group" @mouseenter="show = true" @mouseleave="show = false" @focusin="show = true" @focusout="show = false">
    <slot />
    <transition name="tooltip-fade">
      <div
        v-if="show"
        class="z-50 absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-xl bg-gray-900 text-white text-[13px] shadow-xl whitespace-nowrap pointer-events-none select-none border border-gray-800 opacity-95"
        :style="tooltipStyle"
      >
        {{ text }}
        <span class="absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 bg-gray-900 rotate-45 border-l border-t border-gray-800"></span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{ text: string }>()
const show = ref(false)
const tooltipStyle = computed(() => ({
  top: '100%'
}))
</script>

<style scoped>
.tooltip-fade-enter-active, .tooltip-fade-leave-active {
  transition: opacity 0.18s cubic-bezier(.4,0,.2,1), transform 0.18s cubic-bezier(.4,0,.2,1);
}
.tooltip-fade-enter-from, .tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
.tooltip-fade-enter-to, .tooltip-fade-leave-from {
  opacity: 0.95;
  transform: translateY(0) scale(1);
}
.group:focus-within > .tooltip, .group:hover > .tooltip {
  display: block;
}
</style>
