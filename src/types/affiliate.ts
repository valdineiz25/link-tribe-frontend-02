
export interface AffiliateStats {
  totalProducts: number;
  monthlyCommissions: number;
  todayVisits: number;
  topProducts: {
    id: string;
    name: string;
    clicks: number;
  }[];
}

export interface UserStore {
  id: string;
  name: string;
  description: string;
  products: StoreProduct[];
  visits: number;
  isActive: boolean;
  createdAt: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  clicks: number;
  affiliateLink: string;
}

export interface UserRole {
  userId: string;
  type: 'affiliate' | 'consumer';
  canCreateStore: boolean;
  storeId?: string;
  accountAge: number; // days
  validAffiliateLinks: number;
}
