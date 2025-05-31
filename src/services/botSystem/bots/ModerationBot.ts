
export interface ModerationResult {
  action: 'approve' | 'reject' | 'flag';
  reason?: string;
  confidence: number;
  tags?: string[];
}

export class ModerationBot {
  private processedCount = 0;
  private lastActivity = new Date().toISOString();
  private bannedKeywords = [
    'fraude', 'scam', 'golpe', 'pirâmide', 'ponzi', 'ilegal',
    'drogas', 'armas', 'falsificado', 'pirataria'
  ];

  canHandle(eventType: string): boolean {
    return ['post_created', 'comment_added'].includes(eventType);
  }

  async process(event: any): Promise<any> {
    this.processedCount++;
    this.lastActivity = new Date().toISOString();

    const content = event.data.content || event.data.text || '';
    const result = await this.moderateContent(content);

    console.log(`🛡️ Moderação: ${result.action} (confiança: ${result.confidence}%)`);

    return {
      action: result.action === 'reject' ? 'reject' : 'approve',
      data: {
        moderationResult: result,
        processed: true
      },
      confidence: result.confidence
    };
  }

  private async moderateContent(content: string): Promise<ModerationResult> {
    const lowerContent = content.toLowerCase();

    // Verificar palavras banidas (apenas conteúdo realmente ilegal)
    const foundBannedWords = this.bannedKeywords.filter(word => 
      lowerContent.includes(word)
    );

    if (foundBannedWords.length > 0) {
      return {
        action: 'reject',
        reason: 'Conteúdo contém termos proibidos',
        confidence: 95,
        tags: foundBannedWords
      };
    }

    // Verificar links suspeitos (não afiliados legítimos)
    const suspiciousPatterns = [
      /bit\.ly\/[a-zA-Z0-9]{7,}/g, // Links encurtados suspeitos
      /tinyurl\.com/g,
      /(?:senha|password|login).*:/gi
    ];

    const hasSuspiciousLinks = suspiciousPatterns.some(pattern => 
      pattern.test(content)
    );

    if (hasSuspiciousLinks) {
      return {
        action: 'flag',
        reason: 'Links suspeitos detectados',
        confidence: 75
      };
    }

    // Detectar spam excessivo (muitos emojis ou CAPS)
    const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
    const emojiCount = (content.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu) || []).length;

    if (capsRatio > 0.7 && content.length > 20) {
      return {
        action: 'flag',
        reason: 'Possível spam (excesso de maiúsculas)',
        confidence: 60
      };
    }

    if (emojiCount > 10) {
      return {
        action: 'flag',
        reason: 'Possível spam (excesso de emojis)',
        confidence: 55
      };
    }

    // Aprovar links de afiliados legítimos
    const affiliatePatterns = [
      /amazon\./i,
      /mercadolivre\./i,
      /shopee\./i,
      /aliexpress\./i,
      /americanas\./i,
      /casasbahia\./i
    ];

    const hasLegitimateAffiliate = affiliatePatterns.some(pattern => 
      pattern.test(content)
    );

    if (hasLegitimateAffiliate) {
      return {
        action: 'approve',
        reason: 'Link de afiliado legítimo detectado',
        confidence: 90,
        tags: ['affiliate_link']
      };
    }

    // Aprovação padrão
    return {
      action: 'approve',
      reason: 'Conteúdo aprovado',
      confidence: 85
    };
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
