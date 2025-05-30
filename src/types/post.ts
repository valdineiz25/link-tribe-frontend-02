
export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  image?: string;
  productId?: string;
  productLink?: string;
  productName?: string;
  currentPrice?: number;
  promotionalPrice?: number;
  storeName?: string;
  category: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  clickThroughs: number;
  earnings: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  tags: string[];
}

export interface PostStats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalEarnings: number;
  topPosts: Post[];
}
