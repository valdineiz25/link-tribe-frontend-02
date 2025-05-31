
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Send, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface CommentSectionProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (content: string) => void;
  className?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  isOpen,
  onClose,
  comments,
  onAddComment,
  className = ""
}) => {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Erro",
        description: "Digite um comentário antes de enviar",
        variant: "destructive"
      });
      return;
    }

    onAddComment(newComment.trim());
    setNewComment('');
    toast({
      title: "💬 Comentário adicionado!",
      description: "Seu comentário foi publicado com sucesso",
    });
  };

  const handleLikeComment = (commentId: string) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  return (
    <div className={`${className}`}>
      {/* Add Comment Form */}
      <Card className="p-4 mb-4 border border-gray-200">
        <div className="space-y-3">
          <Textarea
            placeholder="Escreva seu comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="resize-none"
            rows={3}
          />
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitComment}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send size={16} className="mr-1" />
              Comentar
            </Button>
          </div>
        </div>
      </Card>

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {comments.map((comment) => (
            <Card key={comment.id} className="p-3 border border-gray-100">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                  {comment.author.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm text-gray-900">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-500">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikeComment(comment.id)}
                    className={`p-0 h-auto text-xs ${
                      likedComments.has(comment.id) ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <Heart 
                      size={14} 
                      className={`mr-1 ${likedComments.has(comment.id) ? 'fill-current' : ''}`}
                    />
                    {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
