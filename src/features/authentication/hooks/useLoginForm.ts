import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/schemas';
import { useAuth } from './useAuth';

export const useLoginForm = () => {
  const { login, isLoading, error, clearError } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // Clear any previous errors
    clearError();
    
    // Attempt login
    login(data.email, data.password);
  };

  // Clear auth errors when form values change
  const handleFieldChange = () => {
    if (error) {
      clearError();
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    error,
    handleFieldChange,
  };
};