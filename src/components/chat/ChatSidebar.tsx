
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  User,
  TrendingUp,
  ExternalLink,
  MessageCircle,
  Star,
  Eye,
  BarChart3
} from 'lucide-react';

interface ContactProfile {
  id: string;
  name: string;
  role: string;
  network: string;
  conversionRate: number;
  totalSales: number;
  rating: number;
  isOnline: boolean;
}

interface SharedLink {
  id: string;
  productName: string;
  url: string;
  clicks: number;
  conversions: number;
  date: string;
  ctr: number;
}

interface ChatSidebarProps {
  contact: ContactProfile | null;
  sharedLinks: SharedLink[];
  isGroup?: boolean;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  contact,
  sharedLinks,
  isGroup = false
}) => {
  if (!contact) {
    return (
      <Card className="h-full border-0 shadow-sm rounded-none">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <User size={48} className="mx-auto mb-4 opacity-50" />
            <p>Selecione um contato para ver os detalhes</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-0 shadow-sm rounded-none">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Perfil do Contato
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          {/* Perfil do usuário */}
          <div className="p-6 border-b">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                {contact.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-lg text-gray-900">{contact.name}</h3>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Badge variant="secondary">{contact.role}</Badge>
                {contact.isOnline && (
                  <Badge className="bg-green-100 text-green-700">Online</Badge>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rede:</span>
                <span className="font-medium text-sm">{contact.network}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Taxa de Conversão:</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="font-medium text-sm text-green-600">
                    {contact.conversionRate}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Vendas Totais:</span>
                <span className="font-medium text-sm">{contact.totalSales}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avaliação:</span>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-500 fill-current" />
                  <span className="font-medium text-sm">{contact.rating}</span>
                </div>
              </div>
            </div>

            {isGroup && (
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                <MessageCircle size={16} className="mr-2" />
                Chamar no Privado
              </Button>
            )}
          </div>

          {/* Links compartilhados */}
          <div className="p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <ExternalLink size={18} className="mr-2" />
              Links Compartilhados
            </h4>

            <div className="space-y-3">
              {sharedLinks.slice(0, 5).map((link) => (
                <div
                  key={link.id}
                  className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-sm text-gray-900 truncate">
                      {link.productName}
                    </h5>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ml-2 ${
                        link.ctr > 5 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      CTR {link.ctr.toFixed(1)}%
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye size={12} className="mr-1" />
                        {link.clicks}
                      </div>
                      <div className="flex items-center">
                        <BarChart3 size={12} className="mr-1" />
                        {link.conversions} vendas
                      </div>
                    </div>
                    <span>{link.date}</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${Math.min(link.ctr * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {sharedLinks.length > 5 && (
              <Button variant="ghost" className="w-full mt-3 text-purple-600">
                Ver todos os links ({sharedLinks.length})
              </Button>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
