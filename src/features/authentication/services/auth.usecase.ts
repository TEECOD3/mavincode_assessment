import type {
  User,
  AuthenticationUseCase,
  LoginCredentials,
} from "@/features/authentication/types/auth.types";
import { AuthService } from "./auth.service";

export class AuthUseCase implements AuthenticationUseCase {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    try {
      const credentials: LoginCredentials = { email, password };
      const result = await this.authService.login(credentials);

      return {
        user: result.user,
        token: result.token,
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      return await this.authService.getCurrentUser();
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      return await this.authService.isAuthenticated();
    } catch (error) {
      console.error("Authentication check error:", error);
      return false;
    }
  }

  async initializeAuth(): Promise<User | null> {
    const storedUser = this.authService.getStoredUser();
    const storedToken = this.authService.getStoredToken();

    if (!storedUser || !storedToken) {
      return null;
    }

    const isValid = await this.isAuthenticated();
    if (!isValid) {
      await this.logout();
      return null;
    }

    return storedUser;
  }

  async refreshUserData(): Promise<User | null> {
    return await this.getCurrentUser();
  }
}

export const authUseCase = new AuthUseCase();
