
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  bio?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial mock user for development
const mockUser: User = {
  id: '1',
  name: 'Usuario Demo',
  email: 'usuario@demo.com',
  profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg',
  bio: 'Diseñador UX/UI apasionado por crear experiencias digitales hermosas y funcionales.'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation (in a real app, this would be a server request)
      if (email === 'usuario@demo.com' && password === 'password123') {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido de nuevo",
        });
        return;
      }
      
      // Invalid credentials
      throw new Error('Credenciales inválidas');
    } catch (error) {
      toast({
        title: "Error de inicio de sesión",
        description: "Correo electrónico o contraseña incorrectos",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user with the provided details
      const newUser: User = {
        id: (Math.random() * 1000).toFixed(0),
        name,
        email,
        profilePicture: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada",
      });
    } catch (error) {
      toast({
        title: "Error de registro",
        description: "No se pudo crear la cuenta",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  const updateProfile = async (userData: Partial<User>) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast({
          title: "Perfil actualizado",
          description: "Tus cambios han sido guardados",
        });
      }
    } catch (error) {
      toast({
        title: "Error al actualizar",
        description: "No se pudo actualizar el perfil",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
