
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import FeedHeader from '@/components/FeedHeader';
import CategoryFilter from '@/components/CategoryFilter';
import PostCreation from '@/components/PostCreation';
import PostList from '@/components/PostList';
import Stories from '@/components/Stories';
import { useToast } from '@/hooks/use-toast';

const Feed: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
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

  const handleUpdatePost = (updatedPost: any) => {
    setPosts(prev => prev.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
    toast({
      title: "Post atualizado",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    toast({
      title: "Categoria alterada",
      description: `Exibindo posts de: ${category}`,
    });
  };

  const handleTogglePostCreation = () => {
    setIsCreatingPost(!isCreatingPost);
    if (!isCreatingPost) {
      toast({
        title: "Criar novo post",
        description: "Compartilhe algo interessante com a comunidade!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50 pb-16 md:pb-0">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <FeedHeader />
        
        {/* Stories section */}
        <Stories />
        
        {/* Stories-like category filter */}
        <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-4">
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Post creation */}
        <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-4">
          <PostCreation 
            isCreating={isCreatingPost}
            onToggleCreating={handleTogglePostCreation}
          />
        </div>

        {/* Posts feed */}
        <PostList 
          posts={posts}
          currentUserName={user?.name}
          onUpdatePost={handleUpdatePost}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default Feed;
