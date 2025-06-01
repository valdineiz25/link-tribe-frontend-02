
import React from 'react';
import { Heart, MessageCircle, Share2, Shield, Truck, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Post {
  id: string;
  user?: {
    name: string;
  };
  content?: string;
  media?: string;
  productName?: string;
  storeName?: string;
  currentPrice?: number;
  promotionalPrice?: number;
  productLink?: string;
  createdAt: string;
}

interface ConsumerProductCardProps {
  post: Post;
  onBuyNow: (post: Post) => void;
  onLikeProduct: (post: Post) => void;
  onShare: (post: Post) => void;
}

export const ConsumerProductCard: React.FC<ConsumerProductCardProps> = ({ 
  post, 
  onBuyNow, 
  onLikeProduct, 
  onShare 
}) => {
  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden">
      <CardContent className="p-0">
        {/* Header do Post */}
        <div className="flex items-center space-x-3 p-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {post.user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{post.user?.name || 'Afiliado Verificado'}</h4>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500">{new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <Shield size={10} className="mr-1" />
                Link Verificado
              </Badge>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        {post.content && (
          <div className="px-4 py-3">
            <p className="text-gray-900">{post.content}</p>
          </div>
        )}

        {/* Imagem do Produto */}
        {post.media && (
          <div className="relative">
            <img 
              src={post.media} 
              alt={post.productName}
              className="w-full h-64 object-cover"
            />
            {post.currentPrice && post.promotionalPrice && (
              <Badge className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold">
                -{Math.round(((post.currentPrice - post.promotionalPrice) / post.currentPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
        )}

        {/* Info do Produto */}
        {post.productName && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">{post.productName}</h4>
                {post.storeName && (
                  <p className="text-sm text-gray-600">📍 {post.storeName}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                {post.promotionalPrice && (
                  <span className="text-2xl font-bold text-purple-600">
                    R$ {post.promotionalPrice.toFixed(2)}
                  </span>
                )}
                {post.currentPrice && (
                  <span className={post.promotionalPrice ? 'line-through text-gray-500 text-sm' : 'text-2xl font-bold text-gray-900'}>
                    {post.promotionalPrice ? 'De: ' : ''}R$ {post.currentPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex flex-col items-end space-y-1">
                <div className="flex items-center space-x-1 text-green-600 text-sm">
                  <Truck size={14} />
                  <span>🚀 Frete Grátis</span>
                </div>
                <div className="flex items-center space-x-1 text-orange-600 text-sm">
                  <Users size={14} />
                  <span>23 pessoas compraram hoje</span>
                </div>
              </div>
            </div>

            {/* Botão Principal de Compra */}
            <Button 
              onClick={() => onBuyNow(post)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg text-lg mb-3 shadow-lg hover:shadow-xl transition-all"
            >
              🛒 Ver Oferta
            </Button>

            {/* Ações do Consumidor */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLikeProduct(post)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500 p-2"
                >
                  <Heart size={20} />
                  <span className="text-sm">Favoritar</span>
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 p-2"
                >
                  <MessageCircle size={20} />
                  <span className="text-sm">Perguntar</span>
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onShare(post)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-500 p-2"
                >
                  <Share2 size={20} />
                  <span className="text-sm">Compartilhar</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
