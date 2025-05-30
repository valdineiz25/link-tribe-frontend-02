
import { User, UserRegistration, UserStats } from '@/types/user';

export class UsersApi {
  private static users: User[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com',
      cpf: '123.456.789-00',
      phone: '(11) 99999-9999',
      state: 'SP',
      city: 'São Paulo',
      isVerified: true,
      totalEarnings: 1250.50,
      activeLinks: 15,
      totalClicks: 2340,
      joinedAt: '2024-01-15T10:00:00Z',
      bio: 'Especialista em tecnologia e gadgets. Compartilho as melhores ofertas e produtos que uso no dia a dia.',
      socialLinks: {
        instagram: '@joaotech',
        youtube: 'joaotech',
      }
    },
    {
      id: '2',
      name: 'Maria Silva',
      email: 'maria@example.com',
      cpf: '987.654.321-00',
      phone: '(11) 88888-8888',
      state: 'RJ',
      city: 'Rio de Janeiro',
      isVerified: true,
      totalEarnings: 2890.75,
      activeLinks: 28,
      totalClicks: 4560,
      joinedAt: '2024-02-20T14:30:00Z',
      bio: 'Influenciadora de moda e beleza. Apaixonada por produtos de skincare e moda sustentável.',
      socialLinks: {
        instagram: '@mariastyle',
        tiktok: '@mariastyle',
      }
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana@example.com',
      cpf: '456.789.123-00',
      phone: '(11) 77777-7777',
      state: 'MG',
      city: 'Belo Horizonte',
      isVerified: false,
      totalEarnings: 567.30,
      activeLinks: 8,
      totalClicks: 890,
      joinedAt: '2024-03-10T09:15:00Z',
      bio: 'Nova no mundo dos afiliados. Focada em produtos para casa e decoração.',
    }
  ];

  static async getAllUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.users;
  }

  static async getUserById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.users.find(user => user.id === id) || null;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.users.find(user => user.email === email) || null;
  }

  static async createUser(userData: UserRegistration): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      isVerified: false,
      totalEarnings: 0,
      activeLinks: 0,
      totalClicks: 0,
      joinedAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }

  static async deleteUser(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    
    this.users.splice(userIndex, 1);
    return true;
  }

  static async getUserStats(): Promise<UserStats> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const totalUsers = this.users.length;
    const activeUsers = this.users.filter(user => user.totalClicks > 0).length;
    const thisMonth = new Date();
    thisMonth.setMonth(thisMonth.getMonth() - 1);
    const newUsersThisMonth = this.users.filter(user => 
      new Date(user.joinedAt) > thisMonth
    ).length;
    const topEarners = [...this.users]
      .sort((a, b) => b.totalEarnings - a.totalEarnings)
      .slice(0, 5);

    return {
      totalUsers,
      activeUsers,
      newUsersThisMonth,
      topEarners
    };
  }

  static async authenticateUser(email: string, password: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Simulação de autenticação - em produção, verificar hash da senha
    const user = this.users.find(user => user.email === email);
    return user || null;
  }
}
