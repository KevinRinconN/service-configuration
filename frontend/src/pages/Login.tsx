
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  const { user } = useAuth();
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/posts" replace />;
  }
  
  return (
    <AuthLayout 
      title="Bienvenido de nuevo"
      subtitle="Inicia sesión en tu cuenta para continuar"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
