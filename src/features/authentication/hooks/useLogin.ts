import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export const useLogin = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});

  const validateForm = useCallback((data: LoginFormData): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  }, []);

  const updateField = useCallback((field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field-specific error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear general error when user makes changes
    if (error) {
      clearError();
    }
  }, [formErrors, error, clearError]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormErrors({});
    
    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Attempt login
    login(formData.email, formData.password);
  }, [formData, validateForm, login]);

  const resetForm = useCallback(() => {
    setFormData({ email: '', password: '' });
    setFormErrors({});
    clearError();
  }, [clearError]);

  return {
    formData,
    formErrors,
    isLoading,
    error,
    updateField,
    handleSubmit,
    resetForm,
  };
};