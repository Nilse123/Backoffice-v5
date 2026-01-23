<template>
  <div class="max-w-2xl mx-auto">
    <!-- Título -->
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Agregar Nuevo Gerente</h2>

    <!-- Formulario -->
    <div class="bg-white dark:bg-[#1a2c32] rounded-2xl border border-gray-200 dark:border-[#2a3c42] p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Nombre -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Nombre</label>
          <input v-model="form.name" type="text" placeholder="Ej: Juan Pérez" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-600 outline-none transition" required>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Email</label>
          <input v-model="form.email" type="email" placeholder="juan@empresa.com" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-600 outline-none transition" required>
        </div>

        <!-- Teléfono -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Teléfono</label>
          <input v-model="form.phone" type="tel" placeholder="+1 (555) 123-4567" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-600 outline-none transition" required>
        </div>

        <!-- Empresa -->
        <div>
          <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Empresa</label>
          <select v-model="form.company" class="w-full px-4 py-2 border border-gray-300 dark:border-[#3a4c52] rounded-lg bg-white dark:bg-[#2a3c42] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 outline-none transition" required>
            <option value="">Selecciona una empresa</option>
            <option value="1">TechCorp Solutions</option>
            <option value="2">Innovation Inc</option>
            <option value="3">Digital Ventures</option>
          </select>
        </div>

        <!-- Botones -->
        <div class="flex gap-4 pt-4">
          <button type="submit" class="flex-1 bg-[#030213] hover:bg-[#0a0420] text-white font-semibold py-3 px-6 rounded-lg transition">
            Crear Gerente
          </button>
          <NuxtLink to="/dashboard/managers" class="flex-1 bg-gray-200 dark:bg-[#2a3c42] text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-[#3a4c52] font-semibold py-3 px-6 rounded-lg transition text-center">
            Cancelar
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin'
})

const router = useRouter()
const { addManager } = useManagers()

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: ''
})

const handleSubmit = () => {
  if (form.value.name && form.value.email && form.value.phone && form.value.company) {
    addManager({
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      company: form.value.company
    })
    router.push('/dashboard/managers')
  }
}
</script>
