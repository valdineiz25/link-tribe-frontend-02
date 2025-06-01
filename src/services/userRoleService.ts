
import { User } from '@/types/user';
import { UserRole, AffiliateStats } from '@/types/affiliate';

export class UserRoleService {
  private static USER_ROLES_KEY = 'user_roles';
  private static AFFILIATE_STATS_KEY = 'affiliate_stats';

  static getUserRole(userId: string): UserRole | null {
    try {
      const roles = localStorage.getItem(this.USER_ROLES_KEY);
      const userRoles: UserRole[] = roles ? JSON.parse(roles) : [];
      return userRoles.find(role => role.userId === userId) || null;
    } catch (error) {
      console.error('Erro ao buscar role do usuário:', error);
      return null;
    }
  }

  static setUserRole(userRole: UserRole): boolean {
    try {
      const roles = localStorage.getItem(this.USER_ROLES_KEY);
      const userRoles: UserRole[] = roles ? JSON.parse(roles) : [];
      
      const existingIndex = userRoles.findIndex(role => role.userId === userRole.userId);
      if (existingIndex >= 0) {
        userRoles[existingIndex] = userRole;
      } else {
        userRoles.push(userRole);
      }
      
      localStorage.setItem(this.USER_ROLES_KEY, JSON.stringify(userRoles));
      return true;
    } catch (error) {
      console.error('Erro ao salvar role do usuário:', error);
      return false;
    }
  }

  static isAffiliate(userId: string): boolean {
    const role = this.getUserRole(userId);
    return role?.type === 'affiliate' || false;
  }

  static canCreateStore(userId: string): boolean {
    const role = this.getUserRole(userId);
    if (!role || role.type !== 'affiliate') return false;
    
    // Validações de segurança
    return role.canCreateStore && 
           role.accountAge >= 7 && 
           role.validAffiliateLinks >= 1;
  }

  static getAffiliateStats(userId: string): AffiliateStats {
    try {
      const stats = localStorage.getItem(`${this.AFFILIATE_STATS_KEY}_${userId}`);
      return stats ? JSON.parse(stats) : {
        totalProducts: 0,
        monthlyCommissions: 0,
        todayVisits: 0,
        topProducts: []
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas do afiliado:', error);
      return {
        totalProducts: 0,
        monthlyCommissions: 0,
        todayVisits: 0,
        topProducts: []
      };
    }
  }

  static updateAffiliateStats(userId: string, stats: AffiliateStats): boolean {
    try {
      localStorage.setItem(`${this.AFFILIATE_STATS_KEY}_${userId}`, JSON.stringify(stats));
      return true;
    } catch (error) {
      console.error('Erro ao atualizar estatísticas do afiliado:', error);
      return false;
    }
  }

  // Mock data para demonstração
  static initializeMockData(userId: string): void {
    // Configurar usuário como afiliado
    const mockRole: UserRole = {
      userId,
      type: 'affiliate',
      canCreateStore: true,
      accountAge: 30,
      validAffiliateLinks: 5
    };
    this.setUserRole(mockRole);

    // Configurar estatísticas mock
    const mockStats: AffiliateStats = {
      totalProducts: 12,
      monthlyCommissions: 1240.50,
      todayVisits: 75,
      topProducts: [
        { id: '1', name: 'Smartphone Galaxy', clicks: 45 },
        { id: '2', name: 'Fone Bluetooth', clicks: 32 },
        { id: '3', name: 'Smartwatch', clicks: 28 }
      ]
    };
    this.updateAffiliateStats(userId, mockStats);
  }
}
