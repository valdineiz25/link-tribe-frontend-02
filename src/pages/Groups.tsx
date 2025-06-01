
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Clock,
  Heart,
  Share2,
  Bookmark,
  Pin,
  UserX,
  Link,
  BarChart3,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { StorageService } from '@/services/storageService';
import { GroupHeader } from '@/components/groups/GroupHeader';
import { GroupPost } from '@/components/groups/GroupPost';
import { FloatingActionButton } from '@/components/groups/FloatingActionButton';

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
  banner?: string;
}

interface GroupPostData {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  productImage?: string;
  linkPreview?: {
    logo: string;
    title: string;
    url: string;
  };
  actions: {
    likes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
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
  const [activeTab, setActiveTab] = useState('posts');
  const [isAdmin, setIsAdmin] = useState(true); // Simulando status de admin
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

  const [groupPosts] = useState<GroupPostData[]>([
    {
      id: '1',
      author: {
        name: 'Maria Silva',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        isVerified: true
      },
      content: 'Olha que fone incrível! Só R$ 199 na Amazon 🎧',
      productImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
      linkPreview: {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png',
        title: 'Fone Bluetooth XYZ - Cor: Preto',
        url: 'amazon.com.br'
      },
      actions: {
        likes: 245,
        comments: 32,
        shares: 18
      },
      timestamp: '2h'
    },
    {
      id: '2',
      author: {
        name: 'João Santos',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        isVerified: true
      },
      content: 'Kit skincare que está bombando! Comissão de 20% + frete grátis ✨',
      productImage: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=300&fit=crop',
      linkPreview: {
        logo: 'https://via.placeholder.com/32x32/ff6b6b/ffffff?text=S',
        title: 'Kit Anti-idade Premium - 3 produtos',
        url: 'sephora.com.br'
      },
      actions: {
        likes: 189,
        comments: 24,
        shares: 12
      },
      timestamp: '4h'
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
      isActive: true,
      banner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=200&fit=crop'
    },
    {
      id: '2',
      name: 'Tech Afiliados',
      description: 'Produtos de tecnologia e eletrônicos',
      members: 189,
      category: 'Tecnologia',
      lastMessage: 'Ana: Alguém testou o novo smartphone?',
      lastMessageTime: '12:20',
      isActive: true,
      banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=200&fit=crop'
    },
    {
      id: '3',
      name: 'Saúde e Bem-estar',
      description: 'Suplementos, equipamentos fitness e produtos de saúde',
      members: 156,
      category: 'Saúde',
      lastMessage: 'Carlos: As vendas de whey protein...',
      lastMessageTime: 'Ontem',
      isActive: false,
      banner: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=200&fit=crop'
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

  // Visualização do grupo individual
  if (selectedGroup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <GroupHeader 
          group={selectedGroup} 
          onBack={() => setSelectedGroup(null)}
          isAdmin={isAdmin}
        />
        
        {/* Barra de Navegação Sticky */}
        <div className="sticky top-0 z-10 bg-slate-800/95 backdrop-blur-sm border-b border-purple-500/20">
          <div className="max-w-5xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-transparent h-12">
                <TabsTrigger 
                  value="posts" 
                  className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:bg-purple-600/20"
                >
                  📝 Posts
                </TabsTrigger>
                {isAdmin && (
                  <TabsTrigger 
                    value="stats" 
                    className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:bg-purple-600/20"
                  >
                    📊 Estatísticas
                  </TabsTrigger>
                )}
                <TabsTrigger 
                  value="members" 
                  className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:bg-purple-600/20"
                >
                  👥 Membros
                </TabsTrigger>
                <TabsTrigger 
                  value="pinned" 
                  className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-300 hover:bg-purple-600/20"
                >
                  📌 Fixados
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-6">
          <TabsContent value="posts" className="mt-0">
            <div className="space-y-4">
              {groupPosts.map((post) => (
                <GroupPost key={post.id} post={post} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-0">
            {isAdmin && (
              <Card className="bg-slate-800/50 border-purple-500/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <BarChart3 className="mr-2" size={20} />
                    Estatísticas do Grupo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">247</div>
                      <div className="text-sm text-gray-400">Membros</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">156</div>
                      <div className="text-sm text-gray-400">Posts este mês</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">89%</div>
                      <div className="text-sm text-gray-400">Engajamento</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">R$ 12k</div>
                      <div className="text-sm text-gray-400">Vendas geradas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="members" className="mt-0">
            <Card className="bg-slate-800/50 border-purple-500/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">Membros do Grupo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Maria Silva', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face' },
                    { name: 'João Santos', role: 'Moderador', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
                    { name: 'Ana Costa', role: 'Membro', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' }
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-400">{member.role}</div>
                        </div>
                      </div>
                      {member.role === 'Admin' && (
                        <Badge className="bg-purple-600 text-white">
                          <Shield size={12} className="mr-1" />
                          Admin
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pinned" className="mt-0">
            <Card className="bg-slate-800/50 border-purple-500/20 text-white">
              <CardHeader>
                <CardTitle className="text-white">Posts Fixados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Pin size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-400">Nenhum post fixado ainda</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>

        <FloatingActionButton isAdmin={isAdmin} />
      </div>
    );
  }

  // Lista de grupos
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
            Grupos Profissionais
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
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
              className="pl-10 h-12 bg-slate-800/50 border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500"
            />
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="h-12 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300"
          >
            <Plus size={20} className="mr-2" />
            Criar Grupo
          </Button>
        </div>

        {showCreateForm && (
          <Card className="bg-slate-800/50 border-purple-500/20 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-600/20 to-blue-600/20">
              <CardTitle className="text-white flex items-center">
                <Building2 className="mr-2" size={20} />
                Criar Novo Grupo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome do Grupo *
                </label>
                <Input
                  value={newGroup.name}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Afiliados de Tecnologia"
                  className="h-11 bg-slate-700/50 border-purple-500/20 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição *
                </label>
                <Textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva o propósito do grupo..."
                  rows={3}
                  className="bg-slate-700/50 border-purple-500/20 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Categoria
                </label>
                <Input
                  value={newGroup.category}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Ex: Tecnologia, Beleza, Saúde"
                  className="h-11 bg-slate-700/50 border-purple-500/20 text-white placeholder-gray-400"
                />
              </div>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 h-11 border-purple-500/30 text-gray-300 hover:bg-purple-600/20"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  className="flex-1 h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
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
              className="hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-800/50 border-purple-500/20 text-white transform hover:scale-105 hover:shadow-purple-500/25"
              onClick={() => setSelectedGroup(group)}
            >
              {group.banner && (
                <div className="relative h-32 overflow-hidden rounded-t-lg">
                  <img 
                    src={group.banner} 
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white mb-2">{group.name}</CardTitle>
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 text-xs border-purple-500/30">
                      {group.category}
                    </Badge>
                  </div>
                  {group.isActive && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{group.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
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
                  <div className="border-t border-purple-500/20 pt-3">
                    <p className="text-xs text-gray-400 truncate mb-1">{group.lastMessage}</p>
                    <div className="flex items-center text-xs text-gray-500">
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
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Nenhum grupo encontrado
            </h3>
            <p className="text-gray-400">
              Tente ajustar sua busca ou crie um novo grupo
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
