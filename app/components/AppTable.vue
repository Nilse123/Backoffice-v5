<template>
    <div class="max-w-7xl mx-auto">
        <!-- Header solo con título -->
        <div class="flex items-center gap-3 mb-2">
           
            <h2 class="text-xl font-bold text-[#1a2b3c] dark:text-white">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h2>
            </h2>
        </div>

        <!-- Buscador, Filtro y Botón Agregar en una fila -->
        <div class="mb-6 mt-4 p-4 rounded-[10px] shadow-[0px_0px_2px_#171a1f14,0px_1px_2.5px_#171a1f12]">
            <div class="flex items-center gap-3">
                <!-- Buscador (80% ancho) -->
                <div class="flex-1" style="max-width: 80%">
                    <input v-model="searchQuery" type="text" placeholder="Buscar registros..."
                        class="w-full px-4  h-[36px] rounded-lg border border-gray-200 dark:border-[#2a3c42] bg-white dark:bg-[#1a2c32] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#030213] dark:focus:ring-[#030213]" />
                </div>

                <!-- Botón Filtro (solo icono) -->
                <div class="relative">
                    <button @click="isFilterOpen = !isFilterOpen"
                        class="relative p-2 rounded-lg border border-gray-200 dark:border-[#2a3c42] bg-white dark:bg-[#1a2c32] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a3c42] transition flex items-center justify-center">
                        <Icon name="heroicons:funnel" class="w-5 h-5" />
                        <span v-if="hasActiveFilter"
                            class="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                            1
                        </span>
                    </button>

                    <!-- Dropdown de Filtro Mejorado -->
                    <div v-if="isFilterOpen"
                        class="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1a2c32] border border-gray-200 dark:border-[#2a3c42] rounded-xl shadow-xl z-10">
                        <!-- Header del Dropdown -->
                        <div class="px-6 py-4 border-b border-gray-200 dark:border-[#2a3c42]">
                            <h3 class="text-sm font-bold text-gray-900 dark:text-white">Opciones de Filtrado</h3>
                        </div>

                        <!-- Contenido -->
                        <div class="p-6 space-y-5">
                            <!-- Campo de Filtro -->
                            <div>
                                <label
                                    class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                                    Campo
                                </label>
                                <select v-model="filterField"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-[#2a3c42] bg-white dark:bg-[#252f33] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#030213] text-sm">
                                    <option value="">Selecciona un campo...</option>
                                    <option v-for="header in filterableHeaders" :key="header.key" :value="header.key">
                                        {{ header.label }}
                                    </option>
                                </select>
                            </div>

                            <!-- Valor de Filtro -->
                            <div>
                                <label
                                    class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                                    Valor a buscar
                                </label>
                                <input v-model="filterValue" type="text" placeholder="Ej: TechCorp, ejemplo@email.com"
                                    class="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-[#2a3c42] bg-white dark:bg-[#252f33] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#030213] text-sm" />
                            </div>

                            <!-- Indicador de Filtro Activo -->
                            <div v-if="hasActiveFilter"
                                class="px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <p class="text-xs text-blue-700 dark:text-blue-300">
                                    <span class="font-semibold">Filtro activo:</span> {{ filterField ?
                                    getHeaderLabel(filterField) : 'Campo' }} = "{{ filterValue }}"
                                </p>
                            </div>
                        </div>

                        <!-- Footer con Botones -->
                        <div class="px-6 py-4 border-t border-gray-200 dark:border-[#2a3c42] flex gap-2">
                            <button @click="applyFilter"
                                class="flex-1 px-4 py-2 rounded-lg bg-[#030213] text-white text-sm font-semibold hover:bg-[#050420] transition">
                                Aplicar Filtro
                            </button>
                            <button @click="clearFilter"
                                class="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-[#2a3c42] text-gray-900 dark:text-white text-sm font-semibold hover:bg-gray-100 dark:hover:bg-[#2a3c42] transition">
                                Limpiar
                            </button>
                        </div>
                    </div>

                    <!-- Overlay para cerrar el dropdown -->
                    <div v-if="isFilterOpen" @click="isFilterOpen = false" class="fixed inset-0 z-0" />
                </div>

                <!-- Botón Agregar (slot) -->
                <div>
                    <slot name="header" />
                </div>
            </div>
        </div>

        <!-- Tabla -->
        <div
            class="bg-white dark:bg-[#1a2c32] rounded-2xl border border-gray-200 dark:border-[#2a3c42] overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 dark:bg-[#2a3c42] border-b border-gray-200 dark:border-[#3a4c52]">
                        <tr>
                            <th v-for="header in headers" :key="header.key"
                                class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white"
                                :class="{ 'text-center': header.center }">
                                {{ header.label }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-[#2a3c42]">
                        <tr v-for="item in paginatedItems" :key="item.id"
                            class="hover:bg-gray-50 dark:hover:bg-[#252f33] transition">
                            <!-- Render dinámico de celdas con slots scoped -->
                            <td v-for="header in headers" :key="`${item.id}-${header.key}`"
                                class="px-6 py-4 text-sm text-gray-600 dark:text-gray-400"
                                :class="{ 'text-center': header.center }">
                                <!-- Slot scoped para personalizar celdas específicas -->
                                <slot :name="`cell-${header.key}`" :item="item" :value="item[header.key]">
                                    <!-- Default: renderizar valor plano -->
                                    <span :class="{
                                        'font-medium text-gray-900 dark:text-white': header.key === 'name',
                                    }">
                                        {{ item[header.key] }}
                                    </span>
                                </slot>
                            </td>
                        </tr>
                        <!-- Mensaje cuando no hay resultados -->
                        <tr v-if="paginatedItems.length === 0">
                            <td :colspan="headers.length"
                                class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                No se encontraron registros
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Paginación -->
        <div class="mt-6 flex items-center justify-between">
            <div class="text-sm text-gray-600 dark:text-gray-400">
                Mostrando <span class="font-semibold">{{ startIndex + 1 }}</span> a <span class="font-semibold">{{
                    Math.min(endIndex, filteredItems.length) }}</span> de <span class="font-semibold">{{
                    filteredItems.length }}</span> registros
            </div>
            <div class="flex gap-2">
                <!-- Botón anterior -->
                <button @click="previousPage" :disabled="currentPage === 1"
                    class="px-4 h-[36px] rounded-lg border border-gray-200 dark:border-[#2a3c42] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a3c42] transition disabled:opacity-50 disabled:cursor-not-allowed">
                    Anterior
                </button>

                <!-- Números de página -->
                <div class="flex gap-1">
                    <button v-for="page in pageNumbers" :key="page" @click="goToPage(page)" :class="[
                        'px-3 h-[36px] rounded-lg border text-sm font-medium transition',
                        currentPage === page
                            ? 'bg-[#030213] text-white border-[#030213]'
                            : 'border-gray-200 dark:border-[#2a3c42] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a3c42]'
                    ]">
                        {{ page }}
                    </button>
                </div>

                <!-- Botón siguiente -->
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-4 h-[36px] rounded-lg border border-gray-200 dark:border-[#2a3c42] text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a3c42] transition disabled:opacity-50 disabled:cursor-not-allowed">
                    Siguiente
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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

const props = defineProps<{
    title: string
    headers: Header[]
    items: Item[]
}>()

// Estado reactivo
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Estado del filtro
const isFilterOpen = ref(false)
const filterField = ref('')
const filterValue = ref('')

// Headers filtrables (excluir "actions")
const filterableHeaders = computed(() => {
    return props.headers.filter(header => header.key !== 'actions')
})

// Indicador de filtro activo
const hasActiveFilter = computed(() => {
    return filterField.value !== '' && filterValue.value.trim() !== ''
})

// Helper para obtener el label del campo
const getHeaderLabel = (key: string) => {
    return props.headers.find(h => h.key === key)?.label || key
}

// Búsqueda y filtro: filtrar items basado en searchQuery y filtros
const filteredItems = computed(() => {
    let result = [...props.items]

    // Aplicar búsqueda
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(item => {
            return Object.values(item).some(value =>
                String(value).toLowerCase().includes(query)
            )
        })
    }

    // Aplicar filtro específico
    if (filterField.value && filterValue.value.trim()) {
        const fieldValue = filterField.value
        const filterVal = filterValue.value.toLowerCase()
        result = result.filter(item => {
            const itemValue = String(item[fieldValue]).toLowerCase()
            return itemValue.includes(filterVal)
        })
    }

    return result
})

// Paginación: calcular items para la página actual
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredItems.value.slice(start, end)
})

// Total de páginas
const totalPages = computed(() => {
    return Math.ceil(filteredItems.value.length / itemsPerPage)
})

// Índices para mostrar en el footer
const startIndex = computed(() => {
    return (currentPage.value - 1) * itemsPerPage
})

const endIndex = computed(() => {
    return startIndex.value + itemsPerPage
})

// Números de página para mostrar
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
    currentPage.value = 1 // Resetear a primera página
    isFilterOpen.value = false
}

const clearFilter = () => {
    filterField.value = ''
    filterValue.value = ''
    currentPage.value = 1
    isFilterOpen.value = false
}
</script>
