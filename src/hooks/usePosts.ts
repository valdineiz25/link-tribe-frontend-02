
import { useState, useEffect } from 'react';
import { StorageService } from '@/services/storageService';
import { Post } from '@/types/post';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    try {
      setLoading(true);
      const storedPosts = StorageService.getPosts();
      console.log('Posts carregados:', storedPosts);
      setPosts(storedPosts);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (post: Partial<Post>) => {
    try {
      console.log('Adicionando post:', post);
      
      // Validar dados obrigatórios
      if (!post.description?.trim()) {
        throw new Error('Descrição é obrigatória');
      }

      const postData = {
        ...post,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0
      };

      StorageService.savePost(postData);
      await fetchPosts(); // Recarregar lista
      console.log('Post salvo com sucesso!');
      
      return postData;
    } catch (error) {
      console.error('Erro ao adicionar post:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    addPost,
    refetch: fetchPosts
  };
};

export const useReels = () => {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReels = () => {
    try {
      setLoading(true);
      const storedReels = StorageService.getReels();
      console.log('Reels carregados:', storedReels);
      setReels(storedReels);
    } catch (error) {
      console.error('Erro ao carregar reels:', error);
    } finally {
      setLoading(false);
    }
  };

  const addReel = async (reel: any) => {
    try {
      console.log('Adicionando reel:', reel);
      
      // Validar dados obrigatórios
      if (!reel.description?.trim()) {
        throw new Error('Descrição é obrigatória');
      }
      
      if (!reel.media) {
        throw new Error('Vídeo é obrigatório para reels');
      }

      const reelData = {
        ...reel,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0
      };

      StorageService.saveReel(reelData);
      await fetchReels(); // Recarregar lista
      console.log('Reel salvo com sucesso!');
      
      return reelData;
    } catch (error) {
      console.error('Erro ao adicionar reel:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  return {
    reels,
    loading,
    addReel,
    refetch: fetchReels
  };
};
