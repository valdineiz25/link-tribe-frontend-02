
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  User,
  ExternalLink
} from 'lucide-react';

interface Post {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  image?: string;
  productLink?: string;
  category: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface CardPostProps {
  post: Post;
}

const CardPost: React.FC<CardPostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Post da AffiliateNet',
        text: post.content,
        url: window.location.href,
      });
    } else {
      // Fallback para copiar para clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {post.authorAvatar ? (
              <img 
                src={post.authorAvatar} 
                alt={post.authorName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <User size={20} className="text-gray-500" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{post.authorName}</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{post.timestamp}</span>
              <span>•</span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.content}</p>
        
        {post.image && (
          <div className="mb-4">
            <img 
              src={post.image} 
              alt="Post image"
              className="w-full rounded-lg object-cover max-h-96"
            />
          </div>
        )}

        {post.productLink && (
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary">Link de Afiliado</p>
                <p className="text-xs text-gray-600">Clique para acessar o produto</p>
              </div>
              <Button size="sm" className="ml-4">
                <ExternalLink size={16} className="mr-2" />
                Acessar
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                isLiked ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              <Heart 
                size={18} 
                className={isLiked ? 'fill-current' : ''} 
              />
              <span>{likesCount}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600">
              <MessageCircle size={18} />
              <span>{post.comments}</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-600"
            >
              <Share2 size={18} />
              <span>Compartilhar</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardPost;
