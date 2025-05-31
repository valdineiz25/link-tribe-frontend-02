
import { StorageService } from './storageService';

export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string | null;
  category: string;
  affiliateLink: string;
  storeId: string;
  createdAt: string;
}

export class StoreProductsService {
  private static STORE_PRODUCTS_KEY = 'store_products';

  static getAllStoreProducts(): StoreProduct[] {
    try {
      const stored = localStorage.getItem(this.STORE_PRODUCTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar produtos da loja:', error);
      return [];
    }
  }

  static getStoreProducts(storeId: string): StoreProduct[] {
    const allProducts = this.getAllStoreProducts();
    return allProducts.filter(product => product.storeId === storeId);
  }

  static saveStoreProduct(product: StoreProduct): boolean {
    try {
      const allProducts = this.getAllStoreProducts();
      const existingIndex = allProducts.findIndex(p => p.id === product.id);
      
      if (existingIndex >= 0) {
        allProducts[existingIndex] = product;
      } else {
        allProducts.push(product);
      }
      
      localStorage.setItem(this.STORE_PRODUCTS_KEY, JSON.stringify(allProducts));
      console.log('✅ Produto da loja salvo:', product.name);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar produto da loja:', error);
      return false;
    }
  }

  static deleteStoreProduct(productId: string): boolean {
    try {
      const allProducts = this.getAllStoreProducts();
      const filteredProducts = allProducts.filter(product => product.id !== productId);
      
      localStorage.setItem(this.STORE_PRODUCTS_KEY, JSON.stringify(filteredProducts));
      console.log('✅ Produto da loja deletado:', productId);
      return true;
    } catch (error) {
      console.error('❌ Erro ao deletar produto da loja:', error);
      return false;
    }
  }

  static updateStoreProduct(productId: string, updates: Partial<StoreProduct>): boolean {
    try {
      const allProducts = this.getAllStoreProducts();
      const productIndex = allProducts.findIndex(p => p.id === productId);
      
      if (productIndex >= 0) {
        allProducts[productIndex] = { ...allProducts[productIndex], ...updates };
        localStorage.setItem(this.STORE_PRODUCTS_KEY, JSON.stringify(allProducts));
        console.log('✅ Produto da loja atualizado:', productId);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Erro ao atualizar produto da loja:', error);
      return false;
    }
  }
}

// Estender o StorageService para incluir métodos de produtos da loja
declare module './storageService' {
  namespace StorageService {
    function getStoreProducts(storeId: string): StoreProduct[];
    function saveStoreProduct(product: StoreProduct): boolean;
    function deleteStoreProduct(productId: string): boolean;
    function updateStoreProduct(productId: string, updates: Partial<StoreProduct>): boolean;
  }
}

// Adicionar métodos ao StorageService
Object.assign(StorageService, {
  getStoreProducts: StoreProductsService.getStoreProducts.bind(StoreProductsService),
  saveStoreProduct: StoreProductsService.saveStoreProduct.bind(StoreProductsService),
  deleteStoreProduct: StoreProductsService.deleteStoreProduct.bind(StoreProductsService),
  updateStoreProduct: StoreProductsService.updateStoreProduct.bind(StoreProductsService),
});
