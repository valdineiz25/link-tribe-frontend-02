
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Bot, 
  Shield, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Star,
  Settings,
  Play,
  Pause,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { BotManager } from '@/services/botSystem/BotManager';

const BotDashboard: React.FC = () => {
  const { toast } = useToast();
  const [botManager] = useState(() => new BotManager());
  const [bots, setBots] = useState(botManager.getAllBots());
  const [systemStats, setSystemStats] = useState({
    totalActions: 0,
    activeUsers: 0,
    blockedSpam: 0,
    recommendations: 0
  });

  const refreshBots = () => {
    setBots(botManager.getAllBots());
    
    // Atualizar estatísticas do sistema
    const stats = {
      totalActions: Math.floor(Math.random() * 1000) + 500,
      activeUsers: Math.floor(Math.random() * 100) + 50,
      blockedSpam: Math.floor(Math.random() * 50) + 10,
      recommendations: Math.floor(Math.random() * 200) + 100
    };
    setSystemStats(stats);
  };

  useEffect(() => {
    refreshBots();
    const interval = setInterval(refreshBots, 30000); // Atualiza a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  const handleToggleBot = (botId: string) => {
    const bot = bots.find(b => b.id === botId);
    if (!bot) return;

    if (bot.isActive) {
      botManager.stopBot(botId);
      toast({
        title: "Bot Pausado",
        description: `${bot.name} foi pausado com sucesso.`,
      });
    } else {
      botManager.startBot(botId);
      toast({
        title: "Bot Ativado",
        description: `${bot.name} foi ativado com sucesso.`,
      });
    }
    
    refreshBots();
  };

  const handleRestartBot = (botId: string) => {
    const bot = bots.find(b => b.id === botId);
    if (!bot) return;

    botManager.restartBot(botId);
    toast({
      title: "Bot Reiniciado",
      description: `${bot.name} foi reiniciado com sucesso.`,
    });
    
    refreshBots();
  };

  const getBotIcon = (type: string) => {
    switch (type) {
      case 'moderation': return Shield;
      case 'analytics': return BarChart3;
      case 'customer-support': return MessageSquare;
      case 'anti-spam': return AlertTriangle;
      case 'recommendation': return Star;
      default: return Bot;
    }
  };

  const getBotStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const formatLastAction = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `${minutes}m atrás`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h atrás`;
    const days = Math.floor(hours / 24);
    return `${days}d atrás`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              🤖 Bot Dashboard
            </h1>
            <p className="text-slate-600">Gerencie seus bots automatizados</p>
          </div>
          
          <Button onClick={refreshBots} variant="outline" className="flex items-center space-x-2">
            <RefreshCw size={16} />
            <span>Atualizar</span>
          </Button>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-lg border border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ações Totais</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.totalActions.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Usuários Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Spam Bloqueado</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.blockedSpam}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Recomendações</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.recommendations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {bots.map((bot) => {
            const IconComponent = getBotIcon(bot.type);
            
            return (
              <Card key={bot.id} className="shadow-xl border border-slate-200 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{bot.name}</CardTitle>
                        <p className="text-sm text-gray-600">{bot.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getBotStatusColor(bot.status)}`}></div>
                      <Badge variant={bot.isActive ? "default" : "secondary"}>
                        {bot.isActive ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Bot Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Execuções</p>
                      <p className="font-semibold">{bot.executionCount || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Última Ação</p>
                      <p className="font-semibold">{formatLastAction(bot.lastExecution || new Date().toISOString())}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Bot Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={bot.isActive}
                        onCheckedChange={() => handleToggleBot(bot.id)}
                      />
                      <span className="text-sm font-medium">
                        {bot.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRestartBot(bot.id)}
                        disabled={!bot.isActive}
                      >
                        <RefreshCw size={14} />
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Settings size={14} />
                      </Button>
                    </div>
                  </div>

                  {/* Performance Indicator */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Performance</span>
                      <span className="text-xs text-gray-600">
                        {bot.status === 'active' ? '98%' : '0%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          bot.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                        style={{ width: bot.status === 'active' ? '98%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* System Status */}
        <Card className="shadow-xl border border-slate-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Status do Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Sistema Principal</p>
                  <p className="text-sm text-gray-600">Operacional</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Base de Dados</p>
                  <p className="text-sm text-gray-600">Conectado</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium">API Externa</p>
                  <p className="text-sm text-gray-600">Latência Alta</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BotDashboard;
