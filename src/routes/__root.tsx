import { Outlet } from 'react-router-dom';
import { RootLayout } from '@/app/layout';

export const Component = () => {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export default Component;