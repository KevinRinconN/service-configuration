
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import RegisterForm from '@/components/RegisterForm';

const Register = () => {
  const { user } = useAuth();
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/posts" replace />;
  }
  
  return (
    <AuthLayout 
      title="Crear una cuenta"
      subtitle="Regístrate para comenzar a usar la plataforma"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
