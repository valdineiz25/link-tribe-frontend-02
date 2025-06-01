
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';

const Feed: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    userRole, 
    loading, 
    isAffiliate,
    isConsumer
  } = useUserRole();

  useEffect(() => {
    if (!loading && userRole) {
      console.log('🔄 Redirecionando usuário baseado no tipo:', userRole.type);
      
      if (isAffiliate) {
        console.log('✅ Redirecionando afiliado para /affiliate-feed');
        navigate('/affiliate-feed', { replace: true });
      } else if (isConsumer) {
        console.log('✅ Redirecionando consumidor para /consumer-feed');
        navigate('/consumer-feed', { replace: true });
      }
    }
  }, [loading, userRole, isAffiliate, isConsumer, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seu perfil...</p>
        </div>
      </div>
    );
  }

  // Fallback - não deveria chegar aqui normalmente
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecionando...</p>
      </div>
    </div>
  );
};

export default Feed;
