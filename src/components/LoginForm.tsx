
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/posts');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@ejemplo.com"
          autoComplete="email"
          disabled={isLoading}
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Contraseña</Label>
          <a href="#" className="text-sm font-medium text-primary hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={isLoading}
          {...register('password')}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
        )}
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full"
      >
        {isLoading ? 'Cargando...' : 'Iniciar sesión'}
      </Button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Registrarse
          </Link>
        </p>
      </div>
      
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            O continúa con
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" disabled={isLoading} className="focus-ring">
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.0003 4.87402C13.3203 4.87402 14.9103 5.21402 16.0003 6.26402L19.0703 3.19402C17.0903 1.36402 14.7603 0.474018 12.0003 0.474018C7.37033 0.474018 3.41033 3.26402 1.39033 7.22402L4.91033 9.90402C5.85033 7.00402 8.66033 4.87402 12.0003 4.87402Z" fill="#EA4335"/>
            <path d="M23.49 12.27C23.49 11.48 23.42 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.24 16.07 18.09L19.45 20.82C21.67 18.71 23.49 15.82 23.49 12.27Z" fill="#4285F4"/>
            <path d="M4.91022 14.0959C4.66022 13.4459 4.51022 12.7359 4.51022 11.9999C4.51022 11.2639 4.66022 10.5539 4.91022 9.90389L1.39022 7.22389C0.490215 8.63389 0.000215 10.2739 0.000215 11.9999C0.000215 13.7259 0.490215 15.3659 1.39022 16.7759L4.91022 14.0959Z" fill="#FBBC05"/>
            <path d="M12.0001 23.5289C14.7601 23.5289 17.1001 22.6089 18.9601 20.8189L15.5801 18.0889C14.5301 18.7989 13.3101 19.2589 12.0001 19.2589C8.66007 19.2589 5.86007 17.1289 4.91007 14.0989L1.39007 16.7789C3.41007 20.7389 7.37007 23.5289 12.0001 23.5289Z" fill="#34A853"/>
          </svg>
          Google
        </Button>
        <Button variant="outline" type="button" disabled={isLoading} className="focus-ring">
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65685 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60263H15.1922C13.95 8.60263 13.5625 9.37883 13.5625 10.1611V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3431 21.2452 22 17.0828 22 12.0611Z" fill="#1877F2"/>
          </svg>
          Facebook
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
