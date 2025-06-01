
import React from 'react';
import CardPost from '@/components/CardPost';

interface Post {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  image?: string;
  productLink?: string;
  category: string;
  likes: number;
  comments: number;
  timestamp: string;
  productName?: string;
  currentPrice?: number;
  promotionalPrice?: number;
  storeName?: string;
  isSponsored?: boolean;
  isOwnProduct?: boolean;
}

interface PostListProps {
  posts: Post[];
  currentUserName?: string;
  onUpdatePost: (updatedPost: Post) => void;
  selectedCategory: string;
  isAffiliateView?: boolean;
  isConsumerView?: boolean;
}

const PostList: React.FC<PostListProps> = ({ 
  posts, 
  currentUserName, 
  onUpdatePost, 
  selectedCategory,
  isAffiliateView = false,
  isConsumerView = false
}) => {
  const filteredPosts = selectedCategory === 'Todos' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  if (filteredPosts.length === 0) {
    const emptyMessage = isConsumerView 
      ? {
          emoji: '🔍',
          title: 'Nenhum produto encontrado',
          description: selectedCategory === 'Todos' 
            ? 'Aguarde novos produtos sendo publicados pelos nossos afiliados!'
            : `Nenhum produto encontrado para "${selectedCategory}".`,
          suggestion: selectedCategory !== 'Todos' && 'Tente selecionar "Todos" ou explore outras categorias!'
        }
      : {
          emoji: '🤔',
          title: 'Ainda não há posts publicados',
          description: selectedCategory === 'Todos' 
            ? 'Seja o primeiro a compartilhar!'
            : `Nenhum post encontrado para a categoria "${selectedCategory}".`,
          suggestion: selectedCategory !== 'Todos' && 'Tente selecionar "Todos" ou crie um post nesta categoria!'
        };

    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{emptyMessage.emoji}</div>
        <p className="text-gray-500 text-lg">
          {emptyMessage.description}
        </p>
        {emptyMessage.suggestion && (
          <p className="text-gray-400 mt-2">
            {emptyMessage.suggestion}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredPosts.map((post) => (
        <CardPost 
          key={post.id} 
          post={post} 
          onUpdatePost={onUpdatePost}
          isOwner={post.authorName === currentUserName}
          isAffiliateView={isAffiliateView}
          isConsumerView={isConsumerView}
        />
      ))}
    </div>
  );
};

export default PostList;
