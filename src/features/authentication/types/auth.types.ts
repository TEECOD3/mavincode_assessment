export type UserRole = 'ADMIN' | 'USER' | 'VIEWER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string; // ISO string instead of Date
  lastLoginAt?: string; // ISO string instead of Date
}

export interface UserSession {
  user: User;
  token: string;
  expiresAt: string; // ISO string instead of Date
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string; // ISO string instead of Date
}

// Repository interfaces
export interface UserRepository {
  authenticate(email: string, password: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
}

// UseCase interfaces
export interface AuthenticationUseCase {
  login(email: string, password: string): Promise<{ user: User; token: string }>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}