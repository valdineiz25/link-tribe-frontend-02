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
      
      if (!post.content || !post.content.trim()) {
        throw new Error('Conteúdo é obrigatório');
      }

      const postData: Post = {
        id: Date.now().toString(),
        content: post.content.trim(),
        description: post.content.trim(),
        productLink: post.productLink || '',
        productName: post.productName || '',
        currentPrice: post.currentPrice,
        promotionalPrice: post.promotionalPrice,
        storeName: post.storeName || '',
        category: post.category || 'Geral',
        media: post.media,
        mediaType: post.mediaType,
        mediaName: post.mediaName,
        type: post.type || 'post',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        clickThroughs: 0,
        earnings: 0,
        isActive: true,
        tags: [],
        user: {
          id: '1',
          name: 'Usuário',
          avatar: ''
        }
      };

      StorageService.savePost(postData);
      await fetchPosts();
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
      
      if (!reel.content || !reel.content.trim()) {
        throw new Error('Conteúdo é obrigatório');
      }
      
      const reelData = {
        id: Date.now().toString(),
        content: reel.content.trim(),
        description: reel.description || reel.content.trim(),
        productLink: reel.productLink || '',
        productName: reel.productName || '',
        currentPrice: reel.currentPrice,
        promotionalPrice: reel.promotionalPrice,
        storeName: reel.storeName || '',
        category: reel.category || 'Geral',
        media: reel.media,
        mediaType: reel.mediaType,
        mediaName: reel.mediaName,
        type: reel.type || 'reel',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        clickThroughs: 0,
        earnings: 0,
        isActive: true,
        tags: [],
        user: {
          id: '1',
          name: 'Usuário',
          avatar: ''
        }
      };

      StorageService.saveReel(reelData);
      await fetchReels();
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
