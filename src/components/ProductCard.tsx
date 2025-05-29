
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  affiliateLink: string;
  commission: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAffiliateClick = () => {
    window.open(product.affiliateLink, '_blank');
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discountPercentage}%
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <Heart size={16} />
          </Button>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 h-10">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-bold text-lg text-green-600">
              R$ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="text-xs text-gray-600 mb-3">
            Comissão: <span className="font-medium text-primary">
              {product.commission}%
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 px-4 pb-4">
        <Button 
          onClick={handleAffiliateClick}
          className="w-full"
          size="sm"
        >
          <ExternalLink size={16} className="mr-2" />
          Ver Produto
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
