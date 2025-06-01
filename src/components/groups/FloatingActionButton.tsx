
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Pin, UserX, MessageCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FloatingActionButtonProps {
  isAdmin: boolean;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ isAdmin }) => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAction = (action: string) => {
    setIsMenuOpen(false);
    
    switch (action) {
      case 'createPost':
        toast({
          title: "📝 Criar Post",
          description: "Abrindo editor de posts...",
        });
        break;
      case 'pinPost':
        toast({
          title: "📌 Fixar Post",
          description: "Selecione um post para fixar",
        });
        break;
      case 'banMember':
        toast({
          title: "🛑 Banir Membro",
          description: "Função de moderação ativada",
        });
        break;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu de Ações (aparece quando clicado) */}
      {isMenuOpen && (
        <Card className="absolute bottom-16 right-0 mb-2 bg-slate-800/95 border-purple-500/30 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-2">
            <div className="space-y-2 min-w-[200px]">
              {isAdmin ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction('pinPost')}
                    className="w-full justify-start text-white hover:bg-purple-600/20 hover:text-purple-300"
                  >
                    <Pin size={16} className="mr-2" />
                    Fixar Post
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction('banMember')}
                    className="w-full justify-start text-white hover:bg-red-600/20 hover:text-red-300"
                  >
                    <UserX size={16} className="mr-2" />
                    Banir Membro
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction('createPost')}
                    className="w-full justify-start text-white hover:bg-green-600/20 hover:text-green-300"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    Criar Post
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAction('createPost')}
                  className="w-full justify-start text-white hover:bg-green-600/20 hover:text-green-300"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Criar Post
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botão Principal */}
      <Button
        onClick={handleMenuToggle}
        className="fab-button w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-0"
        style={{
          boxShadow: '0 4px 12px rgba(106, 53, 242, 0.3)'
        }}
      >
        {isMenuOpen ? (
          <X size={24} className="transition-transform duration-300" />
        ) : (
          <Plus size={24} className="transition-transform duration-300" />
        )}
      </Button>
    </div>
  );
};
