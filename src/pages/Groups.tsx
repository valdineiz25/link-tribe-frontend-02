
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Plus, 
  Search, 
  MessageCircle, 
  Crown,
  Lock,
  Globe,
  UserPlus
} from 'lucide-react';

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  isPrivate: boolean;
  category: string;
  createdAt: string;
  isOwner: boolean;
  isMember: boolean;
}

const Groups: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    description: '',
    category: 'Geral',
    isPrivate: false
  });

  // Mock de grupos existentes
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Afiliados Tech',
      description: 'Grupo para discutir produtos de tecnologia e estratégias de afiliação',
      members: 156,
      isPrivate: false,
      category: 'Tecnologia',
      createdAt: '2024-01-15',
      isOwner: false,
      isMember: true
    },
    {
      id: '2',
      name: 'Moda e Beleza',
      description: 'Compartilhe dicas de produtos de moda e beleza',
      members: 89,
      isPrivate: false,
      category: 'Moda',
      createdAt: '2024-01-10',
      isOwner: true,
      isMember: true
    },
    {
      id: '3',
      name: 'Casa e Decoração VIP',
      description: 'Grupo exclusivo para produtos premium de casa e decoração',
      members: 45,
      isPrivate: true,
      category: 'Casa',
      createdAt: '2024-01-08',
      isOwner: false,
      isMember: false
    }
  ]);

  const categories = [
    'Geral',
    'Tecnologia',
    'Moda',
    'Casa',
    'Saúde',
    'Esportes',
    'Alimentação',
    'Educação'
  ];

  const handleCreateGroup = () => {
    if (!newGroupData.name.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite o nome do grupo.",
        variant: "destructive",
      });
      return;
    }

    const newGroup: Group = {
      id: Date.now().toString(),
      name: newGroupData.name.trim(),
      description: newGroupData.description.trim(),
      members: 1,
      isPrivate: newGroupData.isPrivate,
      category: newGroupData.category,
      createdAt: new Date().toISOString().split('T')[0],
      isOwner: true,
      isMember: true
    };

    setGroups([newGroup, ...groups]);
    setNewGroupData({
      name: '',
      description: '',
      category: 'Geral',
      isPrivate: false
    });
    setShowCreateForm(false);

    toast({
      title: "Grupo criado! 🎉",
      description: `O grupo "${newGroup.name}" foi criado com sucesso!`,
    });
  };

  const handleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isMember: true, members: group.members + 1 }
        : group
    ));

    toast({
      title: "Entrou no grupo! ✅",
      description: "Você agora faz parte deste grupo!",
    });
  };

  const handleLeaveGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isMember: false, members: Math.max(1, group.members - 1) }
        : group
    ));

    toast({
      title: "Saiu do grupo",
      description: "Você saiu do grupo com sucesso.",
    });
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🌟 Grupos de Afiliados
          </h1>
          <p className="text-gray-600 text-lg">
            Conecte-se com outros afiliados e compartilhe experiências!
          </p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Buscar grupos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Plus size={20} className="mr-2" />
            Criar Grupo
          </Button>
        </div>

        {/* Create Group Form */}
        {showCreateForm && (
          <Card className="mb-8 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 text-blue-600" size={24} />
                Criar Novo Grupo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName">Nome do Grupo *</Label>
                  <Input
                    id="groupName"
                    placeholder="Ex: Afiliados de Tecnologia"
                    value={newGroupData.name}
                    onChange={(e) => setNewGroupData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <select
                    id="category"
                    value={newGroupData.category}
                    onChange={(e) => setNewGroupData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o propósito do grupo..."
                  value={newGroupData.description}
                  onChange={(e) => setNewGroupData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={newGroupData.isPrivate}
                  onChange={(e) => setNewGroupData(prev => ({ ...prev, isPrivate: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="isPrivate" className="flex items-center">
                  <Lock size={16} className="mr-1" />
                  Grupo Privado (apenas por convite)
                </Label>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Criar Grupo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-gray-800 mb-2">
                      {group.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {group.category}
                      </Badge>
                      {group.isPrivate ? (
                        <Lock size={14} className="text-gray-500" />
                      ) : (
                        <Globe size={14} className="text-green-500" />
                      )}
                      {group.isOwner && (
                        <Crown size={14} className="text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {group.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users size={16} className="mr-1" />
                    {group.members} {group.members === 1 ? 'membro' : 'membros'}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(group.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <div className="flex space-x-2">
                  {group.isMember ? (
                    <>
                      <Button
                        size="sm"
                        className="flex-1 bg-green-500 hover:bg-green-600"
                      >
                        <MessageCircle size={16} className="mr-1" />
                        Chat
                      </Button>
                      {!group.isOwner && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLeaveGroup(group.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Sair
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleJoinGroup(group.id)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      disabled={group.isPrivate}
                    >
                      <UserPlus size={16} className="mr-1" />
                      {group.isPrivate ? 'Privado' : 'Participar'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum grupo encontrado
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Tente buscar com outros termos' : 'Seja o primeiro a criar um grupo!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
