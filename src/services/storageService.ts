
export class StorageService {
  private static STORES_KEY = 'affiliate_stores';
  private static POSTS_KEY = 'affiliate_posts';
  private static REELS_KEY = 'affiliate_reels';

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
    const stores = this.getStores();
    const newStore = {
      ...store,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    stores.push(newStore);
    localStorage.setItem(this.STORES_KEY, JSON.stringify(stores));
  }

  static getStores(): any[] {
    const stored = localStorage.getItem(this.STORES_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Gerenciamento de posts
  static savePost(post: any): void {
    const posts = this.getPosts();
    const newPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0
    };
    posts.push(newPost);
    localStorage.setItem(this.POSTS_KEY, JSON.stringify(posts));
  }

  static getPosts(): any[] {
    const stored = localStorage.getItem(this.POSTS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Gerenciamento de reels
  static saveReel(reel: any): void {
    const reels = this.getReels();
    const newReel = {
      ...reel,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0
    };
    reels.push(newReel);
    localStorage.setItem(this.REELS_KEY, JSON.stringify(reels));
  }

  static getReels(): any[] {
    const stored = localStorage.getItem(this.REELS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Limpar dados (para debug)
  static clearAll(): void {
    localStorage.removeItem(this.STORES_KEY);
    localStorage.removeItem(this.POSTS_KEY);
    localStorage.removeItem(this.REELS_KEY);
  }
}
