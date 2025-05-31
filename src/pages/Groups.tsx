
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Plus, 
  Users, 
  MessageCircle, 
  Settings,
  Send,
  ArrowLeft,
  Building2,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { StorageService } from '@/services/storageService';

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  image?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  isActive?: boolean;
}

interface Message {
  id: string;
  groupId: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

const Groups: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      groupId: '1',
      sender: 'Maria Silva',
      content: 'Pessoal, alguém tem dicas de produtos de skincare que estão vendendo bem?',
      timestamp: '14:30',
      isOwn: false
    },
    {
      id: '2',
      groupId: '1',
      sender: 'Você',
      content: 'Oi Maria! Estou tendo muito sucesso com o kit anti-idade da marca X. Comissão de 15% e boa conversão.',
      timestamp: '14:32',
      isOwn: true
    },
    {
      id: '3',
      groupId: '1',
      sender: 'João Santos',
      content: 'Concordo! E os produtos de protetor solar também estão em alta agora no verão.',
      timestamp: '14:35',
      isOwn: false
    }
  ]);

  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: ''
  });

  const mockGroups: Group[] = [
    {
      id: '1',
      name: 'Afiliados de Beleza',
      description: 'Grupo para discussão sobre produtos de beleza e skincare',
      members: 247,
      category: 'Beleza',
      lastMessage: 'João: Concordo! E os produtos de protetor...',
      lastMessageTime: '14:35',
      isActive: true
    },
    {
      id: '2',
      name: 'Tech Afiliados',
      description: 'Produtos de tecnologia e eletrônicos',
      members: 189,
      category: 'Tecnologia',
      lastMessage: 'Ana: Alguém testou o novo smartphone?',
      lastMessageTime: '12:20',
      isActive: true
    },
    {
      id: '3',
      name: 'Saúde e Bem-estar',
      description: 'Suplementos, equipamentos fitness e produtos de saúde',
      members: 156,
      category: 'Saúde',
      lastMessage: 'Carlos: As vendas de whey protein...',
      lastMessageTime: 'Ontem',
      isActive: false
    }
  ];

  useEffect(() => {
    const savedGroups = StorageService.getGroups();
    const allGroups = [...mockGroups, ...savedGroups];
    setGroups(allGroups);
  }, []);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = () => {
    if (!newGroup.name.trim() || !newGroup.description.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Criando grupo:', newGroup);
      const savedGroup = StorageService.saveGroup(newGroup);
      
      setGroups(prev => [...prev, savedGroup]);
      
      toast({
        title: "Grupo criado com sucesso",
        description: `O grupo "${newGroup.name}" foi criado.`,
      });

      setNewGroup({ name: '', description: '', category: '' });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar grupo. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedGroup) return;

    const message: Message = {
      id: Date.now().toString(),
      groupId: selectedGroup.id,
      sender: 'Você',
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada para o grupo.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const groupMessages = messages.filter(msg => msg.groupId === selectedGroup?.id);

  if (selectedGroup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto p-6">
          <Card className="mb-6 border-0 shadow-sm">
            <CardHeader className="bg-white border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedGroup(null)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft size={20} />
                  </Button>
                  <div>
                    <CardTitle className="text-xl text-gray-900">{selectedGroup.name}</CardTitle>
                    <p className="text-gray-500 text-sm flex items-center mt-1">
                      <Users size={14} className="mr-1" />
                      {selectedGroup.members} membros
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                  <Settings size={20} />
                </Button>
              </div>
            </CardHeader>
          </Card>

          <Card className="h-[600px] flex flex-col border-0 shadow-sm">
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[500px] p-6">
                <div className="space-y-4">
                  {groupMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.isOwn
                            ? 'bg-gray-900 text-white'
                            : 'bg-white border text-gray-900'
                        }`}
                      >
                        {!message.isOwn && (
                          <p className="text-xs font-medium mb-1 text-gray-600">
                            {message.sender}
                          </p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            <div className="border-t bg-white p-4">
              <div className="flex space-x-3">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!newMessage.trim()}
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Grupos Profissionais
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conecte-se com outros afiliados, compartilhe experiências e construa relacionamentos estratégicos
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Buscar grupos por nome ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gray-900 hover:bg-gray-800 h-12 px-6"
          >
            <Plus size={20} className="mr-2" />
            Criar Grupo
          </Button>
        </div>

        {showCreateForm && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="bg-white">
              <CardTitle className="text-gray-900 flex items-center">
                <Building2 className="mr-2" size={20} />
                Criar Novo Grupo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6 bg-white">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Grupo *
                </label>
                <Input
                  value={newGroup.name}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Afiliados de Tecnologia"
                  className="h-11"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <Textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva o propósito do grupo..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <Input
                  value={newGroup.category}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Ex: Tecnologia, Beleza, Saúde"
                  className="h-11"
                />
              </div>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 h-11"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  className="flex-1 h-11 bg-gray-900 hover:bg-gray-800"
                >
                  Criar Grupo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card 
              key={group.id} 
              className="hover:shadow-md transition-all cursor-pointer border-0 shadow-sm bg-white"
              onClick={() => setSelectedGroup(group)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 mb-2">{group.name}</CardTitle>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                      {group.category}
                    </Badge>
                  </div>
                  {group.isActive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    <span>{group.members}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle size={14} className="mr-1" />
                    <span>Ativo</span>
                  </div>
                </div>

                {group.lastMessage && (
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-600 truncate mb-1">{group.lastMessage}</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock size={12} className="mr-1" />
                      {group.lastMessageTime}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum grupo encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar sua busca ou crie um novo grupo
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
