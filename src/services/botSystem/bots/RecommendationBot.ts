
interface UserPreference {
  categories: string[];
  priceRange: { min: number; max: number };
  brands: string[];
  lastInteractions: string[];
}

interface ProductRecommendation {
  productId: string;
  name: string;
  category: string;
  price: number;
  affiliateLink: string;
  score: number;
  reason: string;
}

export class RecommendationBot {
  private processedCount = 0;
  private lastActivity = new Date().toISOString();
  private userPreferences = new Map<string, UserPreference>();

  canHandle(eventType: string): boolean {
    return ['link_clicked', 'post_created', 'user_joined'].includes(eventType);
  }

  async process(event: any): Promise<any> {
    this.processedCount++;
    this.lastActivity = new Date().toISOString();

    const userId = event.userId;
    if (!userId) return null;

    switch (event.type) {
      case 'link_clicked':
        await this.updateUserPreferences(userId, event.data);
        break;
      case 'user_joined':
        const recommendations = await this.generateRecommendations(userId);
        return {
          action: 'recommend',
          data: {
            recommendations,
            message: 'Bem-vindo! Aqui estão algumas ofertas que podem te interessar:'
          },
          confidence: 80
        };
    }

    return null;
  }

  private async updateUserPreferences(userId: string, clickData: any): Promise<void> {
    const current = this.userPreferences.get(userId) || {
      categories: [],
      priceRange: { min: 0, max: 1000 },
      brands: [],
      lastInteractions: []
    };

    // Atualizar baseado no clique
    if (clickData.category) {
      current.categories.push(clickData.category);
      current.categories = [...new Set(current.categories)].slice(-10); // Manter apenas os 10 mais recentes
    }

    if (clickData.brand) {
      current.brands.push(clickData.brand);
      current.brands = [...new Set(current.brands)].slice(-5);
    }

    if (clickData.price) {
      // Ajustar faixa de preço baseado no histórico
      current.priceRange.min = Math.min(current.priceRange.min, clickData.price * 0.7);
      current.priceRange.max = Math.max(current.priceRange.max, clickData.price * 1.3);
    }

    current.lastInteractions.push(`${Date.now()}_${clickData.productId || 'unknown'}`);
    current.lastInteractions = current.lastInteractions.slice(-20);

    this.userPreferences.set(userId, current);
    console.log(`🎯 Preferências atualizadas para usuário ${userId}`);
  }

  private async generateRecommendations(userId: string): Promise<ProductRecommendation[]> {
    const preferences = this.userPreferences.get(userId);
    
    // Simulação de produtos disponíveis (em produção seria uma consulta à API)
    const availableProducts = [
      {
        productId: '1',
        name: 'Smartphone Android 128GB',
        category: 'Eletrônicos',
        price: 899.99,
        affiliateLink: 'https://affiliate.link/1',
        brand: 'Samsung'
      },
      {
        productId: '2',
        name: 'Kit Skincare Anti-idade',
        category: 'Beleza',
        price: 159.99,
        affiliateLink: 'https://affiliate.link/2',
        brand: 'Neutrogena'
      },
      {
        productId: '3',
        name: 'Tênis Running Pro',
        category: 'Esportes',
        price: 249.90,
        affiliateLink: 'https://affiliate.link/3',
        brand: 'Nike'
      }
    ];

    const recommendations: ProductRecommendation[] = [];

    for (const product of availableProducts) {
      let score = 0;
      let reason = '';

      if (preferences) {
        // Score baseado em categoria
        if (preferences.categories.includes(product.category)) {
          score += 40;
          reason += `Você demonstrou interesse em ${product.category}. `;
        }

        // Score baseado em marca
        if (preferences.brands.includes(product.brand)) {
          score += 30;
          reason += `Você já clicou em produtos ${product.brand}. `;
        }

        // Score baseado em faixa de preço
        if (product.price >= preferences.priceRange.min && product.price <= preferences.priceRange.max) {
          score += 20;
          reason += `Preço dentro da sua faixa de interesse. `;
        }
      } else {
        // Para novos usuários, recomendar produtos populares
        score = 50;
        reason = 'Produto popular entre afiliados. ';
      }

      // Boost para produtos com alta comissão (simulado)
      score += Math.random() * 10; // Simular score de performance

      if (score > 30) { // Threshold mínimo
        recommendations.push({
          ...product,
          score,
          reason: reason.trim() || 'Recomendado para você'
        });
      }
    }

    // Ordenar por score e retornar top 5
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
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
