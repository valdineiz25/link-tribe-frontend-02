export interface PartnerStore {
  id: string;
  name: string;
  logo: string;
  alt: string;
  category: string;
  commission: number;
  isActive: boolean;
}

export class PartnersApi {
  private static stores: PartnerStore[] = [
    {
      id: '1',
      name: 'Shopee',
      logo: '/lovable-uploads/2f2c8f66-efc5-45d1-bb48-29a832d5a765.png',
      alt: 'Shopee',
      category: 'Marketplace',
      commission: 8,
      isActive: true
    },
    {
      id: '2',
      name: 'Magazine Luiza',
      logo: '/lovable-uploads/e3a0f40c-9132-4c47-8369-5b3534dd866e.png',
      alt: 'Magazine Luiza',
      category: 'Varejo',
      commission: 6,
      isActive: true
    },
    {
      id: '3',
      name: 'Mercado Livre',
      logo: '/lovable-uploads/0e3ca787-7bb8-4dc5-9bde-e82458b64c6f.png',
      alt: 'Mercado Livre',
      category: 'Marketplace',
      commission: 7,
      isActive: true
    },
    {
      id: '4',
      name: 'Amazon',
      logo: '/lovable-uploads/f17ed122-502f-4692-8287-26005601041f.png',
      alt: 'Amazon',
      category: 'Internacional',
      commission: 10,
      isActive: true
    },
    {
      id: '5',
      name: 'Temu',
      logo: '/lovable-uploads/e41781f9-4219-4be6-8fab-b3f5a42c55dc.png',
      alt: 'Temu',
      category: 'Internacional',
      commission: 12,
      isActive: true
    },
    {
      id: '6',
      name: 'AliExpress',
      logo: '/lovable-uploads/d5ad38d1-fd6d-4fb6-94a8-a8b85e5762d8.png',
      alt: 'AliExpress',
      category: 'Internacional',
      commission: 8,
      isActive: true
    },
    {
      id: '7',
      name: 'Shein',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Shein_logo.svg',
      alt: 'Shein',
      category: 'Moda',
      commission: 15,
      isActive: true
    }
  ];

  static async getAllStores(): Promise<PartnerStore[]> {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.stores.filter(store => store.isActive);
  }

  static async getStoreById(id: string): Promise<PartnerStore | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.stores.find(store => store.id === id) || null;
  }

  static async getStoresByCategory(category: string): Promise<PartnerStore[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.stores.filter(store => store.category === category && store.isActive);
  }

  static async addStore(store: Omit<PartnerStore, 'id'>): Promise<PartnerStore> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const newStore: PartnerStore = {
      ...store,
      id: Date.now().toString()
    };
    this.stores.push(newStore);
    return newStore;
  }

  static async updateStore(id: string, updates: Partial<PartnerStore>): Promise<PartnerStore | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const storeIndex = this.stores.findIndex(store => store.id === id);
    if (storeIndex === -1) return null;
    
    this.stores[storeIndex] = { ...this.stores[storeIndex], ...updates };
    return this.stores[storeIndex];
  }

  static async deleteStore(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const storeIndex = this.stores.findIndex(store => store.id === id);
    if (storeIndex === -1) return false;
    
    this.stores.splice(storeIndex, 1);
    return true;
  }

  static async getStats(): Promise<{
    totalStores: number;
    totalActiveStores: number;
    averageCommission: number;
    categoriesCount: Record<string, number>;
  }> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const activeStores = this.stores.filter(store => store.isActive);
    const categoriesCount = activeStores.reduce((acc, store) => {
      acc[store.category] = (acc[store.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const averageCommission = activeStores.reduce((sum, store) => sum + store.commission, 0) / activeStores.length;

    return {
      totalStores: this.stores.length,
      totalActiveStores: activeStores.length,
      averageCommission: Math.round(averageCommission * 100) / 100,
      categoriesCount
    };
  }
}
