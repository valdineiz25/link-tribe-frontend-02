
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

  // Determinar qual feed exibir baseado no tipo de usuário
  if (isAffiliate) {
    return <AffiliateFeed />;
  }

  if (isConsumer) {
    return <ConsumerFeed />;
  }

  // Fallback para usuários sem tipo definido (usar consumer por padrão)
  return <ConsumerFeed />;
};

export default Feed;
