import { useState } from '#app'

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

  const addCompany = (company: Omit<Company, 'id' | 'createdAt'>) => {
    const newId = Math.max(...companies.value.map(c => c.id), 0) + 1
    const today = new Date().toISOString().split('T')[0] || '2024-01-01'
    
    companies.value.push({
      id: newId,
      ...company,
      createdAt: today
    })
  }

  const deleteCompany = (id: number) => {
    companies.value = companies.value.filter(c => c.id !== id)
  }

  return {
    companies,
    addCompany,
    deleteCompany
  }
}
