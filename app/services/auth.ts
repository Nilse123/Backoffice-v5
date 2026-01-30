// app/services/auth.ts
import type { LoginRequest, LoginResponse, AuthUser } from '../types/auth';

// Mock user data
type AuthState = {
  user: AuthUser | null;
  token: string | null;
};

const mockUser: AuthUser = {
  id: 1,
  email: 'admin@griky.com',
  name: 'Admin',
  roles: ['admin']
};

const mockToken = 'mocked.jwt.token';

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    // Simula validación
    if (payload.email === 'admin@griky.com' && payload.password === 'admin') {
      return Promise.resolve({
        user: mockUser,
        token: mockToken
      });
    }
    return Promise.reject(new Error('Credenciales inválidas'));
  },

  async logout(): Promise<void> {
    // Simula logout
    return Promise.resolve();
  },

  async getUser(): Promise<AuthUser | null> {
    // Simula obtener usuario autenticado
    return Promise.resolve(mockUser);
  }
};
