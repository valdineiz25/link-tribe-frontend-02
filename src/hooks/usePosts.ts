
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

  const addPost = (post: Partial<Post>) => {
    try {
      console.log('Adicionando post:', post);
      StorageService.savePost(post);
      fetchPosts();
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

  const addReel = (reel: any) => {
    try {
      console.log('Adicionando reel:', reel);
      StorageService.saveReel(reel);
      fetchReels();
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
