import { ModerationBot } from './bots/ModerationBot';
import { RecommendationBot } from './bots/RecommendationBot';
import { AntiSpamBot } from './bots/AntiSpamBot';
import { AnalyticsBot } from './bots/AnalyticsBot';
import { CustomerSupportBot } from './bots/CustomerSupportBot';

export interface BotSystemConfig {
  enableModerationBot: boolean;
  enableRecommendationBot: boolean;
  enableAntiSpamBot: boolean;
  enableAnalyticsBot: boolean;
  enableCustomerSupportBot: boolean;
  enableGrowthBot: boolean;
  maxConcurrentOperations: number;
  nlpApiKey?: string;
  analyticsUpdateInterval: number;
}

export interface BotEvent {
  id: string;
  type: 'post_created' | 'user_joined' | 'link_clicked' | 'comment_added' | 'user_query';
  data: any;
  timestamp: string;
  userId?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface BotResponse {
  botId: string;
  action: 'approve' | 'reject' | 'flag' | 'notify' | 'recommend' | 'respond';
  data: any;
  confidence: number;
  executionTime: number;
}

export class BotManager {
  private bots: Map<string, any> = new Map();
  private eventQueue: BotEvent[] = [];
  private isProcessing = false;
  private config: BotSystemConfig;

  constructor(config: BotSystemConfig) {
    this.config = config;
    this.initializeBots();
    this.startEventProcessor();
  }

  private initializeBots(): void {
    console.log('🤖 Inicializando sistema de bots da AffiliateNet...');

    if (this.config.enableModerationBot) {
      this.bots.set('moderation', new ModerationBot());
      console.log('✅ Bot de Moderação ativado');
    }

    if (this.config.enableRecommendationBot) {
      this.bots.set('recommendation', new RecommendationBot());
      console.log('✅ Bot de Recomendações ativado');
    }

    if (this.config.enableAntiSpamBot) {
      this.bots.set('antispam', new AntiSpamBot());
      console.log('✅ Bot Anti-Spam ativado');
    }

    if (this.config.enableAnalyticsBot) {
      this.bots.set('analytics', new AnalyticsBot(this.config.analyticsUpdateInterval));
      console.log('✅ Bot de Analytics ativado');
    }

    if (this.config.enableCustomerSupportBot) {
      this.bots.set('support', new CustomerSupportBot());
      console.log('✅ Bot de Atendimento ativado');
    }

    console.log(`🚀 Sistema de bots inicializado com ${this.bots.size} bots ativos`);
  }

  public async processEvent(event: BotEvent): Promise<BotResponse[]> {
    this.eventQueue.push(event);
    return this.processNextEvents();
  }

  private async processNextEvents(): Promise<BotResponse[]> {
    if (this.isProcessing || this.eventQueue.length === 0) {
      return [];
    }

    this.isProcessing = true;
    const responses: BotResponse[] = [];

    try {
      // Processar eventos por prioridade
      this.eventQueue.sort((a, b) => this.getPriorityValue(b.priority) - this.getPriorityValue(a.priority));

      const batchSize = Math.min(this.config.maxConcurrentOperations, this.eventQueue.length);
      const eventsToProcess = this.eventQueue.splice(0, batchSize);

      const promises = eventsToProcess.map(event => this.processEventWithBots(event));
      const results = await Promise.allSettled(promises);

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          responses.push(...result.value);
        } else {
          console.error(`Erro ao processar evento ${eventsToProcess[index].id}:`, result.reason);
        }
      });

    } catch (error) {
      console.error('Erro no processamento de eventos:', error);
    } finally {
      this.isProcessing = false;
    }

    return responses;
  }

  private async processEventWithBots(event: BotEvent): Promise<BotResponse[]> {
    const responses: BotResponse[] = [];
    const startTime = Date.now();

    for (const [botId, bot] of this.bots) {
      if (bot.canHandle(event.type)) {
        try {
          const response = await bot.process(event);
          if (response) {
            responses.push({
              ...response,
              botId,
              executionTime: Date.now() - startTime
            });
          }
        } catch (error) {
          console.error(`Erro no bot ${botId}:`, error);
        }
      }
    }

    return responses;
  }

  private getPriorityValue(priority: string): number {
    const values = { low: 1, medium: 2, high: 3, critical: 4 };
    return values[priority as keyof typeof values] || 1;
  }

  private startEventProcessor(): void {
    setInterval(() => {
      if (this.eventQueue.length > 0) {
        this.processNextEvents();
      }
    }, 100); // Processar a cada 100ms
  }

  public getBotStatus(): Record<string, any> {
    const status: Record<string, any> = {};
    
    for (const [botId, bot] of this.bots) {
      status[botId] = {
        active: true,
        lastActivity: bot.getLastActivity?.() || new Date().toISOString(),
        processedEvents: bot.getProcessedCount?.() || 0,
        health: bot.getHealth?.() || 'healthy'
      };
    }

    return {
      totalBots: this.bots.size,
      queueSize: this.eventQueue.length,
      isProcessing: this.isProcessing,
      bots: status
    };
  }

  public async shutdown(): Promise<void> {
    console.log('🔄 Desligando sistema de bots...');
    
    for (const [botId, bot] of this.bots) {
      if (bot.shutdown) {
        await bot.shutdown();
        console.log(`🔴 Bot ${botId} desligado`);
      }
    }

    this.bots.clear();
    this.eventQueue = [];
    console.log('✅ Sistema de bots desligado com sucesso');
  }
}
