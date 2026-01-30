import { useState } from '#app'

// Endpoint para crear compañía (reemplazar cuando esté disponible)
const COMPANIES_CREATE_URL = '{{COMPANIES_CREATE}}'
// Endpoint para actualizar compañía (reemplazar cuando esté disponible)
const COMPANIES_UPDATE_URL = '{{COMPANIES_UPDATE}}'
// Endpoint para eliminar compañía (reemplazar cuando esté disponible)
const COMPANIES_DELETE_URL = '{{COMPANIES_DELETE}}'

export interface Company {
  id: number
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
}

export const useCompanies = () => {
  const companies = useState<Company[]>('companies', () => [
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Ave, Suite 100',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'InnovateLab',
      email: 'info@innovatelab.com',
      phone: '+1 (555) 987-6543',
      address: '456 Innovation St, Floor 5',
      createdAt: '2024-02-20'
    }
  ])

  /**
   * Crea una nueva compañía usando POST a la API.
   * Si el backend no está disponible, simula la respuesta.
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  const addCompany = async (company: Omit<Company, 'id' | 'createdAt'>) => {
    try {
      // --- INTEGRACIÓN REAL (descomentar cuando el backend esté disponible) ---
      // const response = await $fetch<Company>(
      //   COMPANIES_CREATE_URL,
      //   { method: 'POST', body: company }
      // )
      // companies.value.push(response)
      // await reloadCompanies() // Si necesitas refrescar desde backend
      // return { success: true }

      // --- SIMULACIÓN (mock, eliminar cuando uses API real) ---
      await new Promise(res => setTimeout(res, 700)) // Simula delay de red
      const newId = Math.max(...companies.value.map((c: Company) => c.id), 0) + 1
      const today = new Date().toISOString().split('T')[0] || '2024-01-01'
      companies.value.push({
        id: newId,
        ...company,
        createdAt: today
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error?.message || 'Error desconocido' }
    }
  }

  /**
   * Actualiza una compañía usando PUT a la API.
   * Si el backend no está disponible, simula la respuesta.
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  const updateCompany = async (id: number, company: Omit<Company, 'id' | 'createdAt'>) => {
    try {
      // --- INTEGRACIÓN REAL (descomentar cuando el backend esté disponible) ---
      // const response = await $fetch<Company>(
      //   `${COMPANIES_UPDATE_URL}/${id}`,
      //   { method: 'PUT', body: company }
      // )
      // await reloadCompanies() // Si necesitas refrescar desde backend
      // return { success: true }

      // --- SIMULACIÓN (mock, eliminar cuando uses API real) ---
      await new Promise(res => setTimeout(res, 700)) // Simula delay de red
      const idx = companies.value.findIndex((c: Company) => c.id === id)
      if (idx === -1) throw new Error('Compañía no encontrada')
      const current = companies.value[idx]
      if (!current) throw new Error('Compañía no encontrada')
      companies.value[idx] = {
        ...current,
        ...company,
        id: current.id,
        createdAt: current.createdAt
      }
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error?.message || 'Error desconocido' }
    }
  }

  // Para futuro: refrescar lista desde API real
  const reloadCompanies = async () => {
    // TODO: Implementar fetch real cuando esté disponible
    // const data = await $fetch('/api/companies')
    // companies.value = data
  }

  /**
   * Elimina una compañía usando DELETE a la API.
   * Si el backend no está disponible, simula la respuesta.
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  const deleteCompany = async (id: number) => {
    try {
      // --- INTEGRACIÓN REAL (descomentar cuando el backend esté disponible) ---
      // await $fetch<void>(
      //   `${COMPANIES_DELETE_URL}/${id}`,
      //   { method: 'DELETE' }
      // )
      // await reloadCompanies() // Refrescar lista desde backend
      // return { success: true }

      // --- SIMULACIÓN (mock, eliminar cuando uses API real) ---
      await new Promise(res => setTimeout(res, 500)) // Simula delay de red
      const idx = companies.value.findIndex((c: Company) => c.id === id)
      if (idx === -1) throw new Error('Compañía no encontrada')
      companies.value.splice(idx, 1)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error?.message || 'Error desconocido' }
    }
  }

  return {
    companies,
    addCompany,
    updateCompany,
    deleteCompany,
    reloadCompanies
  }
}
