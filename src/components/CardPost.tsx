
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  User,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import EditPostDialog from '@/components/EditPostDialog';

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
  productName?: string;
  currentPrice?: number;
  promotionalPrice?: number;
  storeName?: string;
}

interface CardPostProps {
  post: Post;
  onUpdatePost?: (updatedPost: Post) => void;
  isOwner?: boolean;
}

const CardPost: React.FC<CardPostProps> = ({ post, onUpdatePost, isOwner = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [currentPost, setCurrentPost] = useState(post);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Post da AffiliateNet',
        text: currentPost.content,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handlePostUpdate = (updatedPost: Post) => {
    setCurrentPost(updatedPost);
    if (onUpdatePost) {
      onUpdatePost(updatedPost);
    }
  };

  const discountPercentage = currentPost.currentPrice && currentPost.promotionalPrice
    ? Math.round(((currentPost.currentPrice - currentPost.promotionalPrice) / currentPost.currentPrice) * 100)
    : 0;

  return (
    <Card className="w-full max-w-2xl mx-auto mb-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-3 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
              {currentPost.authorAvatar ? (
                <img 
                  src={currentPost.authorAvatar} 
                  alt={currentPost.authorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User size={20} className="text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{currentPost.authorName}</h3>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{currentPost.timestamp}</span>
                <span>•</span>
                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                  {currentPost.category}
                </span>
              </div>
            </div>
          </div>
          {isOwner && (
            <EditPostDialog 
              post={currentPost} 
              onSave={handlePostUpdate}
            />
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Informações do Produto */}
        {currentPost.productName && (
          <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-lg text-orange-700 flex items-center">
                <ShoppingBag size={18} className="mr-2" />
                {currentPost.productName}
              </h4>
              {discountPercentage > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  -{discountPercentage}% OFF
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {currentPost.promotionalPrice && currentPost.promotionalPrice > 0 && (
                  <span className="text-xl font-bold text-green-600">
                    R$ {currentPost.promotionalPrice.toFixed(2)}
                  </span>
                )}
                {currentPost.currentPrice && currentPost.currentPrice > 0 && (
                  <span className={`${currentPost.promotionalPrice && currentPost.promotionalPrice > 0 ? 'line-through text-gray-500 text-sm' : 'text-xl font-bold text-orange-600'}`}>
                    R$ {currentPost.currentPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {currentPost.storeName && (
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {currentPost.storeName}
                </span>
              )}
            </div>
          </div>
        )}

        <p className="text-gray-800 mb-4 whitespace-pre-wrap">{currentPost.content}</p>
        
        {currentPost.image && (
          <div className="mb-4">
            <img 
              src={currentPost.image} 
              alt="Post image"
              className="w-full rounded-lg object-cover max-h-96 border shadow-sm"
            />
          </div>
        )}

        {currentPost.productLink && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">🔥 Link de Afiliado</p>
                <p className="text-xs opacity-90">Clique e garante o seu!</p>
              </div>
              <Button 
                size="sm" 
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold"
                onClick={() => window.open(currentPost.productLink, '_blank')}
              >
                <ExternalLink size={16} className="mr-2" />
                COMPRAR
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 bg-gray-50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-2 hover:bg-red-50 ${
                isLiked ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              <Heart 
                size={18} 
                className={isLiked ? 'fill-current' : ''} 
              />
              <span className="font-medium">{likesCount}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:bg-blue-50">
              <MessageCircle size={18} />
              <span className="font-medium">{currentPost.comments}</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-600 hover:bg-green-50"
            >
              <Share2 size={18} />
              <span className="font-medium">Compartilhar</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardPost;
