
import { useState, useEffect } from 'react';
import { ProductsApi } from '@/services/productsApi';
import { Product, ProductFilters, ProductStats } from '@/types/product';

export const useProducts = (filters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductsApi.getAllProducts(filters);
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    try {
      const product = await ProductsApi.getProductById(id);
      return product;
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'salesCount' | 'clicksCount'>) => {
    try {
      const newProduct = await ProductsApi.addProduct(product);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError('Erro ao adicionar produto');
      throw err;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const updatedProduct = await ProductsApi.updateProduct(id, updates);
      if (updatedProduct) {
        setProducts(prev => prev.map(product => product.id === id ? updatedProduct : product));
      }
      return updatedProduct;
    } catch (err) {
      setError('Erro ao atualizar produto');
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const success = await ProductsApi.deleteProduct(id);
      if (success) {
        setProducts(prev => prev.filter(product => product.id !== id));
      }
      return success;
    } catch (err) {
      setError('Erro ao remover produto');
      throw err;
    }
  };

  const trackClick = async (id: string) => {
    try {
      await ProductsApi.incrementClicks(id);
      // Atualizar contador local
      setProducts(prev => prev.map(product => 
        product.id === id 
          ? { ...product, clicksCount: product.clicksCount + 1 }
          : product
      ));
    } catch (err) {
      console.error('Error tracking click:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(filters)]);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    trackClick,
    refetch: fetchProducts
  };
};

export const useProductStats = () => {
  const [stats, setStats] = useState<ProductStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await ProductsApi.getProductStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching product stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};
