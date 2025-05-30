
export class StorageService {
  private static STORES_KEY = 'affiliate_stores';
  private static POSTS_KEY = 'affiliate_posts';
  private static REELS_KEY = 'affiliate_reels';
  private static GROUPS_KEY = 'affiliate_groups';

  // Função para converter arquivo em base64
  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Gerenciamento de lojas
  static saveStore(store: any): void {
    try {
      const stores = this.getStores();
      const newStore = {
        ...store,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      stores.push(newStore);
      localStorage.setItem(this.STORES_KEY, JSON.stringify(stores));
      console.log('Loja salva com sucesso:', newStore);
    } catch (error) {
      console.error('Erro ao salvar loja:', error);
      throw error;
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

  // Gerenciamento de posts
  static savePost(post: any): void {
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
      posts.unshift(newPost); // Adicionar no início da lista
      localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
      console.log('Post salvo com sucesso:', newPost);
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      throw error;
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
      reels.unshift(newReel); // Adicionar no início da lista
      localStorage.setItem(this.REELS_KEY, JSON.stringify(reels));
      console.log('Reel salvo com sucesso:', newReel);
    } catch (error) {
      console.error('Erro ao salvar reel:', error);
      throw error;
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

  // Gerenciamento de grupos - corrigido para retornar o grupo criado
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
      return newGroup; // Retornando o grupo criado
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
}
