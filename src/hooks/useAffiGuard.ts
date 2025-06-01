
import { useState, useCallback } from 'react';
import { AffiGuardService } from '@/services/affiGuardService';
import { useToast } from '@/hooks/use-toast';

export const useAffiGuard = (userId: string = '1') => {
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const validateContent = useCallback(async (content: string, productLink?: string): Promise<boolean> => {
    setIsValidating(true);

    try {
      // Verificar se o usuário está suspenso
      if (AffiGuardService.isUserSuspended(userId)) {
        toast({
          title: "⚠️ Conta Suspensa",
          description: "Sua conta foi suspensa temporariamente por tentativas repetidas de postar links não autorizados. Entre em contato com o suporte.",
          variant: "destructive",
        });
        return false;
      }

      // Validar conteúdo do post
      const contentValidation = AffiGuardService.validatePostContent(content, userId);
      
      // Validar link do produto separadamente se fornecido
      if (productLink && productLink.trim()) {
        const linkValidation = AffiGuardService.validateLink(productLink);
        if (!linkValidation.isValid) {
          AffiGuardService.recordViolation(userId, productLink, linkValidation.reason || 'Link não autorizado');
          contentValidation.isValid = false;
          contentValidation.blockedLinks.push(productLink);
        }
      }

      if (!contentValidation.isValid) {
        const violationsCount = AffiGuardService.getUserViolationsCount(userId);
        
        toast({
          title: contentValidation.message?.includes('suspensa') ? "⚠️ Conta Suspensa" : "❌ Links Bloqueados",
          description: contentValidation.message || 'Alguns links não são permitidos.',
          variant: "destructive",
        });

        // Avisar sobre violações se estiver próximo do limite
        if (violationsCount === 2) {
          toast({
            title: "⚠️ Último Aviso",
            description: "Esta é sua última tentativa antes da suspensão automática!",
            variant: "destructive",
          });
        }

        return false;
      }

      return true;

    } catch (error) {
      console.error('Erro na validação AffiGuard:', error);
      toast({
        title: "Erro de Validação",
        description: "Erro interno na validação de links. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [userId, toast]);

  const getUserStatus = useCallback(() => {
    const violationsCount = AffiGuardService.getUserViolationsCount(userId);
    const isSuspended = AffiGuardService.isUserSuspended(userId);
    
    return {
      violationsCount,
      isSuspended,
      remainingAttempts: Math.max(0, 3 - violationsCount)
    };
  }, [userId]);

  const getStats = useCallback(() => {
    return AffiGuardService.getViolationStats();
  }, []);

  return {
    validateContent,
    getUserStatus,
    getStats,
    isValidating
  };
};
