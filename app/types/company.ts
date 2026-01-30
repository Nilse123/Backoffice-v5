// Tipos para Company y relacionados (FE-302)

export interface Company {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  contacts?: CompanyContact[];
  featureFlags?: FeatureFlags;
  contracts?: CompanyContract[];
}

export interface CompanyContact {
  id: number;
  name: string;
  email: string;
  phone: string;
  position?: string;
}

export interface FeatureFlags {
  [key: string]: boolean;
}

export interface CompanyContract {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  fileUrl?: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
