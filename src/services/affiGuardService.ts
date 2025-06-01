
interface DomainValidationResult {
  isValid: boolean;
  reason?: string;
  domain?: string;
}

interface UserViolation {
  userId: string;
  timestamp: string;
  url: string;
  reason: string;
}

class AffiGuardService {
  private static readonly ALLOWED_DOMAINS = [
    // Amazon
    'amazon.com', 'amazon.com.br', 'amazon.de', 'amazon.co.uk', 'amazon.fr', 'amazon.it',
    // Shopee
    'shope.ee', 'shopee.com.br', 'shopee.vn', 'shopee.sg', 'shopee.my',
    // Mercado Livre
    'mercadolivre.com.br', 'mercadolibre.com', 'mercadolibre.com.ar',
    // Outros marketplaces autorizados
    'magazineluiza.com.br', 'shein.com', 'temu.com', 'aliexpress.com',
    'casasbahia.com.br', 'americanas.com', 'submarino.com.br',
    'extra.com.br', 'pontofrio.com.br'
  ];

  private static readonly BLOCKED_SHORTENERS = [
    'bit.ly', 'tinyurl.com', 'short.link', 'rb.gy', 'cutt.ly', 
    't.co', 'ow.ly', 'is.gd', 'buff.ly', 'tiny.cc'
  ];

  private static violations: UserViolation[] = [];

  static validateLink(url: string): DomainValidationResult {
    if (!url || !url.trim()) {
      return { isValid: false, reason: 'URL vazia ou inválida' };
    }

    // Normalizar URL
    let cleanUrl = url.toLowerCase().trim();
    
    // Verificar se tem protocolo HTTPS (obrigatório)
    if (!cleanUrl.startsWith('https://')) {
      if (cleanUrl.startsWith('http://')) {
        return { 
          isValid: false, 
          reason: 'Apenas links HTTPS são permitidos por segurança' 
        };
      }
      // Adicionar https se não tiver protocolo
      cleanUrl = 'https://' + cleanUrl;
    }

    try {
      const urlObj = new URL(cleanUrl);
      let domain = urlObj.hostname.toLowerCase();
      
      // Remover www se presente
      if (domain.startsWith('www.')) {
        domain = domain.substring(4);
      }

      // Verificar se é um encurtador bloqueado
      if (this.BLOCKED_SHORTENERS.some(shortener => 
        domain === shortener || domain.endsWith('.' + shortener)
      )) {
        return { 
          isValid: false, 
          reason: 'Links encurtados não são permitidos',
          domain 
        };
      }

      // Verificar se é exatamente um domínio permitido
      const isAllowed = this.ALLOWED_DOMAINS.some(allowedDomain => {
        return domain === allowedDomain || domain.endsWith('.' + allowedDomain);
      });

      if (!isAllowed) {
        // Detectar tentativas de typosquatting
        const suspiciousDomain = this.detectTyposquatting(domain);
        if (suspiciousDomain) {
          return { 
            isValid: false, 
            reason: `Domínio suspeito detectado. Você quis dizer "${suspiciousDomain}"?`,
            domain 
          };
        }

        return { 
          isValid: false, 
          reason: 'Domínio não autorizado. Apenas marketplaces oficiais são permitidos',
          domain 
        };
      }

      return { isValid: true, domain };

    } catch (error) {
      return { 
        isValid: false, 
        reason: 'URL malformada ou inválida' 
      };
    }
  }

  private static detectTyposquatting(domain: string): string | null {
    const commonTypos = [
      { typo: /amaz[0o]n\.com/i, correct: 'amazon.com' },
      { typo: /shopee-br\.com/i, correct: 'shopee.com.br' },
      { typo: /mercad[0o]livre\.com/i, correct: 'mercadolivre.com.br' },
      { typo: /magazineluiz[ae]\.com/i, correct: 'magazineluiza.com.br' }
    ];

    for (const { typo, correct } of commonTypos) {
      if (typo.test(domain)) {
        return correct;
      }
    }

    return null;
  }

  static recordViolation(userId: string, url: string, reason: string): void {
    const violation: UserViolation = {
      userId,
      timestamp: new Date().toISOString(),
      url,
      reason
    };

    this.violations.push(violation);
    
    // Limpar violações antigas (mais de 24h)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    this.violations = this.violations.filter(v => 
      new Date(v.timestamp) > oneDayAgo
    );

    console.log('🛡️ AffiGuard: Violação registrada', violation);
  }

  static getUserViolationsCount(userId: string): number {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.violations.filter(v => 
      v.userId === userId && new Date(v.timestamp) > oneDayAgo
    ).length;
  }

  static isUserSuspended(userId: string): boolean {
    return this.getUserViolationsCount(userId) >= 3;
  }

  static getAllowedDomains(): string[] {
    return [...this.ALLOWED_DOMAINS];
  }

  static getBlockedShorteners(): string[] {
    return [...this.BLOCKED_SHORTENERS];
  }

  static extractLinksFromText(text: string): string[] {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  }

  static validatePostContent(content: string, userId: string): {
    isValid: boolean;
    blockedLinks: string[];
    message?: string;
  } {
    const links = this.extractLinksFromText(content);
    const blockedLinks: string[] = [];

    for (const link of links) {
      const validation = this.validateLink(link);
      if (!validation.isValid) {
        blockedLinks.push(link);
        this.recordViolation(userId, link, validation.reason || 'Link não autorizado');
      }
    }

    if (blockedLinks.length > 0) {
      const violationsCount = this.getUserViolationsCount(userId);
      
      if (violationsCount >= 3) {
        return {
          isValid: false,
          blockedLinks,
          message: '⚠️ Conta suspensa temporariamente. Você tentou postar links não autorizados repetidamente. Entre em contato com o suporte se houve um erro.'
        };
      }

      return {
        isValid: false,
        blockedLinks,
        message: '❌ Link não permitido! Só aceitamos links diretos de: Amazon, Shopee, Mercado Livre, Magazine Luiza, Shein, Temu e AliExpress.'
      };
    }

    return { isValid: true, blockedLinks: [] };
  }

  static getViolationStats() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentViolations = this.violations.filter(v => 
      new Date(v.timestamp) > oneDayAgo
    );

    const violationsByReason = recentViolations.reduce((acc, violation) => {
      acc[violation.reason] = (acc[violation.reason] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalViolations: recentViolations.length,
      violationsByReason,
      suspendedUsers: new Set(recentViolations
        .filter(v => this.getUserViolationsCount(v.userId) >= 3)
        .map(v => v.userId)
      ).size
    };
  }
}

export { AffiGuardService };
