
import { useState, useEffect } from 'react';
import { PartnersApi, PartnerStore } from '@/services/partnersApi';

export const usePartners = () => {
  const [stores, setStores] = useState<PartnerStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PartnersApi.getAllStores();
      setStores(data);
    } catch (err) {
      setError('Erro ao carregar lojas parceiras');
      console.error('Error fetching stores:', err);
    } finally {
      setLoading(false);
    }
  };

  const addStore = async (store: Omit<PartnerStore, 'id'>) => {
    try {
      const newStore = await PartnersApi.addStore(store);
      setStores(prev => [...prev, newStore]);
      return newStore;
    } catch (err) {
      setError('Erro ao adicionar loja');
      throw err;
    }
  };

  const updateStore = async (id: string, updates: Partial<PartnerStore>) => {
    try {
      const updatedStore = await PartnersApi.updateStore(id, updates);
      if (updatedStore) {
        setStores(prev => prev.map(store => store.id === id ? updatedStore : store));
      }
      return updatedStore;
    } catch (err) {
      setError('Erro ao atualizar loja');
      throw err;
    }
  };

  const deleteStore = async (id: string) => {
    try {
      const success = await PartnersApi.deleteStore(id);
      if (success) {
        setStores(prev => prev.filter(store => store.id !== id));
      }
      return success;
    } catch (err) {
      setError('Erro ao remover loja');
      throw err;
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return {
    stores,
    loading,
    error,
    addStore,
    updateStore,
    deleteStore,
    refetch: fetchStores
  };
};

export const usePartnerStats = () => {
  const [stats, setStats] = useState<{
    totalStores: number;
    totalActiveStores: number;
    averageCommission: number;
    categoriesCount: Record<string, number>;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await PartnersApi.getStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};
