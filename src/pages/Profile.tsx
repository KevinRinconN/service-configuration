
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import ProfileCard from '@/components/ProfileCard';
import PageTransition from '@/components/PageTransition';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null;
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 max-w-screen-md mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Mi perfil</h1>
            <p className="text-muted-foreground">Visualiza y edita tu información personal</p>
          </div>
          
          <ProfileCard />
        </main>
      </div>
    </PageTransition>
  );
};

export default Profile;
