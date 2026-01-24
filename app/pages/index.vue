

<template>
  <div 
  class="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
  style="background-image: url('/img/fondo-login.png');"
>
    <div class="bg-white dark:bg-[#1a2c32] rounded-2xl shadow-lg border border-gray-100 dark:border-[#2a3c42] p-8 w-full max-w-md">
      <div class="flex flex-col items-center gap-4 text-center">
        <img src="/img/logo-griky.png" alt="Griky" class="h-12">
       <div>
 <div class="flex items-center gap-3 mb-2">
    <div class="w-10 h-10 bg-gray-50 dark:bg-[#2a3c42] rounded-lg flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
      <Icon 
        name="heroicons:cog-6-tooth" 
        class="w-7 h-8 text-gray-600 dark:text-gray-300 animate-spin" 
        style="animation-duration: 8s;" 
      />
    </div>
    <h2 class="text-xl font-bold text-[#1a2b3c] dark:text-white">
      Backoffice Griky 5.0
    </h2>
  </div>


  

  <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">
    Inicia sesión para acceder a tu dashboard
  </p>
</div>
      </div>

      <div class="mt-8">
      <AppButton 
  @click="handleLogin"
  class="w-full py-3 justify-center"
>
  Iniciar Sesión con SSO
</AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

definePageMeta({
  layout: false
})

const router = useRouter()

const handleLogin = () => {
  // Aquí iría la lógica de autenticación
  router.push('/dashboard')
}
</script>