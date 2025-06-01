
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send, 
  Paperclip, 
  Smile,
  Star,
  Link2
} from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string, affiliateLink?: any) => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = "Digite sua mensagem..."
}) => {
  const [message, setMessage] = useState('');
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAffiliateLink = () => {
    // Simular adição de link afiliado
    const mockAffiliateLink = {
      url: 'https://shopee.com.br/produto-exemplo',
      productName: 'Smartphone Android Pro Max 128GB',
      price: 'R$ 899,99',
      thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop',
      commission: 8.5,
      clicks: 12,
      conversions: 2
    };
    
    onSendMessage('Produto incrível com ótima comissão! 🚀', mockAffiliateLink);
    setShowAffiliateModal(false);
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-center space-x-3">
        {/* Botões de ação */}
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-500 hover:text-purple-600"
          >
            <Paperclip size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-500 hover:text-purple-600"
          >
            <Smile size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAffiliateLink}
            className="h-9 w-9 text-gray-500 hover:text-purple-600 relative group"
            title="Adicionar Link Afiliado"
          >
            <Star size={18} />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Link Afiliado
            </div>
          </Button>
        </div>

        {/* Input de mensagem */}
        <Input
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 rounded-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
        />

        {/* Botão de enviar */}
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full h-10 w-10 p-0"
        >
          <Send size={18} />
        </Button>
      </div>

      {/* Preview de modo vendedor */}
      <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="flex items-center space-x-2 text-sm">
          <Star size={16} className="text-purple-600" />
          <span className="font-medium text-purple-700">Modo Vendedor Ativo</span>
          <span className="text-purple-600">• Produto fixado no topo</span>
        </div>
      </div>
    </div>
  );
};
