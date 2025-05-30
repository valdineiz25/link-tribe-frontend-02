
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  affiliateLink: string;
  commission: number;
  storeId: string;
  storeName: string;
  storeLogo: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  rating?: number;
  reviewsCount?: number;
  salesCount: number;
  clicksCount: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  storeId?: string;
  searchTerm?: string;
  sortBy?: 'price' | 'commission' | 'rating' | 'sales' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  totalSales: number;
  totalClicks: number;
  topProducts: Product[];
  categoryStats: Record<string, number>;
}
