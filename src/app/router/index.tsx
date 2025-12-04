import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RouteErrorBoundary } from './middleware';
import { ROUTES } from './routes.config';
import type { JSX } from 'react/jsx-runtime';

const RootRoute = lazy(() => import('@/routes/__root'));
const IndexRoute = lazy(() => import('@/routes/index'));
const LoginRoute = lazy(() => import('@/routes/login'));
const DashboardLayoutRoute = lazy(() => import('@/routes/_dashboardLayout'));
const DashboardRoute = lazy(() => import('@/routes/_dashboardLayout/dashboard'));
const NotFoundRoute = lazy(() => import('@/routes/404'));

const RouteLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-2 text-sm text-gray-600">Loading...</p>
    </div>
  </div>
);

const LazyRoute = ({ Component }: { Component: React.LazyExoticComponent<() => JSX.Element> }) => (
  <RouteErrorBoundary>
    <Suspense fallback={<RouteLoader />}>
      <Component />
    </Suspense>
  </RouteErrorBoundary>
);

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <LazyRoute Component={RootRoute} />,
    errorElement: <RouteErrorBoundary><div>Route Error</div></RouteErrorBoundary>,
    children: [
      {
        index: true,
        element: <LazyRoute Component={IndexRoute} />,
      },
      {
        path: 'login',
        element: <LazyRoute Component={LoginRoute} />,
      },
      {
        path: 'dashboard',
        element: <LazyRoute Component={DashboardLayoutRoute} />,
        children: [
          {
            index: true,
            element: <LazyRoute Component={DashboardRoute} />,
          },
        ],
      },
      {
        path: '*',
        element: <LazyRoute Component={NotFoundRoute} />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />
}