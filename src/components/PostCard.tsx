
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Post, toggleLike } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

interface PostCardProps {
  post: Post;
  onLikeToggle: (postId: string, liked: boolean) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLikeToggle }) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'hace un momento';
    if (diffInMinutes < 60) return `hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const handleLikeToggle = async () => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para dar like a una publicación",
      });
      return;
    }
    
    setIsLiking(true);
    try {
      await toggleLike(post.id, user.id);
      onLikeToggle(post.id, !post.liked);
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "No se pudo procesar tu like",
        variant: "destructive",
      });
    } finally {
      setIsLiking(false);
    }
  };

  // Check if content is longer than ~100 characters
  const isLongContent = post.content.length > 280;
  const displayContent = showFullContent || !isLongContent 
    ? post.content 
    : `${post.content.substring(0, 280)}...`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow border-border/50">
        <CardHeader className="p-4 pb-2 flex flex-row items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.userProfilePicture} alt={post.userName} />
            <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-medium text-foreground">{post.userName}</p>
            <p className="text-xs text-muted-foreground">
              {formatTimestamp(post.timestamp)}
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-sm text-left leading-relaxed">
            {displayContent}
          </p>
          {isLongContent && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-xs font-medium text-primary mt-2 hover:underline focus:outline-none"
            >
              {showFullContent ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </CardContent>
        <CardFooter className="px-4 py-3 border-t border-border/40 flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className={`p-1 h-8 px-2 rounded-full flex items-center ${
                post.liked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={handleLikeToggle}
              disabled={isLiking}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={post.liked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="text-sm">{post.likes}</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 px-2 rounded-full text-muted-foreground hover:text-foreground"
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
                className="mr-1"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span className="text-sm">Comentar</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 px-2 rounded-full text-muted-foreground hover:text-foreground"
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
                className="mr-1"
              >
                <path d="M17 1l4 4-4 4"></path>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <path d="M7 23l-4-4 4-4"></path>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
              </svg>
              <span className="text-sm">Compartir</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PostCard;
