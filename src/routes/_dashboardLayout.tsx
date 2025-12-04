import { Outlet } from 'react-router-dom';
import { AuthGuard } from '@/features/authentication';
import { Navbar } from '@/components/layout/ResponsiveNavbar';

export const Component = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </AuthGuard>
  );
};

export default Component;