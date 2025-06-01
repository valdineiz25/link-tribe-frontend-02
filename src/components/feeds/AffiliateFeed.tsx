
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { usePosts } from '@/hooks/usePosts';
import { useAffiBoost } from '@/hooks/useAffiBoost';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  BarChart3, 
  Store, 
  Plus,
  DollarSign,
  Eye,
  Users,
  Pin,
  Repeat,
  MessageCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AffiliateHeader from '@/components/AffiliateHeader';
import AffiliateStorePreview from '@/components/AffiliateStorePreview';
import PostCreation from '@/components/PostCreation';
import { AffiBoostDashboard } from '@/components/AffiBoostDashboard';
import CategoryFilter from '@/components/CategoryFilter';
import PostList from '@/components/PostList';
import { FloatingActionButton } from '@/components/groups/FloatingActionButton';

export const AffiliateFeed: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [showAffiBoostDashboard, setShowAffiBoostDashboard] = useState(false);
  
  const { posts, loading } = usePosts();
  const { 
    userRole, 
    affiliateStats, 
    isAffiliate, 
    canCreateStore, 
    hasStore 
  } = useUserRole();

  const { 
    rankedPosts, 
    isRanking, 
    algorithmStats, 
    updateTrendingProducts,
    getCategoryStats 
  } = useAffiBoost(posts);

  const categories = [
    'Todos',
    'Eletrônicos',
    'Moda',
    'Casa e Jardim',
    'Saúde e Beleza',
    'Esportes',
    'Livros e Educação'
  ];

  const handleCreatePost = () => {
    setIsCreatingPost(!isCreatingPost);
    if (!isCreatingPost) {
      toast({
        title: "✍️ Criar novo post",
        description: "Compartilhe produtos e gere comissões!",
      });
    }
  };

  const handleCreateStore = () => {
    toast({
      title: "🏪 Criar Loja",
      description: "Abrindo assistente de criação...",
    });
  };

  const handleViewAnalytics = () => {
    toast({
      title: "📊 Analytics Detalhado",
      description: "CTR: 3.2% | Conversão: 1.8% | ROI: +245%",
    });
  };

  const handleTrendingUpdate = (categories: string[]) => {
    updateTrendingProducts(categories);
    toast({
      title: "🔥 Trending atualizado!",
      description: `${categories.length} categorias recebem boost`,
    });
  };

  const postsToShow = rankedPosts.length > 0 ? rankedPosts : posts;
  const formattedPosts = postsToShow.map(post => ({
    id: post.id,
    authorName: post.user?.name || 'Afiliado',
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
    isOwnProduct: post.user?.id === user?.id
  }));

  if (loading || isRanking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-300">
            {loading ? 'Carregando dashboard...' : 'Aplicando AffiBoost Algorithm...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Header do Afiliado */}
        {affiliateStats && (
          <AffiliateHeader 
            stats={affiliateStats}
            onNotificationClick={() => toast({
              title: "🔔 Nova Comissão!",
              description: "Maria comprou via seu link: +R$ 42,30"
            })}
          />
        )}

        {/* Métricas em Tempo Real */}
        <Card className="bg-slate-800/70 border-purple-500/20 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <TrendingUp className="text-green-400" size={20} />
                <span>Performance Hoje</span>
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleViewAnalytics}
                className="text-purple-300 hover:text-purple-200 hover:bg-purple-800/20"
              >
                <BarChart3 size={16} className="mr-1" />
                Ver mais
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">R$ 1.240</div>
                <div className="text-xs text-gray-400">Comissões</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">156</div>
                <div className="text-xs text-gray-400">Cliques</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">8</div>
                <div className="text-xs text-gray-400">Vendas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pré-visualização da Loja */}
        {affiliateStats && (
          <AffiliateStorePreview
            stats={affiliateStats}
            hasStore={hasStore}
            onEditStore={() => toast({ title: "🏪 Editor de Loja", description: "Redirecionando..." })}
            onCreateStore={handleCreateStore}
            onViewAnalytics={handleViewAnalytics}
          />
        )}
        
        {/* AffiBoost Status */}
        {algorithmStats && (
          <Card className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 border-purple-500/30 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AB</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AffiBoost Algorithm</h3>
                    <p className="text-sm text-gray-300">
                      {algorithmStats.totalPosts} posts ranqueados • Score médio: {algorithmStats.averageScore}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAffiBoostDashboard(!showAffiBoostDashboard)}
                  className="text-purple-300 hover:text-purple-200 hover:bg-purple-800/20"
                >
                  {showAffiBoostDashboard ? 'Ocultar' : 'Dashboard'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AffiBoost Dashboard */}
        {showAffiBoostDashboard && algorithmStats && (
          <Card className="bg-slate-800/70 border-purple-500/20 shadow-2xl">
            <CardContent className="p-6">
              <AffiBoostDashboard
                algorithmStats={algorithmStats}
                categoryStats={getCategoryStats}
                onUpdateTrending={handleTrendingUpdate}
              />
            </CardContent>
          </Card>
        )}

        {/* Filtros de Categoria */}
        <Card className="bg-slate-800/70 border-purple-500/20 shadow-2xl">
          <CardContent className="p-4">
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </CardContent>
        </Card>

        {/* Criação de Post */}
        <Card className="bg-slate-800/70 border-purple-500/20 shadow-2xl">
          <CardContent className="p-4">
            <PostCreation 
              isCreating={isCreatingPost}
              onToggleCreating={handleCreatePost}
            />
          </CardContent>
        </Card>

        {/* Feed de Posts */}
        {formattedPosts.length === 0 ? (
          <Card className="bg-slate-800/70 border-purple-500/20 shadow-2xl">
            <CardContent className="p-8 text-center">
              <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">
                Comece a vender!
              </h3>
              <p className="text-gray-400 mb-4">
                Crie seu primeiro post e comece a gerar comissões.
              </p>
              <Button
                onClick={handleCreatePost}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Plus size={16} className="mr-2" />
                Criar Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {formattedPosts.map((post) => (
              <Card key={post.id} className="bg-slate-800/70 border-purple-500/20 shadow-2xl hover:shadow-purple-500/10 transition-all">
                <CardContent className="p-4">
                  {/* Header do Post */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {post.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{post.authorName}</h4>
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="text-gray-400">{post.timestamp}</span>
                          <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                            {post.category}
                          </Badge>
                          {post.isOwnProduct && (
                            <Badge className="bg-green-600/20 text-green-300 border-green-500/30">
                              Seu Produto
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Ações do Afiliado */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-300 hover:text-purple-200 hover:bg-purple-800/20"
                        title="Fixar post"
                      >
                        <Pin size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-300 hover:text-blue-200 hover:bg-blue-800/20"
                        title="Repostar"
                      >
                        <Repeat size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <p className="text-gray-200 mb-3">{post.content}</p>

                  {/* Imagem */}
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post"
                      className="w-full h-64 object-cover rounded-lg mb-3"
                    />
                  )}

                  {/* Info do Produto */}
                  {post.productName && (
                    <div className="bg-slate-700/50 rounded-lg p-3 mb-3 border border-purple-500/20">
                      <h4 className="font-semibold text-white mb-2">{post.productName}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {post.promotionalPrice && (
                            <span className="text-lg font-bold text-green-400">
                              R$ {post.promotionalPrice.toFixed(2)}
                            </span>
                          )}
                          {post.currentPrice && (
                            <span className={post.promotionalPrice ? 'line-through text-gray-500 text-sm' : 'text-lg font-bold text-white'}>
                              R$ {post.currentPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Eye size={14} />
                          <span>245 visualizações</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Estatísticas de Performance */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">{post.likes} curtidas</span>
                      <span className="text-gray-400">{post.comments} comentários</span>
                    </div>
                    {post.isOwnProduct && (
                      <div className="flex items-center space-x-2 text-green-400">
                        <DollarSign size={14} />
                        <span>+R$ 12,50 hoje</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Botão de Ação Flutuante */}
      <FloatingActionButton isAdmin={true} />
    </div>
  );
};
