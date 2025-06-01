
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useConsumer } from '@/hooks/useConsumer';
import { usePosts } from '@/hooks/usePosts';
import { Search, Heart, Tag, ShoppingBag, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ConsumerHeader from '@/components/ConsumerHeader';
import { ConsumerActions } from '@/components/ConsumerActions';

export const ConsumerFeed: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { posts, loading } = usePosts();
  
  const {
    consumerProfile,
    wishlist,
    addToWishlist,
    trackProductView
  } = useConsumer();

  const categories = [
    'Todos',
    'Eletrônicos',
    'Moda',
    'Casa e Jardim',
    'Saúde e Beleza',
    'Esportes',
    'Livros e Educação'
  ];

  const personalizedOffers = posts
    .filter(post => post.productLink && post.productName)
    .slice(0, 6);

  const filteredPosts = posts
    .filter(post => post.productLink && post.productName)
    .filter(post => selectedCategory === 'Todos' || post.category === selectedCategory)
    .filter(post => 
      !searchQuery || 
      post.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value) {
      toast({
        title: "🔍 Buscando produtos",
        description: `Procurando por "${value}"...`,
      });
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    toast({
      title: "🏷️ Categoria selecionada",
      description: `Filtrando por: ${category}`,
    });
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
      trackProductView(post.id, post.productName, post.user?.name || 'Afiliado');
      
      toast({
        title: "❤️ Produto salvo!",
        description: "Adicionado à sua lista de desejos",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando ofertas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Header do Consumidor */}
        <ConsumerHeader
          wishlistCount={wishlist.length}
          personalizedOffersCount={personalizedOffers.length}
          onViewWishlist={() => toast({ title: "❤️ Lista de Desejos", description: "Funcionalidade em desenvolvimento" })}
          onViewOffers={() => toast({ title: "🎁 Ofertas Personalizadas", description: "Confira os produtos selecionados para você!" })}
        />

        {/* Barra de Busca */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar produtos, ofertas..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-4 py-3 border-gray-300 focus:border-purple-600 focus:ring-purple-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Filtros de Categoria */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Filter size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Categorias</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category)}
                  className={
                    selectedCategory === category
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seção "Ofertas para Você" */}
        {personalizedOffers.length > 0 && (
          <Card className="border-purple-200 shadow-sm bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="text-purple-600" size={20} />
                <h2 className="text-lg font-bold text-gray-900">Ofertas para Você</h2>
                <Badge className="bg-purple-600 text-white">
                  {personalizedOffers.length} produtos
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {personalizedOffers.slice(0, 4).map((post) => (
                  <div key={post.id} className="bg-white rounded-lg p-3 border border-purple-200">
                    {post.media && (
                      <img 
                        src={post.media} 
                        alt={post.productName}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                    )}
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                      {post.productName}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="text-xs">
                        {post.promotionalPrice && (
                          <span className="text-green-600 font-bold">
                            R$ {post.promotionalPrice.toFixed(2)}
                          </span>
                        )}
                        {post.currentPrice && (
                          <span className="text-gray-500 line-through ml-1">
                            R$ {post.currentPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddToWishlist(post)}
                        className="h-6 px-2 text-xs bg-purple-600 hover:bg-purple-700"
                      >
                        <Heart size={12} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Feed de Produtos */}
        <div className="space-y-4">
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
              <Card key={post.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  {/* Header do Post */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {post.user?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{post.user?.name || 'Afiliado Verificado'}</h4>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-gray-500">{new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                        <Badge variant="outline" className="text-purple-600 border-purple-200">
                          Link Verificado
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <p className="text-gray-900 mb-3">{post.content || post.description}</p>

                  {/* Imagem do Produto */}
                  {post.media && (
                    <img 
                      src={post.media} 
                      alt={post.productName}
                      className="w-full h-64 object-cover rounded-lg mb-3"
                    />
                  )}

                  {/* Info do Produto */}
                  {post.productName && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start space-x-2">
                          <ShoppingBag size={16} className="text-purple-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{post.productName}</h4>
                            {post.storeName && (
                              <p className="text-xs text-gray-500">{post.storeName}</p>
                            )}
                          </div>
                        </div>
                        {post.currentPrice && post.promotionalPrice && (
                          <Badge className="bg-red-100 text-red-600">
                            -{Math.round(((post.currentPrice - post.promotionalPrice) / post.currentPrice) * 100)}%
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {post.promotionalPrice && (
                            <span className="text-lg font-bold text-green-600">
                              R$ {post.promotionalPrice.toFixed(2)}
                            </span>
                          )}
                          {post.currentPrice && (
                            <span className={post.promotionalPrice ? 'line-through text-gray-500 text-sm' : 'text-lg font-bold text-gray-900'}>
                              R$ {post.currentPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => window.open(post.productLink, '_blank')}
                        >
                          🛒 Comprar Agora
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Ações do Consumidor */}
                  <ConsumerActions
                    post={post}
                    isLiked={false}
                    isSaved={false}
                    onLike={() => toast({ title: "❤️ Curtido!", description: "Produto marcado como favorito" })}
                    onComment={() => toast({ title: "💬 Comentários", description: "Funcionalidade em desenvolvimento" })}
                    onSave={() => toast({ title: "🔖 Salvo!", description: "Post salvo nos favoritos" })}
                    onShare={() => toast({ title: "📤 Compartilhado!", description: "Link copiado para área de transferência" })}
                    onAddToWishlist={() => handleAddToWishlist(post)}
                  />
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
