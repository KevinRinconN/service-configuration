import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import PageTransition from "@/components/PageTransition";
import { toast } from "@/components/ui/use-toast";
import { Post } from "@/types/post.type";
import { getLikedPosts, getPosts } from "@/service/post.service";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostList } from "@/components/PostsList";
import { ApiInterface } from "@/types/api.type";
import { AxiosResponse } from "axios";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    fetchPosts();
  }, [user, navigate, tab]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let posts;
      if (tab == "liked") {
        const data = await getLikedPosts(user.username);
        posts = data.data.data;
      } else {
        const data = await getPosts({
          username: user.username,
        });
        posts = data.data.data.content;
      }
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las publicaciones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 max-w-screen-md w-full mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Mi perfil</h1>
            <p className="text-muted-foreground">
              Visualiza y edita tu información personal
            </p>
          </div>

          <ProfileCard />
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
          ) : (
            <div>
              <div className="mb-6">
                <Tabs value={tab} onValueChange={setTab} className="w-fit">
                  <TabsList>
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="liked">Que has dado like</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No hay publicaciones disponibles
                </p>
              </div>
              ) : (
              <PostList posts={posts} setPosts={setPosts} />)}
            </div>
          )}
        </main>
      </div>
    </PageTransition>
  );
};

export default Profile;
