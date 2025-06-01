
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { useConsumer } from '@/hooks/useConsumer';
import { ConsumerFeed } from '@/components/feeds/ConsumerFeed';
import { AffiliateFeed } from '@/components/feeds/AffiliateFeed';

const Feed: React.FC = () => {
  const { user } = useAuth();
  const { 
    userRole, 
    loading: roleLoading, 
    isAffiliate 
  } = useUserRole();

  const {
    isConsumer,
    loading: consumerLoading
  } = useConsumer();

  // Debug logs para identificar o problema
  console.log('🔍 Feed Debug:', {
    user: user ? { id: user.id, name: user.name } : null,
    userRole,
    isAffiliate,
    isConsumer,
    roleLoading,
    consumerLoading
  });

  if (roleLoading || consumerLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando perfil...</p>
        </div>
      </div>
    );
  }

  // Debug: Mostrar qual feed está sendo renderizado
  if (isAffiliate) {
    console.log('✅ Renderizando AffiliateFeed para usuário:', user?.name);
    return <AffiliateFeed />;
  }

  if (isConsumer) {
    console.log('✅ Renderizando ConsumerFeed para usuário:', user?.name);
    return <ConsumerFeed />;
  }

  // Fallback - sempre mostrar consumer por padrão
  console.log('⚠️ Usando fallback ConsumerFeed para usuário:', user?.name);
  return <ConsumerFeed />;
};

export default Feed;
