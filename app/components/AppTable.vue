<template>
    <div class="max-w-7xl mx-auto space-y-6 bg-white">
        <!-- Header con buscador y acciones -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <!-- Título y estadísticas -->
            <div class="space-y-1">
                <h2 class="text-md font-semibold text-gray-900 dark:text-white">
                    {{ displayedTitle }}
                </h2>
                <div class="flex items-center gap-4 text-sm">
                    <span class="text-gray-500 dark:text-gray-400">
                        {{ filteredItems.length }} registros
                    </span>
                    <span v-if="hasActiveFilter" class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs">
                        <Icon name="heroicons:funnel" class="w-3 h-3" />
                        Filtro activo
                    </span>
                </div>
            </div>

            <!-- Controles: Buscador, Filtro y Agregar -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <!-- Buscador -->
                <div class="relative flex-1 sm:w-64">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-gray-400" />
                    </div>
                    <input 
                        v-model="searchQuery" 
                        type="text" 
                        placeholder="Buscar..." 
                        class="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-300 focus:border-transparent text-sm transition-all"
                    />
                </div>

                <!-- Filtro -->
                <div class="relative">
                    <button 
                        @click="isFilterOpen = !isFilterOpen"
                        :class="[
                            'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium',
                            hasActiveFilter 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30' 
                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        ]"
                    >
                        <Icon name="heroicons:funnel" class="w-4 h-4" />
                        <span class="hidden sm:inline">Filtrar</span>
                        <span v-if="hasActiveFilter" class="ml-1 w-2 h-2 rounded-full bg-blue-500"></span>
                    </button>

                    <!-- Dropdown de Filtro -->
                    <div 
                        v-if="isFilterOpen"
                        class="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl z-50"
                    >
                        <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                            <div class="flex items-center justify-between">
                                <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Filtrar registros</h3>
                                <button @click="clearFilter" class="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                    Limpiar
                                </button>
                            </div>
                        </div>

                        <div class="p-4 space-y-4">
                            <!-- Campo -->
                            <div>
                                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Campo
                                </label>
                                <select 
                                    v-model="filterField"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-300 text-sm"
                                >
                                    <option value="">Todos los campos</option>
                                    <option v-for="header in filterableHeaders" :key="header.key" :value="header.key">
                                        {{ header.label }}
                                    </option>
                                </select>
                            </div>

                            <!-- Valor -->
                            <div>
                                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Contiene
                                </label>
                                <input 
                                    v-model="filterValue"
                                    type="text" 
                                    placeholder="Ingresa valor..."
                                    class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-300 text-sm"
                                />
                            </div>
                        </div>

                        <div class="p-4 border-t border-gray-100 dark:border-gray-700">
                            <button 
                                @click="applyFilter"
                                class="w-full py-2 px-4 rounded-lg bg-gray-900 dark:bg-gray-700 text-white font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm"
                            >
                                Aplicar filtro
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Botón Agregar -->
                <button 
                    @click="$emit('add')"
                    class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-700  text-white font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm whitespace-nowrap"
                >
                    <Icon name="heroicons:plus" class="w-4 h-4" />
                    {{ addButtonLabel || 'Agregar' }}
                </button>
            </div>
        </div>

        <!-- Tabla -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th 
                                v-for="header in headers" 
                                :key="header.key"
                                :class="[
                                    'px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider',
                                    { 'text-center': header.center }
                                ]"
                            >
                                <div class="flex items-center gap-2">
                                    {{ header.label }}
                                    <button v-if="header.key !== 'actions'" 
                                            @click="sortBy(header.key)"
                                            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                        <Icon name="heroicons:arrows-up-down" class="w-3 h-3" />
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr 
                            v-for="(item, index) in paginatedItems" 
                            :key="item.id"
                            :class="[
                                'hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors',
                                index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-800/50'
                            ]"
                        >
                            <td 
                                v-for="header in headers" 
                                :key="header.key"
                                :class="[
                                    'px-6 py-4 text-sm',
                                    { 'text-center': header.center }
                                ]"
                            >
                                <!-- Acciones -->
                                <template v-if="header.key === 'actions'">
                                    <div class="flex items-center gap-1">
                                           <!-- Botones details - settings -->
                                        <AppTooltip text="Configurar" v-if="tableType === 'companies'">
                                          <button 
                                              @click="$emit('configure', item)"
                                              class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                          >
                                              <Icon name="heroicons:cog-6-tooth" class="w-4 h-4" />
                                          </button>
                                        </AppTooltip>
                                        <AppTooltip text="Ver detalles" v-else-if="tableType === 'managers'">
                                          <button 
                                              @click="$emit('configure', item)"
                                              class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                          >
                                              <Icon name="heroicons:eye" class="w-4 h-4" />
                                          </button>
                                        </AppTooltip>
                                        <!-- Botones edit - remove -->
                                        <AppTooltip text="Editar">
                                          <button 
                                              @click="$emit('edit', item)"
                                              class="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                          >
                                              <Icon name="heroicons:pencil-square" class="w-4 h-4" />
                                          </button>
                                        </AppTooltip>
                                        <AppTooltip text="Eliminar">
                                          <button 
                                              @click="$emit('delete', item)"
                                              class="p-2 rounded-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                          >
                                              <Icon name="heroicons:trash" class="w-4 h-4" />
                                          </button>
                                        </AppTooltip>
                                    </div>
                                </template>

                                <!-- Slot personalizado o valor plano -->
                                <slot v-else :name="`cell-${header.key}`" :item="item">
                                    <div class="text-sm text-gray-900 dark:text-gray-300">
                                        <!-- Para nombres con avatar -->
                                        <template v-if="header.key === 'name'">
                                            <div class="flex items-center gap-3">
                                                <div 
                                                    :class="[
                                                        'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold',
                                                        tableType === 'companies' 
                                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                                            : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                                                    ]"
                                                >
                                                    {{ getInitials(item[header.key]) }}
                                                </div>
                                                <div>
                                                    <div class="font-medium text-gray-900 dark:text-white">
                                                        {{ item[header.key] }}
                                                    </div>
                                                    <div v-if="item.email" class="text-xs text-gray-500 dark:text-gray-400">
                                                        {{ item.email }}
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                        
                                        <!-- Para estado -->
                                        <template v-else-if="header.key === 'status' || header.key === 'estado'">
                                            <span :class="[
                                                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                                                getStatusClasses(item[header.key])
                                            ]">
                                                <span class="w-1.5 h-1.5 rounded-full"></span>
                                                {{ item[header.key] }}
                                            </span>
                                        </template>
                                        
                                        <!-- Para fechas -->
                                        <template v-else-if="isDateField(header.key)">
                                            <div class="text-gray-900 dark:text-white">
                                                {{ formatDate(item[header.key]) }}
                                            </div>
                                            <div v-if="isRecent(item[header.key])" class="text-xs text-green-600 dark:text-green-400">
                                                Reciente
                                            </div>
                                        </template>
                                        
                                        <!-- Default -->
                                        <template v-else>
                                            <span :class="{
                                                'font-medium text-gray-900 dark:text-white': header.key === 'id' || header.key === 'nombre',
                                            }">
                                                {{ item[header.key] }}
                                            </span>
                                        </template>
                                    </div>
                                </slot>
                            </td>
                        </tr>
                        
                        <!-- Estado vacío -->
                        <tr v-if="paginatedItems.length === 0">
                            <td :colspan="headers.length" class="px-6 py-12 text-center">
                                <div class="flex flex-col items-center justify-center gap-3">
                                    <div class="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                                        <Icon name="heroicons:inbox" class="w-8 h-8 text-gray-400" />
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                                            No se encontraron registros
                                        </p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">
                                            {{ hasActiveFilter || searchQuery ? 'Intenta con otros filtros' : 'Agrega un nuevo registro para comenzar' }}
                                        </p>
                                    </div>
                                    <button 
                                        v-if="!hasActiveFilter && !searchQuery"
                                        @click="$emit('add')"
                                        class="mt-2 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        Crear primer registro
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Paginación  -->
            <div class="px-6 py-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <!-- Información de registros -->
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                        Mostrando 
                        <span class="font-semibold text-gray-900 dark:text-white">{{ Math.min(startIndex + 1, filteredItems.length) }}</span>
                        -
                        <span class="font-semibold text-gray-900 dark:text-white">{{ Math.min(endIndex, filteredItems.length) }}</span>
                        de
                        <span class="font-semibold text-gray-900 dark:text-white">{{ filteredItems.length }}</span>
                        registros
                    </div>

                    <!-- Controles de paginación -->
                    <div class="flex items-center gap-2">
                        <!-- Botón anterior -->
                        <button 
                            @click="previousPage" 
                            :disabled="currentPage === 1"
                            :class="[
                                'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all',
                                currentPage === 1
                                    ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            ]"
                        >
                            <Icon name="heroicons:chevron-left" class="w-4 h-4" />
                            <span class="hidden sm:inline">Anterior</span>
                        </button>

                        <!-- Números de página -->
                        <div class="flex items-center gap-1">
                            <button 
                                v-for="page in pageNumbers" 
                                :key="page" 
                                @click="goToPage(page)"
                                :class="[
                                    'w-10 h-10 rounded-lg text-sm font-medium transition-all',
                                    currentPage === page
                                        ? 'bg-gray-900 dark:bg-gray-700 text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                ]"
                            >
                                {{ page }}
                            </button>
                        </div>

                        <!-- Botón siguiente -->
                        <button 
                            @click="nextPage" 
                            :disabled="currentPage >= totalPages"
                            :class="[
                                'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all',
                                currentPage >= totalPages
                                    ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            ]"
                        >
                            <span class="hidden sm:inline">Siguiente</span>
                            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppTooltip from './AppTooltip.vue'
import { computed, ref } from 'vue'

interface Header {
    label: string
    key: string
    center?: boolean
}

interface Item {
    id: number | string
    [key: string]: any
}

// Emits
const emit = defineEmits<{
    edit: [item: Item]
    delete: [item: Item]
    configure: [item: Item]
    add: []
}>()

const props = defineProps<{
    headers: Header[]
    items: Item[]
    addButtonLabel?: string
    tableType?: 'companies' | 'managers'
    title?: string
}>()

// Estado reactivo
const searchQuery = ref('')
const currentPage = ref(1)
const isFilterOpen = ref(false)
const filterField = ref('')
const filterValue = ref('')
const sortField = ref('')
const sortDirection = ref<'asc' | 'desc'>('asc')
const itemsPerPage = 10

// Helper functions
const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

const getStatusClasses = (status: string) => {
    const statusMap: Record<string, string> = {
        'Activo': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
        'Inactivo': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
        'Pendiente': 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
        'Completado': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
        'default': 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
    }
    return statusMap[status] || statusMap.default
}

const isDateField = (key: string) => {
    return key.toLowerCase().includes('date') || 
           key.toLowerCase().includes('fecha') || 
           key.toLowerCase().includes('creado') ||
           key.toLowerCase().includes('actualizado')
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const isRecent = (date: string) => {
    const diffDays = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
    return diffDays <= 7
}

// Filtros
const filterableHeaders = computed(() => {
    return props.headers.filter(header => header.key !== 'actions')
})

const hasActiveFilter = computed(() => {
    return filterField.value !== '' && filterValue.value.trim() !== ''
})

const getHeaderLabel = (key: string) => {
    return props.headers.find(h => h.key === key)?.label || key
}

// Título a mostrar: prop `title` tiene prioridad, si no usar fallback según tableType
const displayedTitle = computed(() => {
    return props.title ?? (props.tableType === 'companies' ? 'Compañías' : 'Gerentes de Cuentas')
})

// Búsqueda y filtro
const filteredItems = computed(() => {
    let result = [...props.items]

    // Búsqueda general
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(item => {
            return Object.values(item).some(value =>
                String(value).toLowerCase().includes(query)
            )
        })
    }

    // Filtro específico
    if (filterField.value && filterValue.value.trim()) {
        const fieldValue = filterField.value
        const filterVal = filterValue.value.toLowerCase()
        result = result.filter(item => {
            const itemValue = String(item[fieldValue]).toLowerCase()
            return itemValue.includes(filterVal)
        })
    }

    // Ordenamiento
    if (sortField.value) {
        result.sort((a, b) => {
            const aVal = a[sortField.value]
            const bVal = b[sortField.value]
            
            if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
            if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
            return 0
        })
    }

    return result
})

// Método de ordenamiento
const sortBy = (field: string) => {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortField.value = field
        sortDirection.value = 'asc'
    }
}

// Paginación
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredItems.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredItems.value.length / itemsPerPage)
})

const startIndex = computed(() => {
    return (currentPage.value - 1) * itemsPerPage
})

const endIndex = computed(() => {
    return startIndex.value + itemsPerPage
})

const pageNumbers = computed(() => {
    const pages = []
    const totalPagesToShow = Math.min(5, totalPages.value)
    let startPage = Math.max(1, currentPage.value - Math.floor(totalPagesToShow / 2))
    const endPage = Math.min(totalPages.value, startPage + totalPagesToShow - 1)

    if (endPage - startPage + 1 < totalPagesToShow) {
        startPage = Math.max(1, endPage - totalPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
    }
    return pages
})

// Métodos de navegación
const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const goToPage = (page: number) => {
    currentPage.value = page
}

// Métodos del filtro
const applyFilter = () => {
    currentPage.value = 1
    isFilterOpen.value = false
}

const clearFilter = () => {
    filterField.value = ''
    filterValue.value = ''
    currentPage.value = 1
    isFilterOpen.value = false
}
</script>