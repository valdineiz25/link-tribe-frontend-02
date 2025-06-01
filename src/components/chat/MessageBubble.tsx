
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Star,
  TrendingUp,
  Eye
} from 'lucide-react';

interface AffiliateLink {
  url: string;
  productName: string;
  price: string;
  thumbnail: string;
  commission: number;
  clicks?: number;
  conversions?: number;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  affiliateLink?: AffiliateLink;
  reactions?: { emoji: string; count: number }[];
  readStatus?: 'sent' | 'delivered' | 'read';
  readTime?: string;
}

interface MessageBubbleProps {
  message: Message;
  showSenderName?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  showSenderName = false
}) => {
  const handleLinkClick = () => {
    if (message.affiliateLink) {
      window.open(message.affiliateLink.url, '_blank');
    }
  };

  return (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md ${
          message.isOwn
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
            : 'bg-white border text-gray-900 shadow-sm'
        } rounded-2xl overflow-hidden`}
      >
        {/* Header da mensagem (apenas para outros usuários) */}
        {!message.isOwn && showSenderName && (
          <div className="px-4 pt-3 pb-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-purple-600">
                {message.senderName}
              </span>
              <Badge variant="secondary" className="text-xs">
                Afiliado Pro
              </Badge>
            </div>
          </div>
        )}

        {/* Conteúdo da mensagem */}
        <div className="px-4 py-3">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {/* Preview de link afiliado */}
        {message.affiliateLink && (
          <div className="border-t mx-4 mb-3">
            <div className="pt-3">
              <div className="flex items-start space-x-3 bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors" onClick={handleLinkClick}>
                <img
                  src={message.affiliateLink.thumbnail}
                  alt={message.affiliateLink.productName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 truncate">
                    {message.affiliateLink.productName}
                  </h4>
                  <p className="text-lg font-bold text-purple-600 mt-1">
                    {message.affiliateLink.price}
                  </p>
                  <div className="flex items-center space-x-3 mt-2">
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      <Star size={10} className="mr-1" />
                      {message.affiliateLink.commission}% comissão
                    </Badge>
                    {message.affiliateLink.clicks && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Eye size={10} className="mr-1" />
                        {message.affiliateLink.clicks}
                      </div>
                    )}
                  </div>
                </div>
                <ExternalLink size={16} className="text-gray-400 mt-1" />
              </div>
            </div>
          </div>
        )}

        {/* Reações */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="px-4 pb-2">
            <div className="flex space-x-1">
              {message.reactions.map((reaction, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-full px-2 py-1 text-xs flex items-center space-x-1"
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-gray-600">{reaction.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp e status de leitura */}
        <div className={`px-4 pb-3 flex items-center justify-between text-xs ${
          message.isOwn ? 'text-purple-200' : 'text-gray-500'
        }`}>
          <span>{message.timestamp}</span>
          {message.isOwn && message.readStatus && (
            <div className="flex items-center space-x-1">
              <div className={`flex space-x-1 ${
                message.readStatus === 'read' ? 'text-blue-300' : 'text-purple-200'
              }`}>
                <span>✓</span>
                <span>✓</span>
              </div>
              {message.readTime && message.readStatus === 'read' && (
                <span className="ml-1 text-xs">
                  Lido {message.readTime}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
