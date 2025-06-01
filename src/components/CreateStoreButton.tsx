
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Store } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateStoreButtonProps {
  onClick: () => void;
  canCreate: boolean;
}

const CreateStoreButton: React.FC<CreateStoreButtonProps> = ({ onClick, canCreate }) => {
  const { toast } = useToast();

  const handleClick = () => {
    if (!canCreate) {
      toast({
        title: "🚫 Ação não permitida",
        description: "Você precisa ter pelo menos 1 link afiliado válido e conta ativa há mais de 7 dias.",
        variant: "destructive"
      });
      return;
    }
    onClick();
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className={`
        fixed bottom-20 right-6 z-50 w-16 h-16 rounded-full shadow-2xl
        ${canCreate 
          ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:scale-110' 
          : 'bg-gray-400 hover:bg-gray-500'
        }
        transition-all duration-300 transform hover:shadow-xl
      `}
      disabled={!canCreate}
    >
      <div className="flex flex-col items-center">
        <Plus size={20} className="text-white mb-1" />
        <Store size={16} className="text-white" />
      </div>
    </Button>
  );
};

export default CreateStoreButton;
