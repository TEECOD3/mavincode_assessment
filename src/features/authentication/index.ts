// Components
export { LoginForm } from '@/features/authentication/components/LoginForm';
export { AuthGuard } from '@/features/authentication/components/AuthGuard';
export { LogoutModal } from '@/features/authentication/components/LogoutModal';

// Utils
export { withAuthGuard } from '@/features/authentication/utils/withAuthGuard';

// Pages
export { LoginPage } from '@/features/authentication/pages/LoginPage';

// Hooks
export { useAuth } from '@/features/authentication/hooks/useAuth';
export { useLogin } from '@/features/authentication/hooks/useLogin';
export { useLoginForm } from '@/features/authentication/hooks/useLoginForm';

// Types
export type {
  User,
  UserRole,
  UserSession,
  LoginCredentials,
  LoginResponse,
  AuthState,
  ApiResponse,
  UserRepository,
  AuthenticationUseCase,
} from '@/features/authentication/types/auth.types';

// Services
export { authService } from '@/features/authentication/services/auth.service';
export { authUseCase } from '@/features/authentication/services/auth.usecase';

// Store actions
export {
  loginRequest,
  logoutRequest,
  initializeAuth,
} from '@/features/authentication/stores/auth.saga';