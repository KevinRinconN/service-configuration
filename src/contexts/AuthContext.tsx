
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { authLogin, createUser, getProfile } from '@/service/auth.service';

// Define user type
export interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  profilePicture: string;
  bio?: string;
  token: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string,firstname: string,lastname: string, email: string,bio: string, password: string, rol: string) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);


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

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      const {data} = await authLogin(username, password);
      const userData = await getProfile(data.data.accessToken);
      const user = {...userData.data.data, token: data.data.accessToken}
      // Mock validation (in a real app, this would be a server request)
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido de nuevo",
        });
        return;
      }
      
      // Invalid credentials
      throw new Error('Credenciales inválidas');
    } catch (error) {
      console.log(error)
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

  const register = async (username: string,firstname: string,lastname: string, email: string, bio: string, password: string, rol: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      const dataUser = await createUser({
        username,
        firstname,
        lastname,
        email,
        bio,
        password,
        rol
      });
      
      const {data} = await authLogin(username, password);
      const newUser = {...dataUser.data.data, token: data.data.accessToken}
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

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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
