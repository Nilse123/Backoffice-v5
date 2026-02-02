<template>
  <header class=" top-0 z-50">
    <!-- Fondo con desenfoque y padding -->
    <div class="backdrop-blur-md bg-white/80 dark:bg-[#1a2c32]/80 py-3 px-4 lg:px-6">
      <!-- Floating Pill Container -->
      <div class="bg-white dark:bg-[#1a2c32] rounded-full shadow-xs border border-gray-200/50 dark:border-gray-700/50 px-4 lg:px-6 py-3 flex items-center justify-between gap-3 lg:gap-4 max-w-7xl mx-auto">
        
        <!-- Lado Izquierdo: Selector de Proyecto -->
        <div class="flex items-center gap-2 shrink-0">
          <div class="flex items-center gap-2 px-2 py-1  hover:bg-gray-50 dark:hover:bg-[#2a3c42] transition cursor-pointer">
            <!-- Logo -->
            <img 
              src="https://webservices.griky.co/resources/microsites/portal/griky-academy/img/logo-griky.png" 
              alt="Griky" 
              class="h-7 w-auto"
            >
            <!-- Nombre y badge 
            <div class="hidden sm:flex items-center gap-2">
              <span class="text-xs font-medium text-gray-900 dark:text-white">Griky</span>
              <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#2a3c42]">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span class="text-xs text-gray-700 dark:text-gray-300">Production</span>
              </div>
            </div> -->
          </div>
          <!-- Divider -->
          <span class="hidden sm:block h-5 w-px bg-gray-200 dark:bg-gray-700"></span>
        </div>

        <!-- Centro: Navegación Segmentada (Pill Container) -->
        <div v-if="breadcrumbParts.length > 0" class="hidden sm:flex items-center gap-0 bg-gray-100/50 dark:bg-[#0f1419]/60 rounded-full px-2 py-1">
          <!-- Dashboard Link -->
          <router-link 
            to="/dashboard"
            :class="[
              'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors',
              isDashboardActive
                ? 'text-gray-500 dark:text-gray-500'
                : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            ]"
          >
            <UIcon name="heroicons:home" class="w-4 h-4" />
            <span>Dashboard</span>
          </router-link>

          <!-- Items previos (solo texto + icono gris) -->
          <template v-for="(crumb, index) in navigationBreadcrumbs.slice(0, -1)" :key="index">
            <router-link 
              v-if="crumb.href"
              :to="crumb.href"
              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <UIcon v-if="crumb.icon" :name="crumb.icon" class="w-4 h-4" />
              <span>{{ crumb.label }}</span>
            </router-link>
          </template>

          <!-- Item activo (el último) con fondo blanco y sombra -->
          <span 
            v-if="lastNavBreadcrumb"
            class="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-[#1a2c32] text-gray-900 dark:text-white shadow-sm"
          >
            <UIcon v-if="lastNavBreadcrumb.icon" :name="lastNavBreadcrumb.icon" class="w-4 h-4" />
            <span>{{ lastNavBreadcrumb.label }}</span>
          </span>
        </div>
        
        <!-- Lado Derecho: Avatar con color según contexto -->
        <div class="flex items-center gap-2 lg:gap-3 shrink-0 ml-auto">
          <div class="relative">
            <button 
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center gap-2 px-2 lg:px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-[#2a3c42] rounded-full transition"
            >
              <!-- Avatar con color según tipo de usuario (gerente o compañía) -->
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold',
                isCompany ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                isManager ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
                'bg-gray-900 dark:bg-gray-700 text-white'
              ]">
                {{ getInitials(userName) }}
              </div>
              <!-- Nombre (hidden en móvil) -->
              <span class="hidden sm:inline truncate max-w-32 text-sm font-medium text-gray-900 dark:text-white">
                {{ userName }}
              </span>
              <UIcon 
                name="i-heroicons-chevron-down-20-solid" 
                class="w-4 h-4 transition-transform text-gray-600 dark:text-gray-400 hidden sm:inline-block"
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
                class="absolute right-0 mt-2 w-40 bg-white dark:bg-[#1a2c32] rounded-lg shadow-lg border border-gray-200 dark:border-[#2a3c42] z-50"
              >
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-3 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a3c42] rounded-lg transition flex items-center gap-3"
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
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSelectedEntity } from '~/composables/useSelectedEntity'

const router = useRouter()
const route = useRoute()
const { selectedCompanyId, selectedManagerId } = useSelectedEntity()

// Detectar si es gerente o compañía basado en entidad seleccionada
const isManager = computed(() => selectedManagerId.value !== null)
const isCompany = computed(() => selectedCompanyId.value !== null)

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
  const crumbs: Array<{ label: string; href?: string; icon?: string }> = []

  const path = route.path

  if (path.startsWith('/dashboard/companies')) {
    crumbs.push({ label: 'Dashboard', href: '/dashboard' })

    if (path === '/dashboard/companies') {
      // Lista de compañías
      crumbs.push({ label: 'Compañías', icon: 'heroicons:building-storefront' })
    } else {
      // Subrutas de compañías
      crumbs.push({ label: 'Compañías', href: '/dashboard/companies', icon: 'heroicons:building-storefront' })

      if (path.includes('/create')) {
        crumbs.push({ label: 'Crear', icon: 'heroicons:plus' })
      } else if (path.includes('/configure')) {
        // Mostrar "Configuración" en rutas de configuración
        crumbs.push({ label: 'Configuración', icon: 'heroicons:cog-6-tooth' })
      } else if (path.includes('/accounts')) {
        crumbs.push({ label: 'Cuentas Asignadas', icon: 'heroicons:document-text' })
      } else {
        // Fallback para editar u otras subrutas
        crumbs.push({ label: 'Editar', icon: 'heroicons:pencil' })
      }
    }
  } else if (path.startsWith('/dashboard/managers')) {
    crumbs.push({ label: 'Dashboard', href: '/dashboard' })

    if (path === '/dashboard/managers') {
      // Lista de gerentes
      crumbs.push({ label: 'Gerentes', icon: 'heroicons:user-group' })
    } else {
      // Subrutas de gerentes
      crumbs.push({ label: 'Gerentes', href: '/dashboard/managers', icon: 'heroicons:user-group' })

      if (path.includes('/create')) {
        crumbs.push({ label: 'Crear', icon: 'heroicons:plus' })
      } else if (path.includes('/accounts')) {
        // Mostrar "Cuentas Asignadas" en la vista de cuentas
        crumbs.push({ label: 'Cuentas Asignadas', icon: 'heroicons:document-text' })
      } else if (path.includes('/configure')) {
        crumbs.push({ label: 'Configuración', icon: 'heroicons:cog-6-tooth' })
      } else {
        crumbs.push({ label: 'Editar', icon: 'heroicons:pencil' })
      }
    }
  } else if (path === '/dashboard') {
    crumbs.push({ label: 'Dashboard', icon: 'heroicons:home' })
  }

  return crumbs
})

// Navegación Breadcrumbs (sin el Dashboard)
const navigationBreadcrumbs = computed(() => {
  return breadcrumbParts.value.slice(1)
})

// Último breadcrumb de navegación (el activo)
const lastNavBreadcrumb = computed(() => {
  const navCrumbs = navigationBreadcrumbs.value
  return navCrumbs.length > 0 ? navCrumbs[navCrumbs.length - 1] : null
})

// Verificar si Dashboard es la ruta activa
const isDashboardActive = computed(() => {
  return route.path === '/dashboard'
})

// Función Logout
// Función Logout
const handleLogout = () => {
  router.push('/')
}

// Función Atrás
const goBack = () => {
  router.back()
}

// Verificar si un breadcrumb es el actual
const isActiveCrumb = (crumb: { label: string; href?: string }) => {
  if (!crumb.href) {
    // Si no tiene href, es el último breadcrumb (activo)
    return true
  }
  // Si tiene href, verificar si es la ruta actual o una ruta activa
  return route.path === crumb.href || route.path.startsWith(crumb.href + '/')
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
