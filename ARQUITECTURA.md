# 🏗️ ARQUITECTURA DEL PROYECTO

## 1️⃣ Arquitectura General

```
┌─────────────────────────────────────────┐
│         BACKOFFICE GRIKY v5.0           │
└─────────────────────────────────────────┘
            │
    ┌───────┴────────┐
    │                │
    ▼                ▼
[PÁGINAS]      [COMPOSABLES]
    │                │
    ├──> index.vue   ├──> useCompanies
    │                ├──> useManagers
    ├──> dashboard/
    │    ├── index
    │    ├── companies/
    │    │   ├── index
    │    │   └── create
    │    └── managers/
    │        ├── index
    │        └── create
    └────────────────────────────────────┐
                                         │
                                    ┌────▼─────┐
                                    │COMPONENTES│
                                    └──────────┘
                                         │
                    ┌────────┬──────────┬┴──────┐
                    ▼        ▼          ▼       ▼
                 AppButton AppHeader AppTable Modal
```

---

## 2️⃣ Flujo de Datos (Data Flow)

### State Management (Composables)
```
useCompanies.ts         useManagers.ts
    │                       │
    ├─ companies (ref)      ├─ managers (ref)
    ├─ deleteCompany()      ├─ deleteManager()
    └─ fetchCompanies()     └─ fetchManagers()
```

### Página → Composable → Tabla
```
companies/index.vue
    │
    ├─ const { companies, deleteCompany } = useCompanies()
    │
    ├─ Template: <AppTable :items="companies" />
    │
    └─ Events: @edit, @delete, @configure
         │
         ├─> Modal Abre
         ├─> Usuario Edita
         └─> handleSave() → deleteCompany(id)
              │
              └─> useCompanies reactivo actualiza
                   │
                   └─> AppTable re-renderiza
```

---

## 3️⃣ Componentes Jerárquicos

### Level 1: Global
```
app.vue (raíz)
    │
    └── <NuxtRouterView />
```

### Level 2: Layouts
```
layout: admin
    │
    ├── AppHeader (global)
    │
    └── <slot /> (contenido de página)
```

### Level 3: Páginas
```
pages/dashboard/companies/index.vue
    │
    ├── <AppTable />
    │   ├── [items renderizados]
    │   └── [botones de acciones]
    │
    └── <Modal /> (para edición)
```

### Level 4: Sub-componentes
```
AppTable
    ├── Input (búsqueda)
    ├── Button (filtro)
    ├── Table (datos)
    ├── Pagination (navegación)
    └── Modal (acciones)
```

---

## 4️⃣ Ciclo de Vida: Ver → Editar → Guardar

```
INICIO
  │
  ├─ Página carga
  │   └─ Composable: fetchCompanies()
  │       └─ data.value = respuesta API
  │
  ├─ AppTable renderiza con data
  │
  └─ Usuario ve la tabla
        │
        ├─ Click en "Editar"
        │   │
        │   └─ Evento: @edit="item"
        │       │
        │       ├─ selectedItem = item
        │       └─ showModal = true
        │
        ├─ Modal abre con datos
        │   │
        │   └─ Usuario edita campos
        │
        └─ Click "Guardar"
            │
            ├─ handleSave()
            │   │
            │   └─ useCompanies.updateCompany(item)
            │       │
            │       └─ API: PUT /companies/:id
            │           │
            │           └─ Respuesta actualizada
            │
            ├─ showModal = false
            │
            └─ AppTable re-renderiza con datos nuevos
                │
                └─ Usuario ve cambios
```

---

## 5️⃣ Patrón: Container + Presentational

### AppTable = Hybrid Component
```
AppTable
├─ Lógica (Container)
│   ├─ searchQuery (ref)
│   ├─ currentPage (ref)
│   ├─ filterField (ref)
│   ├─ filterableHeaders (computed)
│   ├─ filteredItems (computed)
│   └─ paginatedItems (computed)
│
└─ Presentación (Presentational)
    ├─ Input búsqueda
    ├─ Botón filtro
    ├─ Tabla <table>
    ├─ Botones acciones
    └─ Paginación
```

### Página = Consumer
```
pages/companies/index.vue
├─ Estado global (composable)
│   └─ const { companies } = useCompanies()
│
├─ Estado local (página)
│   ├─ showModal (ref)
│   ├─ selectedCompany (ref)
│   └─ handlers
│       ├─ handleEdit()
│       ├─ handleDelete()
│       └─ handleSave()
│
└─ Componentes
    ├─ AppTable (escucha eventos)
    └─ Modal (para edición)
```

---

## 6️⃣ Comunicación Entre Componentes

### Props (Padre → Hijo)
```
Página
  │ :items="companies"
  └──> AppTable
        │ :headers="headers"
        └──> Tabla renderiza
```

### Emits (Hijo → Padre)
```
AppTable
  │ @edit="evento"
  └──> Página
        │ maneja evento
        └──> Modal abre
```

### Composables (Compartido)
```
Página A          Página B
  │ useCompanies() │
  │                │
  └────────┬───────┘
           │
       Composable (ref reactivo)
           │
      ┌────┴────┐
      │          │
   Página A    Página B
  (actualiza) (ve cambios)
```

---

## 7️⃣ Flujo de Búsqueda y Filtrado

```
Usuario escribe en búsqueda
    │
    └─> searchQuery.value = "texto"
         │
         └─> filteredItems computed actualiza
              │
              ├─ Lee searchQuery
              ├─ Filtra items por todas las columnas
              ├─ Aplica filtro especial (si existe)
              └─ Retorna resultados
                  │
                  └─> paginatedItems actualiza
                      │
                      └─> Tabla re-renderiza
```

---

## 8️⃣ Flujo de Paginación

```
Total items: 45
Items por página: 10
Total páginas: 5 (45/10 redondeado)

┌─────────────┬──────────┬──────────┬──────────┬──────────┐
│ Página 1    │ Página 2 │ Página 3 │ Página 4 │ Página 5 │
│ (0-10)      │ (10-20)  │ (20-30)  │ (30-40)  │ (40-45)  │
└─────────────┴──────────┴──────────┴──────────┴──────────┘
     │
     └─> Usuario click "Siguiente"
         │
         └─> currentPage.value++
              │
              └─> paginatedItems.slice(10, 20)
                  │
                  └─> Tabla renderiza items 10-20
```

---

## 9️⃣ Flujo de Eliminación

```
Usuario click "Eliminar"
    │
    └─> AppTable emite: @delete="item"
         │
         └─> Página: handleDelete(item)
              │
              ├─ confirm("¿Eliminar?")
              │
              ├─ useCompanies.deleteCompany(item.id)
              │   │
              │   └─> API: DELETE /companies/:id
              │       │
              │       └─> Backend elimina
              │
              └─> companies.value actualiza
                  │
                  └─> AppTable re-renderiza sin item
```

---

## 🔟 Estructura de Tipos TypeScript

```typescript
// Header (Definición de columna)
interface Header {
  label: string       // "Nombre"
  key: string         // "name"
  center?: boolean    // para acciones
}

// Item (Datos)
interface Item {
  id: number | string
  [key: string]: any
}

// Company (Específico)
interface Company extends Item {
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
}

// Manager (Específico)
interface Manager extends Item {
  name: string
  email: string
  phone: string
  company: string | number
  createdAt: string
}
```

---

## 1️⃣1️⃣ Responsabilidades Por Archivo

```
index.vue (página)
  ├─ Obtener datos (composable)
  ├─ Manejar eventos (emit listeners)
  ├─ Abrir/cerrar modales
  └─ Persistir cambios (API)

AppTable.vue (componente)
  ├─ Buscar/filtrar
  ├─ Paginar
  ├─ Renderizar tabla
  ├─ Emitir eventos (NO ejecutarlos)
  └─ Delegación a padre

Modal.vue (componente)
  ├─ Mostrar/ocultar
  ├─ Formulario visual
  └─ Emitir close (NO guardar datos)

useCompanies.ts (composable)
  ├─ Estado (companies ref)
  ├─ Métodos (delete, fetch)
  └─ NO renderizar, solo lógica
```

---

## 1️⃣2️⃣ Punto de Entrada (Iniciadores)

```
Usuario abre navegador
    │
    └─> GET / (index.vue - Login)
         │
         └─> Usuario hace login
              │
              └─> Navega a /dashboard
                   │
                   └─> Layout: admin
                   │
                   └─> Página: dashboard/index.vue
                        │
                        └─> Componentes: AppHeader, AppButton
                             │
                             └─> Usuario navega a /dashboard/companies
                                  │
                                  └─> Página: companies/index.vue
                                       │
                                       ├─ Composable: useCompanies()
                                       ├─ Componente: AppTable
                                       └─ Componente: Modal
```

---

## 1️⃣3️⃣ Cambios en Tiempo Real

```
Usuario A                           Usuario B
  │                                   │
  ├─ Abre /companies              ├─ Abre /companies
  │   └─ Tabla A renderiza         │   └─ Tabla B renderiza
  │                                │
  ├─ Edita "Tech Corp"            ├─ Ve tabla original
  │   │                            │
  │   └─ saveCompany()             │
  │       │                        │
  │       └─> API                  │
  │           │                    │
  │           └─ Base de datos     │
  │                                │
  │       [Sin WebSocket]          │
  │       └─> Tabla A actualiza    │
  │           (via composable)     │
  │                                │
  │                            ❌ Tabla B NO se actualiza
  │                                (necesitaría refresh)
  │
  └─ [Con WebSocket/Polling]
      └─> Tabla B se actualiza automáticamente
```

---

## 1️⃣4️⃣ Stack Tecnológico

```
Frontend Stack
├─ Nuxt 4.2.2
│  ├─ Vue 3.5.27
│  ├─ Vite 7.3.1
│  └─ Vue Router (integrado)
│
├─ Styling
│  ├─ Tailwind CSS 4.1.18
│  └─ Dark mode (nativo)
│
├─ Icons
│  ├─ Heroicons (vía @iconify)
│  └─ Icon component (Nuxt)
│
├─ State Management
│  ├─ Composables (useState)
│  └─ Refs/Computed (Vue 3)
│
└─ Tooling
   ├─ TypeScript
   ├─ ESLint
   └─ Prettier
```

---

## 🎯 Resumen

**AppTable** es el corazón de la aplicación:
- Busca ✅
- Filtra ✅
- Pagina ✅
- Emite eventos ✅
- NO persiste datos ❌ (eso es responsabilidad de la página)

**Composables** manejan estado:
- Datos ✅
- Operaciones CRUD ✅
- NO renderizan ❌

**Páginas** orquestan:
- Composables ✅
- Componentes ✅
- Modales ✅
- Handlers ✅

---

**Última actualización:** 23 de Enero, 2026
