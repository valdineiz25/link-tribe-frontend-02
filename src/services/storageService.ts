export class StorageService {
  private static STORES_KEY = 'affiliate_stores';
  private static POSTS_KEY = 'affiliate_posts';
  private static REELS_KEY = 'affiliate_reels';
  private static GROUPS_KEY = 'affiliate_groups';
  
  // Limite de tamanho em bytes (5MB para localStorage)
  private static MAX_STORAGE_SIZE = 5 * 1024 * 1024;

  // Função para verificar espaço disponível no localStorage
  private static getStorageSize(): number {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length;
      }
    }
    return total;
  }

  // Função para limpar dados antigos se necessário
  private static cleanupOldData(): void {
    try {
      const posts = this.getPosts();
      const reels = this.getReels();
      
      // Manter apenas os 20 posts mais recentes
      if (posts.length > 20) {
        const recentPosts = posts.slice(0, 20);
        localStorage.setItem(this.POSTS_KEY, JSON.stringify(recentPosts));
        console.log('Limpeza: Posts antigos removidos');
      }
      
      // Manter apenas os 10 reels mais recentes
      if (reels.length > 10) {
        const recentReels = reels.slice(0, 10);
        localStorage.setItem(this.REELS_KEY, JSON.stringify(recentReels));
        console.log('Limpeza: Reels antigos removidos');
      }
    } catch (error) {
      console.error('Erro na limpeza:', error);
    }
  }

  // Função para comprimir imagem/vídeo
  static async compressMedia(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => {
          // Reduzir tamanho da imagem se necessário
          const maxWidth = 800;
          const maxHeight = 600;
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Comprimir para JPEG com qualidade reduzida
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
        
        img.onerror = () => reject(new Error('Erro ao carregar imagem'));
        img.src = URL.createObjectURL(file);
      } else {
        // Para vídeos, usar FileReader normal mas com limite de tamanho
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          
          // Se o arquivo for muito grande, rejeitar
          if (result.length > 2 * 1024 * 1024) { // 2MB max para vídeos
            reject(new Error('Vídeo muito grande. Máximo 2MB.'));
          } else {
            resolve(result);
          }
        };
        reader.onerror = () => reject(new Error('Erro ao processar vídeo'));
        reader.readAsDataURL(file);
      }
    });
  }

  // Função para converter arquivo em base64 com compressão
  static async fileToBase64(file: File): Promise<string> {
    try {
      // Verificar tamanho do arquivo
      const maxSize = file.type.startsWith('video/') ? 10 * 1024 * 1024 : 5 * 1024 * 1024; // 10MB para vídeo, 5MB para imagem
      
      if (file.size > maxSize) {
        throw new Error(`Arquivo muito grande. Máximo ${file.type.startsWith('video/') ? '10MB' : '5MB'}.`);
      }

      // Verificar espaço disponível
      if (this.getStorageSize() > this.MAX_STORAGE_SIZE) {
        this.cleanupOldData();
      }

      return await this.compressMedia(file);
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      throw error;
    }
  }

  // Gerenciamento de lojas
  static saveStore(store: any): boolean {
    try {
      const stores = this.getStores();
      const newStore = {
        ...store,
        id: store.id || Date.now().toString(),
        createdAt: store.createdAt || new Date().toISOString()
      };
      stores.push(newStore);
      localStorage.setItem(this.STORES_KEY, JSON.stringify(stores));
      console.log('Loja salva com sucesso:', newStore);
      return true;
    } catch (error) {
      console.error('Erro ao salvar loja:', error);
      return false;
    }
  }

  static getStores(): any[] {
    try {
      const stored = localStorage.getItem(this.STORES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar lojas:', error);
      return [];
    }
  }

  static deleteStore(storeId: string): boolean {
    try {
      const stores = this.getStores();
      const updatedStores = stores.filter(store => store.id !== storeId);
      localStorage.setItem(this.STORES_KEY, JSON.stringify(updatedStores));
      console.log('Loja deletada com sucesso:', storeId);
      return true;
    } catch (error) {
      console.error('Erro ao deletar loja:', error);
      return false;
    }
  }

  // Gerenciamento de posts
  static savePost(post: any): void {
    try {
      // Verificar espaço antes de salvar
      if (this.getStorageSize() > this.MAX_STORAGE_SIZE) {
        this.cleanupOldData();
      }

      const posts = this.getPosts();
      const newPost = {
        ...post,
        id: post.id || Date.now().toString(),
        createdAt: post.createdAt || new Date().toISOString(),
        likes: post.likes || 0,
        comments: post.comments || 0,
        shares: post.shares || 0,
        views: post.views || 0
      };
      posts.unshift(newPost);
      localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
      console.log('Post salvo com sucesso:', newPost);
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      // Se der erro de quota, tentar limpar e salvar novamente
      if (error.name === 'QuotaExceededError') {
        this.cleanupOldData();
        try {
          const posts = this.getPosts();
          const newPost = {
            ...post,
            id: post.id || Date.now().toString(),
            createdAt: post.createdAt || new Date().toISOString(),
            likes: post.likes || 0,
            comments: post.comments || 0,
            shares: post.shares || 0,
            views: post.views || 0
          };
          posts.unshift(newPost);
          localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
          console.log('Post salvo após limpeza:', newPost);
        } catch (retryError) {
          throw new Error('Espaço insuficiente. Tente com um arquivo menor.');
        }
      } else {
        throw error;
      }
    }
  }

  static getPosts(): any[] {
    try {
      const stored = localStorage.getItem(this.POSTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      return [];
    }
  }

  // Gerenciamento de reels
  static saveReel(reel: any): void {
    try {
      // Verificar espaço antes de salvar
      if (this.getStorageSize() > this.MAX_STORAGE_SIZE) {
        this.cleanupOldData();
      }

      const reels = this.getReels();
      const newReel = {
        ...reel,
        id: reel.id || Date.now().toString(),
        createdAt: reel.createdAt || new Date().toISOString(),
        likes: reel.likes || 0,
        comments: reel.comments || 0,
        shares: reel.shares || 0,
        views: reel.views || 0
      };
      reels.unshift(newReel);
      localStorage.setItem(this.REELS_KEY, JSON.stringify(reels));
      console.log('Reel salvo com sucesso:', newReel);
    } catch (error) {
      console.error('Erro ao salvar reel:', error);
      // Se der erro de quota, tentar limpar e salvar novamente
      if (error.name === 'QuotaExceededError') {
        this.cleanupOldData();
        try {
          const reels = this.getReels();
          const newReel = {
            ...reel,
            id: reel.id || Date.now().toString(),
            createdAt: reel.createdAt || new Date().toISOString(),
            likes: reel.likes || 0,
            comments: reel.comments || 0,
            shares: reel.shares || 0,
            views: reel.views || 0
          };
          reels.unshift(newReel);
          localStorage.setItem(this.REELS_KEY, JSON.stringify(reels));
          console.log('Reel salvo após limpeza:', newReel);
        } catch (retryError) {
          throw new Error('Espaço insuficiente. Tente com um vídeo menor.');
        }
      } else {
        throw error;
      }
    }
  }

  static getReels(): any[] {
    try {
      const stored = localStorage.getItem(this.REELS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar reels:', error);
      return [];
    }
  }

  // Gerenciamento de grupos
  static saveGroup(group: any): any {
    try {
      const groups = this.getGroups();
      const newGroup = {
        ...group,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        members: 1,
        isActive: true
      };
      groups.push(newGroup);
      localStorage.setItem(this.GROUPS_KEY, JSON.stringify(groups));
      console.log('Grupo salvo com sucesso:', newGroup);
      return newGroup;
    } catch (error) {
      console.error('Erro ao salvar grupo:', error);
      throw error;
    }
  }

  static getGroups(): any[] {
    try {
      const stored = localStorage.getItem(this.GROUPS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar grupos:', error);
      return [];
    }
  }

  // Limpar dados (para debug)
  static clearAll(): void {
    localStorage.removeItem(this.STORES_KEY);
    localStorage.removeItem(this.POSTS_KEY);
    localStorage.removeItem(this.REELS_KEY);
    localStorage.removeItem(this.GROUPS_KEY);
    console.log('Todos os dados foram limpos');
  }

  // Função para verificar status do armazenamento
  static getStorageInfo(): { used: number, total: number, percentage: number } {
    const used = this.getStorageSize();
    const total = this.MAX_STORAGE_SIZE;
    const percentage = Math.round((used / total) * 100);
    
    return { used, total, percentage };
  }
}
