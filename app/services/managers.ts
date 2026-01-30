import type { Manager, Paginated } from '~/types/manager'

interface ListManagersParams {
  page?: number
  status?: string
  q?: string
}

// Mock de almacenamiento local (solo para simular persistencia en memoria)
let MANAGER_DB: Manager[] = [
  { id: 1, name: 'Ana Torres', email: 'ana@empresa.com', phone: '+1 555-1001', company: '1', createdAt: '2025-12-01' },
  { id: 2, name: 'Luis Gómez', email: 'luis@empresa.com', phone: '+1 555-1002', company: '1', createdAt: '2025-12-02' },
  { id: 3, name: 'Sofía Ruiz', email: 'sofia@otra.com', phone: '+1 555-1003', company: '2', createdAt: '2025-12-03' },
  { id: 4, name: 'Carlos Pérez', email: 'carlos@otra.com', phone: '+1 555-1004', company: '2', createdAt: '2025-12-04' },
  { id: 5, name: 'María López', email: 'maria@empresa.com', phone: '+1 555-1005', company: '1', createdAt: '2025-12-05' }
];

export async function createManager(data: Omit<Manager, 'id' | 'createdAt'>): Promise<Manager> {
  await new Promise(res => setTimeout(res, 400));
  const newManager: Manager = {
    ...data,
    id: Math.max(0, ...MANAGER_DB.map(m => m.id)) + 1,
    createdAt: new Date().toISOString().split('T')[0] || new Date().toISOString().substring(0, 10)
  };
  MANAGER_DB.unshift(newManager);
  return newManager;
}

export async function updateManager(id: number, data: Partial<Omit<Manager, 'id' | 'createdAt'>>): Promise<Manager | null> {
  await new Promise(res => setTimeout(res, 400));
  const idx = MANAGER_DB.findIndex(m => m.id === id);
  if (idx === -1) return null;
  const manager = MANAGER_DB[idx]!;
  MANAGER_DB[idx] = { 
    ...manager,
    name: data.name ?? manager.name,
    email: data.email ?? manager.email,
    phone: data.phone ?? manager.phone,
    company: data.company ?? manager.company
  };
  return MANAGER_DB[idx]!;
}

// Simulación de un servicio paginado para managers
export async function list({ page = 1, status, q }: ListManagersParams = {}): Promise<Paginated<Manager>> {
  // Sin delay artificial: responde inmediato
  let filtered = MANAGER_DB;
  if (q) {
    const qLower = q.toLowerCase();
    filtered = filtered.filter(m => m.name.toLowerCase().includes(qLower) || m.email.toLowerCase().includes(qLower));
  }
  if (status) {
    // En este mock no hay status, pero aquí se filtraría por status si existiera
  }
  const pageSize = 3;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  return {
    items,
    total: filtered.length,
    page,
    pageSize
  };
}

export async function deleteManager(id: number): Promise<boolean> {
  await new Promise(res => setTimeout(res, 400));
  const idx = MANAGER_DB.findIndex(m => m.id === id);
  if (idx === -1) return false;
  MANAGER_DB.splice(idx, 1);
  return true;
}
