<template>
  <div class="max-w-2xl mx-auto">
    <!-- Título -->
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Editar Compañía</h2>

    <!-- Formulario -->
    <div class="bg-white dark:bg-[#1a2c32] rounded-2xl border border-gray-200 dark:border-[#2a3c42] p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Nombre -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Nombre de la Compañía</label>
          <input v-model="form.name" type="text" placeholder="Ej: TechCorp Solutions" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-600 outline-none transition" required>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email</label>
          <input v-model="form.email" type="email" placeholder="ej@empresa.com" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-600 outline-none transition" required>
        </div>

        <!-- Teléfono -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Teléfono</label>
          <input v-model="form.phone" type="tel" placeholder="+1 (555) 123-4567" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-600 outline-none transition" required>
        </div>

        <!-- Dirección -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Dirección</label>
          <input v-model="form.address" type="text" placeholder="123 Business Ave, Suite 100" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-600 outline-none transition" required>
        </div>

        <!-- Botones -->
        <div class="flex gap-4 pt-4">
          <button type="submit" class="flex-1 bg-gray-700 hover:bg-[#0a0420] text-white font-semibold py-3 px-6 rounded-lg transition">
            Guardar Cambios
          </button>
          <NuxtLink to="/dashboard/companies" class="flex-1 bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#3a4c52] font-semibold py-3 px-6 rounded-lg transition text-center">
            Cancelar
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

const router = useRouter()
const route = useRoute()
const id = route.params.id

// Datos mockados (después conectar a API)
const form = ref({
  name: 'TechCorp Solutions',
  email: 'contact@techcorp.com',
  phone: '+1 (555) 123-4567',
  address: '123 Business Ave, Suite 100'
})

const handleSubmit = () => {
  // Aquí iría la lógica para actualizar
  console.log('Formulario actualizado:', form.value, 'ID:', id)
  router.push('/dashboard/companies')
}
</script>
