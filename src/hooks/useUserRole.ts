
import { useState, useEffect } from 'react';
import { UserRoleService } from '@/services/userRoleService';
import { UserRole, AffiliateStats } from '@/types/affiliate';
import { useAuth } from '@/contexts/AuthContext';

export const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [affiliateStats, setAffiliateStats] = useState<AffiliateStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      console.log('🔄 useUserRole: Iniciando para usuário:', user.name);
      setLoading(true);
      
      // Buscar role do usuário
      let role = UserRoleService.getUserRole(user.id);
      console.log('📋 Role encontrada:', role);

      // Inicializar dados mock se não existir role
      if (!role) {
        console.log('⚠️ Nenhuma role encontrada, inicializando dados mock...');
        UserRoleService.initializeMockData(user.id);
        role = UserRoleService.getUserRole(user.id);
        console.log('✅ Role criada:', role);
      }

      setUserRole(role);

      // Se for afiliado, buscar estatísticas
      if (role?.type === 'affiliate') {
        console.log('📊 Buscando stats de afiliado...');
        const stats = UserRoleService.getAffiliateStats(user.id);
        console.log('📊 Stats encontradas:', stats);
        setAffiliateStats(stats);
      } else {
        // Limpar stats se for consumer
        setAffiliateStats(null);
      }

      setLoading(false);
    } else {
      console.log('❌ useUserRole: Nenhum usuário logado');
      setUserRole(null);
      setAffiliateStats(null);
      setLoading(false);
    }
  }, [user]);

  const isAffiliate = userRole?.type === 'affiliate';
  const isConsumer = userRole?.type === 'consumer';
  const canCreateStore = UserRoleService.canCreateStore(user?.id || '');
  const hasStore = userRole?.storeId !== undefined;

  console.log('🎯 useUserRole resultado:', {
    userRole: userRole?.type,
    isAffiliate,
    isConsumer,
    canCreateStore,
    hasStore,
    loading
  });

  const updateAffiliateStats = (newStats: AffiliateStats) => {
    if (user && isAffiliate) {
      UserRoleService.updateAffiliateStats(user.id, newStats);
      setAffiliateStats(newStats);
    }
  };

  const switchUserType = (newType: 'affiliate' | 'consumer') => {
    if (user) {
      const success = UserRoleService.switchUserType(user.id, newType);
      if (success) {
        // Recarregar dados
        const updatedRole = UserRoleService.getUserRole(user.id);
        setUserRole(updatedRole);
        
        if (newType === 'affiliate') {
          const stats = UserRoleService.getAffiliateStats(user.id);
          setAffiliateStats(stats);
        } else {
          setAffiliateStats(null);
        }
      }
      return success;
    }
    return false;
  };

  return {
    userRole,
    affiliateStats,
    loading,
    isAffiliate,
    isConsumer,
    canCreateStore,
    hasStore,
    updateAffiliateStats,
    switchUserType
  };
};
