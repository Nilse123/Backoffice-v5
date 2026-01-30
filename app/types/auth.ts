// app/types/auth.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  roles: string[];
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}
