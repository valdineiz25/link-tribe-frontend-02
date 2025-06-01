
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  Store, 
  ArrowRightLeft, 
  Shield,
  DollarSign,
  Users,
  TrendingUp
} from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';
import { useUserTypeTransition } from '@/hooks/useUserTypeTransition';
import { useToast } from '@/hooks/use-toast';

export const UserTypeSwitcher: React.FC = () => {
  const { toast } = useToast();
  const { userRole, isAffiliate } = useUserRole();
  const { isTransitioning, switchToAffiliate, switchToConsumer } = useUserTypeTransition();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleSwitchToAffiliate = async () => {
    const success = await switchToAffiliate();
    if (success) {
      // Recarregar a página para aplicar o novo feed
      window.location.reload();
    }
  };

  const handleSwitchToConsumer = async () => {
    const success = await switchToConsumer();
    if (success) {
      // Recarregar a página para aplicar o novo feed
      window.location.reload();
    }
  };

  const showUpgradeInfo = () => {
    setShowUpgradeModal(true);
    toast({
      title: "💡 Informações de Upgrade",
      description: "Veja os benefícios de se tornar um afiliado!",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto border border-gray-200 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <ArrowRightLeft className="text-blue-600" size={20} />
          <span>Tipo de Conta</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Atual */}
        <div className="text-center">
          <Badge className={isAffiliate ? "bg-purple-600 text-white" : "bg-blue-600 text-white"}>
            {isAffiliate ? (
              <>
                <Store size={14} className="mr-1" />
                Afiliado Vendedor
              </>
            ) : (
              <>
                <ShoppingBag size={14} className="mr-1" />
                Usuário Comprador
              </>
            )}
          </Badge>
        </div>

        {/* Descrição do Tipo Atual */}
        <div className="text-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
          {isAffiliate ? (
            <>
              <Store className="mx-auto mb-2 text-purple-600" size={24} />
              <p className="font-medium">Você pode criar lojas, postar produtos e ganhar comissões!</p>
            </>
          ) : (
            <>
              <ShoppingBag className="mx-auto mb-2 text-blue-600" size={24} />
              <p className="font-medium">Você pode comprar produtos com descontos exclusivos!</p>
            </>
          )}
        </div>

        {/* Benefícios do Outro Tipo */}
        {!isAffiliate && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-center">
              Quero ser Afiliado e Vender!
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-green-600">
                <DollarSign size={16} />
                <span>Ganhe comissões em cada venda</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Store size={16} />
                <span>Crie sua própria loja virtual</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <TrendingUp size={16} />
                <span>Acesso a ferramentas de marketing</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-600">
                <Shield size={16} />
                <span>Badge de afiliado verificado</span>
              </div>
            </div>
            
            <Button
              onClick={handleSwitchToAffiliate}
              disabled={isTransitioning}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {isTransitioning ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processando...</span>
                </div>
              ) : (
                <>
                  <Store size={16} className="mr-2" />
                  Quero ser Afiliado!
                </>
              )}
            </Button>
          </div>
        )}

        {isAffiliate && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-center">
              Voltar para Modo Comprador
            </h4>
            <p className="text-sm text-gray-600 text-center">
              Você pode voltar ao modo comprador a qualquer momento.
            </p>
            
            <Button
              onClick={handleSwitchToConsumer}
              disabled={isTransitioning}
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              {isTransitioning ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Processando...</span>
                </div>
              ) : (
                <>
                  <ShoppingBag size={16} className="mr-2" />
                  Modo Comprador
                </>
              )}
            </Button>
          </div>
        )}

        {/* Informações Adicionais */}
        <div className="text-xs text-gray-500 text-center p-2 bg-gray-50 rounded">
          <Shield size={12} className="inline mr-1" />
          Você pode alternar entre os modos a qualquer momento
        </div>
      </CardContent>
    </Card>
  );
};
