// Servicio Accounts por manager (FE-1001)
import type { Account } from '../composables/useAccounts';

export interface ListByManagerParams {
  page?: number;
  status?: string;
}

export interface ListByManagerResponse {
  accounts: Account[];
  total: number;
  page: number;
  pageSize: number;
}

// Simulación de endpoint. Reemplazar por llamada real al API.
export async function listByManager(
  managerId: string,
  params: ListByManagerParams = {}
): Promise<ListByManagerResponse> {
  // Aquí iría la llamada real, por ejemplo usando $fetch o axios
  // Ejemplo:
  // return await $fetch<ListByManagerResponse>(`/api/managers/${managerId}/accounts`, { params });

  // Mock de ejemplo
  return {
    accounts: [
      {
        id: 1,
        company: 'Cuenta 1',
        status: 'active',
        assignmentDate: '',
        lastContact: '2026-01-01',
        contacts: '',
        unassignmentDate: null
      },
      {
        id: 2,
        company: 'Cuenta 2',
        status: 'inactive',
        assignmentDate: '',
        lastContact: '2026-01-15',
        contacts: '',
        unassignmentDate: null
      },
    ],
    total: 2,
    page: params.page || 1,
    pageSize: 10,
  };
}
