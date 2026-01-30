// Tipos para Manager y paginación (FE-303)

export interface Manager {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  createdAt: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
