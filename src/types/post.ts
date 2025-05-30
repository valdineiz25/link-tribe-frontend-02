
export interface Post {
  id: string;
  authorId?: string;
  authorName?: string;
  authorAvatar?: string;
  content: string;
  description?: string; // Adicionado para compatibilidade
  image?: string;
  media?: string; // Adicionado para suporte a mídia
  mediaType?: string; // Adicionado para tipo de mídia
  mediaName?: string; // Adicionado para nome da mídia
  type?: string; // Adicionado para tipo de post
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
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface PostStats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalEarnings: number;
  topPosts: Post[];
}
