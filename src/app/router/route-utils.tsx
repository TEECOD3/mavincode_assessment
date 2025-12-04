import { AuthGuard } from '@/features/authentication';

export interface RouteMiddlewareConfig {
  requireAuth?: boolean;
  redirectTo?: string;
  roles?: string[];
}

export const createProtectedLoader = (loader?: () => Promise<unknown>) => {
  return async () => {
    if (loader) {
      return await loader();
    }
    return null;
  };
};

export const withRouteProtection = (
  Component: React.ComponentType,
  config: RouteMiddlewareConfig = {}
) => {
  const ProtectedComponent = () => {
    const { requireAuth = true, redirectTo = '/login' } = config;

    return (
      <AuthGuard requireAuth={requireAuth} redirectTo={redirectTo}>
        <Component />
      </AuthGuard>
    );
  };

  ProtectedComponent.displayName = `withRouteProtection(${Component.displayName || Component.name})`;
  
  return ProtectedComponent;
};
