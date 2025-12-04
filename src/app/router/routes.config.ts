export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '/404',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

export interface RouteMetadata {
  title: string;
  description?: string;
  requireAuth: boolean;
  roles?: string[];
  breadcrumb?: string;
}

export const ROUTE_METADATA: Record<RoutePath, RouteMetadata> = {
  [ROUTES.HOME]: {
    title: 'Home',
    description: 'Dashboard home page',
    requireAuth: true,
  },
  [ROUTES.LOGIN]: {
    title: 'Login',
    description: 'User authentication',
    requireAuth: false,
  },
  [ROUTES.DASHBOARD]: {
    title: 'Dashboard',
    description: 'Main dashboard interface',
    requireAuth: true,
    breadcrumb: 'Dashboard',
  },
  [ROUTES.NOT_FOUND]: {
    title: 'Page Not Found',
    description: '404 - Page not found',
    requireAuth: false,
  },
};

export const getRouteMetadata = (path: RoutePath): RouteMetadata => {
  return ROUTE_METADATA[path];
};

export const isProtectedRoute = (path: string): boolean => {
  const metadata = ROUTE_METADATA[path as RoutePath];
  return metadata?.requireAuth ?? true;
};