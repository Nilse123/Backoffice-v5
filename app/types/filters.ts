// Tipos base para filtros (FE-305)

export interface FilterParams {
  q?: string;
  status?: string;
  [key: string]: any;
}
