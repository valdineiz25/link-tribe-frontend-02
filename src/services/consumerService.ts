
import { ConsumerProfile, WishlistItem, ProductRating, ProductView } from '@/types/consumer';
import { UserRole } from '@/types/affiliate';

export class ConsumerService {
  private static CONSUMER_PROFILES_KEY = 'consumer_profiles';
  private static WISHLIST_KEY = 'user_wishlist';
  private static RATINGS_KEY = 'product_ratings';
  private static VIEW_HISTORY_KEY = 'view_history';

  static getConsumerProfile(userId: string): ConsumerProfile | null {
    try {
      const profiles = localStorage.getItem(this.CONSUMER_PROFILES_KEY);
      const consumerProfiles: ConsumerProfile[] = profiles ? JSON.parse(profiles) : [];
      return consumerProfiles.find(profile => profile.userId === userId) || null;
    } catch (error) {
      console.error('Erro ao buscar perfil do consumidor:', error);
      return null;
    }
  }

  static isConsumer(userId: string): boolean {
    const profile = this.getConsumerProfile(userId);
    return profile?.type === 'consumer' || false;
  }

  static canCreatePosts(userId: string): boolean {
    const profile = this.getConsumerProfile(userId);
    return profile ? !profile.restrictions.canCreatePosts : true;
  }

  static addToWishlist(userId: string, item: WishlistItem): boolean {
    try {
      const key = `${this.WISHLIST_KEY}_${userId}`;
      const wishlist = localStorage.getItem(key);
      const items: WishlistItem[] = wishlist ? JSON.parse(wishlist) : [];
      
      // Evitar duplicatas
      if (!items.find(w => w.productId === item.productId)) {
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items));
      }
      return true;
    } catch (error) {
      console.error('Erro ao adicionar à lista de desejos:', error);
      return false;
    }
  }

  static getWishlist(userId: string): WishlistItem[] {
    try {
      const key = `${this.WISHLIST_KEY}_${userId}`;
      const wishlist = localStorage.getItem(key);
      return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
      console.error('Erro ao buscar lista de desejos:', error);
      return [];
    }
  }

  static rateProduct(userId: string, rating: ProductRating): boolean {
    try {
      const key = `${this.RATINGS_KEY}_${userId}`;
      const ratings = localStorage.getItem(key);
      const userRatings: ProductRating[] = ratings ? JSON.parse(ratings) : [];
      
      // Atualizar ou adicionar avaliação
      const existingIndex = userRatings.findIndex(r => r.productId === rating.productId);
      if (existingIndex >= 0) {
        userRatings[existingIndex] = rating;
      } else {
        userRatings.push(rating);
      }
      
      localStorage.setItem(key, JSON.stringify(userRatings));
      return true;
    } catch (error) {
      console.error('Erro ao avaliar produto:', error);
      return false;
    }
  }

  static trackProductView(userId: string, view: ProductView): boolean {
    try {
      const key = `${this.VIEW_HISTORY_KEY}_${userId}`;
      const history = localStorage.getItem(key);
      const views: ProductView[] = history ? JSON.parse(history) : [];
      
      views.push(view);
      // Manter apenas os últimos 100 views
      if (views.length > 100) {
        views.splice(0, views.length - 100);
      }
      
      localStorage.setItem(key, JSON.stringify(views));
      return true;
    } catch (error) {
      console.error('Erro ao rastrear visualização:', error);
      return false;
    }
  }

  static getPersonalizedOffers(userId: string): any[] {
    // Simular ofertas personalizadas baseadas no histórico
    const wishlist = this.getWishlist(userId);
    const viewHistory = this.getViewHistory(userId);
    
    return [
      ...wishlist.slice(0, 3).map(item => ({
        id: `offer_${item.productId}`,
        productName: item.productName,
        discount: 15,
        reason: 'in_wishlist',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      })),
      ...viewHistory.slice(-2).map(view => ({
        id: `offer_${view.productId}`,
        productName: view.productName,
        discount: 10,
        reason: 'viewed_recently',
        validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      }))
    ];
  }

  static getViewHistory(userId: string): ProductView[] {
    try {
      const key = `${this.VIEW_HISTORY_KEY}_${userId}`;
      const history = localStorage.getItem(key);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      return [];
    }
  }

  // Inicializar dados mock para consumidor
  static initializeConsumerData(userId: string): void {
    const mockProfile: ConsumerProfile = {
      userId,
      type: 'consumer',
      favorites: [],
      viewHistory: [],
      wishlist: [],
      productRatings: [],
      personalizedOffers: [],
      restrictions: {
        canCreatePosts: false,
        canSeeAnalytics: false,
        canEarnCommissions: false
      }
    };

    const profiles = localStorage.getItem(this.CONSUMER_PROFILES_KEY);
    const consumerProfiles: ConsumerProfile[] = profiles ? JSON.parse(profiles) : [];
    
    if (!consumerProfiles.find(p => p.userId === userId)) {
      consumerProfiles.push(mockProfile);
      localStorage.setItem(this.CONSUMER_PROFILES_KEY, JSON.stringify(consumerProfiles));
    }
  }
}
