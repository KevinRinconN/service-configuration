
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileCard: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
    },
  });

  if (!user) return null;

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      await updateProfile(data as Partial<User>);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden shadow-md">
        <CardHeader className="relative p-0">
          <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="pt-12 pb-4 px-6">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <Textarea
                  id="bio"
                  {...register('bio')}
                  rows={3}
                  placeholder="Escribe un poco sobre ti..."
                />
              </div>
              
              <div className="flex space-x-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Guardando...' : 'Guardar cambios'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              
              {user.bio && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Acerca de</h3>
                  <p className="text-sm">{user.bio}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        {!isEditing && (
          <CardFooter className="px-6 py-4 flex justify-center border-t border-border/40">
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
              Editar perfil
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
