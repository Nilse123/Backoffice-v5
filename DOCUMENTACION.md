# 📚 Documentación - Backoffice Griky v5.0

**Última actualización:** 23 de Enero, 2026  
**Versión:** 5.0  
**Stack:** Nuxt 4.2.2 + Vue 3.5.27 + Tailwind CSS 4.1.18

---

## 📋 Índice
1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Componentes](#componentes)
3. [Layouts](#layouts)
4. [Páginas](#páginas)
5. [Composables](#composables)
6. [Estilos y Diseño](#estilos-y-diseño)
7. [Flujo de Datos](#flujo-de-datos)
8. [Guía Rápida](#guía-rápida)

---

## 🗂️ Estructura del Proyecto

```
app/
├── components/          # Componentes reutilizables
│   ├── AppButton.vue    # Botón primario personalizado
│   ├── AppHeader.vue    # Header global con navegación
│   ├── AppTable.vue     # Tabla con búsqueda, filtro y paginación
│   └── Modal.vue        # Modal genérico para formularios
├── composables/         # Lógica compartida (state management)
│   ├── useCompanies.ts  # Estado y métodos de compañías
│   └── useManagers.ts   # Estado y métodos de gerentes
├── layouts/             # Layouts globales
│   └── admin.vue        # Layout principal para dashboard
├── pages/               # Rutas de la aplicación
│   ├── index.vue        # Página de login
│   └── dashboard/
│       ├── index.vue    # Dashboard principal
│       ├── companies/   # Gestión de compañías
│       │   ├── index.vue
│       │   └── create.vue
│       └── managers/    # Gestión de gerentes
│           ├── index.vue
│           └── create.vue
├── assets/              # Estilos globales
│   └── main/main.css
└── app.vue              # Componente raíz
```

---

## 🧩 Componentes

### **1. AppButton.vue**
Botón personalizado para toda la aplicación.

**Props:**
```typescript
- icon: string          // Nombre del icono de Heroicons (ej: 'heroicons:plus')
- to?: string           // Ruta de navegación (opcional)
- type?: 'button'|'submit' // Tipo de botón (default: 'button')
```

**Uso:**
```vue
<AppButton to="/dashboard/companies/create" icon="heroicons:plus">
  Agregar Compañía
</AppButton>
```

**Características:**
- Icono + texto
- Soporte para navegación
- Estilos dark mode
- Hover effects

---

### **2. AppHeader.vue**
Encabezado global con navegación y logo.

**Features:**
- Logo Griky
- Navegación a secciones principales
- Toggle dark/light mode
- Perfil de usuario

**Ubicación en Layout:** Aparece en todas las páginas protegidas

---

### **3. AppTable.vue** ⭐ PRINCIPAL
Tabla de datos completa con búsqueda, filtrado, paginación y botones de acciones.

**Props:**
```typescript
- title: string         // Título de la tabla
- headers: Header[]     // Definición de columnas
- items: Item[]         // Datos a mostrar
```

**Interface de Header:**
```typescript
{
  label: string       // Texto visible en encabezado
  key: string         // Clave en el objeto Item
  center?: boolean    // Alinear al centro (para acciones)
}
```

**Emits (Eventos):**
```typescript
@add="() => {}"             // Click en botón agregar
@edit="(item) => {}"        // Click en botón editar
@delete="(item) => {}"      // Click en botón eliminar
@configure="(item) => {}"   // Click en botón configurar
```

**Features:**
- ✅ Búsqueda en tiempo real (todas las columnas)
- ✅ Filtro avanzado con dropdown
- ✅ Paginación (10 items/página)
- ✅ Botones de acciones INTEGRADOS (Editar, Eliminar, Configurar, Agregar)
- ✅ Botón atrás (flecha) en header
- ✅ Slots scoped para personalización
- ✅ Dark mode completo

**Ejemplo de Uso:**
```vue
<template>
  <AppTable
    title="Lista de Compañías"
    :headers="headers"
    :items="companies"
    @add="openCreateModal"
    @edit="selectedCompany = $event; showModal = true"
    @delete="handleDeleteCompany"
    @configure="selectedCompany = $event; showConfigModal = true"
  >
    <!-- Personalizar columna específica (opcional) -->
    <template #cell-company="{ item }">
      <span class="bg-blue-100 px-2 py-1 rounded">
        {{ item.company }}
      </span>
    </template>
  </AppTable>

  <!-- Modal para agregar -->
  <Modal :is-open="showCreateModal" title="Agregar Compañía" @close="showCreateModal = false">
    <!-- Formulario aquí -->
  </Modal>

  <!-- Modal para editar -->
  <Modal :is-open="showModal" title="Editar Compañía" @close="showModal = false">
    <!-- Formulario aquí -->
  </Modal>
</template>

<script setup lang="ts">
const headers = [
  { label: 'Nombre', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Acciones', key: 'actions', center: true }
]

const openCreateModal = () => {
  newCompany.value = { name: '', email: '', phone: '', address: '' }
  showCreateModal.value = true
}
</script>
```

**Slots Disponibles:**
- `#cell-{key}` - Personalizar celda específica (ej: #cell-company)

**Nota:** El botón "Agregar" está integrado en el header de la tabla. No se usa slot `#header` para agregarlo.

---

### **4. Modal.vue**
Modal genérico para formularios y confirmaciones.

**Props:**
```typescript
- isOpen: boolean      // Controla visibilidad
- title: string        // Título del modal
```

**Emits:**
```typescript
@close()               // Cuando se cierra el modal
```

**Ejemplo:**
```vue
<Modal :is-open="showModal" title="Editar Compañía" @close="showModal = false">
  <div class="space-y-4">
    <input v-model="form.name" type="text" class="w-full px-4 py-2 border rounded" />
    <div class="flex gap-2 justify-end">
      <button @click="showModal = false">Cancelar</button>
      <button @click="handleSave">Guardar</button>
    </div>
  </div>
</Modal>
```

---

## 🎨 Layouts

### **admin.vue**
Layout principal para todas las páginas del dashboard.

**Estructura:**
```
┌─────────────────────────────┐
│     AppHeader (Global)      │
├─────────────────────────────┤
│                             │
│   <slot /> (Contenido)     │
│   (Máx ancho: 76rem)        │
│                             │
└─────────────────────────────┘
```

**Uso en Páginas:**
```typescript
definePageMeta({
  layout: 'admin'
})
```

**Características:**
- Header persistente
- Fondo gris claro con dark mode
- Contenedor con shadow y bordes redondeados
- Padding y margen automático

---

## 📄 Páginas

### **1. index.vue** (Login)
Página de inicio/login.

**Ruta:** `/`  
**Layout:** `admin-dash`  
**Contenido:**
- Logo Griky
- Título "Backoffice Griky 5.0"
- Botón "Iniciar Sesión con SSO"
- Imagen de fondo

---

### **2. dashboard/index.vue** (Dashboard Principal)
Página de bienvenida del dashboard.

**Ruta:** `/dashboard`  
**Layout:** `admin`  
**Contenido:**
- Bienvenida usuario
- Links rápidos a secciones
- Estadísticas (opcional)

---

### **3. dashboard/companies/** (Gestión de Compañías)

#### **index.vue** (Listado)
**Ruta:** `/dashboard/companies`  
**Características:**
- Tabla con AppTable
- Búsqueda de compañías
- Filtro avanzado
- Botones en tabla: Editar, Eliminar, Configurar
- Botón "Agregar" en header de tabla (emite evento @add)
- Modal para editar compañía existente
- Modal para crear compañía nueva

**Headers:**
```typescript
const headers = [
  { label: 'Nombre', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Teléfono', key: 'phone' },
  { label: 'Dirección', key: 'address' },
  { label: 'Fecha de Creación', key: 'createdAt' },
  { label: 'Acciones', key: 'actions', center: true }
]
```

**Modales:**
- `showModal`: Modal de edición (para empresas existentes)
- `showCreateModal`: Modal de creación (para nuevas empresas)

**Eventos AppTable:**
- `@add`: Abre modal de crear nueva compañía
- `@edit`: Abre modal de editar compañía seleccionada
- `@delete`: Elimina compañía con confirmación
- `@configure`: Abre modal de configuración

#### **create.vue** (Deprecado - Función movida a Modal)
**Ruta:** `/dashboard/companies/create`  
**Estado:** Archivo aún existe pero su funcionalidad ha sido movida al modal de creación en `index.vue`

---

### **4. dashboard/managers/** (Gestión de Gerentes)

#### **index.vue** (Listado)
**Ruta:** `/dashboard/managers`  
**Características:**
- Tabla con AppTable
- Búsqueda de gerentes
- Filtro avanzado
- Botones en tabla: Editar, Eliminar, Configurar
- Botón "Agregar" en header de tabla (emite evento @add)
- Modal para editar gerente existente
- Modal para crear gerente nuevo
- Slot personalizado para mostrar nombre de compañía en badge

**Headers:**
```typescript
const headers = [
  { label: 'Nombre', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Teléfono', key: 'phone' },
  { label: 'Compañía', key: 'company' },
  { label: 'Fecha de Creación', key: 'createdAt' },
  { label: 'Acciones', key: 'actions', center: true }
]
```

**Modales:**
- `showModal`: Modal de edición (para gerentes existentes)
- `showCreateModal`: Modal de creación (para nuevos gerentes)

**Eventos AppTable:**
- `@add`: Abre modal de crear nuevo gerente
- `@edit`: Abre modal de editar gerente seleccionado
- `@delete`: Elimina gerente con confirmación
- `@configure`: Abre modal de configuración

#### **create.vue** (Deprecado - Función movida a Modal)
**Ruta:** `/dashboard/managers/create`  
**Estado:** Archivo aún existe pero su funcionalidad ha sido movida al modal de creación en `index.vue`

#### **create.vue** (Crear/Editar)
**Ruta:** `/dashboard/managers/create` o `/dashboard/managers/[id]`  
**Contenido:**
- Formulario para crear/editar gerente
- Validaciones
- Botones Guardar/Cancelar

---

## 🔄 Composables

### **useCompanies.ts**
Estado y métodos para gestionar compañías.

**Estado:**
```typescript
const companies = ref([])  // Lista de compañías
```

**Métodos:**
```typescript
deleteCompany(id: number)  // Eliminar compañía
fetchCompanies()           // Obtener todas las compañías
```

**Uso:**
```typescript
const { companies, deleteCompany } = useCompanies()
```

---

### **useManagers.ts**
Estado y métodos para gestionar gerentes.

**Estado:**
```typescript
const managers = ref([])   // Lista de gerentes
```

**Métodos:**
```typescript
deleteManager(id: number)  // Eliminar gerente
fetchManagers()            // Obtener todos los gerentes
```

**Uso:**
```typescript
const { managers, deleteManager } = useManagers()
```

---

## 🎨 Estilos y Diseño

### **Colores**
```
Primary (Dark):     #030213
Light:              #1a2c32 (dark mode background)
Border:             #2a3c42 (dark mode borders)
Hover Dark:         #252f33
White:              #ffffff
Gray:               #f3f4f6 (light), #374151 (dark)
Red (Danger):       #ef4444
Blue (Info):        #3b82f6
```

### **Breakpoints**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### **Espaciado**
- Componentes gap: 3 (12px)
- Padding interno: 4-6 (16-24px)
- Margen vertical: 6-10 (24-40px)

### **Bordes Redondeados**
- Input/Buttons: `rounded-lg` (8px)
- Cards/Tables: `rounded-2xl` (16px)
- Modales: `rounded-2xl` (16px)

### **Sombras**
```css
shadow-[0px_0px_2px_#171a1f14,0px_1px_2.5px_#171a1f12]
/* Sombra muy sutil para profundidad */
```

---

## 🔀 Flujo de Datos

### **Flujo de Listado (AppTable)**
```
Página (companies/index.vue)
    ↓
useCompanies() → companies
    ↓
AppTable (props: items)
    ↓
Tabla Renderizada
    ↓
Usuario Clicks Botón
    ↓
Emit: @edit/@delete/@configure
    ↓
Página Captura Evento
    ↓
Modal Abre / Confirmación
    ↓
handleSave / handleDelete
    ↓
composable.deleteCompany()
    ↓
Estado Actualiza
    ↓
Tabla Re-renderiza
```

### **Flujo de Creación**
```
Página Listado
    ↓
Click "Agregar Compañía"
    ↓
Navega a /dashboard/companies/create
    ↓
Carga create.vue
    ↓
Usuario Completa Formulario
    ↓
Click "Guardar"
    ↓
Validación
    ↓
useCompanies().createCompany()
    ↓
Navega a /dashboard/companies
    ↓
Tabla Actualiza
```

---

## 📚 Guía Rápida

### **Crear Nueva Tabla**
```vue
<template>
  <AppTable
    title="Mis Datos"
    :headers="headers"
    :items="data"
    @edit="onEdit"
    @delete="onDelete"
    @configure="onConfigure"
  >
    <template #header>
      <AppButton to="/path/create" icon="heroicons:plus">
        Agregar
      </AppButton>
    </template>
  </AppTable>
</template>

<script setup lang="ts">
const headers = [
  { label: 'Nombre', key: 'name' },
  { label: 'Acciones', key: 'actions', center: true }
]

const data = ref([])

const onEdit = (item) => {
  // Abrir modal o navegar
}

const onDelete = (item) => {
  // Confirmación y eliminar
}

const onConfigure = (item) => {
  // Abrir modal de configuración
}
</script>
```

### **Agregar Columna Personalizada**
```vue
<template #cell-status="{ item }">
  <span :class="[
    'px-2 py-1 rounded text-xs font-medium',
    item.status === 'active' 
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700'
  ]">
    {{ item.status }}
  </span>
</template>
```

### **Usar Modal para Edición**
```vue
<Modal :is-open="showModal" title="Editar" @close="showModal = false">
  <form @submit.prevent="handleSave" class="space-y-4">
    <input v-model="form.name" type="text" />
    <input v-model="form.email" type="email" />
    
    <div class="flex gap-2 justify-end">
      <button type="button" @click="showModal = false">Cancelar</button>
      <button type="submit">Guardar</button>
    </div>
  </form>
</Modal>
```

### **Crear Nuevo Composable**
```typescript
// composables/useMyData.ts
import { ref } from 'vue'

export const useMyData = () => {
  const data = ref([])
  
  const fetchData = async () => {
    // Obtener datos de API
    data.value = await $fetch('/api/mydata')
  }
  
  const deleteItem = async (id: number) => {
    await $fetch(`/api/mydata/${id}`, { method: 'DELETE' })
    data.value = data.value.filter(item => item.id !== id)
  }
  
  return {
    data,
    fetchData,
    deleteItem
  }
}
```

---

## 🚀 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollar
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Verificar errores TypeScript
npm run type-check

# Linting
npm run lint
```

---

## 📝 Notas Importantes

1. **Dark Mode**: La aplicación soporta dark mode en todos los componentes
2. **Responsive**: Todos los componentes son responsive (mobile-first)
3. **Accesibilidad**: Usar keys correctamente en v-for
4. **Tipos**: Usar TypeScript siempre que sea posible
5. **Emits**: Los eventos de AppTable deben manejarse en la página padre

---

## 🔗 Links Rápidos

- **Heroicons**: https://heroicons.com/ (para iconos)
- **Tailwind Docs**: https://tailwindcss.com/
- **Nuxt Docs**: https://nuxt.com/
- **Vue 3 Docs**: https://vuejs.org/

---

**Última modificación:** 23 de Enero, 2026  
**Autor:** Equipo Griky  
**Estado:** ✅ Actualizado
