
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useConsumer } from '@/hooks/useConsumer';
import { usePosts } from '@/hooks/usePosts';
import { Tag, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { PromotionBanner } from './consumer/PromotionBanner';
import { SearchBar } from './consumer/SearchBar';
import { CategoryFilter } from './consumer/CategoryFilter';
import { FlashOffers } from './consumer/FlashOffers';
import { TopSelling } from './consumer/TopSelling';
import { ConsumerProductCard } from './consumer/ConsumerProductCard';

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
      <PromotionBanner timeLeft={timeLeft} />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Barra de Busca */}
        <SearchBar 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />

        {/* Categorias (Barra Fixa) */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        {/* Ofertas Relâmpago */}
        <FlashOffers 
          offers={flashOffers}
          currentOfferIndex={currentOfferIndex}
          onPrevious={() => setCurrentOfferIndex(Math.max(0, currentOfferIndex - 1))}
          onNext={() => setCurrentOfferIndex(Math.min(flashOffers.length - 1, currentOfferIndex + 1))}
        />

        {/* Top 10 Mais Vendidos */}
        <TopSelling 
          products={topSelling}
          onBuyNow={handleBuyNow}
        />

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
              <ConsumerProductCard 
                key={post.id}
                post={post}
                onBuyNow={handleBuyNow}
                onLikeProduct={handleLikeProduct}
                onShare={handleShare}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
