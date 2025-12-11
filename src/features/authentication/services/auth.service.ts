import type { User, LoginCredentials, LoginResponse } from '@/features/authentication/types/auth.types';
import { AuthRepository } from './auth.repository';
import { authApi } from '@/features/authentication/api/auth.api';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Invalid email format');
    }

    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const response = await authApi.login(credentials);
    
    if (!response.success) {
      throw new Error(response.message);
    }

    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user_data', JSON.stringify(response.data.user));

    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    try {
      return await this.authRepository.getCurrentUserByToken(token);
    } catch {
      this.logout();
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;

    try {
      return await this.authRepository.validateToken(token);
    } catch {
      this.logout();
      return false;
    }
  }

  getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('user_data');
      if (!userData) return null;
      
      const user = JSON.parse(userData);
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        lastLoginAt: user.lastLoginAt ? new Date(user.lastLoginAt) : undefined
      };
    } catch {
      return null;
    }
  }

  getStoredToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export const authService = new AuthService();