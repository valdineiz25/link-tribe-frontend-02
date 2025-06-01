
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleService } from '@/services/userRoleService';
import { useToast } from '@/hooks/use-toast';

export const useUserTypeTransition = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchToAffiliate = async () => {
    if (!user) return false;

    setIsTransitioning(true);
    
    try {
      // Simular verificação de documentos/requisitos
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const affiliateRole = {
        userId: user.id,
        type: 'affiliate' as const,
        canCreateStore: true,
        accountAge: 30,
        validAffiliateLinks: 0
      };
      
      const success = UserRoleService.setUserRole(affiliateRole);
      
      if (success) {
        // Inicializar estatísticas de afiliado
        UserRoleService.initializeMockData(user.id);
        
        toast({
          title: "🎉 Parabéns!",
          description: "Você agora é um Afiliado Verificado! Comece a vender e ganhar comissões.",
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      toast({
        title: "❌ Erro na transição",
        description: "Não foi possível alterar o tipo de conta. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsTransitioning(false);
    }
  };

  const switchToConsumer = async () => {
    if (!user) return false;

    setIsTransitioning(true);
    
    try {
      const consumerRole = {
        userId: user.id,
        type: 'consumer' as const,
        canCreateStore: false,
        accountAge: 1,
        validAffiliateLinks: 0
      };
      
      const success = UserRoleService.setUserRole(consumerRole);
      
      if (success) {
        toast({
          title: "✅ Tipo alterado",
          description: "Você agora é um usuário comprador. Explore as ofertas!",
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      toast({
        title: "❌ Erro na transição",
        description: "Não foi possível alterar o tipo de conta. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsTransitioning(false);
    }
  };

  return {
    isTransitioning,
    switchToAffiliate,
    switchToConsumer
  };
};
