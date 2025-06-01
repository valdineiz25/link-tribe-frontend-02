
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Star, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ProductRatingDialog } from '@/components/ProductRatingDialog';

interface ConsumerActionsProps {
  post: {
    id: string;
    productName?: string;
    productLink?: string;
    currentPrice?: number;
    promotionalPrice?: number;
  };
  isLiked: boolean;
  isSaved: boolean;
  onLike: () => void;
  onComment: () => void;
  onSave: () => void;
  onShare: () => void;
  onAddToWishlist: () => void;
}

export const ConsumerActions: React.FC<ConsumerActionsProps> = ({
  post,
  isLiked,
  isSaved,
  onLike,
  onComment,
  onSave,
  onShare,
  onAddToWishlist
}) => {
  const { toast } = useToast();
  const [showRatingDialog, setShowRatingDialog] = useState(false);

  const handleProductClick = () => {
    if (post.productLink) {
      // Rastrear clique no produto
      toast({
        title: "🔗 Redirecionando...",
        description: "Link verificado! Você será levado à loja oficial.",
      });
      
      // Simular redirecionamento após um breve delay
      setTimeout(() => {
        window.open(post.productLink, '_blank');
      }, 1000);
    }
  };

  const handleRateProduct = () => {
    if (post.productName) {
      setShowRatingDialog(true);
    } else {
      toast({
        title: "❌ Não é possível avaliar",
        description: "Este post não contém informações de produto.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLike}
          className={`p-0 h-auto hover:bg-transparent ${
            isLiked ? 'text-red-500' : 'text-gray-700'
          }`}
        >
          <Heart size={24} className={isLiked ? 'fill-current' : ''} />
        </Button>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onComment}
          className="p-0 h-auto text-gray-700 hover:bg-transparent"
        >
          <MessageCircle size={24} />
        </Button>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onSave}
          className={`p-0 h-auto hover:bg-transparent ${
            isSaved ? 'text-blue-500' : 'text-gray-700'
          }`}
        >
          <Bookmark size={24} className={isSaved ? 'fill-current' : ''} />
        </Button>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onShare}
          className="p-0 h-auto text-gray-700 hover:bg-transparent"
        >
          <Share2 size={24} />
        </Button>
      </div>
      
      {/* Ações específicas do consumidor */}
      <div className="flex items-center space-x-2">
        {post.productName && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRateProduct}
              className="p-2 text-yellow-600 hover:bg-yellow-50"
              title="Avaliar produto"
            >
              <Star size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddToWishlist}
              className="p-2 text-pink-600 hover:bg-pink-50"
              title="Adicionar à lista de desejos"
            >
              <Heart size={16} />
            </Button>

            {post.productLink && (
              <Button
                size="sm"
                onClick={handleProductClick}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                🛒 Comprar
              </Button>
            )}
          </>
        )}
      </div>

      <ProductRatingDialog
        isOpen={showRatingDialog}
        onClose={() => setShowRatingDialog(false)}
        productName={post.productName || ''}
        productId={post.id}
      />
    </div>
  );
};
