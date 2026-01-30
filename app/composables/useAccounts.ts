import { computed, isRef, type Ref } from 'vue'

export interface Account {
  id: number
  company: string
  status: string
  assignmentDate: string
  lastContact: string
  contacts: string
  unassignmentDate: string | null
  // Puedes agregar más campos según sea necesario
}

const mockAccounts: Account[] = [
  {
    id: 1,
    company: 'TechCorp Solutions',
    status: 'Activa',
    assignmentDate: '2024-01-15',
    lastContact: '2024-03-10',
    contacts: '15 contactos',
    unassignmentDate: null
  },
  {
    id: 2,
    company: 'InnovateLab',
    status: 'Activa',
    assignmentDate: '2024-02-20',
    lastContact: '2024-03-12',
    contacts: '8 contactos',
    unassignmentDate: null
  },
  {
    id: 3,
    company: 'GlobalTech Inc',
    status: 'Inactiva',
    assignmentDate: '2024-03-01',
    lastContact: '2024-03-05',
    contacts: '3 contactos',
    unassignmentDate: '2024-03-15'
  }
]

export function useAccounts() {
  // En el futuro, aquí puedes hacer fetch a una API
  // managerId puede ser null/undefined; en ese caso retornamos lista vacía
  const listByManager = (managerId?: number | null | Ref<number | null>) => {
    return computed(() => {
      const id = isRef(managerId) ? (managerId as Ref<number | null>).value : managerId
      if (id == null) return [] as Account[]
      // Por ahora, retorna todos los mockAccounts (puedes filtrar por managerId si agregas ese campo)
      return mockAccounts
    })
  }
  // Asignar cuenta a un manager (mock)
  // TODO: Integrar con backend llamando a {{ACCOUNT_ASSIGNMENTS}} (POST)
  const assignToManager = async (managerId: number, account: Account) => {
    // Simulación: agregar a mockAccounts (en real, hacer fetch)
    mockAccounts.push({ ...account, assignmentDate: new Date().toISOString().slice(0, 10), unassignmentDate: null })
    return true
  }

  // Desasignar cuenta de un manager (mock)
  // TODO: Integrar con backend llamando a {{ACCOUNT_ASSIGNMENTS}} (DELETE o PATCH)
  const unassignFromManager = async (managerId: number, accountId: number) => {
    // Simulación: marcar unassignmentDate (en real, hacer fetch)
    const acc = mockAccounts.find(a => a.id === accountId)
    if (acc) acc.unassignmentDate = new Date().toISOString().slice(0, 10)
    return true
  }

  return { listByManager, assignToManager, unassignFromManager }
}
