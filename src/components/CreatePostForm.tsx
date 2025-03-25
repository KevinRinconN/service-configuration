import { useState } from "react";
import { Button } from "./ui/button";
import { CardContent, CardFooter } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { toast } from '@/components/ui/use-toast';

import { CreatePost } from "@/types/post.type";

interface CreatePostFormProps{
    onSubmit?: (newPost: String) => void;
}

export const CreatePostForm = ({onSubmit}: CreatePostFormProps) => {
  const [newPostContent, setNewPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPostContent.trim()) {
      toast({
        title: "Publicación vacía",
        description: "Por favor escribe algo para publicar",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      onSubmit && onSubmit(newPostContent.trim());
      setNewPostContent("");
      toast({
        title: "Publicación creada",
        description: "Tu publicación ha sido creada exitosamente",  
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "No se pudo crear la publicación",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
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
      <CardFooter className="px-4 py-3 border-t border-border/40 flex justify-end">
        
        <Button type="submit" disabled={isSubmitting || !newPostContent.trim()}>
          {isSubmitting ? "Publicando..." : "Publicar"}
        </Button>
      </CardFooter>
    </form>
  );
};
