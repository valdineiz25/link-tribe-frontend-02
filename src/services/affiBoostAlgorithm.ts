
interface PostEngagement {
  clicks: number;
  shares: number;
  comments: number;
  views: number;
  likes: number;
  viewTime: number; // em segundos
}

interface PostConversion {
  sales: number;
  revenue: number;
  averageOrderValue: number;
  conversionRate: number;
}

interface AffiliateProfile {
  conversionHistory: number; // histórico de conversões (0-100)
  trustScore: number; // score de confiança (0-100)
  complaintsRate: number; // taxa de reclamações (0-100)
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

interface Post {
  id: string;
  content: string;
  productPrice: number;
  category: string;
  createdAt: string;
  engagement: PostEngagement;
  conversion: PostConversion;
  affiliate: AffiliateProfile;
  isTrending?: boolean;
}

interface RankedPost extends Post {
  affiBoostScore: number;
  rankingFactors: {
    engagementScore: number;
    conversionScore: number;
    affiliateScore: number;
    trendingBonus: number;
  };
}

export class AffiBoostAlgorithm {
  private trendingProducts: string[] = [];
  private seasonalMultipliers: Map<string, number> = new Map();

  constructor() {
    this.initializeSeasonalMultipliers();
  }

  private initializeSeasonalMultipliers() {
    // Configuração de multiplicadores sazonais
    this.seasonalMultipliers.set('black-friday', 1.5);
    this.seasonalMultipliers.set('cyber-monday', 1.4);
    this.seasonalMultipliers.set('christmas', 1.3);
    this.seasonalMultipliers.set('mothers-day', 1.2);
    this.seasonalMultipliers.set('valentines-day', 1.2);
  }

  public rankContent(post: Post): RankedPost {
    const engagementScore = this.calculateEngagementScore(post.engagement);
    const conversionScore = this.calculateConversionScore(post.conversion);
    const affiliateScore = this.calculateAffiliateScore(post.affiliate);
    const trendingBonus = this.calculateTrendingBonus(post);

    // Pesos do algoritmo (ajustáveis)
    const weights = {
      engagement: 0.4,
      conversion: 0.35,
      affiliate: 0.2,
      trending: 0.05
    };

    const baseScore = 
      (engagementScore * weights.engagement) +
      (conversionScore * weights.conversion) +
      (affiliateScore * weights.affiliate);

    const finalScore = baseScore + (baseScore * trendingBonus * weights.trending);

    return {
      ...post,
      affiBoostScore: Math.round(finalScore * 100) / 100,
      rankingFactors: {
        engagementScore,
        conversionScore,
        affiliateScore,
        trendingBonus
      }
    };
  }

  private calculateEngagementScore(engagement: PostEngagement): number {
    const ctr = engagement.clicks / Math.max(engagement.views, 1);
    const shareWeight = engagement.shares * 2; // Shares valem 2x mais que likes
    const avgViewTime = engagement.viewTime / Math.max(engagement.views, 1);
    
    // CTR tem maior peso (40%), seguido de shares (30%), comentários (20%), tempo de visualização (10%)
    const score = 
      (ctr * 100 * 0.4) +
      (shareWeight * 0.3) +
      (engagement.comments * 0.2) +
      (Math.min(avgViewTime / 30, 1) * 100 * 0.1); // Normaliza tempo de visualização para max 30s

    return Math.min(score, 100);
  }

  private calculateConversionScore(conversion: PostConversion): number {
    // Taxa de conversão é o fator principal
    let score = conversion.conversionRate * 100;

    // Bônus para valor médio do pedido alto
    const aovBonus = Math.min(conversion.averageOrderValue / 1000, 0.5); // Máximo 50% de bônus
    score *= (1 + aovBonus);

    // Bônus para receita total
    const revenueBonus = Math.min(conversion.revenue / 10000, 0.3); // Máximo 30% de bônus
    score *= (1 + revenueBonus);

    return Math.min(score, 100);
  }

  private calculateAffiliateScore(affiliate: AffiliateProfile): number {
    let score = (affiliate.conversionHistory * 0.6) + (affiliate.trustScore * 0.4);

    // Bônus para afiliados sem reclamações
    if (affiliate.complaintsRate === 0) {
      score *= 1.15; // 15% de bônus
    } else if (affiliate.complaintsRate < 5) {
      score *= 1.05; // 5% de bônus para baixa taxa de reclamações
    }

    // Multiplicador por tier
    const tierMultipliers = {
      bronze: 1.0,
      silver: 1.1,
      gold: 1.2,
      platinum: 1.3
    };

    score *= tierMultipliers[affiliate.tier];

    return Math.min(score, 100);
  }

  private calculateTrendingBonus(post: Post): number {
    let bonus = 0;

    // Verifica se o produto está em trending
    if (post.isTrending || this.trendingProducts.includes(post.category)) {
      bonus += 0.2; // 20% de bônus base
    }

    // Aplicar multiplicadores sazonais
    const currentSeason = this.getCurrentSeason();
    if (currentSeason && this.seasonalMultipliers.has(currentSeason)) {
      const multiplier = this.seasonalMultipliers.get(currentSeason)!;
      bonus *= multiplier;
    }

    // Bônus para produtos de alto valor durante períodos de desconto
    if (post.productPrice > 500 && this.isDiscountSeason()) {
      bonus += 0.1; // 10% adicional
    }

    return Math.min(bonus, 1.0); // Máximo 100% de bônus
  }

  private getCurrentSeason(): string | null {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // Black Friday (última sexta de novembro)
    if (month === 11 && day >= 24 && day <= 30) {
      return 'black-friday';
    }

    // Cyber Monday (primeira segunda após Black Friday)
    if (month === 11 && day >= 27 && day <= 30) {
      return 'cyber-monday';
    }

    // Natal
    if (month === 12 && day >= 15) {
      return 'christmas';
    }

    // Dia das Mães (maio)
    if (month === 5 && day >= 8 && day <= 14) {
      return 'mothers-day';
    }

    // Dia dos Namorados
    if (month === 6 && day >= 10 && day <= 16) {
      return 'valentines-day';
    }

    return null;
  }

  private isDiscountSeason(): boolean {
    const season = this.getCurrentSeason();
    return ['black-friday', 'cyber-monday', 'christmas'].includes(season || '');
  }

  public rankPosts(posts: Post[]): RankedPost[] {
    const rankedPosts = posts.map(post => this.rankContent(post));
    
    // Ordenar por score decrescente
    return rankedPosts.sort((a, b) => b.affiBoostScore - a.affiBoostScore);
  }

  public updateTrendingProducts(products: string[]) {
    this.trendingProducts = products;
    console.log('🔥 Trending products updated:', products);
  }

  public getAlgorithmStats(posts: RankedPost[]) {
    if (posts.length === 0) return null;

    const avgScore = posts.reduce((sum, post) => sum + post.affiBoostScore, 0) / posts.length;
    const topPerformers = posts.slice(0, 5);
    const categories = [...new Set(posts.map(p => p.category))];

    return {
      totalPosts: posts.length,
      averageScore: Math.round(avgScore * 100) / 100,
      topPerformers: topPerformers.map(p => ({
        id: p.id,
        score: p.affiBoostScore,
        category: p.category
      })),
      categoriesAnalyzed: categories,
      trendingCount: posts.filter(p => p.isTrending).length
    };
  }
}

// Instância singleton do algoritmo
export const affiBoostAlgorithm = new AffiBoostAlgorithm();
