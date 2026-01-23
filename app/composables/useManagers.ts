import { useState } from '#app'

export interface Manager {
  id: number
  name: string
  email: string
  phone: string
  company: string
  createdAt: string
}

export const useManagers = () => {
  const managers = useState<Manager[]>('managers', () => [
    {
      id: 1,
      name: 'Carlos García',
      email: 'carlos@techcorp.com',
      phone: '+1 (555) 111-2222',
      company: '1',
      createdAt: '2024-01-20'
    },
    {
      id: 2,
      name: 'María López',
      email: 'maria@innovatelab.com',
      phone: '+1 (555) 333-4444',
      company: '2',
      createdAt: '2024-02-10'
    }
  ])

  const addManager = (manager: Omit<Manager, 'id' | 'createdAt'>) => {
    const newId = Math.max(...managers.value.map(m => m.id), 0) + 1
    const today = new Date().toISOString().split('T')[0] || '2024-01-01'
    
    managers.value.push({
      id: newId,
      ...manager,
      createdAt: today
    })
  }

  const deleteManager = (id: number) => {
    managers.value = managers.value.filter(m => m.id !== id)
  }

  return {
    managers,
    addManager,
    deleteManager
  }
}
