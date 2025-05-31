
interface AnalyticsData {
  userId: string;
  postId?: string;
  action: 'click' | 'view' | 'share' | 'conversion';
  productId?: string;
  value?: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

interface PerformanceMetrics {
  totalClicks: number;
  totalViews: number;
  totalConversions: number;
  conversionRate: number;
  averageEarnings: number;
  topProducts: Array<{
    productId: string;
    clicks: number;
    conversions: number;
    earnings: number;
  }>;
}

export class AnalyticsBot {
  private processedCount = 0;
  private lastActivity = new Date().toISOString();
  private analyticsData: AnalyticsData[] = [];
  private userMetrics = new Map<string, PerformanceMetrics>();
  private updateInterval: number;

  constructor(updateInterval: number = 300000) { // 5 minutos padrão
    this.updateInterval = updateInterval;
    this.startPeriodicUpdates();
  }

  canHandle(eventType: string): boolean {
    return ['link_clicked', 'post_created', 'user_query'].includes(eventType);
  }

  async process(event: any): Promise<any> {
    this.processedCount++;
    this.lastActivity = new Date().toISOString();

    // Registrar evento de analytics
    const analyticsEvent: AnalyticsData = {
      userId: event.userId,
      action: this.mapEventToAction(event.type),
      timestamp: Date.now(),
      postId: event.data.postId,
      productId: event.data.productId,
      value: event.data.value,
      metadata: event.data.metadata
    };

    this.analyticsData.push(analyticsEvent);

    // Se for uma consulta de analytics, retornar dados
    if (event.type === 'user_query' && event.data.query?.includes('desempenho')) {
      const metrics = await this.getUserMetrics(event.userId);
      return {
        action: 'respond',
        data: {
          type: 'analytics_report',
          metrics,
          message: this.generatePerformanceMessage(metrics)
        },
        confidence: 100
      };
    }

    // Processar conversão
    if (event.data.conversion) {
      await this.processConversion(event.userId, event.data);
    }

    return null;
  }

  private mapEventToAction(eventType: string): 'click' | 'view' | 'share' | 'conversion' {
    switch (eventType) {
      case 'link_clicked': return 'click';
      case 'post_created': return 'view';
      default: return 'view';
    }
  }

  private async processConversion(userId: string, conversionData: any): Promise<void> {
    const conversion: AnalyticsData = {
      userId,
      action: 'conversion',
      timestamp: Date.now(),
      productId: conversionData.productId,
      value: conversionData.commissionValue,
      metadata: {
        orderId: conversionData.orderId,
        orderValue: conversionData.orderValue
      }
    };

    this.analyticsData.push(conversion);
    
    console.log(`💰 Conversão registrada: R$ ${conversionData.commissionValue} para usuário ${userId}`);
  }

  private async getUserMetrics(userId: string): Promise<PerformanceMetrics> {
    const userEvents = this.analyticsData.filter(event => event.userId === userId);
    
    const clicks = userEvents.filter(e => e.action === 'click').length;
    const views = userEvents.filter(e => e.action === 'view').length;
    const conversions = userEvents.filter(e => e.action === 'conversion');
    
    const totalEarnings = conversions.reduce((sum, conv) => sum + (conv.value || 0), 0);
    const conversionRate = clicks > 0 ? (conversions.length / clicks) * 100 : 0;

    // Agrupar por produto
    const productPerformance = new Map<string, any>();
    
    userEvents.forEach(event => {
      if (!event.productId) return;
      
      const current = productPerformance.get(event.productId) || {
        productId: event.productId,
        clicks: 0,
        conversions: 0,
        earnings: 0
      };

      if (event.action === 'click') current.clicks++;
      if (event.action === 'conversion') {
        current.conversions++;
        current.earnings += event.value || 0;
      }

      productPerformance.set(event.productId, current);
    });

    const topProducts = Array.from(productPerformance.values())
      .sort((a, b) => b.earnings - a.earnings)
      .slice(0, 5);

    const metrics: PerformanceMetrics = {
      totalClicks: clicks,
      totalViews: views,
      totalConversions: conversions.length,
      conversionRate,
      averageEarnings: totalEarnings,
      topProducts
    };

    this.userMetrics.set(userId, metrics);
    return metrics;
  }

  private generatePerformanceMessage(metrics: PerformanceMetrics): string {
    const messages = [
      `📊 **Seu Desempenho Atual:**`,
      `• **${metrics.totalClicks}** cliques nos seus links`,
      `• **${metrics.totalConversions}** conversões realizadas`,
      `• **${metrics.conversionRate.toFixed(1)}%** taxa de conversão`,
      `• **R$ ${metrics.averageEarnings.toFixed(2)}** em comissões`,
      ``
    ];

    if (metrics.topProducts.length > 0) {
      messages.push(`🏆 **Seus Produtos Top:**`);
      metrics.topProducts.slice(0, 3).forEach((product, index) => {
        messages.push(`${index + 1}. Produto ${product.productId}: R$ ${product.earnings.toFixed(2)}`);
      });
      messages.push(``);
    }

    // Dicas motivacionais baseadas no desempenho
    if (metrics.conversionRate < 2) {
      messages.push(`💡 **Dica:** Posts com vídeos têm 3x mais conversão! Que tal tentar?`);
    } else if (metrics.conversionRate > 5) {
      messages.push(`🔥 **Parabéns!** Sua taxa de conversão está acima da média!`);
    }

    if (metrics.totalClicks > 100) {
      messages.push(`🚀 **Você está indo bem!** Continue assim para aumentar seus ganhos.`);
    }

    return messages.join('\n');
  }

  private startPeriodicUpdates(): void {
    setInterval(() => {
      this.generatePeriodicReports();
    }, this.updateInterval);
  }

  private async generatePeriodicReports(): Promise<void> {
    console.log('📈 Gerando relatórios periódicos de analytics...');
    
    // Limpar dados antigos (manter apenas últimos 30 dias)
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    this.analyticsData = this.analyticsData.filter(event => event.timestamp > thirtyDaysAgo);
    
    console.log(`📊 Analytics: ${this.analyticsData.length} eventos processados`);
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

  async shutdown(): Promise<void> {
    console.log('📊 Salvando dados de analytics antes do shutdown...');
    // Em produção, salvaria no banco de dados
  }
}
