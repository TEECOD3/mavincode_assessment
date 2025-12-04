import type { User, UserRepository } from '@/features/authentication/types/auth.types';
import { authApi } from '@/features/authentication/api/auth.api';

export class AuthRepository implements UserRepository {
  async authenticate(email: string, password: string): Promise<User | null> {
    const response = await authApi.login({ email, password });
    return response.success ? response.data.user : null;
  }

  async findById(id: string): Promise<User | null> {
    // In a real implementation, this would make an API call to get user by ID
    // For now, we'll use the token-based approach
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    const response = await authApi.getCurrentUser(token);
    return response.success && response.data?.id === id ? response.data : null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(_user: Omit<User, 'id'>): Promise<User> {
    // In a real implementation, this would create a new user
    // For this demo, we'll throw an error as user creation is not implemented
    throw new Error('User creation not implemented in this demo');
  }

  async validateToken(token: string): Promise<boolean> {
    const response = await authApi.validateSession(token);
    return response.data;
  }

  async getCurrentUserByToken(token: string): Promise<User | null> {
    const response = await authApi.getCurrentUser(token);
    return response.success ? response.data : null;
  }
}