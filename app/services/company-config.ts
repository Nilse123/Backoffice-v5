// Servicio para obtener el detalle de una compañía
// FE-801 | Servicio Company Detail

import type { Company } from '~/types/company'

const COMPANY_DETAIL_URL = '{{COMPANY_DETAIL}}'

/**
 * Obtiene el detalle de una compañía por ID
 * @param companyId ID de la compañía
 * @returns {Promise<Company>} Detalle de la compañía
 */
export async function getDetail(companyId: number): Promise<Company> {
  // Reemplazar fetch real cuando esté disponible
  // return await $fetch<Company>(`${COMPANY_DETAIL_URL}/${companyId}`)

  // Mock temporal
  await new Promise(res => setTimeout(res, 500))
  return {
    id: companyId,
    name: 'Mock Company',
    email: 'mock@company.com',
    phone: '+1 (555) 000-0000',
    address: '123 Mock St',
    createdAt: '2024-01-01',
    contacts: [
      { id: 1, name: 'Contacto 1', email: 'c1@mock.com', phone: '+1 (555) 111-1111', position: 'CEO' }
    ],
    featureFlags: { beta: true },
    contracts: [
      { id: 1, name: 'Contrato 1', startDate: '2024-01-01', endDate: '2024-12-31', fileUrl: '' }
    ]
  }
}
