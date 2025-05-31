
interface SupportQuery {
  userId: string;
  query: string;
  category: 'commission' | 'payment' | 'rules' | 'technical' | 'general';
  urgency: 'low' | 'medium' | 'high';
  timestamp: number;
}

interface SupportResponse {
  answer: string;
  helpful_links?: string[];
  escalate?: boolean;
  follow_up?: string;
}

export class CustomerSupportBot {
  private processedCount = 0;
  private lastActivity = new Date().toISOString();
  private knowledgeBase = new Map<string, SupportResponse>();

  constructor() {
    this.initializeKnowledgeBase();
  }

  canHandle(eventType: string): boolean {
    return eventType === 'user_query';
  }

  async process(event: any): Promise<any> {
    this.processedCount++;
    this.lastActivity = new Date().toISOString();

    const query = event.data.query?.toLowerCase() || '';
    const supportQuery: SupportQuery = {
      userId: event.userId,
      query: event.data.query,
      category: this.categorizeQuery(query),
      urgency: this.assessUrgency(query),
      timestamp: Date.now()
    };

    const response = await this.generateResponse(supportQuery);

    console.log(`🎧 Suporte: Respondendo query categoria '${supportQuery.category}'`);

    return {
      action: 'respond',
      data: {
        type: 'support_response',
        response: response.answer,
        helpful_links: response.helpful_links,
        escalate: response.escalate,
        motivational: this.addMotivationalTouch(supportQuery.category)
      },
      confidence: response.escalate ? 60 : 90
    };
  }

  private categorizeQuery(query: string): 'commission' | 'payment' | 'rules' | 'technical' | 'general' {
    const keywords = {
      commission: ['comissão', 'comissões', 'ganho', 'ganhos', 'percentual', 'quanto ganho'],
      payment: ['pagamento', 'pagar', 'receber', 'saque', 'transferência', 'pix', 'conta'],
      rules: ['regras', 'política', 'permitido', 'pode', 'termos', 'condições'],
      technical: ['erro', 'bug', 'problema', 'não funciona', 'travou', 'lento']
    };

    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => query.includes(word))) {
        return category as any;
      }
    }

    return 'general';
  }

  private assessUrgency(query: string): 'low' | 'medium' | 'high' {
    const highUrgencyWords = ['urgente', 'não recebí', 'erro grave', 'conta bloqueada'];
    const mediumUrgencyWords = ['problema', 'dúvida', 'como fazer'];

    if (highUrgencyWords.some(word => query.includes(word))) return 'high';
    if (mediumUrgencyWords.some(word => query.includes(word))) return 'medium';
    return 'low';
  }

  private async generateResponse(query: SupportQuery): Promise<SupportResponse> {
    // Buscar resposta na base de conhecimento
    const baseResponse = this.knowledgeBase.get(query.category);
    
    if (!baseResponse) {
      return {
        answer: "Obrigado pela sua pergunta! Nossa equipe especializada irá te responder em breve. Enquanto isso, você pode consultar nossa central de ajuda.",
        escalate: true,
        follow_up: "Sua pergunta foi encaminhada para nossa equipe. Tempo estimado de resposta: 2-4 horas."
      };
    }

    // Personalizar resposta baseada na query específica
    let personalizedAnswer = baseResponse.answer;

    // Adicionar informações específicas baseadas na query
    if (query.category === 'commission' && query.query.includes('quanto')) {
      personalizedAnswer += "\n\n💰 **Suas comissões variam de 5% a 15%** dependendo da loja parceira. Amazon e Mercado Livre oferecem até 10%!";
    }

    if (query.category === 'payment' && query.query.includes('quando')) {
      const nextPaymentDate = this.calculateNextPaymentDate();
      personalizedAnswer += `\n\n📅 **Seu próximo pagamento será em ${nextPaymentDate}**. Você está a poucos dias de receber!`;
    }

    return {
      ...baseResponse,
      answer: personalizedAnswer
    };
  }

  private initializeKnowledgeBase(): void {
    this.knowledgeBase.set('commission', {
      answer: `🤑 **Sobre Comissões na AffiliateNet:**

• **Como funcionam:** Você ganha uma porcentagem de cada venda feita através dos seus links
• **Valores:** De 5% a 15% dependendo da loja e categoria do produto  
• **Principais lojas:**
  - Amazon: até 10%
  - Mercado Livre: até 8%
  - Shopee: até 12%
  - Americanas: até 7%

• **Quando você ganha:** Assim que a compra é confirmada pela loja
• **Tracking:** Acompanhe em tempo real no seu painel`,
      helpful_links: ['/dashboard', '/comissoes']
    });

    this.knowledgeBase.set('payment', {
      answer: `💳 **Sobre Pagamentos:**

• **Frequência:** Pagamentos semanais às terças-feiras
• **Valor mínimo:** R$ 50,00 para saque
• **Métodos disponíveis:** PIX (instantâneo) ou transferência bancária
• **Prazo:** PIX em até 1 hora, transferência em até 2 dias úteis

📊 **Como acompanhar:**
- Veja seus ganhos em tempo real no dashboard
- Histórico completo de pagamentos disponível
- Notificações automáticas a cada pagamento`,
      helpful_links: ['/pagamentos', '/dashboard']
    });

    this.knowledgeBase.set('rules', {
      answer: `📋 **Regras da AffiliateNet:**

✅ **PODE fazer:**
- Postar quantos links de afiliados quiser
- Compartilhar em todas as suas redes sociais
- Criar conteúdo promocional
- Recomendar para amigos e familiares

❌ **NÃO PODE:**
- Spam ou disparos em massa
- Links falsos ou enganosos
- Conteúdo ofensivo ou ilegal
- Compras falsas para gerar comissões

🎯 **Dica:** Seja autêntico! Recomende produtos que você realmente usaria.`,
      helpful_links: ['/termos', '/politicas']
    });

    this.knowledgeBase.set('technical', {
      answer: `🔧 **Suporte Técnico:**

🚀 **Problemas comuns e soluções:**
- **Link não funciona:** Verifique se copiou corretamente
- **App lento:** Feche e abra novamente
- **Não consegue postar:** Verifique sua conexão

📱 **Precisa de mais ajuda?**
Nossa equipe técnica está disponível 24/7 para resolver qualquer problema.`,
      escalate: true,
      helpful_links: ['/suporte', '/faq']
    });

    this.knowledgeBase.set('general', {
      answer: `👋 **Olá! Como posso ajudar você a ganhar mais na AffiliateNet?**

🔥 **Principais funcionalidades:**
- Ganhe comissões de até 15% com grandes lojas
- Poste links ilimitados sem restrições
- Pagamentos semanais via PIX
- Dashboard completo com analytics

💡 **Primeira vez aqui?** Comece escolhendo produtos no nosso marketplace e compartilhando com seus seguidores!`,
      helpful_links: ['/marketplace', '/como-funciona']
    });
  }

  private addMotivationalTouch(category: string): string {
    const motivationalMessages = {
      commission: "💪 Cada clique é uma oportunidade de ganho. Continue compartilhando!",
      payment: "🎉 Seus ganhos estão crescendo! Parabéns pelo seu trabalho.",
      rules: "📈 Seguindo as regras, você maximiza seus ganhos com segurança.",
      technical: "🚀 Problemas técnicos não vão parar seu sucesso! Estamos aqui para ajudar.",
      general: "✨ Você está no lugar certo para transformar suas recomendações em renda!"
    };

    return motivationalMessages[category as keyof typeof motivationalMessages] || motivationalMessages.general;
  }

  private calculateNextPaymentDate(): string {
    const today = new Date();
    const daysUntilTuesday = (2 - today.getDay() + 7) % 7; // 2 = Tuesday
    const nextTuesday = new Date(today);
    nextTuesday.setDate(today.getDate() + (daysUntilTuesday || 7));
    
    return nextTuesday.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
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
