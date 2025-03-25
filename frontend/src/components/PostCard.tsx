
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { MessageCircle, Heart } from 'lucide-react';
import { Comment, Post } from '@/types/post.type';
import { formatTimestamp } from '@/lib/utils';
import { createComment, getCommentsByPost, updateToggleLike } from '@/service/post.service';
import { CreateCommentForm } from './CreateCommentForm';

interface PostCardProps {
  post: Post;
  onLikeToggle: (postUpdate: Post) => void;
  onCommentAdded?: (postId: string, comments: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLikeToggle, onCommentAdded }) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setNewComments] = useState<Comment[]>([]);
  
  
  const setComments = async() => {
    try{
      const data = await getCommentsByPost(post.id);
      const comments = data.data.data;
      setNewComments(comments); 
    }catch{
      toast({
        title: "Error",
        description: "No se pudo cargar los comentarios",
        variant: "destructive",
      });
    }
    
  }
  

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
      const data = await updateToggleLike(post.id);
      onLikeToggle(data.data.data);
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
          <Link to={`/user/${post.user.username}`}>
            <Avatar className="h-10 w-10 cursor-pointer hover:opacity-90 transition-opacity">
              <AvatarImage src={post.user.userProfilePicture} alt={post.user.username} />
              <AvatarFallback>{post.user.username.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <Link 
              to={`/user/${post.user.username}`}
              className="font-medium text-foreground text-start hover:underline"
            >
              {post.user.username}
            </Link>
            <p className="text-xs text-muted-foreground">
              {formatTimestamp(new Date (post.createdAtFormatted))}
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
                post.likedByUser ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={handleLikeToggle}
              disabled={isLiking}
            >
              <Heart
                size={16}
                className="mr-1"
                fill={post.likedByUser ? "currentColor" : "none"}
              />
              <span className="text-sm">{post.likes}</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 px-2 rounded-full text-muted-foreground hover:text-foreground"
              onClick={async() => {
                if(!showComments) await setComments();
                setShowComments(!showComments);
              }}
            >
              <MessageCircle size={16} className="mr-1" />
              <span className="text-sm">
                {post.comments> 0 ? `${post.comments} comentarios` : 'Comentar'}
              </span>
            </Button>
          </div>
        </CardFooter>

        {showComments && (
          <div className="px-4 py-3 bg-muted/20 border-t border-border/40">
            {/* Sección de comentarios */}
            <div className="space-y-4">
              {comments.length> 0 && (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <Link to={`/user/${comment.user.username}`}>
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={comment.user.userProfilePicture} alt={comment.user.username} />
                          <AvatarFallback>{comment.user.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1">
                        <div className="bg-muted/30 rounded-lg px-6 py-2 text-start">
                          <Link 
                            to={`/user/${comment.user.username}`}
                            className="font-medium text-foreground text-sm hover:underline"
                          >
                            {comment.user.username}
                          </Link>
                          <p className="text-sm mt-1">{comment.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTimestamp(new Date(comment.createdAtFormatted))}
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
                    <AvatarImage src={user.profilePicture} alt={user.username} />
                    <AvatarFallback>{user.firstname.charAt(0) + user.lastname.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CreateCommentForm onSubmit={async (comment)=> {
                      await createComment(post.id, comment)
                      await setComments();
                      onCommentAdded && onCommentAdded(post.id, comments.length +1);
                  }}/>
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
