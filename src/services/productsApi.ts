
import { Product, ProductFilters, ProductStats } from '@/types/product';

export class ProductsApi {
  private static products: Product[] = [
    {
      id: '1',
      name: 'Smartphone Android 128GB Pro Max',
      description: 'Smartphone com câmera tripla 108MP, tela AMOLED 6.7", 128GB de armazenamento e bateria de 5000mAh. Ideal para fotos profissionais e uso intenso.',
      price: 899.99,
      originalPrice: 1199.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
      category: 'Eletrônicos',
      affiliateLink: 'https://shopee.com.br/smartphone-pro',
      commission: 8.5,
      storeId: '1',
      storeName: 'Shopee',
      storeLogo: '/lovable-uploads/2f2c8f66-efc5-45d1-bb48-29a832d5a765.png',
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-05-20T15:30:00Z',
      tags: ['smartphone', 'android', 'câmera', 'bateria'],
      rating: 4.8,
      reviewsCount: 1250,
      salesCount: 340,
      clicksCount: 2850
    },
    {
      id: '2',
      name: 'Kit Skincare Anti-idade Completo',
      description: 'Kit completo com sérum vitamina C, ácido hialurônico, retinol e protetor solar FPS 60. Resultados visíveis em 2 semanas.',
      price: 159.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
      category: 'Saúde e Beleza',
      affiliateLink: 'https://magazineluiza.com.br/skincare-kit',
      commission: 15.0,
      storeId: '2',
      storeName: 'Magazine Luiza',
      storeLogo: '/lovable-uploads/e3a0f40c-9132-4c47-8369-5b3534dd866e.png',
      isActive: true,
      createdAt: '2024-02-10T08:20:00Z',
      updatedAt: '2024-05-18T12:45:00Z',
      tags: ['skincare', 'anti-idade', 'beleza', 'cuidados'],
      rating: 4.9,
      reviewsCount: 890,
      salesCount: 220,
      clicksCount: 1680
    },
    {
      id: '3',
      name: 'Tênis Running Performance Ultra',
      description: 'Tênis profissional para corrida com tecnologia de amortecimento avançado, solado anti-derrapante e design respirável.',
      price: 249.90,
      originalPrice: 349.90,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      category: 'Esportes',
      affiliateLink: 'https://mercadolivre.com.br/tenis-running',
      commission: 12.0,
      storeId: '3',
      storeName: 'Mercado Livre',
      storeLogo: '/lovable-uploads/0e3ca787-7bb8-4dc5-9bde-e82458b64c6f.png',
      isActive: true,
      createdAt: '2024-03-05T14:10:00Z',
      updatedAt: '2024-05-15T09:20:00Z',
      tags: ['tênis', 'corrida', 'esporte', 'performance'],
      rating: 4.7,
      reviewsCount: 650,
      salesCount: 180,
      clicksCount: 1320
    }
  ];

  static async getAllProducts(filters?: ProductFilters): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 150));
    let filteredProducts = [...this.products];

    if (filters) {
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
      }
      if (filters.storeId) {
        filteredProducts = filteredProducts.filter(p => p.storeId === filters.storeId);
      }
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(term) || 
          p.description.toLowerCase().includes(term) ||
          p.tags.some(tag => tag.toLowerCase().includes(term))
        );
      }

      // Sorting
      if (filters.sortBy) {
        filteredProducts.sort((a, b) => {
          let aValue: number, bValue: number;
          switch (filters.sortBy) {
            case 'price':
              aValue = a.price;
              bValue = b.price;
              break;
            case 'commission':
              aValue = a.commission;
              bValue = b.commission;
              break;
            case 'rating':
              aValue = a.rating || 0;
              bValue = b.rating || 0;
              break;
            case 'sales':
              aValue = a.salesCount;
              bValue = b.salesCount;
              break;
            case 'newest':
              aValue = new Date(a.createdAt).getTime();
              bValue = new Date(b.createdAt).getTime();
              break;
            default:
              return 0;
          }
          return filters.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
        });
      }
    }

    return filteredProducts.filter(p => p.isActive);
  }

  static async getProductById(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.products.find(product => product.id === id) || null;
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.products.filter(product => product.category === category && product.isActive);
  }

  static async getProductsByStore(storeId: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.products.filter(product => product.storeId === storeId && product.isActive);
  }

  static async addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'salesCount' | 'clicksCount'>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 250));
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      salesCount: 0,
      clicksCount: 0
    };
    this.products.push(newProduct);
    return newProduct;
  }

  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return null;
    
    this.products[productIndex] = { 
      ...this.products[productIndex], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.products[productIndex];
  }

  static async deleteProduct(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return false;
    
    this.products.splice(productIndex, 1);
    return true;
  }

  static async getProductStats(): Promise<ProductStats> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const activeProducts = this.products.filter(p => p.isActive);
    const totalSales = activeProducts.reduce((sum, p) => sum + p.salesCount, 0);
    const totalClicks = activeProducts.reduce((sum, p) => sum + p.clicksCount, 0);
    const topProducts = [...activeProducts]
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, 10);
    
    const categoryStats = activeProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalProducts: this.products.length,
      activeProducts: activeProducts.length,
      totalSales,
      totalClicks,
      topProducts,
      categoryStats
    };
  }

  static async incrementClicks(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 50));
    const product = this.products.find(p => p.id === id);
    if (!product) return false;
    
    product.clicksCount += 1;
    product.updatedAt = new Date().toISOString();
    return true;
  }

  static async incrementSales(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 50));
    const product = this.products.find(p => p.id === id);
    if (!product) return false;
    
    product.salesCount += 1;
    product.updatedAt = new Date().toISOString();
    return true;
  }
}
