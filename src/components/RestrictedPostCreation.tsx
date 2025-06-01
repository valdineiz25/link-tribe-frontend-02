
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RestrictedPostCreation: React.FC = () => {
  const { toast } = useToast();

  const handleUpgradePrompt = () => {
    toast({
      title: "🔒 Funcionalidade Restrita",
      description: "Você é um usuário comprador! 🛍️ Para vender produtos, cadastre-se como afiliado.",
    });
  };

  return (
    <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Modo Comprador Ativo 🛍️
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Você pode curtir, comentar e salvar produtos, mas não pode criar posts de vendas.
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-4">
              <AlertCircle size={14} />
              <span>Para manter a qualidade do feed, apenas afiliados verificados podem vender</span>
            </div>
          </div>

          <Button
            onClick={handleUpgradePrompt}
            variant="outline"
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            💼 Quero ser Afiliado
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestrictedPostCreation;
