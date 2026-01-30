<template>
  <header class="bg-white dark:bg-[#1a2c32] border-b border-gray-200 dark:border-[#2a3c42] sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <!-- Fila única: Logo | Breadcrumbs | Nombre de Usuario -->
      <div class="flex items-center justify-between gap-8">
        
        <!-- Logo -->
        <img 
          src="https://webservices.griky.co/resources/microsites/portal/griky-academy/img/logo-griky.png" 
          alt="Griky" 
          class="h-8 w-auto shrink-0"
        >
        
        <!-- Breadcrumbs (Centro-Izquierda) -->
        <div v-if="breadcrumbParts.length > 0" class="flex text-gray-600 dark:text-gray-400 hover:text-gray-900 items-center gap-2  text-sm flex-1 min-w-0">
          <span v-for="(crumb, index) in breadcrumbParts" :key="index" class="flex items-center gap-2">
            <router-link 
              v-if="crumb.href"
              :to="crumb.href"
              class="font-medium text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm transition truncate"
            >
              {{ crumb.label }}
            </router-link>
            <span v-else class="text-gray-900 font-medium dark:text-white truncate">{{ crumb.label }}</span>
            <span v-if="index < breadcrumbParts.length - 1" class="text-gray-400 shrink-0">/</span>
          </span>
        </div>
        
        <!-- Usuario con Dropdown (Derecha) -->
        <div class="shrink-0 relative">
          <button 
            @click="isDropdownOpen = !isDropdownOpen"
            class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2a3c42] rounded-lg transition text-sm font-medium text-gray-900 dark:text-white"
          >
            <div :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold',
              'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            ]">
              {{ getInitials(userName) }}
            </div>
            <span class="truncate max-w-40">{{ userName }}</span>
            <UIcon 
              name="i-heroicons-chevron-down-20-solid" 
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': isDropdownOpen }"
            />
          </button>

          <!-- Dropdown Menu -->
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div 
              v-show="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0f1620] rounded-lg shadow-lg border border-gray-200 dark:border-[#2a3c42] z-50"
            >
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#1a2c32] rounded-lg transition flex items-center gap-3"
              >
                <UIcon name="i-heroicons-arrow-right-on-rectangle-20-solid" class="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </transition>

          <!-- Overlay para cerrar dropdown al hacer clic afuera -->
          <div 
            v-if="isDropdownOpen"
            @click="isDropdownOpen = false"
            class="fixed inset-0 z-40"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Estado del dropdown
const isDropdownOpen = ref(false)

// Nombre del usuario
const userName = ref('Admin Griky')

// Mapeo de rutas a títulos (solo para referencia, ya no se renderiza)
const titleMap: Record<string, { title: string; breadcrumb: string }> = {
  '/dashboard': {
    title: 'Bienvenido a tu Dashboard',
    breadcrumb: 'Menú Principal'
  },
  '/dashboard/companies': {
    title: 'Lista de Compañías',
    breadcrumb: 'Gestión'
  },
  '/dashboard/companies/create': {
    title: 'Agregar Compañía',
    breadcrumb: 'Gestión > Compañías'
  },
  '/dashboard/managers': {
    title: 'Lista de Gerentes de Cuentas',
    breadcrumb: 'Gestión'
  },
  '/dashboard/managers/create': {
    title: 'Agregar Gerente',
    breadcrumb: 'Gestión > Gerentes'
  }
}

// Título Reactivo (no se renderiza)
const pageTitle = computed(() => {
  const path = route.path
  
  if (titleMap[path]) {
    return titleMap[path].title
  }
  
  if (path.startsWith('/dashboard/companies/') && path !== '/dashboard/companies/create') {
    return 'Editar Compañía'
  }
  if (path.startsWith('/dashboard/managers/') && path !== '/dashboard/managers/create') {
    return 'Editar Gerente'
  }
  
  return 'Dashboard'
})

// Breadcrumb string (no se renderiza, solo para referencia)
const breadcrumb = computed(() => {
  const path = route.path
  
  if (titleMap[path]) {
    return titleMap[path].breadcrumb
  }
  
  if (path.startsWith('/dashboard/companies')) {
    return 'Gestión > Compañías'
  }
  if (path.startsWith('/dashboard/managers')) {
    return 'Gestión > Gerentes'
  }
  
  return ''
})

// Breadcrumb Parts para renderizado
const breadcrumbParts = computed(() => {
  const crumbs: Array<{ label: string; href?: string }> = []

  const path = route.path

  if (path.startsWith('/dashboard/companies')) {
    crumbs.push({ label: 'Dashboard', href: '/dashboard' })

    if (path === '/dashboard/companies') {
      // Lista de compañías
      crumbs.push({ label: 'Compañías' })
    } else {
      // Subrutas de compañías
      crumbs.push({ label: 'Compañías', href: '/dashboard/companies' })

      if (path.includes('/create')) {
        crumbs.push({ label: 'Crear' })
      } else if (path.includes('/configure')) {
        // Mostrar "Configuración" en rutas de configuración
        crumbs.push({ label: 'Configuración' })
      } else if (path.includes('/accounts')) {
        crumbs.push({ label: 'Cuentas Asignadas' })
      } else {
        // Fallback para editar u otras subrutas
        crumbs.push({ label: 'Editar' })
      }
    }
  } else if (path.startsWith('/dashboard/managers')) {
    crumbs.push({ label: 'Dashboard', href: '/dashboard' })

    if (path === '/dashboard/managers') {
      // Lista de gerentes
      crumbs.push({ label: 'Gerentes' })
    } else {
      // Subrutas de gerentes
      crumbs.push({ label: 'Gerentes', href: '/dashboard/managers' })

      if (path.includes('/create')) {
        crumbs.push({ label: 'Crear' })
      } else if (path.includes('/accounts')) {
        // Mostrar "Cuentas Asignadas" en la vista de cuentas
        crumbs.push({ label: 'Cuentas Asignadas' })
      } else if (path.includes('/configure')) {
        crumbs.push({ label: 'Configuración' })
      } else {
        crumbs.push({ label: 'Editar' })
      }
    }
  } else if (path === '/dashboard') {
    crumbs.push({ label: 'Dashboard' })
  }

  return crumbs
})

// Función Logout
const handleLogout = () => {
  router.push('/')
}

// Función Atrás
const goBack = () => {
  router.back()
}

// Obtener iniciales a partir del nombre (misma lógica que AppTable)
const getInitials = (name: string) => {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word[0] || '')
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>
