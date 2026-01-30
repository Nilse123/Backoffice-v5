// app/services/dashboard.ts
// Servicio para obtener resumen del dashboard (mock, listo para conectar a endpoint real)

// Tipo base para el resumen (ajustar según respuesta real del backend)
export interface DashboardSummary {
  totalCompanies: number;
  totalManagers: number;
  totalAccounts: number;
  activeCompanies: number;
  activeManagers: number;
  activeAccounts: number;
  // Agrega más campos según lo que devuelva el endpoint real
}

// Mock de datos
const mockSummary: DashboardSummary = {
  totalCompanies: 12,
  totalManagers: 5,
  totalAccounts: 120,
  activeCompanies: 10,
  activeManagers: 4,
  activeAccounts: 100
};

export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    // Cuando tengas el endpoint real, reemplaza por fetch/axios a {{DASHBOARD_SUMMARY}}
    return Promise.resolve(mockSummary);
  }
};
