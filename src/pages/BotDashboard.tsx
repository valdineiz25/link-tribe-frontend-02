
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Bot, Play, Square, RotateCcw, Settings } from 'lucide-react';

const BotDashboard: React.FC = () => {
  const [bots, setBots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBots = async () => {
      setIsLoading(true);
      try {
        // Initialize with empty array for now
        const allBots: any[] = [];
        setBots(allBots);
      } catch (error) {
        console.error('Erro ao carregar bots:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBots();
  }, []);

  const handleStopBot = async (botId: string) => {
    try {
      console.log('Parando bot:', botId);
      // Bot stop logic would go here
    } catch (error) {
      console.error('Erro ao parar bot:', error);
    }
  };

  const handleStartBot = async (botId: string) => {
    try {
      console.log('Iniciando bot:', botId);
      // Bot start logic would go here  
    } catch (error) {
      console.error('Erro ao iniciar bot:', error);
    }
  };

  const handleRestartBot = async (botId: string) => {
    try {
      console.log('Reiniciando bot:', botId);
      // Bot restart logic would go here
    } catch (error) {
      console.error('Erro ao reiniciar bot:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Bots</h1>
          <p className="text-gray-600">Gerencie e monitore todos os bots do sistema</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Bot size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum bot ativo</h3>
                <p className="text-gray-500">Os bots serão exibidos aqui quando estiverem em execução</p>
              </div>
            ) : (
              bots.map((bot) => (
                <Card key={bot.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        <Bot className="mr-2" size={20} />
                        {bot.name}
                      </CardTitle>
                      <Badge variant={bot.status === 'running' ? 'default' : 'secondary'}>
                        {bot.status === 'running' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{bot.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Uptime:</span>
                        <span className="font-mono">{bot.uptime || '00:00:00'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Ações executadas:</span>
                        <span className="font-mono">{bot.actionsCount || 0}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {bot.status === 'running' ? (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStopBot(bot.id)}
                        >
                          <Square size={14} className="mr-1" />
                          Parar
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleStartBot(bot.id)}
                        >
                          <Play size={14} className="mr-1" />
                          Iniciar
                        </Button>
                      )}
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRestartBot(bot.id)}
                      >
                        <RotateCcw size={14} className="mr-1" />
                        Reiniciar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BotDashboard;
