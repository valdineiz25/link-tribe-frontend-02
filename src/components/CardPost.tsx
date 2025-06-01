import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  User,
  ExternalLink,
  ShoppingBag,
  MoreHorizontal,
  Bookmark,
  Repeat,
  BarChart3,
  Edit,
  Shield
} from 'lucide-react';
import EditPostDialog from '@/components/EditPostDialog';
import CommentSection from '@/components/CommentSection';
import { ConsumerActions } from '@/components/ConsumerActions';
import { AffiBoostIndicator } from '@/components/AffiBoostIndicator';
import { useToast } from '@/hooks/use-toast';
import { useConsumer } from '@/hooks/useConsumer';

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
  affiBoostScore?: number;
  rankingFactors?: {
    engagementScore: number;
    conversionScore: number;
    affiliateScore: number;
    trendingBonus: number;
  };
  isSponsored?: boolean;
  isOwnProduct?: boolean;
}

interface CardPostProps {
  post: Post;
  onUpdatePost?: (updatedPost: Post) => void;
  isOwner?: boolean;
  isAffiliateView?: boolean;
  isConsumerView?: boolean;
}

const CardPost: React.FC<CardPostProps> = ({ 
  post, 
  onUpdatePost, 
  isOwner = false,
  isAffiliateView = false,
  isConsumerView = false 
}) => {
  const { toast } = useToast();
  const { addToWishlist, trackProductView } = useConsumer();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [commentsCount, setCommentsCount] = useState(post.comments);
  const [currentPost, setCurrentPost] = useState(post);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [postComments, setPostComments] = useState<any[]>([]);
  const [showAffiBoostDetails, setShowAffiBoostDetails] = useState(false);

  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1);
    
    toast({
      title: newIsLiked ? "❤️ Curtido!" : "💔 Descurtido!",
      description: newIsLiked ? "Você curtiu este post" : "Você descurtiu este post",
    });
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: 'Você',
      content,
      timestamp: 'agora',
      likes: 0
    };

    setPostComments(prev => [...prev, newComment]);
    setCommentsCount(prev => prev + 1);
    setShowComments(false);
  };

  const handleShare = () => {
    if (isConsumerView) {
      // Compartilhamento sem comissão para consumidores
      if (navigator.share) {
        navigator.share({
          title: 'Produto interessante',
          text: currentPost.content,
          url: window.location.href,
        }).then(() => {
          toast({
            title: "📤 Compartilhado!",
            description: "Produto compartilhado com seus amigos",
          });
        }).catch(() => {
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: "📤 Link copiado!",
            description: "Link copiado para a área de transferência",
          });
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "📤 Link copiado!",
          description: "Link copiado para a área de transferência",
        });
      }
    } else {
      // Compartilhamento normal para afiliados
      if (navigator.share) {
        navigator.share({
          title: 'Post da AffiliateNet',
          text: currentPost.content,
          url: window.location.href,
        });
      }
    }
  };

  const handleSave = () => {
    const newIsSaved = !isSaved;
    setIsSaved(newIsSaved);
    toast({
      title: newIsSaved ? "🔖 Post salvo!" : "🗑️ Post removido dos salvos",
      description: newIsSaved ? "Post adicionado aos seus favoritos" : "Post removido dos seus favoritos",
    });
  };

  const handleAddToWishlist = () => {
    if (currentPost.productName && currentPost.productLink) {
      const wishlistItem = {
        productId: currentPost.id,
        productName: currentPost.productName,
        productImage: currentPost.image || '',
        currentPrice: currentPost.currentPrice || 0,
        targetPrice: currentPost.promotionalPrice,
        addedAt: new Date().toISOString(),
        storeUrl: currentPost.productLink,
        affiliateLink: currentPost.productLink
      };

      const success = addToWishlist(wishlistItem);
      if (success) {
        toast({
          title: "❤️ Adicionado à lista!",
          description: "Produto salvo na sua lista de desejos",
        });

        // Rastrear visualização do produto
        trackProductView(currentPost.id, currentPost.productName, post.authorName);
      }
    }
  };

  const handleRepost = () => {
    toast({
      title: "🔄 Repostando...",
      description: "Escolha os grupos onde deseja compartilhar",
    });
  };

  const handleViewStats = () => {
    toast({
      title: "📊 Estatísticas",
      description: "Visualizações: 245 | Cliques: 12 | Conversões: 3",
    });
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
    <Card className="w-full max-w-lg mx-auto mb-4 border border-gray-200 shadow-sm bg-white rounded-xl overflow-hidden">
      {/* Header */}
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {currentPost.authorAvatar ? (
                <img 
                  src={currentPost.authorAvatar} 
                  alt={currentPost.authorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                currentPost.authorName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900">{currentPost.authorName}</h3>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <span>{currentPost.timestamp}</span>
                <span>•</span>
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                  {currentPost.category}
                </span>
                
                {/* Tags diferenciadas por tipo de usuário */}
                {currentPost.isOwnProduct && isAffiliateView && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                    Seu Produto
                  </Badge>
                )}
                {isConsumerView && currentPost.isSponsored && (
                  <div className="flex items-center space-x-1">
                    <Badge variant="outline" className="text-xs text-gray-500 flex items-center space-x-1">
                      <Shield size={10} />
                      <span>Link Verificado</span>
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* AffiBoost Score (apenas para afiliados) */}
          {isAffiliateView && currentPost.affiBoostScore && (
            <div 
              className="cursor-pointer"
              onClick={() => setShowAffiBoostDetails(!showAffiBoostDetails)}
            >
              <AffiBoostIndicator 
                score={currentPost.affiBoostScore} 
                compact={true}
              />
            </div>
          )}
          
          {isOwner && (
            <EditPostDialog 
              post={currentPost} 
              onSave={handlePostUpdate}
            />
          )}
          <Button variant="ghost" size="icon" className="w-8 h-8 text-gray-400">
            <MoreHorizontal size={20} />
          </Button>
        </div>

        {/* AffiBoost Details (apenas para afiliados) */}
        {isAffiliateView && showAffiBoostDetails && currentPost.affiBoostScore && (
          <div className="mt-3">
            <AffiBoostIndicator 
              score={currentPost.affiBoostScore}
              rankingFactors={currentPost.rankingFactors}
              showDetails={true}
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        {/* Post content */}
        <div className="px-4 pb-3">
          <p className="text-gray-900 text-sm leading-relaxed">{currentPost.content}</p>
        </div>
        
        {/* Image */}
        {currentPost.image && (
          <div className="w-full">
            <img 
              src={currentPost.image} 
              alt="Post image"
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        {/* Product info */}
        {currentPost.productName && (
          <div className="mx-4 my-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-2">
                <ShoppingBag size={16} className="text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">{currentPost.productName}</h4>
                  {currentPost.storeName && (
                    <p className="text-xs text-gray-500">{currentPost.storeName}</p>
                  )}
                </div>
              </div>
              {discountPercentage > 0 && (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                  -{discountPercentage}%
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {currentPost.promotionalPrice && currentPost.promotionalPrice > 0 && (
                  <span className="text-lg font-bold text-green-600">
                    R$ {currentPost.promotionalPrice.toFixed(2)}
                  </span>
                )}
                {currentPost.currentPrice && currentPost.currentPrice > 0 && (
                  <span className={`${currentPost.promotionalPrice && currentPost.promotionalPrice > 0 ? 'line-through text-gray-500 text-sm' : 'text-lg font-bold text-gray-900'}`}>
                    R$ {currentPost.currentPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {currentPost.productLink && (
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                  onClick={() => window.open(currentPost.productLink, '_blank')}
                >
                  Ver produto
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>

      {/* Footer - Ações diferenciadas por tipo de usuário */}
      <CardFooter className="p-4 pt-2">
        <div className="w-full">
          {isConsumerView ? (
            <ConsumerActions
              post={currentPost}
              isLiked={isLiked}
              isSaved={isSaved}
              onLike={handleLike}
              onComment={handleComment}
              onSave={handleSave}
              onShare={handleShare}
              onAddToWishlist={handleAddToWishlist}
            />
          ) : (
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`p-0 h-auto hover:bg-transparent ${
                    isLiked ? 'text-red-500' : 'text-gray-700'
                  }`}
                >
                  <Heart 
                    size={24} 
                    className={isLiked ? 'fill-current' : ''} 
                  />
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleComment}
                  className="p-0 h-auto text-gray-700 hover:bg-transparent"
                >
                  <MessageCircle size={24} />
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleShare}
                  className="p-0 h-auto text-gray-700 hover:bg-transparent"
                >
                  <Share2 size={24} />
                </Button>
              </div>
            </div>
          )}
          
          {/* Likes count */}
          <div className="text-sm font-semibold text-gray-900 mb-1">
            {likesCount} curtidas
          </div>
          
          {/* Comments preview */}
          {commentsCount > 0 && (
            <div className="text-sm text-gray-500 mb-2">
              Ver todos os {commentsCount} comentários
            </div>
          )}

          {/* Comments Section */}
          {showComments && (
            <div className="mt-4">
              <CommentSection
                isOpen={showComments}
                onClose={() => setShowComments(false)}
                comments={postComments}
                onAddComment={handleAddComment}
              />
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardPost;
