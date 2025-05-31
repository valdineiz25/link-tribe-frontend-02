
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
      console.log('✅ Lojas carregadas do localStorage:', storedStores);
      setStores(storedStores);
    } catch (error) {
      console.error('❌ Erro ao carregar lojas:', error);
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  const addStore = (storeData: Omit<Store, 'id' | 'createdAt'>) => {
    try {
      console.log('🏪 Iniciando criação da loja:', storeData);
      
      const newStore: Store = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: storeData.name,
        description: storeData.description,
        logo: storeData.logo,
        catalogs: storeData.catalogs || [],
        createdAt: new Date().toISOString()
      };

      console.log('🔄 Salvando loja no StorageService:', newStore);
      StorageService.saveStore(newStore);
      
      console.log('✅ Loja salva com sucesso!');
      fetchStores(); // Recarrega a lista
      return true;
    } catch (error) {
      console.error('❌ Erro crítico ao adicionar loja:', error);
      return false;
    }
  };

  const deleteStore = (storeId: string) => {
    try {
      console.log('🗑️ Deletando loja:', storeId);
      const success = StorageService.deleteStore(storeId);
      
      if (success) {
        console.log('✅ Loja deletada com sucesso!');
        fetchStores();
        return true;
      } else {
        console.error('❌ Falha ao deletar loja');
        return false;
      }
    } catch (error) {
      console.error('❌ Erro ao deletar loja:', error);
      return false;
    }
  };

  useEffect(() => {
    console.log('🚀 Inicializando useStores...');
    fetchStores();
  }, []);

  return {
    stores,
    loading,
    addStore,
    deleteStore,
    refetch: fetchStores
  };
};
