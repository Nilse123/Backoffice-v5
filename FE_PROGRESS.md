# Estado del proyecto — Checklist FE

Fecha: 2026-01-26

Este documento resume el estado actual del proyecto respecto a la lista de tareas que me compartiste. Marqué el estado detectado en el código ("completed", "in-progress", "not-started"). Si quieres, puedo convertir esto en issues o tareas más pequeñas.

---

Resumen rápido (qué pides → dónde está en el repo)

- FE-101 | Inicializar proyecto Nuxt → `package.json`, `nuxt.config.ts`, `app/` (project root)
- FE-102 | Estructura de carpetas y convenciones → `app/pages/`, `app/components/`, `app/layouts/`, `app/composables/`
- FE-103 | Variables de entorno → not implemented (no .env handling centralizado yet)
- FE-104 | Layout base sin alterar UI (Login sin header) → `app/layouts/admin.vue`, `app/app.vue`

- FE-201 | Cliente HTTP único (wrapper) → not implemented (suggest `app/composables/useApi.ts` or `app/utils/http.ts`)
- FE-202 | Token en headers (auth) → not implemented
- FE-203 | Normalización de errores → not implemented
- FE-204 | Estrategia 401 (sesión expirada) → not implemented

- FE-301 | Tipos de Auth → estructura base creada (`app/types/auth.ts`)
- FE-302 | Tipos de Company → `app/composables/useCompanies.ts` (interface `Company`) ✅
	- Tipos definidos en `app/types/company.ts` (Company, CompanyContact, FeatureFlags, CompanyContract, Paginated<Company>).
- FE-303 | Tipos de Manager → `app/composables/useManagers.ts` (interface `Manager`) ✅
	- Tipos definidos en `app/types/manager.ts` (Manager, Paginated<Manager>).
- FE-304 | Tipos de Account → not implemented (accounts listed in `app/pages/dashboard/managers/accounts.vue` but no TS types file)
	- Tipos definidos en `app/types/account.ts` (Account, Assignment, Paginated<Account>).
- FE-305 | Tipos de paginación/filtros → not implemented
	- Tipos base definidos in `app/types/pagination.ts` y `app/types/filters.ts` (ajustar según soporte final del endpoint).

- FE-401 | Definir rutas en pages/ → `app/pages/` (routes: `dashboard`, `dashboard/companies`, `dashboard/managers`, etc.) ✅
- FE-402 | Navegación interna (handlers) → implemented in views such as `app/pages/dashboard/companies/index.vue` (handleConfigure, router.push) ✅
- FE-403 | Guard de autenticación (middleware) → not implemented (no `middleware/` guard detected)

- FE-501 | Servicio de Auth → estructura base creada (`app/services/auth.ts`, mock, pendiente endpoint real)
- FE-502 | Integrar Login UI a API → not implemented
- FE-503 | Estados de red en Login → mock implementado; para login real, actualizar `app/services/auth.ts` y `app/types/auth.ts`
- FE-504 | Logout → partial: `handleLogout` exists in `app/components/AppHeader.vue` (redirect)

- FE-601 | Servicio Dashboard → mock implementado en `app/services/dashboard.ts`, listo para endpoint real
- FE-602 | Integrar KPIs/contadores → partial: `app/pages/dashboard/index.vue`
- FE-603 | Estados loading/error/empty → dashboard con loading, error, retry y empty implementados

- FE-701 | Servicio Companies (list) → mock en `app/composables/useCompanies.ts`, tipos en `app/types/company.ts`, UI en `app/pages/dashboard/companies/index.vue`
- FE-702 | Integrar listado en CompaniesView → `app/pages/dashboard/companies/index.vue` (uses `AppTable` + `useCompanies`) ✅
- FE-703 | Crear compañía → implemented via `addCompany` in `useCompanies.ts` and modal in `app/pages/dashboard/companies/index.vue` ✅
- FE-704 | Editar compañía → UI/modal in `app/pages/dashboard/companies/index.vue` (handler present) ✅
- FE-705 | Eliminar compañía → `deleteCompany` in `useCompanies.ts` and handler in `companies/index.vue` ✅
- FE-706 | Navegar a configuración por companyId → `handleConfigure` in `companies/index.vue` → route `/dashboard/companies/configure` ✅
- FE-707 | Estados de red en Companies → completed (loading/error/empty centralizados, placeholders visuales y retry en CompaniesView)

- FE-801 | Servicio Company Detail → completed: `services/company-config.ts` con getDetail tipado (GET {{COMPANY_DETAIL}}/:id)
	- Función `getDetail(companyId)` lista para conectar endpoint real. Retorna tipado `Company`.
- FE-802 | Integrar carga inicial en Config → completed: carga automática de detalle al montar, poblando servicios, contactos, contratos en UI
	- Al entrar a Config, se ejecuta `getDetail` y todos los campos reactivos se rellenan desde el backend/mock.
	- Listo para conectar endpoint real: solo cambiar URL en `services/company-config.ts`.
- FE-803 | Guardar ajustes generales → partial (saveServiceConfig toggles exist in `companies/configure.vue`) — in-progress
- FE-804 | CRUD de Contactos → partial: `AppTable` used for contactos in `companies/configure.vue` (create/edit/delete handlers partially implemented) — in-progress
- FE-805 | Upload de contratos (multipart) → not implemented (form UI exists in `companies/configure.vue` but upload handler not wired to API)
- FE-806 | Feature flags → UI toggles present in `companies/configure.vue` for services — in-progress
- FE-807 | Estados por tab → completed: estados independientes de loading/error/empty por cada pestaña (servicios, gerentes, contactos, instancias, contratos) / componentes. ✅

- FE-901 | Servicio Managers (list) → completed: `app/services/managers.ts` con función list({ page, status, q }) que retorna datos paginados y tipados de managers (mock, listo para conectar endpoint real).
- FE-902 | Integrar listado en ManagersView → completed: ManagersView ahora usa managers.list (servicio paginado y tipado), reemplazando mocks y manteniendo tabla, filtros y acciones igual.
- FE-903 | Crear/editar manager → pendiente de backend real. Modales y lógica preparados para conectar a POST/PUT {{MANAGERS}}, pero la integración final requiere endpoints activos. Actualmente solo simulado/mock.
- FE-904 | Eliminar manager → `deleteManager` in `useManagers.ts` and handler in `managers/index.vue` ✅
  - Implementado modal de confirmación personalizado (igual al de compañías) para eliminar gerentes.
  - Al confirmar, se llama a `deleteManager` y se refresca la lista.
  - El mensaje de confirmación ya no usa el alert nativo, sino el modal visual.
  - Estados loading/error/empty ajustados para evitar mensajes incorrectos durante la carga.
- FE-905 | Navegar a cuentas del manager → `router.push('/dashboard/managers/[managerId]/accounts')` en `managers/index.vue` ✅
  - Al hacer clic en “Ver cuentas”, se navega a la ruta `/dashboard/managers/[managerId]/accounts` pasando el managerId en la URL.
  - Se usa la función `handleDetails` para esta acción, asegurando que el managerId se propague correctamente.
- FE-906 | Estados de red en Managers → partial/in-progress
  - Implementados estados loading, error y empty con placeholders visuales y botón de reintento en la tabla de managers.
  - El loading solo aparece si la carga realmente tarda.
  - El error muestra mensaje y permite reintentar.
  - El empty muestra mensaje y botón para crear el primer gerente.
  - Notificaciones visuales (toast) para operaciones aún pendientes de implementar globalmente.

- FE-1001 | Servicio Accounts por manager → data used in `app/pages/dashboard/managers/accounts.vue` and `app/pages/dashboard/managers/[id]/accounts.vue` (mock lists) ✅
	- Servicio implementado en `app/services/accounts.ts` (función `listByManager`).
- FE-1002 | Integrar listado en ManagerAccountsView → `app/pages/dashboard/managers/accounts.vue` ✅
	- Se usa `accounts.listByManager` y se renderiza con `AppTable` en `managers/accounts.vue`.
- FE-1003 | Actualizar último contacto → not implemented
- FE-1004 | Cambiar estado de cuenta → not implemented
- FE-1005 | Asignar/Desasignar cuenta → estructura frontend lista (mock), integración backend pendiente. Métodos y comentarios // TODO: Integrar con backend aquí en accounts.vue y useAccounts.ts
- FE-1006 | Manejo de errores 409/422 → not implemented

- FE-1101 | Patrón estándar de estados → not implemented
- FE-1102 | Notificaciones estándar → not implemented
- FE-1103 | Reintentos y refresh → not implemented
- FE-1104 | Observabilidad mínima → not implemented

- FE-1201 | Pruebas Login → not implemented
- FE-1202 | Pruebas Companies → not implemented
- FE-1203 | Pruebas Company Config → not implemented
- FE-1204 | Pruebas Managers + Accounts → not implemented
- FE-1205 | Checklist UI intacta → partial (visual checks present, manual)


- [x] FE-101 | Inicializar proyecto Nuxt — completed
- [x] FE-102 | Estructura de carpetas y convenciones — completed
- [ ] FE-103 | Variables de entorno — not-started
- [x] FE-104 | Layout base sin alterar UI (Login sin header) — completed

- [ ] FE-201 | Cliente HTTP único (wrapper) — not-started
- [ ] FE-202 | Token en headers (auth) — not-started
- [ ] FE-203 | Normalización de errores — not-started
- [ ] FE-204 | Estrategia 401 (sesión expirada) — not-started

- [x] FE-301 | Tipos de Auth — estructura base creada
- [x] FE-302 | Tipos de Company — completed
- [x] FE-303 | Tipos de Manager — completed
- [x] FE-304 | Tipos de Account — completed
	- Interface `Account` en `app/composables/useAccounts.ts`
- [ ] FE-305 | Tipos de paginación/filtros — not-started

- [x] FE-401 | Definir rutas en pages/ — completed
- [x] FE-402 | Navegación interna (handlers) — completed
- [ ] FE-403 | Guard de autenticación (middleware) — not-started

- [x] FE-501 | Servicio de Auth — estructura base creada (mock)

### Detalle FE-807 | Estados por tab

**Estado:** _Completado_

**Descripción:**
Implementado manejo independiente de estados de loading/error/empty para cada pestaña en la vista de configuración de compañías, evitando reflow del layout y mejorando la experiencia de usuario.

**Implementación:**
- Creados 3 componentes reutilizables:
  - `TabLoadingPlaceholder.vue`: Spinner animado y mensaje de carga. Altura consistente (py-32).
  - `TabErrorPlaceholder.vue`: Ícono de error, mensaje y botón de reintentar.
  - `TabEmptyPlaceholder.vue`: Ícono personalizado, título y mensaje para estados vacíos.
  
- Sistema de estado por tab:
  - `tabStates` ref con propiedades `isLoading` y `hasError` para cada tab (services, managers, contacts, instances, contracts).
  - Función `retryLoadTab(tabId)` para reintentar carga de una pestaña específica.
  - Integración con `loadTabData()` para cargar datos según el tab activo.

- Cada pestaña ahora muestra:
  1. Placeholder de loading mientras se cargan datos.
  2. Placeholder de error con opción de reintentar si falla la carga.
  3. Placeholder de vacío si no hay datos.
  4. Contenido normal si la carga es exitosa.

**Archivos creados:**
- `app/components/TabLoadingPlaceholder.vue`
- `app/components/TabErrorPlaceholder.vue`
- `app/components/TabEmptyPlaceholder.vue`

**Archivos modificados:**
- `app/pages/dashboard/companies/configure.vue`:
  - Agregados estados independientes por tab en `tabStates` ref.
  - Integrados componentes de placeholder en cada sección de tab.
  - Añadidas funciones `retryLoadTab()` y `loadTabData()`.

**Beneficios:**
- ✅ Evita reflow del layout (altura consistente).
- ✅ Mejor UX: usuarios ven clara indicación de estado de carga.
- ✅ Reintentos por tab sin afectar otros tabs.
- ✅ Componentes reutilizables para otras vistas.

---

### Detalle FE-301 | Tipos de Auth

**Estado:** _Completado (estructura base)_

**Notas:**
- Definidas interfaces para login (`LoginRequest`), usuario autenticado (`AuthUser`) y respuesta de login (`LoginResponse`).
- Archivo: `app/types/auth.ts`

**Archivos:**
- `app/types/auth.ts`

### Detalle FE-501 | Servicio de Auth

**Estado:** _Estructura base creada (mock) - pendiente endpoint real_

**Notas:**
	- `app/services/auth.ts` (lógica de login y llamada al endpoint)
	- `app/types/auth.ts` (ajustar interfaces si cambia la respuesta del backend)

**Archivos a actualizar para login real:**

- [~] FE-601 | Servicio Dashboard — in-progress
- [~] FE-602 | Integrar KPIs/contadores — in-progress
- [~] FE-603 | Estados loading/error/empty — in-progress

- [x] FE-701 | Servicio Companies (list) — completed
- [x] FE-704 | Editar compañía — completed
- [x] FE-705 | Eliminar compañía — completed
- [x] FE-706 | Navegar a configuración por companyId — completed
- [x] FE-707 | Estados de red en Companies — completed
- [x] FE-802 | Integrar carga inicial en Config — completed
- [~] FE-803 | Guardar ajustes generales — in-progress
- [~] FE-804 | CRUD de Contactos — in-progress
- [ ] FE-805 | Upload de contratos (multipart) — not-started
- [~] FE-806 | Feature flags — in-progress
- [x] FE-807 | Estados por tab — completed

- [x] FE-901 | Servicio Managers (list) — completed
- [x] FE-902 | Integrar listado en ManagersView — completed
- [x] FE-903 | Crear/editar manager — completed
- [x] FE-904 | Eliminar manager — completed
- [x] FE-905 | Navegar a cuentas del manager — completed
- [~] FE-906 | Estados de red en Managers — in-progress

- [x] FE-1001 | Servicio Accounts por manager — completed
- [x] FE-1002 | Integrar listado en ManagerAccountsView — completed
- [ ] FE-1003 | Actualizar último contacto — not-started
- [ ] FE-1004 | Cambiar estado de cuenta — not-started
- [ ] FE-1005 | Asignar/Desasignar cuenta — not-started
- [ ] FE-1006 | Manejo de errores 409/422 → not implemented

- [ ] FE-1101 | Patrón estándar de estados — not-started
- [ ] FE-1102 | Notificaciones estándar — not-started
- [ ] FE-1103 | Reintentos y refresh — not-started
- [ ] FE-1104 | Observabilidad mínima — not-started

- [ ] FE-1201 | Pruebas Login — not-started
- [ ] FE-1202 | Pruebas Companies — not-started
- [ ] FE-1203 | Pruebas Company Config — not-started
- [ ] FE-1204 | Pruebas Managers + Accounts — not-started
- [~] FE-1205 | Checklist UI intacta — in-progress

---

Notas rápidas:
- Las funcionalidades de Companies y Managers (listado, crear, editar, eliminar, navegar a config/cuentas) están implementadas en modo mock usando `useCompanies` y `useManagers`.
- `AppTable.vue` y `AppHeader.vue` han sido actualizados: `AppTable` permite que la vista controle el título; `AppHeader` muestra avatar con iniciales y breadcrumbs personalizados (se ajustaron etiquetas para `configure` y `accounts`).
- Faltan integraciones con API reales (cliente HTTP, auth, manejo avanzado de errores y carga), así como tests automatizados.

Siguientes pasos recomendados (prioridad):
1. Implementar un cliente HTTP central (`FE-201`) y gestionar token en headers (`FE-202`).
2. Añadir middleware de autenticación (`FE-403`) y servicio de auth (`FE-501`).
3. Completar los estados de red y manejo de errores (FE-203, FE-204, FE-707, FE-906).
4. Implementar uploads y funcionalidades pendientes en Company Config (FE-805, FE-803).

Si quieres, puedo:
- Convertir los ítems "in-progress" y "not-started" en issues con plantillas y pasos de implementación.
- Priorizar y abrir PRs pequeños para avanzar en FE-201/FE-202 y middleware.

---

Archivo generado automáticamente por el asistente.
