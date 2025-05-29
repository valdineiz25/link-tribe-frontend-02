
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search,
  Send,
  User,
  MoreVertical,
  Phone,
  Video
} from 'lucide-react';

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');

  const mockConversations = [
    {
      id: '1',
      name: 'Maria Silva',
      avatar: null,
      lastMessage: 'Oi! Como está indo com as vendas?',
      timestamp: '14:30',
      unread: 2,
      online: true
    },
    {
      id: '2',
      name: 'João Santos',
      avatar: null,
      lastMessage: 'Obrigado pela dica do produto!',
      timestamp: '13:45',
      unread: 0,
      online: false
    },
    {
      id: '3',
      name: 'Grupo Marketing Digital',
      avatar: null,
      lastMessage: 'Ana: Nova estratégia funcionou muito bem',
      timestamp: '12:20',
      unread: 5,
      online: true,
      isGroup: true
    },
    {
      id: '4',
      name: 'Carlos Lima',
      avatar: null,
      lastMessage: 'Quando podemos conversar sobre a parceria?',
      timestamp: 'Ontem',
      unread: 1,
      online: false
    }
  ];

  const mockMessages = [
    {
      id: '1',
      senderId: '2',
      senderName: 'Maria Silva',
      content: 'Oi! Como está indo com as vendas?',
      timestamp: '14:25',
      isOwn: false
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'Você',
      content: 'Oi Maria! Está indo bem, consegui 3 vendas hoje.',
      timestamp: '14:27',
      isOwn: true
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'Maria Silva',
      content: 'Que ótimo! Qual produto está convertendo melhor?',
      timestamp: '14:28',
      isOwn: false
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'Você',
      content: 'O curso de marketing digital está bombando! A comissão de 25% ajuda muito.',
      timestamp: '14:30',
      isOwn: true
    }
  ];

  const selectedConversation = mockConversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Enviando mensagem:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 h-[calc(100vh-200px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {/* Lista de Conversas */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Conversas</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input placeholder="Buscar conversas..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {mockConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedChat === conversation.id ? 'bg-primary/5 border-r-2 border-r-primary' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={20} className="text-gray-500" />
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {conversation.timestamp}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <span className="bg-primary text-white text-xs rounded-full px-2 py-1 ml-2">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Área do Chat */}
        <Card className="md:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Header do Chat */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={20} className="text-gray-500" />
                      </div>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedConversation.name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedConversation.online ? 'Online' : 'Visto por último hoje'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={20} />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Mensagens */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-primary-foreground/70' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Input de Mensagem */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send size={20} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-gray-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
                <p className="text-gray-500">Escolha uma conversa para começar a trocar mensagens</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Chat;
