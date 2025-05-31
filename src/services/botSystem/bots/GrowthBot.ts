
interface GrowthInsight {
  userId: string;
  insight: string;
  actionable: string;
  impact: 'low' | 'medium' | 'high';
  category: 'content' | 'timing' | 'products' | 'engagement';
}

interface UserGrowthProfile {
  engagementRate: number;
  averageClicks: number;
  bestPerformingCategories: string[];
  weakestAreas: string[];
  lastActivity: number;
  growthTrend: 'declining' | 'stable' | 'growing';
}

export class GrowthBot {
  private processedCount = 0;
  private lastActivity = new Date().toISOString();
  private userProfiles = new Map<string, UserGrowthProfile>();
  private growthTips = new Map<string, string[]>();

  constructor() {
    this.initializeGrowthTips();
  }

  canHandle(eventType: string): boolean {
    return ['post_created', 'link_clicked', 'user_query'].includes(eventType);
  }

  async process(event: any): Promise<any> {
    this.processedCount++;
    this.lastActivity = new Date().toISOString();

    const userId = event.userId;
    if (!userId) return null;

    // Atualizar perfil de crescimento do usuário
    await this.updateUserProfile(userId, event);

    // Se for uma query sobre crescimento, fornecer insights
    if (event.type === 'user_query' && this.isGrowthQuery(event.data.query)) {
      const insights = await this.generateGrowthInsights(userId);
      return {
        action: 'respond',
        data: {
          type: 'growth_insights',
          insights,
          message: this.formatGrowthMessage(insights)
        },
        confidence: 85
      };
    }

    // Detectar usuários com baixo engajamento e oferecer ajuda
    const profile = this.userProfiles.get(userId);
    if (profile && this.shouldOfferGrowthHelp(profile)) {
      const suggestions = await this.generateGrowthSuggestions(userId, profile);
      return {
        action: 'notify',
        data: {
          type: 'growth_suggestion',
          message: suggestions,
          action_required: false
        },
        confidence: 75
      };
    }

    return null;
  }

  private async updateUserProfile(userId: string, event: any): Promise<void> {
    const current = this.userProfiles.get(userId) || {
      engagementRate: 0,
      averageClicks: 0,
      bestPerformingCategories: [],
      weakestAreas: [],
      lastActivity: Date.now(),
      growthTrend: 'stable' as const
    };

    current.lastActivity = Date.now();

    // Atualizar métricas baseado no tipo de evento
    if (event.type === 'link_clicked') {
      current.averageClicks = (current.averageClicks + 1) / 2; // Média simples
      current.engagementRate += 0.1;
    } else if (event.type === 'post_created') {
      const category = event.data.category || 'geral';
      if (!current.bestPerformingCategories.includes(category)) {
        current.bestPerformingCategories.push(category);
      }
    }

    // Determinar tendência de crescimento (simulado)
    const randomFactor = Math.random();
    if (current.engagementRate > 5) {
      current.growthTrend = 'growing';
    } else if (current.engagementRate < 2) {
      current.growthTrend = 'declining';
    } else {
      current.growthTrend = 'stable';
    }

    this.userProfiles.set(userId, current);
  }

  private isGrowthQuery(query: string): boolean {
    const growthKeywords = [
      'crescer', 'crescimento', 'mais vendas', 'engajamento', 
      'dicas', 'estratégia', 'melhorar', 'performance', 'ganhar mais'
    ];
    
    return growthKeywords.some(keyword => 
      query.toLowerCase().includes(keyword)
    );
  }

  private shouldOfferGrowthHelp(profile: UserGrowthProfile): boolean {
    const daysSinceLastActivity = (Date.now() - profile.lastActivity) / (1000 * 60 * 60 * 24);
    
    return (
      profile.growthTrend === 'declining' ||
      profile.engagementRate < 1 ||
      daysSinceLastActivity > 7
    );
  }

  private async generateGrowthInsights(userId: string): Promise<GrowthInsight[]> {
    const profile = this.userProfiles.get(userId);
    const insights: GrowthInsight[] = [];

    if (!profile) {
      insights.push({
        userId,
        insight: "Você está começando sua jornada na AffiliateNet!",
        actionable: "Comece postando sobre produtos que você realmente usa e recomenda.",
        impact: 'high',
        category: 'content'
      });
      return insights;
    }

    // Insights baseados na performance
    if (profile.engagementRate < 2) {
      insights.push({
        userId,
        insight: "Seu engajamento pode melhorar significativamente",
        actionable: "Posts com vídeos têm 3x mais conversão. Que tal criar um vídeo mostrando o produto em uso?",
        impact: 'high',
        category: 'content'
      });
    }

    if (profile.averageClicks < 5) {
      insights.push({
        userId,
        insight: "Seus links podem gerar mais cliques",
        actionable: "Adicione mais contexto aos seus posts. Explique por que você recomenda o produto.",
        impact: 'medium',
        category: 'content'
      });
    }

    if (profile.bestPerformingCategories.length < 3) {
      insights.push({
        userId,
        insight: "Diversificar categorias pode aumentar seus ganhos",
        actionable: "Explore categorias como 'Tecnologia' e 'Casa e Jardim' - elas têm alta conversão.",
        impact: 'medium',
        category: 'products'
      });
    }

    // Insights sobre timing
    insights.push({
      userId,
      insight: "O horário dos posts impacta muito o engajamento",
      actionable: "Poste entre 19h-22h para máximo alcance. Finais de semana são ideais para produtos de lazer.",
      impact: 'medium',
      category: 'timing'
    });

    // Insights sobre engajamento
    if (profile.growthTrend === 'growing') {
      insights.push({
        userId,
        insight: "Parabéns! Você está na direção certa",
        actionable: "Continue fazendo o que está fazendo e considere aumentar a frequência de posts.",
        impact: 'low',
        category: 'engagement'
      });
    }

    return insights.slice(0, 4); // Máximo 4 insights por vez
  }

  private async generateGrowthSuggestions(userId: string, profile: UserGrowthProfile): Promise<string> {
    const suggestions = [];

    if (profile.growthTrend === 'declining') {
      suggestions.push("📉 Notamos que seu engajamento diminuiu. Vamos reverter isso!");
      suggestions.push("💡 Dica: Posts com fotos pessoais usando o produto convertem 2x mais.");
    }

    if (profile.engagementRate < 1) {
      suggestions.push("🚀 Que tal dar uma turbinada nos seus posts?");
      suggestions.push("📝 Experimente adicionar stories pessoais sobre como o produto te ajudou.");
    }

    const daysSinceActivity = (Date.now() - profile.lastActivity) / (1000 * 60 * 60 * 24);
    if (daysSinceActivity > 7) {
      suggestions.push("👋 Sentimos sua falta! Seus seguidores estão esperando suas recomendações.");
      suggestions.push("🎯 Que tal compartilhar uma oferta imperdível hoje?");
    }

    // Adicionar dica motivacional específica
    const randomTip = this.getRandomGrowthTip();
    suggestions.push(`💪 Dica do dia: ${randomTip}`);

    return suggestions.join('\n\n');
  }

  private formatGrowthMessage(insights: GrowthInsight[]): string {
    const messages = ["🚀 **Seus Insights de Crescimento:**\n"];

    insights.forEach((insight, index) => {
      const impactEmoji = insight.impact === 'high' ? '🔥' : insight.impact === 'medium' ? '⚡' : '💡';
      
      messages.push(`${impactEmoji} **${insight.insight}**`);
      messages.push(`   📋 Ação: ${insight.actionable}\n`);
    });

    messages.push("📈 **Lembre-se:** Consistência é a chave do sucesso!");
    messages.push("🎯 Implemente uma dica por vez e acompanhe os resultados.");

    return messages.join('\n');
  }

  private initializeGrowthTips(): void {
    this.growthTips.set('content', [
      "Use fotos reais dos produtos em suas próprias mãos",
      "Conte uma história pessoal sobre como o produto te ajudou",
      "Adicione prós e contras honestos para gerar confiança",
      "Faça vídeos de unboxing ou primeiras impressões"
    ]);

    this.growthTips.set('timing', [
      "Poste entre 19h-22h para máximo engajamento",
      "Segundas-feiras são ideais para produtos de produtividade",
      "Finais de semana funcionam bem para produtos de lazer",
      "Black Friday e datas sazonais aumentam conversões em 300%"
    ]);

    this.growthTips.set('products', [
      "Produtos entre R$50-R$200 têm melhor taxa de conversão",
      "Eletrônicos e casa&jardim são as categorias que mais vendem",
      "Produtos com frete grátis convertem 40% mais",
      "Itens com muitas avaliações positivas geram mais confiança"
    ]);

    this.growthTips.set('engagement', [
      "Responda todos os comentários nos primeiros 30 minutos",
      "Faça perguntas para gerar interação",
      "Compartilhe o post em grupos relacionados",
      "Use hashtags específicas (#tecnologia #casa #beleza)"
    ]);
  }

  private getRandomGrowthTip(): string {
    const allTips = Array.from(this.growthTips.values()).flat();
    return allTips[Math.floor(Math.random() * allTips.length)];
  }

  getLastActivity(): string {
    return this.lastActivity;
  }

  getProcessedCount(): number {
    return this.processedCount;
  }

  getHealth(): string {
    return 'healthy';
  }
}
