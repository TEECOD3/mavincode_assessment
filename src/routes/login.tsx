import { LoginPage } from '@/features/authentication';
import { AuthGuard } from '@/features/authentication';

export const Component = () => {
  return (
    <AuthGuard requireAuth={false}>
      <LoginPage />
    </AuthGuard>
  );
};

export default Component;