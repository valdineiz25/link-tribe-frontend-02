
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Smartphone Samsung Galaxy S24',
      price: 2499.99,
      originalPrice: 2999.99,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      rating: 4.8,
      category: 'Tecnologia',
      commission: 8,
      affiliate: 'TechMaster',
      discount: 17
    },
    {
      id: 2,
      name: 'Tênis Nike Air Max 270',
      price: 349.99,
      originalPrice: 449.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      rating: 4.6,
      category: 'Esportes',
      commission: 12,
      affiliate: 'SportsPro',
      discount: 22
    },
    {
      id: 3,
      name: 'Cafeteira Expresso Italiana',
      price: 189.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
      rating: 4.7,
      category: 'Casa',
      commission: 15,
      affiliate: 'HomeCafe',
      discount: 24
    },
    {
      id: 4,
      name: 'Fone Bluetooth Sony WH-1000XM5',
      price: 899.99,
      originalPrice: 1099.99,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      rating: 4.9,
      category: 'Tecnologia',
      commission: 10,
      affiliate: 'AudioTech',
      discount: 18
    }
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="text-orange-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Produtos em Destaque</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  -{product.discount}%
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  {product.rating}
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* Category & Affiliate */}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <span className="text-xs text-gray-500">por {product.affiliate}</span>
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 h-10">
                  {product.name}
                </h3>

                {/* Prices */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-green-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  
                  <div className="text-xs text-orange-600 font-medium">
                    Comissão: {product.commission}%
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  size="sm"
                >
                  <ExternalLink size={14} className="mr-2" />
                  Ver Produto
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
