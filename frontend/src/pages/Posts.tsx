
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { Post } from '@/types/post.type';
import { getPosts } from '@/service/post.service';
import { CreatePostForm } from '@/components/CreatePostForm';
import { createPost } from "@/service/post.service";
import { PostList } from '@/components/PostsList';

const Posts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Fetch posts
    fetchPosts();
  }, [user, navigate]);
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      const posts = data.data.data.content;
      setPosts(posts);
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
  
  
  
  const createNewPost = async(post: string) => {
        const data = await createPost({
            content:  post,
            userId: user.username
        });
        const newPost = data.data.data
        setPosts([newPost, ...posts]);
  }

  
  if (!user) {
    return null;
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 max-w-screen-md w-full mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Publicaciones</h1>
            <p className="text-muted-foreground">Explora las últimas publicaciones de la comunidad</p>
          </div>
          
          <div className="space-y-6">
            <Card className="overflow-hidden shadow-sm border-border/50">
              <CreatePostForm onSubmit={createNewPost}/>
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
              <PostList posts={posts} setPosts={setPosts}/>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Posts;
