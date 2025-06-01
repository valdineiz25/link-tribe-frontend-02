
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import FeedHeader from '@/components/FeedHeader';
import CategoryFilter from '@/components/CategoryFilter';
import PostCreation from '@/components/PostCreation';
import PostList from '@/components/PostList';
import Stories from '@/components/Stories';
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
  const { posts, loading } = usePosts();
  
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

  // Usar posts ranqueados pelo AffiBoost
  const postsToShow = rankedPosts.length > 0 ? rankedPosts : posts;

  // Converter posts para o formato esperado pelo PostList
  const formattedPosts = postsToShow.map(post => ({
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
    rankingFactors: (post as any).rankingFactors
  }));

  if (loading || isRanking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {loading ? 'Carregando feed...' : 'Aplicando AffiBoost Algorithm...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50 pb-16 md:pb-0">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <FeedHeader />
        
        {/* AffiBoost Status */}
        {algorithmStats && (
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

        {/* AffiBoost Dashboard */}
        {showAffiBoostDashboard && algorithmStats && (
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
        
        {/* Stories-like category filter */}
        <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-4">
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Post creation */}
        <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-4">
          <PostCreation 
            isCreating={isCreatingPost}
            onToggleCreating={handleTogglePostCreation}
          />
        </div>

        {/* Posts feed */}
        {formattedPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">📝</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Ainda não há posts!
            </h3>
            <p className="text-gray-500 text-lg mb-4">
              Seja o primeiro a compartilhar algo interessante.
            </p>
          </div>
        ) : (
          <PostList 
            posts={formattedPosts}
            currentUserName={user?.name}
            onUpdatePost={handleUpdatePost}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
    </div>
  );
};

export default Feed;
