
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnalyticsChart from '@/components/AnalyticsChart';
import { Plus, TrendingUp, Eye, MousePointer, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Dados simulados
  const analyticsData = {
    totalViews: 5240,
    linkClicks: 328,
    conversionRate: 6.3,
    earnings: 1250
  };

  const chartData = [
    { name: 'Seg', views: 400, clicks: 24, earnings: 80 },
    { name: 'Ter', views: 300, clicks: 13, earnings: 45 },
    { name: 'Qua', views: 200, clicks: 98, earnings: 320 },
    { name: 'Qui', views: 278, clicks: 39, earnings: 130 },
    { name: 'Sex', views: 189, clicks: 48, earnings: 180 },
    { name: 'Sáb', views: 239, clicks: 38, earnings: 150 },
    { name: 'Dom', views: 349, clicks: 43, earnings: 170 }
  ];

  const recentPosts = [
    {
      id: 1,
      title: 'Smartphone XYZ com 50% de desconto',
      category: 'Eletrônicos',
      views: 1250,
      clicks: 45,
      earnings: 125.50
    },
    {
      id: 2,
      title: 'Curso de Marketing Digital',
      category: 'Educação',
      views: 890,
      clicks: 32,
      earnings: 89.90
    },
    {
      id: 3,
      title: 'Kit de Maquiagem Profissional',
      category: 'Beleza',
      views: 756,
      clicks: 28,
      earnings: 67.80
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Meu Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Acompanhe sua performance como afiliado</p>
        </div>
        <Link to="/">
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            <Plus size={20} className="mr-2" />
            Novo Post
          </Button>
        </Link>
      </div>

      {/* Analytics Section */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="text-orange-600" size={24} />
          <h2 className="text-2xl font-semibold">Estatísticas</h2>
        </div>
        <AnalyticsChart data={analyticsData} chartData={chartData} />
      </section>

      {/* Recent Posts Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Posts Recentes</h2>
          <Link to="/">
            <Button variant="outline">Ver Todos</Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {recentPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.category}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{post.views} visualizações</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MousePointer size={16} />
                        <span>{post.clicks} cliques</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign size={16} />
                        <span>R$ {post.earnings.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      R$ {post.earnings.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {((post.clicks / post.views) * 100).toFixed(1)}% CTR
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Ver Marketplace</CardTitle>
              <CardDescription>Encontre novos produtos para promover</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Participar de Grupos</CardTitle>
              <CardDescription>Conecte-se com outros afiliados</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">Configurações</CardTitle>
              <CardDescription>Gerencie sua conta e preferências</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
