<template>
  <div class="min-h-screen bg-gray-50 dark:bg-background-dark flex flex-col">
    <!-- Header Global Persistente -->
    <AppHeader />

    <!-- Contenido Principal -->
    <main class="rounded-2xl max-w-[76rem] bg-white  mx-auto w-full px-8 py-8 my-10 shadow-[0px_0px_2px_#171a1f14,0px_1px_2.5px_#171a1f12]">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
</script>
