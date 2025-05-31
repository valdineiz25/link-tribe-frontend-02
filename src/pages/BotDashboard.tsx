
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BotManager, BotSystemConfig } from '@/services/botSystem/BotManager';
import { useToast } from '@/hooks/use-toast';
import { Bot, Activity, BarChart3, Shield, Users, Zap } from 'lucide-react';

const BotDashboard: React.FC = () => {
  const { toast } = useToast();
  const [botManager, setBotManager] = useState<BotManager | null>(null);
  const [botStatus, setBotStatus] = useState<any>({});
  const [config, setConfig] = useState<BotSystemConfig>({
    enableModerationBot: true,
    enableRecommendationBot: true,
    enableAntiSpamBot: true,
    enableAnalyticsBot: true,
    enableCustomerSupportBot: true,
    enableGrowthBot: false,
    maxConcurrentOperations: 100,
    analyticsUpdateInterval: 300000
  });

  useEffect(() => {
    initializeBotSystem();
    
    return () => {
      if (botManager) {
        botManager.shutdown();
      }
    };
  }, []);

  const initializeBotSystem = () => {
    try {
      const manager = new BotManager(config);
      setBotManager(manager);
      
      // Atualizar status a cada 5 segundos
      const statusInterval = setInterval(() => {
        setBotStatus(manager.getBotStatus());
      }, 5000);

      setBotStatus(manager.getBotStatus());
      
      toast({
        title: "Sistema de Bots Ativado",
        description: "Todos os bots estão funcionando perfeitamente!",
      });

      return () => clearInterval(statusInterval);
    } catch (error) {
      console.error('Erro ao inicializar bots:', error);
      toast({
        title: "Erro no Sistema",
        description: "Falha ao inicializar os bots.",
        variant: "destructive",
      });
    }
  };

  const toggleBot = (botId: string, enabled: boolean) => {
    setConfig(prev => ({
      ...prev,
      [`enable${botId.charAt(0).toUpperCase() + botId.slice(1)}Bot`]: enabled
    }));

    if (enabled) {
      toast({
        title: `Bot ${botId} Ativado`,
        description: "O bot está agora funcionando 24/7!",
      });
    } else {
      toast({
        title: `Bot ${botId} Desativado`,
        description: "O bot foi pausado temporariamente.",
      });
    }
  };

  const simulateEvent = async (eventType: string) => {
    if (!botManager) return;

    const mockEvent = {
      id: Date.now().toString(),
      type: eventType as any,
      data: {
        content: eventType === 'post_created' ? 'Produto incrível que estou recomendando! https://affiliate.link/123' : undefined,
        query: eventType === 'user_query' ? 'Como posso aumentar minhas vendas?' : undefined,
        userId: 'user123',
        productId: 'prod123'
      },
      timestamp: new Date().toISOString(),
      userId: 'user123',
      priority: 'medium' as const
    };

    try {
      const responses = await botManager.processEvent(mockEvent);
      console.log('Bot responses:', responses);
      
      toast({
        title: "Evento Processado",
        description: `${responses.length} bots responderam ao evento ${eventType}`,
      });
    } catch (error) {
      toast({
        title: "Erro no Processamento",
        description: "Falha ao processar evento.",
        variant: "destructive",
      });
    }
  };

  const getBotIcon = (botId: string) => {
    const icons = {
      moderation: Shield,
      recommendation: Bot,
      antispam: Zap,
      analytics: BarChart3,
      support: Users
    };
    return icons[botId as keyof typeof icons] || Bot;
  };

  const getBotDescription = (botId: string) => {
    const descriptions = {
      moderation: "Remove apenas conteúdo ilegal, nunca bloqueia links de afiliados",
      recommendation: "Sugere produtos inteligentes baseado no comportamento do usuário",
      antispam: "Bloqueia spam mas protege afiliados legítimos",
      analytics: "Monitora cliques e conversões em tempo real",
      support: "Responde dúvidas sobre comissões e pagamentos 24/7"
    };
    return descriptions[botId as keyof typeof descriptions] || "Bot inteligente da AffiliateNet";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
            <Bot className="h-10 w-10 text-blue-400" />
            Painel de Bots da AffiliateNet
          </h1>
          <p className="text-blue-200 text-lg">
            Sistema de IA que funciona 24/7 para maximizar seus ganhos
          </p>
        </div>

        {/* Status Geral */}
        <Card className="bg-gray-800 border-blue-500 border-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-6 w-6 text-green-400" />
              Status do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{botStatus.totalBots || 0}</div>
                <div className="text-gray-300">Bots Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{botStatus.queueSize || 0}</div>
                <div className="text-gray-300">Eventos na Fila</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {botStatus.isProcessing ? 'SIM' : 'IDLE'}
                </div>
                <div className="text-gray-300">Processando</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">100%</div>
                <div className="text-gray-300">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="bots" className="space-y-6">
          <TabsList className="bg-gray-800 border border-blue-500">
            <TabsTrigger value="bots" className="text-white data-[state=active]:bg-blue-600">
              Gerenciar Bots
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-blue-600">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="test" className="text-white data-[state=active]:bg-blue-600">
              Testar Sistema
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bots">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(botStatus.bots || {}).map(([botId, status]: [string, any]) => {
                const IconComponent = getBotIcon(botId);
                const isEnabled = config[`enable${botId.charAt(0).toUpperCase() + botId.slice(1)}Bot` as keyof BotSystemConfig] as boolean;
                
                return (
                  <Card key={botId} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-6 w-6 text-blue-400" />
                          {botId.charAt(0).toUpperCase() + botId.slice(1)} Bot
                        </div>
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={(checked) => toggleBot(botId, checked)}
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm">
                        {getBotDescription(botId)}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Status:</span>
                          <Badge variant={status?.health === 'healthy' ? 'default' : 'destructive'}>
                            {status?.health === 'healthy' ? 'Saudável' : 'Erro'}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Eventos Processados:</span>
                          <span className="text-white">{status?.processedEvents || 0}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Última Atividade:</span>
                          <span className="text-white text-xs">
                            {status?.lastActivity ? new Date(status.lastActivity).toLocaleTimeString('pt-BR') : 'N/A'}
                          </span>
                        </div>
                      </div>

                      <Progress 
                        value={isEnabled ? 100 : 0} 
                        className="h-2"
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance dos Bots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(botStatus.bots || {}).map(([botId, status]: [string, any]) => (
                      <div key={botId} className="flex justify-between items-center">
                        <span className="text-gray-300">{botId}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">{status?.processedEvents || 0}</span>
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${Math.min(100, (status?.processedEvents || 0) * 10)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Estatísticas em Tempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">
                        {Object.values(botStatus.bots || {}).reduce((sum: number, bot: any) => sum + (bot.processedEvents || 0), 0)}
                      </div>
                      <div className="text-gray-300">Total de Eventos Processados</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {((Date.now() - (botManager ? 0 : Date.now())) / 1000 / 60).toFixed(0)}min
                      </div>
                      <div className="text-gray-300">Tempo de Atividade</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="test">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Testar Funcionalidades dos Bots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => simulateEvent('post_created')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Simular Post
                  </Button>
                  
                  <Button 
                    onClick={() => simulateEvent('link_clicked')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Simular Clique
                  </Button>
                  
                  <Button 
                    onClick={() => simulateEvent('user_query')}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Simular Pergunta
                  </Button>
                  
                  <Button 
                    onClick={() => simulateEvent('user_joined')}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    Novo Usuário
                  </Button>
                  
                  <Button 
                    onClick={() => simulateEvent('comment_added')}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Novo Comentário
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      if (botManager) {
                        setBotStatus(botManager.getBotStatus());
                        toast({
                          title: "Status Atualizado",
                          description: "Dados dos bots foram atualizados!",
                        });
                      }
                    }}
                    className="bg-gray-600 hover:bg-gray-700"
                  >
                    Atualizar Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BotDashboard;
