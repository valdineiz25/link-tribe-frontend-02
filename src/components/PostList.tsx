
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
}

interface PostListProps {
  posts: Post[];
  currentUserName?: string;
  onUpdatePost: (updatedPost: Post) => void;
  selectedCategory: string;
}

const PostList: React.FC<PostListProps> = ({ 
  posts, 
  currentUserName, 
  onUpdatePost, 
  selectedCategory 
}) => {
  const filteredPosts = selectedCategory === 'Todos' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🤔</div>
        <p className="text-gray-500 text-lg">
          {selectedCategory === 'Todos' 
            ? 'Ainda não há posts publicados. Seja o primeiro a compartilhar!'
            : `Nenhum post encontrado para a categoria "${selectedCategory}".`
          }
        </p>
        <p className="text-gray-400 mt-2">
          {selectedCategory !== 'Todos' && 'Tente selecionar "Todos" ou crie um post nesta categoria!'}
        </p>
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
        />
      ))}
    </div>
  );
};

export default PostList;
