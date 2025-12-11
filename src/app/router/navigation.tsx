import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";
import { ROUTES, type RoutePath } from "./routes.config";

export const useAppNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = useCallback(
    (
      path: RoutePath | string,
      options?: {
        replace?: boolean;
        state?: unknown;
      }
    ) => {
      navigate(path, options);
    },
    [navigate]
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const goForward = useCallback(() => {
    navigate(1);
  }, [navigate]);

  const redirectToLogin = useCallback(
    (returnUrl?: string) => {
      const from = returnUrl || location.pathname;
      const state = { from: { pathname: from } };
      navigate(ROUTES.LOGIN, { state, replace: true });
    },
    [navigate, location]
  );

  const redirectToDashboard = useCallback(() => {
    navigate(ROUTES.DASHBOARD, { replace: true });
  }, [navigate]);

  const isCurrentRoute = useCallback(
    (path: RoutePath | string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  return {
    navigateTo,
    goBack,
    goForward,
    redirectToLogin,
    redirectToDashboard,
    isCurrentRoute,
    currentPath: location.pathname,
    currentState: location.state,
  };
};

export const useNavigationGuard = () => {
  const { redirectToLogin, redirectToDashboard } = useAppNavigation();

  const requireAuth = useCallback(
    (isAuthenticated: boolean, returnUrl?: string) => {
      if (!isAuthenticated) {
        redirectToLogin(returnUrl);
        return false;
      }
      return true;
    },
    [redirectToLogin]
  );

  const requireGuest = useCallback(
    (isAuthenticated: boolean) => {
      if (isAuthenticated) {
        redirectToDashboard();
        return false;
      }
      return true;
    },
    [redirectToDashboard]
  );

  return {
    requireAuth,
    requireGuest,
  };
};
