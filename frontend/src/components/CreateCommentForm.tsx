import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { toast } from '@/components/ui/use-toast';
import { createComment } from "@/service/post.service";


interface CreateCommentFormProps{
    onSubmit?: (newComment: string) => Promise<void> | void;
}

export const CreateCommentForm = ({onSubmit}: CreateCommentFormProps) => {
    const handleAddComment = async () => {
    
        
        if (!newComment.trim()) {
          toast({
            title: "Comentario vacío",
            description: "Por favor escribe algo para comentar",
          });
          return;
        }
        
        setIsSubmittingComment(true);
        try {
            onSubmit && (await onSubmit(newComment.trim()));
          setNewComment('');
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
    const [newComment, setNewComment] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  return (
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
          {isSubmittingComment ? "Enviando..." : "Comentar"}
        </Button>
      </div>
    </div>
  );
};
