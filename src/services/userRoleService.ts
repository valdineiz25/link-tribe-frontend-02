
import { User } from '@/types/user';
import { UserRole, AffiliateStats } from '@/types/affiliate';

export class UserRoleService {
  private static USER_ROLES_KEY = 'user_roles';
  private static AFFILIATE_STATS_KEY = 'affiliate_stats';

  static getUserRole(userId: string): UserRole | null {
    try {
      const roles = localStorage.getItem(this.USER_ROLES_KEY);
      const userRoles: UserRole[] = roles ? JSON.parse(roles) : [];
      const role = userRoles.find(role => role.userId === userId) || null;
      console.log(`🔍 getUserRole(${userId}):`, role);
      return role;
    } catch (error) {
      console.error('❌ Erro ao buscar role do usuário:', error);
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
        console.log('✏️ Role atualizada:', userRole);
      } else {
        userRoles.push(userRole);
        console.log('➕ Nova role criada:', userRole);
      }
      
      localStorage.setItem(this.USER_ROLES_KEY, JSON.stringify(userRoles));
      console.log('💾 Roles salvas no localStorage:', userRoles);
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar role do usuário:', error);
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
      const result = stats ? JSON.parse(stats) : {
        totalProducts: 0,
        monthlyCommissions: 0,
        todayVisits: 0,
        topProducts: []
      };
      console.log(`📊 getAffiliateStats(${userId}):`, result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao buscar estatísticas do afiliado:', error);
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
      console.log(`💾 Stats de afiliado salvadas para ${userId}:`, stats);
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar estatísticas do afiliado:', error);
      return false;
    }
  }

  // Inicializar dados mock baseado no ID do usuário
  static initializeMockData(userId: string): void {
    console.log('🎭 Inicializando dados mock para:', userId);
    
    // Verificar se userId termina com número par ou ímpar para determinar o tipo
    const lastChar = userId.charAt(userId.length - 1);
    const isEvenUser = parseInt(lastChar) % 2 === 0;
    
    // Usuários com ID terminando em número par = consumer
    // Usuários com ID terminando em número ímpar = affiliate
    const userType = isEvenUser ? 'consumer' : 'affiliate';
    
    const mockRole: UserRole = {
      userId,
      type: userType,
      canCreateStore: userType === 'affiliate',
      accountAge: userType === 'affiliate' ? 30 : 15,
      validAffiliateLinks: userType === 'affiliate' ? 5 : 0
    };
    
    console.log(`🎭 Criando role de ${userType} para usuário ${userId}:`, mockRole);
    this.setUserRole(mockRole);

    // Configurar estatísticas mock apenas para afiliados
    if (userType === 'affiliate') {
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
      console.log('📊 Criando stats mock para afiliado:', mockStats);
      this.updateAffiliateStats(userId, mockStats);
    }
  }

  // Método para alternar tipo de usuário
  static switchUserType(userId: string, newType: 'affiliate' | 'consumer'): boolean {
    try {
      const currentRole = this.getUserRole(userId);
      if (!currentRole) return false;

      const updatedRole: UserRole = {
        ...currentRole,
        type: newType,
        canCreateStore: newType === 'affiliate',
        validAffiliateLinks: newType === 'affiliate' ? 5 : 0
      };

      this.setUserRole(updatedRole);

      // Se virou afiliado, criar stats
      if (newType === 'affiliate') {
        const mockStats: AffiliateStats = {
          totalProducts: 0,
          monthlyCommissions: 0,
          todayVisits: 0,
          topProducts: []
        };
        this.updateAffiliateStats(userId, mockStats);
      }

      console.log(`🔄 Usuário ${userId} alterado para ${newType}`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao alterar tipo de usuário:', error);
      return false;
    }
  }
}
