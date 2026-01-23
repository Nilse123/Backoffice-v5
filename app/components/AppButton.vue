<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[
      'cursor-pointer h-[36px] px-3  flex  items-center justify-center  text-[14px]  font-medium  text-white bg-[#2E3F52] rounded-lg border-0 shadow-[0px_0px_2px_#171a1f14,0px_1px_2.5px_#171a1f12] gap-2',
      !custom ? 'bg-[#030213] hover:bg-[#0a0420] text-white py-1.5 px-3 text-sm' : '',
      $attrs.class 
    ]"
  >
    <Icon v-if="icon" :name="icon" class="w-4 h-4" />
    <slot />
  </NuxtLink>

  <!-- button custom -->
  <button
    v-else
    :class="[
      'cursor-pointer inline-flex items-center gap-2 rounded-lg transition duration-200 font-semibold',
      !custom ? 'bg-[#2E3F52FF] hover:bg-[#0a0420] text-white py-1.5 px-3 text-sm' : '',
      $attrs.class 
    ]"
  >
    <Icon v-if="icon" :name="icon" class="w-4 h-4" />
    <slot />
  </button>
</template>

<script setup>
defineProps({
  to: String,
  icon: String,
  custom: { type: Boolean, default: false } // Nueva prop para personalización total
})
</script>