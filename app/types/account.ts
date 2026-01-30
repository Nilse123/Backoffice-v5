// Tipos para Account, Assignment y paginación (FE-304)

export interface Account {
  id: number;
  company: string;
  status: string;
  assignmentDate: string;
  lastContact: string;
  contacts: string;
  unassignmentDate: string | null;
  // Puedes agregar más campos según sea necesario
}

export interface Assignment {
  accountId: number;
  managerId: number;
  assignedAt: string;
  unassignedAt?: string | null;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
