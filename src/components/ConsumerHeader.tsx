
import React from 'react';
import { ShoppingBag, Heart, Gift, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ConsumerHeaderProps {
  wishlistCount: number;
  personalizedOffersCount: number;
  onViewWishlist: () => void;
  onViewOffers: () => void;
}

const ConsumerHeader: React.FC<ConsumerHeaderProps> = ({ 
  wishlistCount, 
  personalizedOffersCount,
  onViewWishlist,
  onViewOffers 
}) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl shadow-lg mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <ShoppingBag size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold">Sua central de compras:</span>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                🛍️ Comprador
              </Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Heart size={14} />
                <span>{wishlistCount} itens na lista de desejos</span>
              </div>
              {personalizedOffersCount > 0 && (
                <div className="flex items-center space-x-1">
                  <Gift size={14} />
                  <span>{personalizedOffersCount} ofertas especiais</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewWishlist}
            className="text-white hover:bg-white/20 flex items-center space-x-1"
          >
            <Heart size={16} />
            <span className="hidden sm:inline">Lista</span>
          </Button>
          {personalizedOffersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewOffers}
              className="text-white hover:bg-white/20 flex items-center space-x-1 relative"
            >
              <Gift size={16} />
              <span className="hidden sm:inline">Ofertas</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerHeader;
