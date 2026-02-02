<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Tarjeta principal -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <!-- Logo -->
          <div class="text-center mb-8">
            <div class="flex items-center justify-center gap-3 mb-4">
              <!-- Engranaje -->
              <div class="relative w-14 h-14">
                <div class="absolute inset-0 bg-white rounded-xl border border-gray-200" />
                <div class="absolute inset-2 bg-gray-50 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:cog-6-tooth" class="w-8 h-8 text-gray-600 animate-spin-slow" />
                </div>
              </div>
            </div>

            <div class="flex items-center justify-center gap-2 mb-2">
              <img src="/img/favicon-griky.png" alt="Griky" class="h-10" />
              <h1 class="text-2xl font-bold text-gray-700">
                Griky Backoffice 5.0
              </h1>
            </div>
            <p class="text-gray-600 text-sm">
              Utiliza tus credenciales corporativas para acceder a todas las plataformas
            </p>
          </div>

          <!-- Separador -->
          <div class="relative my-8">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-4 bg-white text-sm text-gray-500">
                Iniciar Sesión con
              </span>
            </div>
          </div>

          <!-- Botón SSO -->
          <UButton
            @click="handleSSOLogin"
            :loading="isLoading"
           
            variant="solid"
            size="lg"
            class="w-full bg-gray-700 rounded-xl"
            :ui="{
              base: 'w-full justify-center',
              
              
            }"
          >
            <template #leading>
              <UIcon name="heroicons:shield-check" class="w-6 h-6" />
            </template>
            <span class="font-semibold">
             Inicio de sesión único (SSO)
            </span>
          </UButton>

          <!-- Mensaje de error -->
          <div v-if="errorMsg" class="mt-4">
            <UAlert
              :title="errorMsg"
          
              variant="subtle"
              icon="heroicons:exclamation-triangle"
            />
          </div>

          <!-- Footer -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <div class="flex items-center justify-center gap-2 text-sm text-gray-500">
              <UIcon name="heroicons:lock-closed" class="w-4 h-4" />
              <span>Backoffice Griky v5.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth'

// Configuración de Nuxt UI - Color azul oscuro personalizado
const ui = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af', // Azul oscuro principal
    900: '#1e3a8a',
    950: '#172554'
  }
}

definePageMeta({
  layout: false
})

const router = useRouter()
const isLoading = ref(false)
const errorMsg = ref('')

function notify(msg: string) {
  window.alert(msg)
}

const handleSSOLogin = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    await authService.login({ email: 'admin@griky.com', password: 'admin' })
    router.push('/dashboard')
  } catch (err: any) {
    errorMsg.value = err?.message || 'Error desconocido'
    notify(errorMsg.value)
  } finally {
    isLoading.value = false
  }
}
</script>

<style>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
</style>