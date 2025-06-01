
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
      setLoading(true);
      
      // Buscar role do usuário
      const role = UserRoleService.getUserRole(user.id);
      setUserRole(role);

      // Se for afiliado, buscar estatísticas
      if (role?.type === 'affiliate') {
        const stats = UserRoleService.getAffiliateStats(user.id);
        setAffiliateStats(stats);
      }

      // Inicializar dados mock se não existir role
      if (!role) {
        UserRoleService.initializeMockData(user.id);
        const newRole = UserRoleService.getUserRole(user.id);
        const newStats = UserRoleService.getAffiliateStats(user.id);
        setUserRole(newRole);
        setAffiliateStats(newStats);
      }

      setLoading(false);
    }
  }, [user]);

  const isAffiliate = userRole?.type === 'affiliate';
  const canCreateStore = UserRoleService.canCreateStore(user?.id || '');
  const hasStore = userRole?.storeId !== undefined;

  const updateAffiliateStats = (newStats: AffiliateStats) => {
    if (user && isAffiliate) {
      UserRoleService.updateAffiliateStats(user.id, newStats);
      setAffiliateStats(newStats);
    }
  };

  return {
    userRole,
    affiliateStats,
    loading,
    isAffiliate,
    canCreateStore,
    hasStore,
    updateAffiliateStats
  };
};
