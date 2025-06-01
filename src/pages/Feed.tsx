import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { useConsumer } from '@/hooks/useConsumer';
import FeedHeader from '@/components/FeedHeader';
import CategoryFilter from '@/components/CategoryFilter';
import PostCreation from '@/components/PostCreation';
import RestrictedPostCreation from '@/components/RestrictedPostCreation';
import PostList from '@/components/PostList';
import Stories from '@/components/Stories';
import AffiliateHeader from '@/components/AffiliateHeader';
import ConsumerHeader from '@/components/ConsumerHeader';
import AffiliateStorePreview from '@/components/AffiliateStorePreview';
import CreateStoreButton from '@/components/CreateStoreButton';
import StoreCreationWizard from '@/components/StoreCreationWizard';
import { AffiBoostDashboard } from '@/components/AffiBoostDashboard';
import { useToast } from '@/hooks/use-toast';
import { usePosts } from '@/hooks/usePosts';
import { useAffiBoost } from '@/hooks/useAffiBoost';

const Feed: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [showAffiBoostDashboard, setShowAffiBoostDashboard] = useState(false);
  const [showStoreWizard, setShowStoreWizard] = useState(false);
  const { posts, loading } = usePosts();
  
  // User role e affiliate data
  const { 
    userRole, 
    affiliateStats, 
    loading: roleLoading, 
    isAffiliate, 
    canCreateStore, 
    hasStore 
  } = useUserRole();

  // Consumer data
  const {
    consumerProfile,
    wishlist,
    loading: consumerLoading,
    isConsumer,
    canCreatePosts
  } = useConsumer();
  
  // Aplicar algoritmo AffiBoost
  const { 
    rankedPosts, 
    isRanking, 
    algorithmStats, 
    updateTrendingProducts,
    getCategoryStats 
  } = useAffiBoost(posts);

  const categories = [
    'Todos',
    'Saúde',
    'Tecnologia',
    'Moda',
    'Casa e Jardim',
    'Esportes',
    'Educação',
    'Beleza',
    'Eletrônicos',
    'Alimentação'
  ];

  const handleUpdatePost = (updatedPost: any) => {
    toast({
      title: "Post atualizado",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    toast({
      title: "Categoria alterada",
      description: `Exibindo posts de: ${category}`,
    });
  };

  const handleTogglePostCreation = () => {
    if (!canCreatePosts) {
      toast({
        title: "🔒 Ação restrita",
        description: "Usuários compradores não podem criar posts de produtos. Cadastre-se como afiliado para vender!",
        variant: "destructive"
      });
      return;
    }
    
    setIsCreatingPost(!isCreatingPost);
    if (!isCreatingPost) {
      toast({
        title: "Criar novo post",
        description: "Compartilhe algo interessante com a comunidade!",
      });
    }
  };

  const handleTrendingUpdate = (categories: string[]) => {
    updateTrendingProducts(categories);
    toast({
      title: "🔥 Trending atualizado!",
      description: `${categories.length} categorias agora recebem boost`,
    });
  };

  const handleNotificationClick = () => {
    toast({
      title: "🔔 Notificações",
      description: "João comprou seu produto via seu link! +R$ 15,90",
    });
  };

  const handleViewWishlist = () => {
    toast({
      title: "❤️ Lista de Desejos",
      description: `Você tem ${wishlist.length} produtos salvos!`,
    });
  };

  const handleViewOffers = () => {
    toast({
      title: "🎁 Ofertas Personalizadas",
      description: "Confira os descontos especiais selecionados para você!",
    });
  };

  const handleEditStore = () => {
    toast({
      title: "🏪 Editor de Loja",
      description: "Redirecionando para o editor...",
    });
    // Aqui redirecionaria para /store-builder
  };

  const handleCreateStore = () => {
    setShowStoreWizard(true);
  };

  const handleStoreCreated = () => {
    toast({
      title: "🎉 Loja publicada!",
      description: "Sua loja já está disponível no feed e pode receber visitas.",
    });
    // Atualizar dados do usuário
  };

  const handleViewAnalytics = () => {
    toast({
      title: "📊 Analytics",
      description: "Abrindo relatório detalhado...",
    });
  };

  // Usar posts ranqueados pelo AffiBoost
  const postsToShow = rankedPosts.length > 0 ? rankedPosts : posts;

  // Filtrar posts baseado no tipo de usuário
  let filteredPosts = postsToShow;
  if (isConsumer) {
    // Para usuários compradores, mostrar apenas posts com tag discreta
    filteredPosts = postsToShow.map(post => ({
      ...post,
      isSponsored: post.productLink ? true : false
    }));
  }

  // Converter posts para o formato esperado pelo PostList
  const formattedPosts = filteredPosts.map(post => ({
    id: post.id,
    authorName: post.user?.name || 'Usuário',
    authorAvatar: post.user?.avatar,
    content: post.content || post.description || '',
    image: post.media && post.mediaType?.startsWith('image/') ? post.media : undefined,
    productLink: post.productLink,
    category: post.category || 'Geral',
    likes: post.likes || 0,
    comments: post.comments || 0,
    timestamp: new Date(post.createdAt).toLocaleDateString('pt-BR'),
    productName: post.productName,
    currentPrice: post.currentPrice,
    promotionalPrice: post.promotionalPrice,
    storeName: post.storeName,
    affiBoostScore: (post as any).affiBoostScore,
    rankingFactors: (post as any).rankingFactors,
    isSponsored: (post as any).isSponsored,
    isOwnProduct: isAffiliate && post.user?.id === user?.id
  }));

  if (loading || roleLoading || consumerLoading || isRanking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {loading ? 'Carregando feed...' : 
             roleLoading || consumerLoading ? 'Verificando perfil...' : 
             'Aplicando AffiBoost Algorithm...'}
          </p>
        </div>
      </div>
    );
  }

  const personalizedOffers = isConsumer && consumerProfile ? 5 : 0; // Mock data

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50 pb-16 md:pb-0">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Header diferenciado por tipo de usuário */}
        {isAffiliate && affiliateStats ? (
          <AffiliateHeader 
            stats={affiliateStats}
            onNotificationClick={handleNotificationClick}
          />
        ) : isConsumer ? (
          <ConsumerHeader
            wishlistCount={wishlist.length}
            personalizedOffersCount={personalizedOffers}
            onViewWishlist={handleViewWishlist}
            onViewOffers={handleViewOffers}
          />
        ) : (
          <FeedHeader />
        )}

        {/* Pré-visualização da loja (apenas para afiliados) */}
        {isAffiliate && affiliateStats && (
          <AffiliateStorePreview
            stats={affiliateStats}
            hasStore={hasStore}
            onEditStore={handleEditStore}
            onCreateStore={handleCreateStore}
            onViewAnalytics={handleViewAnalytics}
          />
        )}
        
        {/* AffiBoost Status (apenas para afiliados) */}
        {isAffiliate && algorithmStats && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg border border-purple-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AB</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AffiBoost Algorithm</h3>
                  <p className="text-sm text-gray-600">
                    {algorithmStats.totalPosts} posts ranqueados • Score médio: {algorithmStats.averageScore}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAffiBoostDashboard(!showAffiBoostDashboard)}
                className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
              >
                {showAffiBoostDashboard ? 'Ocultar' : 'Dashboard'}
              </button>
            </div>
          </div>
        )}

        {/* AffiBoost Dashboard (apenas para afiliados) */}
        {isAffiliate && showAffiBoostDashboard && algorithmStats && (
          <div className="bg-white rounded-xl shadow-lg border border-purple-200 p-6">
            <AffiBoostDashboard
              algorithmStats={algorithmStats}
              categoryStats={getCategoryStats}
              onUpdateTrending={handleTrendingUpdate}
            />
          </div>
        )}
        
        {/* Stories section */}
        <Stories />
        
        {/* Category filter */}
        <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-4">
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Post creation - diferenciado por tipo de usuário */}
        <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-4">
          {canCreatePosts ? (
            <PostCreation 
              isCreating={isCreatingPost}
              onToggleCreating={handleTogglePostCreation}
            />
          ) : (
            <RestrictedPostCreation />
          )}
        </div>

        {/* Posts feed */}
        {formattedPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">
              {isConsumer ? '🛍️' : '📝'}
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              {isConsumer ? 'Explore produtos incríveis!' : 'Ainda não há posts!'}
            </h3>
            <p className="text-gray-500 text-lg mb-4">
              {isConsumer 
                ? 'Navegue pelas categorias e descubra ofertas exclusivas.'
                : 'Seja o primeiro a compartilhar algo interessante.'
              }
            </p>
          </div>
        ) : (
          <PostList 
            posts={formattedPosts}
            currentUserName={user?.name}
            onUpdatePost={handleUpdatePost}
            selectedCategory={selectedCategory}
            isAffiliateView={isAffiliate}
            isConsumerView={isConsumer}
          />
        )}
      </div>

      {/* Botão "Criar Loja" flutuante (apenas para afiliados) */}
      {isAffiliate && (
        <CreateStoreButton
          onClick={() => setShowStoreWizard(true)}
          canCreate={canCreateStore}
        />
      )}

      {/* Wizard de criação de loja */}
      <StoreCreationWizard
        isOpen={showStoreWizard}
        onClose={() => setShowStoreWizard(false)}
        onStoreCreated={handleStoreCreated}
      />
    </div>
  );
};

export default Feed;
