
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-border/40 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold">
              S
            </div>
          </motion.div>
          <motion.span 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-xl font-bold"
          >
            SocialApp
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {user && (
            <>
              <Link to="/posts">
                <Button 
                  variant={location.pathname === '/posts' ? 'default' : 'ghost'}
                  className="rounded-full px-4"
                >
                  Publicaciones
                </Button>
              </Link>
              <Link to="/profile">
                <Button 
                  variant={location.pathname === '/profile' ? 'default' : 'ghost'}
                  className="rounded-full px-4"
                >
                  Perfil
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profilePicture} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate('/profile')}
                  >
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          
          {!user && (
            <>
              <Link to="/login">
                <Button 
                  variant="ghost"
                  className="rounded-full px-4"
                >
                  Iniciar sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button className="rounded-full px-4">
                  Registrarse
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-foreground rounded-md md:hidden focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12"/>
            ) : (
              <path d="M4 12h16M4 6h16M4 18h16"/>
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-border"
          >
            <div className="flex flex-col py-4 px-4 space-y-2">
              {user && (
                <>
                  <div className="flex items-center space-x-3 p-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profilePicture} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/posts" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant={location.pathname === '/posts' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                    >
                      Publicaciones
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant={location.pathname === '/profile' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                    >
                      Perfil
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start text-destructive"
                  >
                    Cerrar sesión
                  </Button>
                </>
              )}
              
              {!user && (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button 
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-start">
                      Registrarse
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
