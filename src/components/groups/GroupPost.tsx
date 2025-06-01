
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GroupPostData {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  productImage?: string;
  linkPreview?: {
    logo: string;
    title: string;
    url: string;
  };
  actions: {
    likes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
}

interface GroupPostProps {
  post: GroupPostData;
}

export const GroupPost: React.FC<GroupPostProps> = ({ post }) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.actions.likes);

  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1);
    
    toast({
      title: newIsLiked ? "👍 Curtido!" : "💔 Descurtido!",
      description: newIsLiked ? "Você curtiu este post" : "Você descurtiu este post",
    });
  };

  const handleComment = () => {
    toast({
      title: "💬 Comentários",
      description: "Função de comentários em desenvolvimento",
    });
  };

  const handleShare = () => {
    toast({
      title: "🔗 Compartilhar",
      description: "Link copiado para a área de transferência",
    });
  };

  const handleSave = () => {
    const newIsSaved = !isSaved;
    setIsSaved(newIsSaved);
    toast({
      title: newIsSaved ? "📌 Salvo!" : "🗑️ Removido",
      description: newIsSaved ? "Post salvo nos favoritos" : "Post removido dos favoritos",
    });
  };

  return (
    <Card className="group-post bg-slate-800/70 border-purple-500/20 text-white shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4">
        {/* Header do Post */}
        <div className="post-header flex items-center space-x-3 mb-4">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="post-avatar w-10 h-10 rounded-full object-cover"
          />
          <div className="post-user flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-white">{post.author.name}</h4>
              {post.author.isVerified && (
                <Badge className="verified-badge bg-green-500/20 text-green-400 text-xs border-green-500/30">
                  ✅ Afiliado Verificado
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-400">{post.timestamp}</p>
          </div>
        </div>

        {/* Conteúdo do Post */}
        <div className="post-content mb-4">
          <p className="text-gray-100 mb-3">{post.content}</p>
          
          {post.productImage && (
            <img 
              src={post.productImage} 
              alt="Produto"
              className="post-image w-full h-64 object-cover rounded-lg mb-3"
            />
          )}

          {/* Preview do Link */}
          {post.linkPreview && (
            <div className="link-preview bg-slate-700/50 border border-purple-500/20 rounded-lg p-3 flex items-center space-x-3">
              <img 
                src={post.linkPreview.logo} 
                alt="Logo"
                className="w-8 h-8 rounded object-cover"
              />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{post.linkPreview.title}</p>
                <p className="text-gray-400 text-xs">{post.linkPreview.url}</p>
              </div>
            </div>
          )}
        </div>

        {/* Ações do Post */}
        <div className="post-actions flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`action-button like p-0 h-auto hover:bg-transparent transition-colors duration-300 ${
                isLiked ? 'text-red-400' : 'text-gray-300 hover:text-green-400'
              }`}
            >
              <Heart size={20} className={isLiked ? 'fill-current' : ''} />
              <span className="ml-1 text-sm">{likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleComment}
              className="action-button comment p-0 h-auto text-gray-300 hover:text-green-400 hover:bg-transparent transition-colors duration-300"
            >
              <MessageCircle size={20} />
              <span className="ml-1 text-sm">{post.actions.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="action-button share p-0 h-auto text-gray-300 hover:text-green-400 hover:bg-transparent transition-colors duration-300"
            >
              <Share2 size={20} />
              <span className="ml-1 text-sm">Compartilhar</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={`p-0 h-auto hover:bg-transparent transition-colors duration-300 ${
              isSaved ? 'text-yellow-400' : 'text-gray-300 hover:text-green-400'
            }`}
          >
            <Bookmark size={20} className={isSaved ? 'fill-current' : ''} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
