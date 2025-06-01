
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Phone,
  Video,
  Search,
  MoreVertical,
  User,
  ArrowLeft
} from 'lucide-react';
import { ContactSidebar } from '@/components/chat/ContactSidebar';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatSidebar } from '@/components/chat/ChatSidebar';

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [showSidebar, setShowSidebar] = useState(true);

  const mockContacts = [
    {
      id: '1',
      name: 'Maria Silva',
      online: true,
      lastMessage: 'Oi! Como está indo com as vendas?',
      timestamp: '14:30',
      unread: 2,
      role: 'Afiliado Senior'
    },
    {
      id: '2',
      name: 'João Santos',
      online: false,
      lastMessage: 'Obrigado pela dica do produto!',
      timestamp: '13:45',
      unread: 0,
      role: 'Afiliado'
    },
    {
      id: '3',
      name: 'Grupo Marketing Digital',
      lastMessage: 'Ana: Nova estratégia funcionou muito bem',
      timestamp: '12:20',
      unread: 5,
      online: true,
      isGroup: true,
      members: 247
    }
  ];

  const mockMessages = [
    {
      id: '1',
      senderId: '2',
      senderName: 'Maria Silva',
      content: 'Oi! Como está indo com as vendas?',
      timestamp: '14:25',
      isOwn: false,
      readStatus: 'read' as const,
      reactions: [{ emoji: '👍', count: 1 }]
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'Você',
      content: 'Oi Maria! Está indo bem, consegui 3 vendas hoje.',
      timestamp: '14:27',
      isOwn: true,
      readStatus: 'read' as const,
      readTime: '14:28'
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'Maria Silva',
      content: 'Que ótimo! Qual produto está convertendo melhor?',
      timestamp: '14:28',
      isOwn: false,
      readStatus: 'read' as const
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'Você',
      content: 'Este smartphone está bombando! A comissão de 8.5% é excelente.',
      timestamp: '14:30',
      isOwn: true,
      readStatus: 'delivered' as const,
      affiliateLink: {
        url: 'https://shopee.com.br/smartphone-pro',
        productName: 'Smartphone Android Pro Max 128GB',
        price: 'R$ 899,99',
        thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop',
        commission: 8.5,
        clicks: 12,
        conversions: 2
      }
    }
  ];

  const mockContactProfile = {
    id: '1',
    name: 'Maria Silva',
    role: 'Afiliado Senior',
    network: 'Rede Premium',
    conversionRate: 12.5,
    totalSales: 847,
    rating: 4.9,
    isOnline: true
  };

  const mockSharedLinks = [
    {
      id: '1',
      productName: 'Smartphone Android Pro Max',
      url: 'https://shopee.com.br/smartphone',
      clicks: 156,
      conversions: 12,
      date: 'Hoje',
      ctr: 7.7
    },
    {
      id: '2',
      productName: 'Kit Skincare Anti-idade',
      url: 'https://magazineluiza.com.br/skincare',
      clicks: 89,
      conversions: 8,
      date: 'Ontem',
      ctr: 9.0
    }
  ];

  const selectedContact = mockContacts.find(c => c.id === selectedChat);

  const handleSendMessage = (content: string, affiliateLink?: any) => {
    console.log('Enviando mensagem:', { content, affiliateLink });
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar de contatos */}
      <div className="w-80 border-r bg-white">
        <ContactSidebar
          contacts={mockContacts}
          selectedContact={selectedChat}
          onSelectContact={setSelectedChat}
        />
      </div>

      {/* Chat principal */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Header do chat */}
            <Card className="rounded-none border-0 border-b shadow-sm">
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      onClick={() => setSelectedChat('')}
                    >
                      <ArrowLeft size={20} />
                    </Button>
                    
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {selectedContact.isGroup ? '👥' : selectedContact.name.charAt(0)}
                      </div>
                      {!selectedContact.isGroup && selectedContact.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedContact.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedContact.isGroup 
                          ? `${selectedContact.members} membros`
                          : selectedContact.online ? 'Online agora' : 'Visto por último hoje'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600">
                      <Search size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600">
                      <Phone size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600">
                      <Video size={20} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-600 hover:text-purple-600"
                      onClick={() => setShowSidebar(!showSidebar)}
                    >
                      <MoreVertical size={20} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Área de mensagens */}
            <div className="flex-1 bg-gray-50">
              <ScrollArea className="h-[500px] p-6">
                <div className="space-y-1">
                  {mockMessages.map((message, index) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      showSenderName={!message.isOwn && selectedContact.isGroup}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Input de mensagem */}
            <ChatInput
              onSendMessage={handleSendMessage}
              placeholder={`Mensagem para ${selectedContact.name}...`}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <User size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Bem-vindo ao Chat Profissional
              </h3>
              <p className="text-gray-500 max-w-sm">
                Selecione uma conversa ou grupo para começar a networking e compartilhar seus links afiliados
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar de contexto */}
      {showSidebar && selectedContact && (
        <div className="w-80 border-l bg-white">
          <ChatSidebar
            contact={mockContactProfile}
            sharedLinks={mockSharedLinks}
            isGroup={selectedContact.isGroup}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
