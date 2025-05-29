
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Users } from 'lucide-react';

interface User {
  id: string;
  name: string;
}

interface Post {
  id: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  commission: string;
  image: string;
}

interface Follower {
  id: string;
  name: string;
  avatar: string | null;
}

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOwnProfile: boolean;
  user: User;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  isOwnProfile, 
  user 
}) => {
  const mockPosts: Post[] = [
    {
      id: '1',
      content: 'Acabei de lançar meu novo curso! 🚀',
      likes: 34,
      comments: 12,
      timestamp: '2h'
    },
    {
      id: '2',
      content: 'Dica importante sobre investimentos...',
      likes: 56,
      comments: 8,
      timestamp: '1d'
    }
  ];

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Curso Online de E-commerce',
      price: 'R$ 297,00',
      commission: '25%',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop'
    },
    {
      id: '2',
      name: 'Mentoria Individual',
      price: 'R$ 497,00',
      commission: '30%',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop'
    }
  ];

  const mockFollowers: Follower[] = [
    { id: '1', name: 'Maria Silva', avatar: null },
    { id: '2', name: 'João Santos', avatar: null },
    { id: '3', name: 'Ana Costa', avatar: null }
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="products">Produtos</TabsTrigger>
        <TabsTrigger value="followers">Seguidores</TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="space-y-4">
        {mockPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <p className="mb-3">{post.content}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.likes} curtidas • {post.comments} comentários</span>
                <span>{post.timestamp}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="products" className="space-y-4">
        {!isOwnProfile && (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              Apenas amigos podem ver os produtos de {user.name?.split(' ')[0]}
            </p>
            <Button className="mt-4">Seguir</Button>
          </div>
        )}
        
        {isOwnProfile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.price}</p>
                      <p className="text-xs text-green-600">Comissão: {product.commission}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="followers" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockFollowers.map((follower) => (
            <Card key={follower.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{follower.name}</h3>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
