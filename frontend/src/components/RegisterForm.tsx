
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Textarea } from './ui/textarea';

const registerSchema = z.object({
  username: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  firstname: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastname: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  bio: z.string(),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      firstname: '',
      lastname: '',
      bio: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await registerUser(data.username, data.firstname, data.lastname, data.email, data.bio, data.password, "ADMIN");
      navigate('/posts');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-start">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="JuanPerez"
          disabled={isLoading}
          {...register('username')}
          className={errors.username ? 'border-destructive' : ''}
        />
        {errors.username && (
          <p className="text-sm text-destructive mt-1">{errors.username.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="firstname">Nombre</Label>
        <Input
          id="firstname"
          type="text"
          placeholder="Juan"
          disabled={isLoading}
          {...register('firstname')}
          className={errors.firstname ? 'border-destructive' : ''}
        />
        {errors.firstname && (
          <p className="text-sm text-destructive mt-1">{errors.firstname.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastname">Apellido</Label>
        <Input
          id="lastname"
          type="text"
          placeholder="Perez"
          disabled={isLoading}
          {...register('lastname')}
          className={errors.lastname ? 'border-destructive' : ''}
        />
        {errors.lastname && (
          <p className="text-sm text-destructive mt-1">{errors.lastname.message}</p>
        )}
      </div>
      
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
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Desarrollador de sistemas"
          autoComplete="bio"
          disabled={isLoading}
          {...register('bio')}
          className={errors.bio ? 'border-destructive' : ''}
        />
        {errors.bio && (
          <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          disabled={isLoading}
          {...register('password')}
          className={errors.password ? 'border-destructive' : ''}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          disabled={isLoading}
          {...register('confirmPassword')}
          className={errors.confirmPassword ? 'border-destructive' : ''}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full"
      >
        {isLoading ? 'Cargando...' : 'Crear cuenta'}
      </Button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
