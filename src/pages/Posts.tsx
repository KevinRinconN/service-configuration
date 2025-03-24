
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Post, getPosts, createPost } from '@/lib/api';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

const Posts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Fetch posts
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las publicaciones",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [user, navigate]);
  
  const handleLikeToggle = (postId: string, liked: boolean) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? { ...post, liked, likes: liked ? post.likes + 1 : post.likes - 1 }
        : post
    ));
  };
  
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) {
      toast({
        title: "Publicación vacía",
        description: "Por favor escribe algo para publicar",
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "No autenticado",
        description: "Debes iniciar sesión para publicar",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const newPost = await createPost(
        user.id,
        user.name,
        user.profilePicture,
        newPostContent.trim()
      );
      
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      toast({
        title: "Publicación creada",
        description: "Tu publicación ha sido creada exitosamente",
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la publicación",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 max-w-screen-md mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Publicaciones</h1>
            <p className="text-muted-foreground">Explora las últimas publicaciones de la comunidad</p>
          </div>
          
          <div className="space-y-6">
            <Card className="overflow-hidden shadow-sm border-border/50">
              <form onSubmit={handleCreatePost}>
                <CardContent className="p-4">
                  <Textarea
                    placeholder="¿Qué estás pensando?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={3}
                    className="resize-none focus:ring-primary"
                    disabled={isSubmitting}
                  />
                </CardContent>
                <CardFooter className="px-4 py-3 border-t border-border/40 flex justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className="p-2 text-muted-foreground hover:text-foreground rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="p-2 text-muted-foreground hover:text-foreground rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                    </button>
                  </div>
                  <Button type="submit" disabled={isSubmitting || !newPostContent.trim()}>
                    {isSubmitting ? 'Publicando...' : 'Publicar'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((n) => (
                  <Card key={n} className="overflow-hidden shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-3 w-[150px]" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 py-3 border-t border-border/40 flex justify-between">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-32" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay publicaciones disponibles</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onLikeToggle={handleLikeToggle} 
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Posts;
