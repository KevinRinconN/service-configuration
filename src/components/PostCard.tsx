
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Post, toggleLike, addComment } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';
import { MessageCircle, Heart, Share2 } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLikeToggle: (postId: string, liked: boolean) => void;
  onCommentAdded?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLikeToggle, onCommentAdded }) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  
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

  const handleAddComment = async () => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para comentar",
      });
      return;
    }
    
    if (!newComment.trim()) {
      toast({
        title: "Comentario vacío",
        description: "Por favor escribe algo para comentar",
      });
      return;
    }
    
    setIsSubmittingComment(true);
    try {
      await addComment(post.id, user.id, user.name, user.profilePicture, newComment.trim());
      
      setNewComment('');
      if (onCommentAdded) {
        onCommentAdded(post.id);
      }
      
      toast({
        title: "Comentario añadido",
        description: "Tu comentario ha sido publicado correctamente",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir el comentario",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingComment(false);
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
          <Link to={`/user/${post.userId}`}>
            <Avatar className="h-10 w-10 cursor-pointer hover:opacity-90 transition-opacity">
              <AvatarImage src={post.userProfilePicture} alt={post.userName} />
              <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <Link 
              to={`/user/${post.userId}`}
              className="font-medium text-foreground hover:underline"
            >
              {post.userName}
            </Link>
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
              <Heart
                size={16}
                className="mr-1"
                fill={post.liked ? "currentColor" : "none"}
              />
              <span className="text-sm">{post.likes}</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 px-2 rounded-full text-muted-foreground hover:text-foreground"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle size={16} className="mr-1" />
              <span className="text-sm">
                {post.comments.length > 0 ? `${post.comments.length} comentarios` : 'Comentar'}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 px-2 rounded-full text-muted-foreground hover:text-foreground"
            >
              <Share2 size={16} className="mr-1" />
              <span className="text-sm">Compartir</span>
            </Button>
          </div>
        </CardFooter>

        {showComments && (
          <div className="px-4 py-3 bg-muted/20 border-t border-border/40">
            {/* Sección de comentarios */}
            <div className="space-y-4">
              {post.comments.length > 0 && (
                <div className="space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <Link to={`/user/${comment.userId}`}>
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={comment.userProfilePicture} alt={comment.userName} />
                          <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1">
                        <div className="bg-muted/30 rounded-lg px-3 py-2">
                          <Link 
                            to={`/user/${comment.userId}`}
                            className="font-medium text-foreground text-sm hover:underline"
                          >
                            {comment.userName}
                          </Link>
                          <p className="text-sm mt-1">{comment.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTimestamp(comment.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Formulario para añadir comentario */}
              {user && (
                <div className="flex space-x-3 mt-4">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder="Escribe un comentario..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={1}
                      className="resize-none min-h-[2.5rem] text-sm py-2"
                      disabled={isSubmittingComment}
                    />
                    <div className="flex justify-end">
                      <Button 
                        size="sm" 
                        onClick={handleAddComment}
                        disabled={isSubmittingComment || !newComment.trim()}
                      >
                        {isSubmittingComment ? 'Enviando...' : 'Comentar'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {!user && (
                <div className="text-center py-2">
                  <p className="text-sm text-muted-foreground">
                    <Link to="/login" className="text-primary hover:underline">
                      Inicia sesión
                    </Link>{' '}
                    para comentar
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default PostCard;
