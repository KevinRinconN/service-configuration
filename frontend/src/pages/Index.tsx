
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <main className="flex-1 flex items-center">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center py-12 md:py-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left space-y-6"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4">
                    La red social moderna
                  </span>
                </motion.div>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Conecta, comparte y descubre
                </motion.h1>
                <motion.p 
                  className="mt-4 text-xl text-muted-foreground max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Únete a nuestra comunidad y conecta con personas de todo el mundo.
                  Comparte tus ideas, descubre contenido inspirador y haz nuevas conexiones.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button 
                  onClick={() => navigate('/register')}
                  size="lg"
                  className="rounded-full px-8"
                >
                  Regístrate ahora
                </Button>
                <Button 
                  onClick={() => navigate('/login')}
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8"
                >
                  Iniciar sesión
                </Button>
              </motion.div>
              
              <motion.div 
                className="pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  Información 100% segura y privada
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-full flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-200 rounded-full filter blur-xl opacity-70"></div>
                <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-indigo-200 rounded-full filter blur-xl opacity-70"></div>
                
                <div className="glass rounded-3xl overflow-hidden shadow-xl relative z-10 transform rotate-1">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-16 flex items-center px-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="p-6 pb-8 bg-white">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="text-blue-600">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 w-20 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="h-20 bg-gray-100 rounded w-full"></div>
                      <div className="flex justify-between">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass rounded-3xl overflow-hidden shadow-xl absolute left-20 -bottom-14 z-0 transform rotate-3">
                  <div className="p-6 pb-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="ml-4">
                        <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 w-20 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="h-12 bg-gray-100 rounded w-full"></div>
                      <div className="flex justify-between">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
