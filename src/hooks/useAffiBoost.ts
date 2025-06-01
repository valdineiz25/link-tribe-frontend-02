
import { useState, useEffect, useMemo } from 'react';
import { affiBoostAlgorithm } from '@/services/affiBoostAlgorithm';
import { Post as PostType } from '@/types/post';

interface AffiBoostPost extends PostType {
  affiBoostScore?: number;
  rankingFactors?: {
    engagementScore: number;
    conversionScore: number;
    affiliateScore: number;
    trendingBonus: number;
  };
}

export const useAffiBoost = (posts: PostType[]) => {
  const [rankedPosts, setRankedPosts] = useState<AffiBoostPost[]>([]);
  const [isRanking, setIsRanking] = useState(false);
  const [algorithmStats, setAlgorithmStats] = useState<any>(null);

  // Converter posts para formato do algoritmo
  const convertToAlgorithmFormat = (post: PostType) => {
    return {
      id: post.id,
      content: post.content,
      productPrice: post.currentPrice || post.promotionalPrice || 100,
      category: post.category,
      createdAt: post.createdAt,
      engagement: {
        clicks: post.clickThroughs || 0,
        shares: post.shares || 0,
        comments: post.comments || 0,
        views: post.views || 0,
        likes: post.likes || 0,
        viewTime: Math.random() * 60 + 10 // Simulado - em produção viria de analytics
      },
      conversion: {
        sales: Math.floor((post.clickThroughs || 0) * 0.03), // 3% taxa de conversão simulada
        revenue: ((post.currentPrice || 100) * Math.floor((post.clickThroughs || 0) * 0.03)),
        averageOrderValue: post.currentPrice || post.promotionalPrice || 100,
        conversionRate: 0.03 + Math.random() * 0.05 // 3-8% simulado
      },
      affiliate: {
        conversionHistory: 70 + Math.random() * 25, // 70-95% simulado
        trustScore: 80 + Math.random() * 20, // 80-100% simulado
        complaintsRate: Math.random() * 10, // 0-10% simulado
        tier: ['bronze', 'silver', 'gold', 'platinum'][Math.floor(Math.random() * 4)] as 'bronze' | 'silver' | 'gold' | 'platinum'
      },
      isTrending: Math.random() > 0.8 // 20% chance de ser trending
    };
  };

  // Aplicar algoritmo quando posts mudarem
  useEffect(() => {
    if (posts.length === 0) {
      setRankedPosts([]);
      setAlgorithmStats(null);
      return;
    }

    setIsRanking(true);

    // Simular delay de processamento para UX realista
    const timer = setTimeout(() => {
      try {
        const algorithmPosts = posts.map(convertToAlgorithmFormat);
        const ranked = affiBoostAlgorithm.rankPosts(algorithmPosts);
        
        // Converter de volta para formato do app
        const convertedRanked = ranked.map(rankedPost => {
          const originalPost = posts.find(p => p.id === rankedPost.id);
          return {
            ...originalPost!,
            affiBoostScore: rankedPost.affiBoostScore,
            rankingFactors: rankedPost.rankingFactors
          };
        });

        setRankedPosts(convertedRanked);
        setAlgorithmStats(affiBoostAlgorithm.getAlgorithmStats(ranked));
        
        console.log('🚀 AffiBoost ranking applied to', ranked.length, 'posts');
      } catch (error) {
        console.error('❌ Error in AffiBoost ranking:', error);
        setRankedPosts(posts); // Fallback para posts originais
      } finally {
        setIsRanking(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [posts]);

  // Atualizar produtos em trending
  const updateTrendingProducts = (categories: string[]) => {
    affiBoostAlgorithm.updateTrendingProducts(categories);
  };

  // Filtrar posts por score mínimo
  const getTopPosts = (minScore: number = 50) => {
    return rankedPosts.filter(post => (post.affiBoostScore || 0) >= minScore);
  };

  // Agrupar posts por categoria com score médio
  const getCategoryStats = useMemo(() => {
    const categoryMap = new Map();
    
    rankedPosts.forEach(post => {
      const category = post.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, { posts: [], totalScore: 0 });
      }
      
      const categoryData = categoryMap.get(category);
      categoryData.posts.push(post);
      categoryData.totalScore += (post.affiBoostScore || 0);
    });

    return Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      postCount: data.posts.length,
      averageScore: Math.round((data.totalScore / data.posts.length) * 100) / 100,
      topPost: data.posts.sort((a: any, b: any) => (b.affiBoostScore || 0) - (a.affiBoostScore || 0))[0]
    })).sort((a, b) => b.averageScore - a.averageScore);
  }, [rankedPosts]);

  return {
    rankedPosts,
    isRanking,
    algorithmStats,
    updateTrendingProducts,
    getTopPosts,
    getCategoryStats
  };
};
