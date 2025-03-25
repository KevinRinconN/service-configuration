import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { PostList } from "@/components/PostsList";
import { getLikedPosts, getPosts } from "@/service/post.service";
import { getUserById } from "@/service/auth.service";
import { UserInfo } from "@/types/auth.type";
import { Post } from "@/types/post.type";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserInfo | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const dataUser = await getUserById(userId);
        const user = dataUser.data.data;

        if (!user) {
          toast({
            title: "Usuario no encontrado",
            description: "No se pudo encontrar el perfil solicitado",
            variant: "destructive",
          });
          navigate("/posts");
          return;
        }

        let posts;

        if (tab == "liked") {
          const data = await getLikedPosts(user.username);
          posts = data.data.data;
        }else if (tab == "likedByMe") {
          const data = await getPosts({
            username: user.username,
            liked: true,
          });
          posts = data.data.data.content;
        } else {
          const data = await getPosts({
            username: user.username,
          });
          posts = data.data.data.content;
        }

        setProfile(user);
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar el perfil del usuario",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate, tab]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 max-w-screen-md w-full mx-auto px-4 sm:px-6 py-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            onClick={handleGoBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            Volver
          </Button>

          {loading ? (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2 mt-4 text-center">
                      <Skeleton className="h-6 w-40 mx-auto" />
                      <Skeleton className="h-4 w-60 mx-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {[1, 2].map((n) => (
                <Card key={n}>
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
                </Card>
              ))}
            </div>
          ) : (
            <>
              {profile && (
                <div className="mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="overflow-hidden shadow-md">
                      <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                      <CardContent className="relative -mt-12 p-6">
                        <div className="flex flex-col items-center">
                          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                            <AvatarImage
                              src={profile.profilePicture}
                              alt={profile.username}
                            />
                            <AvatarFallback className="text-3xl">
                              {profile.firstname.charAt(0) +
                                profile.lastname.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="mt-4 text-center">
                            <h2 className="text-2xl font-bold">
                              {profile.username}
                            </h2>
                            {profile.bio && (
                              <p className="text-muted-foreground mt-2 max-w-md">
                                {profile.bio}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              )}

              <div className="mb-6">
                <Tabs value={tab} onValueChange={setTab} className="w-fit">
                  <TabsList>
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="liked">likes</TabsTrigger>
                    <TabsTrigger value="likedByMe">Que has dado like</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Este usuario aún no ha publicado nada
                  </p>
                </div>
              ) : (
                <PostList posts={posts} setPosts={setPosts} />
              )}
            </>
          )}
        </main>
      </div>
    </PageTransition>
  );
};

export default UserProfilePage;
