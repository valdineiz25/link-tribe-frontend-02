
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
  ArrowLeft
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
    // Carregar grupos salvos
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
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Criando grupo:', newGroup);
      const savedGroup = StorageService.saveGroup(newGroup);
      
      // Atualizar lista local
      setGroups(prev => [...prev, savedGroup]);
      
      toast({
        title: "Grupo criado! 🎉",
        description: `O grupo "${newGroup.name}" foi criado com sucesso!`,
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
      title: "Mensagem enviada! 💬",
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto p-4">
          {/* Header do Chat */}
          <Card className="mb-4">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedGroup(null)}
                    className="text-white hover:bg-white/20"
                  >
                    <ArrowLeft size={20} />
                  </Button>
                  <div>
                    <CardTitle className="text-xl">{selectedGroup.name}</CardTitle>
                    <p className="text-blue-100 text-sm">{selectedGroup.members} membros</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Settings size={20} />
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Área do Chat */}
          <Card className="h-[500px] flex flex-col">
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {groupMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {!message.isOwn && (
                          <p className="text-xs font-semibold mb-1 text-blue-600">
                            {message.sender}
                          </p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? 'text-blue-100' : 'text-gray-500'
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
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            💬 Grupos de Afiliados
          </h1>
          <p className="text-gray-600">Conecte-se com outros afiliados e compartilhe experiências</p>
        </div>

        {/* Busca e Criar Grupo */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Buscar grupos por nome ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus size={20} className="mr-2" />
            Criar Grupo
          </Button>
        </div>

        {/* Formulário de Criar Grupo */}
        {showCreateForm && (
          <Card className="border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
              <CardTitle className="text-blue-800">Criar Novo Grupo</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome do Grupo *</label>
                <Input
                  value={newGroup.name}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Afiliados de Tecnologia"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Descrição *</label>
                <Textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva o propósito do grupo..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Categoria</label>
                <Input
                  value={newGroup.category}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Ex: Tecnologia, Beleza, Saúde"
                />
              </div>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Criar Grupo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Grupos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card 
              key={group.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200"
              onClick={() => setSelectedGroup(group)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-blue-800 mb-1">{group.name}</CardTitle>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {group.category}
                    </Badge>
                  </div>
                  {group.isActive && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{group.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    {group.members} membros
                  </div>
                  <div className="flex items-center">
                    <MessageCircle size={16} className="mr-1" />
                    Chat ativo
                  </div>
                </div>

                {group.lastMessage && (
                  <div className="border-t pt-2">
                    <p className="text-xs text-gray-500 truncate">{group.lastMessage}</p>
                    <p className="text-xs text-gray-400 mt-1">{group.lastMessageTime}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum grupo encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar sua busca ou crie um novo grupo!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
