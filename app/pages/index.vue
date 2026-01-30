<template>
  <div class="min-h-screen relative overflow-hidden bg-gray-100">


    <!-- Contenido principal -->
    <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Tarjeta de login -->
        <div
          class="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl shadow-gray-200/50      transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/50">
          <!-- Logo y marca -->
          <div class="text-center mb-6">
            <!-- Logo -->
            <div class="flex items-center justify-center gap-3 mb-4">
              <!-- Engranaje a la izquierda -->
              <div class="relative w-14 h-14">
                <div class="absolute inset-0 bg-gray-100 rounded-xl p-1 bg-white border border-gray-300 " />
                <div class="absolute inset-2 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm">
                  <Icon name="heroicons:cog-6-tooth" class="w-8 h-8 text-gray-600 animate-spin-slow" />
                </div>
              </div>
            </div>

            <div class="flex items-center justify-center gap-2">
              <!-- Favicon a la izquierda -->
              <img src="/img/favicon-griky.png" alt="Griky" class="h-10" />
              <!-- Texto a la derecha -->
              <h1 class="text-xl font-bold text-gray-800">
                Griky Backoffice 5.0
              </h1>
            </div>
            <p class="text-sm text-gray-600 mt-2">
              Utiliza tus credenciales corporativas para acceder a todas las plataformas
            </p>
          </div>

          <!-- Separador -->
          <div class="flex items-center justify-center mb-6">
            <div class="h-px bg-gray-200 flex-1"></div>
            <span class="px-3 text-sm text-gray-500">
              Iniciar Sesión con
            </span>
            <div class="h-px bg-gray-200 flex-1"></div>
          </div>

          <!-- Botón SSO -->
          <button @click="handleSSOLogin" :disabled="isLoading" class="group relative w-full p-3 text-base rounded-xl bg-blue-50/50 border border-blue-200 hover:border-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white">
            <!-- Efecto de fondo al hover -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-blue-100/30 to-blue-100/50 
                        rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <!-- Contenido del botón -->
            <div class="relative flex items-center justify-center gap-3">
              <div class="relative">
                <Icon name="heroicons:shield-check" class="w-6 h-6 text-blue-600" />
                <div
                  class="absolute -inset-1 bg-blue-400/30 blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span class="text-md font-semibold text-gray-800">
               Iniciar Sesión con SSO
              </span>
              <Icon name="heroicons:arrow-right" class="w-5 h-5 text-blue-600 ml-2 
                       transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>

            <!-- Efecto de carga -->
            <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-white/90 rounded-xl">
              <div class="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          </button>
          <!-- Mensaje de error -->
          <div v-if="errorMsg" class="mt-4 text-center text-red-600 text-sm font-medium">
            {{ errorMsg }}
          </div>

          <!-- Footer
          <div class="mt-8 pt-2 border-t border-gray-100 d-none">
            <div class="space-y-2 text-center">
              <p class="text-sm text-gray-500">
             Acceso seguro mediante autenticación centralizada
              </p>
            </div>
          </div>-->
        </div>

        <!-- Indicador de seguridad -->
        <div class="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Icon name="heroicons:lock-closed" class="w-3 h-3" />
          <span>Backoffice Griky v5.0 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth'

definePageMeta({
  layout: false
})

const router = useRouter()
const isLoading = ref(false)
const errorMsg = ref('')

// Notificación simple (puedes reemplazar por un toast real si tienes uno)
function notify(msg: string) {
  window.alert(msg)
}

const handleSSOLogin = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    // Simula login con credenciales válidas
    await authService.login({ email: 'admin@griky.com', password: 'admin' })
    router.push('/dashboard')
  } catch (err: any) {
    // Simula error 401/422
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

/* Colores claros para mejor contraste */
.text-gray-800 {
  color: #1f2937;
}

.text-gray-600 {
  color: #4b5563;
}

.text-gray-500 {
  color: #6b7280;
}

.bg-white {
  background-color: #ffffff;
}

.bg-blue-50 {
  background-color: #eff6ff;
}

.bg-blue-100 {
  background-color: #dbeafe;
}

.border-blue-200 {
  border-color: #bfdbfe;
}
</style>
