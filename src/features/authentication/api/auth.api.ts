/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  User,
  LoginCredentials,
  LoginResponse,
  ApiResponse,
} from "@/features/authentication/types/auth.types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate a simple JWT-like token
const generateToken = (userId: string): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      userId,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    })
  );
  const signature = btoa(`signature_${userId}_${Date.now()}`);
  return `${header}.${payload}.${signature}`;
};

// Validate token and extract user ID
const validateToken = (token: string): string | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp < Date.now()) return null;

    return payload.userId;
  } catch {
    return null;
  }
};

class AuthApi {
  private async loadUsers(): Promise<User[]> {
    try {
      const response = await fetch("/data/users.json");
      if (!response.ok) {
        throw new Error("Failed to load users");
      }
      const users = await response.json();
      return users.map((user: any) => ({
        ...user,
        createdAt: user.createdAt, // Keep as ISO string
        lastLoginAt: user.lastLoginAt || undefined, // Keep as ISO string
      }));
    } catch (error) {
      console.error("Error loading users:", error);
      throw new Error("Failed to load user data");
    }
  }

  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<LoginResponse>> {
    await delay(500); // Simulate network delay

    try {
      const users = await this.loadUsers();
      const user = users.find(
        (u) =>
          u.email === credentials.email &&
          (u as any).password === credentials.password
      );

      if (!user) {
        return {
          data: null as any,
          message: "Invalid email or password",
          success: false,
          timestamp: new Date().toISOString(),
        };
      }

      // Update last login time (in a real app, this would be persisted)
      const updatedUser: User = {
        ...user,
        lastLoginAt: new Date().toISOString(),
      };

      const token = generateToken(user.id);

      return {
        data: {
          user: updatedUser,
          token,
        },
        message: "Login successful",
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch {
      return {
        data: null as any,
        message: "Authentication service unavailable",
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    await delay(200);

    return {
      data: undefined as any,
      message: "Logout successful",
      success: true,
      timestamp: new Date().toISOString(),
    };
  }

  async getCurrentUser(token: string): Promise<ApiResponse<User | null>> {
    await delay(300);

    try {
      const userId = validateToken(token);
      if (!userId) {
        return {
          data: null,
          message: "Invalid or expired token",
          success: false,
          timestamp: new Date().toISOString(),
        };
      }

      const users = await this.loadUsers();
      const user = users.find((u) => u.id === userId);

      if (!user) {
        return {
          data: null,
          message: "User not found",
          success: false,
          timestamp: new Date().toISOString(),
        };
      }

      return {
        data: user,
        message: "User retrieved successfully",
        success: true,
        timestamp: new Date().toISOString(),
      };
    } catch {
      return {
        data: null,
        message: "Failed to retrieve user",
        success: false,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async validateSession(token: string): Promise<ApiResponse<boolean>> {
    await delay(100);

    const userId = validateToken(token);
    return {
      data: userId !== null,
      message: userId ? "Session valid" : "Session invalid",
      success: true,
      timestamp: new Date().toISOString(),
    };
  }
}

export const authApi = new AuthApi();
