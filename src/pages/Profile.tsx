import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail,
  Plus,
  ExternalLink,
  Users,
  Share2,
  Camera,
  Edit
} from 'lucide-react';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const isOwnProfile = user?.id === id;
  
  const [activeTab, setActiveTab] = useState('posts');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const mockAffiliateLinks = [
    {
      id: '1',
      title: 'Curso de Marketing Digital',
      url: 'https://example.com/curso-marketing',
      clicks: 245,
      commission: '15%',
      earnings: 'R$ 1.234,50'
    },
    {
      id: '2',
      title: 'E-book Finanças Pessoais',
      url: 'https://example.com/ebook-financas',
      clicks: 89,
      commission: '20%',
      earnings: 'R$ 567,80'
    }
  ];

  const mockPosts = [
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

  const mockProducts = [
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

  const mockFollowers = [
    { id: '1', name: 'Maria Silva', avatar: null },
    { id: '2', name: 'João Santos', avatar: null },
    { id: '3', name: 'Ana Costa', avatar: null }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header do Perfil com Capa */}
      <Card className="overflow-hidden">
        {/* Imagem de Capa */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          {coverImage && (
            <img 
              src={coverImage} 
              alt="Capa do perfil" 
              className="w-full h-full object-cover"
            />
          )}
          {isOwnProfile && (
            <div className="absolute top-4 right-4">
              <label htmlFor="cover-upload" className="cursor-pointer">
                <Button size="sm" className="bg-black/50 hover:bg-black/70 text-white">
                  <Camera size={16} className="mr-2" />
                  Alterar Capa
                </Button>
              </label>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
              />
            </div>
          )}
        </div>

        <CardHeader className="relative pb-2">
          <div className="flex items-start space-x-6">
            {/* Foto de Perfil */}
            <div className="relative -mt-16">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Foto do perfil" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <User size={48} className="text-gray-500" />
                  </div>
                )}
              </div>
              {isOwnProfile && (
                <label htmlFor="profile-upload" className="absolute bottom-2 right-2 cursor-pointer">
                  <div className="bg-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors">
                    <Camera size={16} className="text-white" />
                  </div>
                </label>
              )}
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </div>
            
            <div className="flex-1 pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Mail size={16} />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} />
                      <span>{user?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} />
                      <span>{user?.city}, {user?.state}</span>
                    </div>
                  </div>
                </div>
                
                {isOwnProfile && (
                  <Button variant="outline">
                    <Edit size={16} className="mr-2" />
                    Editar Perfil
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-6 mt-4">
                <div className="text-center">
                  <div className="font-bold">234</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">1.2k</div>
                  <div className="text-sm text-gray-600">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">456</div>
                  <div className="text-sm text-gray-600">Seguindo</div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Links Afiliados (só visível para o próprio usuário) */}
      {isOwnProfile && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Meus Links Afiliados</CardTitle>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Adicionar Link
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAffiliateLinks.map((link) => (
                <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{link.title}</h3>
                    <p className="text-sm text-gray-600">{link.url}</p>
                    <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                      <span>{link.clicks} cliques</span>
                      <span>Comissão: {link.commission}</span>
                      <span className="text-green-600 font-medium">{link.earnings}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Share2 size={16} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Abas do Perfil */}
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
                Apenas amigos podem ver os produtos de {user?.name?.split(' ')[0]}
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
    </div>
  );
};

export default Profile;
