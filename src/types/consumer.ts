
export interface ConsumerProfile {
  userId: string;
  type: 'consumer';
  favorites: string[]; // IDs dos produtos salvos
  viewHistory: ProductView[];
  wishlist: WishlistItem[];
  productRatings: ProductRating[];
  personalizedOffers: PersonalizedOffer[];
  restrictions: {
    canCreatePosts: false;
    canSeeAnalytics: false;
    canEarnCommissions: false;
  };
}

export interface ProductView {
  productId: string;
  productName: string;
  viewedAt: string;
  clickedAffiliate: string;
}

export interface WishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  currentPrice: number;
  targetPrice?: number;
  addedAt: string;
  storeUrl: string;
  affiliateLink: string;
}

export interface ProductRating {
  productId: string;
  rating: number; // 1-5 stars
  review?: string;
  ratedAt: string;
  helpful: number; // count of helpful votes
}

export interface PersonalizedOffer {
  id: string;
  productId: string;
  productName: string;
  discount: number;
  validUntil: string;
  reason: 'viewed_recently' | 'in_wishlist' | 'similar_purchases';
}
