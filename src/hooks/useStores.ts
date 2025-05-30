
import { useState, useEffect } from 'react';
import { StorageService } from '@/services/storageService';

export interface Store {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  catalogs: any[];
  createdAt: string;
}

export const useStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = () => {
    try {
      setLoading(true);
      const storedStores = StorageService.getStores();
      console.log('Lojas carregadas:', storedStores);
      setStores(storedStores);
    } catch (error) {
      console.error('Erro ao carregar lojas:', error);
    } finally {
      setLoading(false);
    }
  };

  const addStore = (store: Omit<Store, 'id' | 'createdAt'>) => {
    StorageService.saveStore(store);
    fetchStores();
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return {
    stores,
    loading,
    addStore,
    refetch: fetchStores
  };
};
