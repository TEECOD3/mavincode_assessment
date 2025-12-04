import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import type { RootState } from '@/lib/stores';
import { loginRequest, logoutRequest, initializeAuth } from '@/features/authentication/stores/auth.saga';
import { clearError } from '@/features/authentication/stores/auth.slice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const login = useCallback((email: string, password: string) => {
    dispatch(loginRequest({ email, password }));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const initialize = useCallback(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return {
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
    clearError: clearAuthError,
    initialize,
  };
};