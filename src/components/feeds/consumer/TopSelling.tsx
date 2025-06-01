
import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TopSellingProduct {
  id: string;
  productName?: string;
  promotionalPrice?: number;
  rank: number;
}

interface TopSellingProps {
  products: TopSellingProduct[];
  onBuyNow: (product: TopSellingProduct) => void;
}

export const TopSelling: React.FC<TopSellingProps> = ({ products, onBuyNow }) => {
  return (
    <Card className="border-yellow-200 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Trophy className="text-yellow-600" size={20} />
          <h2 className="text-lg font-bold text-gray-900">🏆 Mais Vendidos</h2>
          <Badge className="bg-yellow-600 text-white">
            TOP 10
          </Badge>
        </div>
        
        <div className="space-y-2">
          {products.slice(0, 5).map((product) => (
            <div key={product.id} className="flex items-center space-x-3 bg-white rounded-lg p-2 border border-yellow-200">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                product.rank <= 3 ? 'bg-yellow-600' : 'bg-gray-400'
              }`}>
                {product.rank}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                  {product.productName}
                </h4>
                <div className="flex items-center space-x-2">
                  {product.promotionalPrice && (
                    <span className="text-sm font-bold text-green-600">
                      R$ {product.promotionalPrice.toFixed(2)}
                    </span>
                  )}
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500 fill-current" size={12} />
                    <span className="text-xs text-gray-600">4.8</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 text-xs"
                onClick={() => onBuyNow(product)}
              >
                Ver
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
