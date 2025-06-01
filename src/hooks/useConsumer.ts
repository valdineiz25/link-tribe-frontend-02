
import { useState, useEffect } from 'react';
import { ConsumerService } from '@/services/consumerService';
import { ConsumerProfile, WishlistItem, ProductRating } from '@/types/consumer';
import { useAuth } from '@/contexts/AuthContext';

export const useConsumer = () => {
  const { user } = useAuth();
  const [consumerProfile, setConsumerProfile] = useState<ConsumerProfile | null>(null);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      
      // Verificar se é consumidor e inicializar dados se necessário
      let profile = ConsumerService.getConsumerProfile(user.id);
      if (!profile) {
        ConsumerService.initializeConsumerData(user.id);
        profile = ConsumerService.getConsumerProfile(user.id);
      }
      
      setConsumerProfile(profile);
      
      if (profile) {
        const userWishlist = ConsumerService.getWishlist(user.id);
        setWishlist(userWishlist);
      }
      
      setLoading(false);
    }
  }, [user]);

  const isConsumer = consumerProfile?.type === 'consumer';
  const canCreatePosts = !consumerProfile?.restrictions.canCreatePosts ?? true;

  const addToWishlist = (item: WishlistItem) => {
    if (user && isConsumer) {
      const success = ConsumerService.addToWishlist(user.id, item);
      if (success) {
        setWishlist(prev => [...prev, item]);
      }
      return success;
    }
    return false;
  };

  const rateProduct = (rating: ProductRating) => {
    if (user && isConsumer) {
      return ConsumerService.rateProduct(user.id, rating);
    }
    return false;
  };

  const trackProductView = (productId: string, productName: string, affiliateId: string) => {
    if (user) {
      ConsumerService.trackProductView(user.id, {
        productId,
        productName,
        viewedAt: new Date().toISOString(),
        clickedAffiliate: affiliateId
      });
    }
  };

  return {
    consumerProfile,
    wishlist,
    loading,
    isConsumer,
    canCreatePosts,
    addToWishlist,
    rateProduct,
    trackProductView,
    getPersonalizedOffers: () => user ? ConsumerService.getPersonalizedOffers(user.id) : [],
    getViewHistory: () => user ? ConsumerService.getViewHistory(user.id) : []
  };
};
