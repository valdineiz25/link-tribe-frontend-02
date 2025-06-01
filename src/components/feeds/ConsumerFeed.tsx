
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useConsumer } from '@/hooks/useConsumer';
import { usePosts } from '@/hooks/usePosts';
import { Search, Heart, Tag, ShoppingBag, Filter, Clock, Zap, Trophy, Star, Users, Truck, Shield, MessageCircle, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const ConsumerFeed: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { posts, loading } = usePosts();
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  
  const {
    consumerProfile,
    wishlist,
    addToWishlist,
    trackProductView
  } = useConsumer();

  // Countdown para promoção do dia
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 12, seconds: 33 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: 'Todos', icon: '🛍️', color: 'bg-purple-600' },
    { name: 'Eletrônicos', icon: '📱', color: 'bg-blue-600' },
    { name: 'Moda', icon: '👗', color: 'bg-pink-600' },
    { name: 'Casa e Jardim', icon: '🏡', color: 'bg-green-600' },
    { name: 'Saúde e Beleza', icon: '💄', color: 'bg-orange-600' },
    { name: 'Esportes', icon: '⚽', color: 'bg-red-600' },
    { name: 'Livros', icon: '📚', color: 'bg-indigo-600' }
  ];

  // Ofertas relâmpago (simuladas)
  const flashOffers = [
    { product: 'Smartphone Galaxy', discount: 45, price: 899, oldPrice: 1599, soldToday: 32 },
    { product: 'Fone Bluetooth', discount: 60, price: 79, oldPrice: 199, soldToday: 127 },
    { product: 'Smartwatch Pro', discount: 35, price: 299, oldPrice: 459, soldToday: 18 },
    { product: 'Notebook Gamer', discount: 25, price: 2199, oldPrice: 2899, soldToday: 8 }
  ];

  // Top 10 mais vendidos
  const topSelling = posts
    .filter(post => post.productLink && post.productName)
    .slice(0, 10)
    .map((post, index) => ({ ...post, rank: index + 1 }));

  const filteredPosts = posts
    .filter(post => post.productLink && post.productName)
    .filter(post => selectedCategory === 'Todos' || post.category === selectedCategory)
    .filter(post => 
      !searchQuery || 
      post.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    toast({
      title: "🏷️ Categoria selecionada",
      description: `Mostrando produtos de: ${category}`,
    });
  };

  const handleBuyNow = (post: any) => {
    trackProductView(post.id, post.productName, post.user?.name || 'Afiliado');
    toast({
      title: "🛒 Redirecionando para a loja",
      description: "Link verificado! Você será direcionado para finalizar a compra.",
    });
    setTimeout(() => {
      window.open(post.productLink, '_blank');
    }, 1000);
  };

  const handleLikeProduct = (post: any) => {
    handleAddToWishlist(post);
  };

  const handleAddToWishlist = (post: any) => {
    if (post.productName && post.productLink) {
      const wishlistItem = {
        productId: post.id,
        productName: post.productName,
        productImage: post.media || '',
        currentPrice: post.currentPrice || 0,
        targetPrice: post.promotionalPrice,
        addedAt: new Date().toISOString(),
        storeUrl: post.productLink,
        affiliateLink: post.productLink
      };

      addToWishlist(wishlistItem);
      
      toast({
        title: "❤️ Produto favoritado!",
        description: "Salvo na sua lista de desejos",
      });
    }
  };

  const handleShare = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: post.productName,
        text: `Achei essa oferta incrível: ${post.productName}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "📤 Link copiado!",
        description: "Compartilhe essa oferta com seus amigos",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando ofertas incríveis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Fixo - Promoção do Dia */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-red-500 text-white p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-bold text-sm">🔴 PROMOÇÃO DO DIA</span>
          </div>
          <div className="flex items-center space-x-2 text-sm font-mono">
            <Clock size={16} />
            <span>Acaba em {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Barra de Busca */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar produtos, ofertas, marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border-gray-300 focus:border-purple-600 focus:ring-purple-600 rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categorias (Barra Fixa) */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Filter size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Categorias</span>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategorySelect(category.name)}
                  className={`flex items-center space-x-2 whitespace-nowrap ${
                    selectedCategory === category.name
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ofertas Relâmpago */}
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
                  onClick={() => setCurrentOfferIndex(Math.max(0, currentOfferIndex - 1))}
                >
                  <ChevronLeft size={14} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setCurrentOfferIndex(Math.min(flashOffers.length - 1, currentOfferIndex + 1))}
                >
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {flashOffers.slice(currentOfferIndex, currentOfferIndex + 2).map((offer, index) => (
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

        {/* Top 10 Mais Vendidos */}
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
              {topSelling.slice(0, 5).map((product) => (
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
                    onClick={() => handleBuyNow(product)}
                  >
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feed de Produtos - Posts de Afiliados */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="text-purple-600" size={20} />
            <h2 className="text-lg font-bold text-gray-900">Ofertas Selecionadas</h2>
            <Badge className="bg-purple-600 text-white">
              {filteredPosts.length} produtos
            </Badge>
          </div>

          {filteredPosts.length === 0 ? (
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-8 text-center">
                <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600">
                  {searchQuery 
                    ? `Nenhum resultado para "${searchQuery}"`
                    : selectedCategory !== 'Todos'
                    ? `Nenhum produto na categoria "${selectedCategory}"`
                    : 'Aguarde novos produtos sendo publicados!'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden">
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
                        onClick={() => handleBuyNow(post)}
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
                            onClick={() => handleLikeProduct(post)}
                            className="flex items-center space-x-1 text-gray-600 hover:text-red-500 p-2"
                          >
                            <Heart size={20} />
                            <span className="text-sm">Favoritar</span>
                          </Button>

                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toast({ title: "💬 Comentários", description: "Funcionalidade em desenvolvimento" })}
                            className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 p-2"
                          >
                            <MessageCircle size={20} />
                            <span className="text-sm">Perguntar</span>
                          </Button>

                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleShare(post)}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};
