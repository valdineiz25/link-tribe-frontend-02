
import React, { useState } from 'react';
import CardPost from '@/components/CardPost';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Filter,
  Plus,
  Image,
  Link as LinkIcon
} from 'lucide-react';

const Feed: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const categories = [
    'Todos',
    'Saúde',
    'Tecnologia',
    'Moda',
    'Casa e Jardim',
    'Esportes',
    'Educação'
  ];

  const mockPosts = [
    {
      id: '1',
      authorName: 'Maria Silva',
      content: 'Acabei de descobrir esse produto incrível para cuidados com a pele! 🌟 Estou usando há 2 semanas e já vejo resultados. Quem mais quer uma pele radiante?',
      category: 'Saúde',
      likes: 24,
      comments: 8,
      timestamp: '2h',
      productLink: 'https://example.com/produto-skincare',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=300&fit=crop'
    },
    {
      id: '2',
      authorName: 'João Santos',
      content: 'Pessoal, essa ferramenta de produtividade mudou minha vida! 💼 Consegui organizar todos os meus projetos e aumentar minha eficiência em 50%. Recomendo demais!',
      category: 'Tecnologia',
      likes: 45,
      comments: 15,
      timestamp: '4h',
      productLink: 'https://example.com/app-produtividade'
    },
    {
      id: '3',
      authorName: 'Ana Costa',
      content: 'Que tal essa combinação para o fim de semana? Estou apaixonada por essa nova coleção! ✨',
      category: 'Moda',
      likes: 67,
      comments: 23,
      timestamp: '6h',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=300&fit=crop'
    }
  ];

  const filteredPosts = selectedCategory === 'Todos' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Filtros de Categoria */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Filter size={20} />
            <span className="font-medium">Filtrar por categoria:</span>
          </div>
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
        </CardContent>
      </Card>

      {/* Criar Post */}
      <Card>
        <CardContent className="p-4">
          {!isCreatingPost ? (
            <Button 
              onClick={() => setIsCreatingPost(true)}
              className="w-full"
              variant="outline"
            >
              <Plus size={20} className="mr-2" />
              Criar novo post
            </Button>
          ) : (
            <div className="space-y-4">
              <Textarea 
                placeholder="O que você quer compartilhar hoje?"
                className="min-h-[100px]"
              />
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Image size={16} className="mr-2" />
                    Foto
                  </Button>
                  <Button variant="outline" size="sm">
                    <LinkIcon size={16} className="mr-2" />
                    Link Afiliado
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsCreatingPost(false)}
                  >
                    Cancelar
                  </Button>
                  <Button size="sm">
                    Publicar
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
          <CardPost key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Nenhum post encontrado para a categoria "{selectedCategory}".
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
