import React from 'react';
import { LoginForm } from '@/features/authentication/components/LoginForm';
import { AuthGuard } from '@/features/authentication/components/AuthGuard';

export const LoginPage: React.FC = () => {
  return (
    <AuthGuard requireAuth={false} redirectTo="/dashboard">
      <LoginForm />
    </AuthGuard>
  );
};