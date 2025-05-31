
interface SpamDetectionResult {
  isSpam: boolean;
  confidence: number;
  reasons: string[];
  action: 'allow' | 'limit' | 'block';
}

interface UserBehavior {
  postsInLastHour: number;
  identicalPosts: number;
  accountAge: number;
  verificationLevel: 'none' | 'email' | 'phone' | 'document';
}

export class AntiSpamBot {
  private processedCount = 0;
  private lastActivity = new Date().toISOString();
  private userActivity = new Map<string, UserBehavior>();
  private recentPosts = new Map<string, { content: string; timestamp: number }[]>();

  canHandle(eventType: string): boolean {
    return ['post_created', 'user_joined', 'comment_added'].includes(eventType);
  }

  async process(event: any): Promise<any> {
    this.processedCount++;
    this.lastActivity = new Date().toISOString();

    const userId = event.userId;
    if (!userId) return null;

    const spamResult = await this.detectSpam(userId, event.data);
    
    console.log(`🚫 Anti-Spam: ${spamResult.action} (confiança: ${spamResult.confidence}%)`);

    if (spamResult.isSpam) {
      return {
        action: spamResult.action === 'block' ? 'reject' : 'flag',
        data: {
          spamDetection: spamResult,
          message: this.getActionMessage(spamResult.action)
        },
        confidence: spamResult.confidence
      };
    }

    return {
      action: 'approve',
      data: { spamCheck: 'passed' },
      confidence: 95
    };
  }

  private async detectSpam(userId: string, eventData: any): Promise<SpamDetectionResult> {
    const reasons: string[] = [];
    let confidence = 0;

    // Atualizar comportamento do usuário
    this.updateUserBehavior(userId, eventData);
    const userBehavior = this.userActivity.get(userId)!;

    // Verificar frequência de posts
    if (userBehavior.postsInLastHour > 10) {
      reasons.push('Muitos posts em pouco tempo');
      confidence += 30;
    }

    // Verificar posts idênticos
    if (userBehavior.identicalPosts > 3) {
      reasons.push('Posts duplicados detectados');
      confidence += 40;
    }

    // Verificar conta muito nova (possível bot)
    if (userBehavior.accountAge < 1 && userBehavior.postsInLastHour > 5) {
      reasons.push('Conta nova com atividade suspeita');
      confidence += 25;
    }

    // Verificar nível de verificação
    if (userBehavior.verificationLevel === 'none' && userBehavior.postsInLastHour > 15) {
      reasons.push('Conta não verificada com alta atividade');
      confidence += 20;
    }

    // Análise de conteúdo
    const content = eventData.content || eventData.text || '';
    const contentSpamScore = this.analyzeContentForSpam(content);
    confidence += contentSpamScore.score;
    reasons.push(...contentSpamScore.reasons);

    // Determinar ação baseada na confiança
    let action: 'allow' | 'limit' | 'block' = 'allow';
    
    if (confidence >= 80) {
      action = 'block';
    } else if (confidence >= 50) {
      action = 'limit';
    }

    return {
      isSpam: confidence >= 50,
      confidence,
      reasons,
      action
    };
  }

  private updateUserBehavior(userId: string, eventData: any): void {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);

    // Atualizar posts recentes
    const userPosts = this.recentPosts.get(userId) || [];
    userPosts.push({
      content: eventData.content || eventData.text || '',
      timestamp: now
    });

    // Remover posts antigos (mais de 1 hora)
    const recentUserPosts = userPosts.filter(post => post.timestamp > oneHourAgo);
    this.recentPosts.set(userId, recentUserPosts);

    // Calcular comportamento
    const postsInLastHour = recentUserPosts.length;
    const contents = recentUserPosts.map(p => p.content);
    const identicalPosts = contents.length - new Set(contents).size;

    // Simular dados do usuário (em produção viria do banco)
    const accountAge = Math.random() * 365; // dias
    const verificationLevel = Math.random() > 0.7 ? 'email' : 'none';

    this.userActivity.set(userId, {
      postsInLastHour,
      identicalPosts,
      accountAge,
      verificationLevel: verificationLevel as any
    });
  }

  private analyzeContentForSpam(content: string): { score: number; reasons: string[] } {
    const reasons: string[] = [];
    let score = 0;

    // Excesso de links
    const linkCount = (content.match(/https?:\/\/[^\s]+/g) || []).length;
    if (linkCount > 5) {
      reasons.push('Muitos links no conteúdo');
      score += 20;
    }

    // Excesso de hashtags
    const hashtagCount = (content.match(/#\w+/g) || []).length;
    if (hashtagCount > 10) {
      reasons.push('Excesso de hashtags');
      score += 15;
    }

    // Texto muito repetitivo
    const words = content.toLowerCase().split(/\s+/);
    const uniqueWords = new Set(words);
    const repetitionRatio = 1 - (uniqueWords.size / words.length);
    
    if (repetitionRatio > 0.7 && content.length > 50) {
      reasons.push('Conteúdo muito repetitivo');
      score += 25;
    }

    // Verificar padrões suspeitos (mas não bloquear afiliados legítimos)
    const suspiciousPatterns = [
      /ganhe.*dinheiro.*fácil/i,
      /clique.*aqui.*agora/i,
      /oferta.*imperdível.*hoje/i
    ];

    const suspiciousMatches = suspiciousPatterns.filter(pattern => pattern.test(content));
    if (suspiciousMatches.length > 1) {
      reasons.push('Múltiplos padrões suspeitos');
      score += 10; // Score baixo para não prejudicar afiliados legítimos
    }

    return { score, reasons };
  }

  private getActionMessage(action: string): string {
    switch (action) {
      case 'block':
        return 'Conteúdo bloqueado por atividade suspeita. Entre em contato com o suporte se isso foi um erro.';
      case 'limit':
        return 'Sua conta foi temporariamente limitada. Reduza a frequência de posts.';
      default:
        return 'Post aprovado.';
    }
  }

  getLastActivity(): string {
    return this.lastActivity;
  }

  getProcessedCount(): number {
    return this.processedCount;
  }

  getHealth(): string {
    return 'healthy';
  }
}
