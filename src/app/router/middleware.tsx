import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { AuthGuard } from '@/features/authentication';

export interface RouteMiddlewareConfig {
  requireAuth?: boolean;
  redirectTo?: string;
  roles?: string[];
}

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

export const createProtectedLoader = (loader?: () => Promise<unknown>) => {
  return async () => {
    if (loader) {
      return await loader();
    }
    return null;
  };
};

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-4">
        {error?.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  </div>
);

export const RouteErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={(error, info) => console.error('Route error:', error, info)}
    onReset={() => window.location.reload()}
  >
    {children}
  </ErrorBoundary>
);