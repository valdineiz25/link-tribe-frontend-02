
import React, { useState } from 'react';
import CardPost from '@/components/CardPost';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Filter,
  Plus,
  Image,
  Link as LinkIcon,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const Feed: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: '1',
      authorName: 'Maria Silva',
      content: 'Acabei de descobrir esse produto incrível para cuidados com a pele! 🌟 Estou usando há 2 semanas e já vejo resultados. Quem mais quer uma pele radiante?',
      category: 'Saúde',
      likes: 24,
      comments: 8,
      timestamp: '2h',
      productLink: 'https://example.com/produto-skincare',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=300&fit=crop',
      productName: 'Kit Skincare Completo Anti-idade',
      currentPrice: 199.90,
      promotionalPrice: 149.90,
      storeName: 'BeautyShop'
    },
    {
      id: '2',
      authorName: user?.name || 'João Santos',
      content: 'Pessoal, essa ferramenta de produtividade mudou minha vida! 💼 Consegui organizar todos os meus projetos e aumentar minha eficiência em 50%. Recomendo demais!',
      category: 'Tecnologia',
      likes: 45,
      comments: 15,
      timestamp: '4h',
      productLink: 'https://example.com/app-produtividade',
      productName: 'App Organização Pro 2024',
      currentPrice: 89.90,
      promotionalPrice: 59.90,
      storeName: 'TechStore'
    },
    {
      id: '3',
      authorName: 'Ana Costa',
      content: 'Que tal essa combinação para o fim de semana? Estou apaixonada por essa nova coleção! ✨',
      category: 'Moda',
      likes: 67,
      comments: 23,
      timestamp: '6h',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=300&fit=crop',
      productName: 'Vestido Floral Primavera 2024',
      currentPrice: 259.90,
      promotionalPrice: 179.90,
      storeName: 'ModaStyle'
    }
  ]);

  const categories = [
    'Todos',
    'Saúde',
    'Tecnologia',
    'Moda',
    'Casa e Jardim',
    'Esportes',
    'Educação'
  ];

  const filteredPosts = selectedCategory === 'Todos' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleUpdatePost = (updatedPost: any) => {
    setPosts(prev => prev.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header Hero */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            Feed de Afiliados
          </h1>
          <p className="text-gray-600 text-lg">Descubra produtos incríveis e ganhe comissões! 🚀</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="flex items-center text-orange-600">
              <TrendingUp size={20} className="mr-2" />
              <span className="font-semibold">+2.5k vendas hoje</span>
            </div>
            <div className="flex items-center text-green-600">
              <Sparkles size={20} className="mr-2" />
              <span className="font-semibold">R$ 45k em comissões</span>
            </div>
          </div>
        </div>

        {/* Filtros de Categoria */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter size={20} className="text-orange-600" />
              <span className="font-bold text-gray-800">Filtrar por categoria:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
                    : 'border-orange-300 text-orange-600 hover:bg-orange-50'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Criar Post */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-6">
            {!isCreatingPost ? (
              <Button 
                onClick={() => setIsCreatingPost(true)}
                className="w-full bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg py-3"
                size="lg"
              >
                <Plus size={24} className="mr-2" />
                🔥 Criar novo post de produto
              </Button>
            ) : (
              <div className="space-y-4">
                <Textarea 
                  placeholder="O que você quer compartilhar hoje? Descreva seu produto incrível..."
                  className="min-h-[120px] text-gray-800 border-white/30"
                />
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      <Image size={16} className="mr-2" />
                      Foto
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      <LinkIcon size={16} className="mr-2" />
                      Link Afiliado
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsCreatingPost(false)}
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-white text-orange-600 hover:bg-gray-100 font-bold"
                    >
                      🚀 Publicar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <CardPost 
              key={post.id} 
              post={post} 
              onUpdatePost={handleUpdatePost}
              isOwner={post.authorName === user?.name}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-gray-500 text-lg">
              Nenhum post encontrado para a categoria "{selectedCategory}".
            </p>
            <p className="text-gray-400">Seja o primeiro a postar nesta categoria!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
