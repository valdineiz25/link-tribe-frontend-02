
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Plus,
  Users,
  MessageCircle,
  Star,
  Clock
} from 'lucide-react';

const Groups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockGroups = [
    {
      id: '1',
      name: 'Afiliados de Marketing Digital',
      description: 'Compartilhe estratégias e dicas de marketing digital para afiliados',
      members: 1245,
      category: 'Marketing',
      isPrivate: false,
      lastActivity: '2h',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      name: 'E-commerce Brasil',
      description: 'Grupo para discussões sobre e-commerce e vendas online',
      members: 892,
      category: 'E-commerce',
      isPrivate: false,
      lastActivity: '5h',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      name: 'Saúde e Bem-estar VIP',
      description: 'Produtos premium de saúde e bem-estar com altas comissões',
      members: 456,
      category: 'Saúde',
      isPrivate: true,
      lastActivity: '1d',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    },
    {
      id: '4',
      name: 'Tech Affiliates',
      description: 'Afiliados especializados em produtos de tecnologia',
      members: 678,
      category: 'Tecnologia',
      isPrivate: false,
      lastActivity: '3h',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop'
    },
    {
      id: '5',
      name: 'Moda e Lifestyle',
      description: 'Tendências de moda e lifestyle para afiliados',
      members: 1034,
      category: 'Moda',
      isPrivate: false,
      lastActivity: '4h',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop'
    }
  ];

  const categories = ['Todos', 'Marketing', 'E-commerce', 'Saúde', 'Tecnologia', 'Moda'];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Grupos</h1>
        <p className="text-gray-600">Conecte-se com outros afiliados e compartilhe conhecimento</p>
      </div>

      {/* Ações e Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Buscar grupos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Button>
          <Plus size={20} className="mr-2" />
          Criar Grupo
        </Button>
      </div>

      {/* Filtros de Categoria */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Meus Grupos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Meus Grupos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.slice(0, 2).map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={group.image} 
                  alt={group.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                {group.isPrivate && (
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    Privado
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{group.members.toLocaleString()} membros</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{group.lastActivity}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1" size="sm">
                    <MessageCircle size={16} className="mr-2" />
                    Entrar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Grupos Recomendados */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Grupos Recomendados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.slice(2).map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={group.image} 
                  alt={group.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                {group.isPrivate && (
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    Privado
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{group.members.toLocaleString()} membros</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{group.lastActivity}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1" variant="outline" size="sm">
                    Participar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Nenhum grupo encontrado com os filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
};

export default Groups;
