
import React from 'react';
import { Zap, ChevronLeft, ChevronRight, ShoppingBag, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FlashOffer {
  product: string;
  discount: number;
  price: number;
  oldPrice: number;
  soldToday: number;
}

interface FlashOffersProps {
  offers: FlashOffer[];
  currentOfferIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const FlashOffers: React.FC<FlashOffersProps> = ({ 
  offers, 
  currentOfferIndex, 
  onPrevious, 
  onNext 
}) => {
  return (
    <Card className="border-orange-200 shadow-lg bg-gradient-to-r from-orange-50 to-red-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Zap className="text-orange-600" size={20} />
            <h2 className="text-lg font-bold text-gray-900">Ofertas Relâmpago</h2>
            <Badge className="bg-red-600 text-white animate-pulse">
              ⚡ ÚLTIMAS HORAS
            </Badge>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={onPrevious}
            >
              <ChevronLeft size={14} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              onClick={onNext}
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {offers.slice(currentOfferIndex, currentOfferIndex + 2).map((offer, index) => (
            <div key={index} className="bg-white rounded-lg p-3 border border-orange-200 shadow-sm">
              <div className="relative mb-2">
                <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold">
                  -{offer.discount}%
                </Badge>
                <div className="w-full h-20 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                  <ShoppingBag className="text-gray-400" size={24} />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                {offer.product}
              </h3>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-bold text-red-600">
                    R$ {offer.price}
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    R$ {offer.oldPrice}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-orange-600">
                  <Users size={10} />
                  <span>{offer.soldToday} compraram hoje</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
