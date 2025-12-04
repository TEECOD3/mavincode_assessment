import { Navigate } from 'react-router-dom';
import { AuthGuard } from '@/features/authentication';

export const Component = () => {
  return (
    <AuthGuard>
      <Navigate to="/dashboard" replace />
    </AuthGuard>
  );
};

export default Component;