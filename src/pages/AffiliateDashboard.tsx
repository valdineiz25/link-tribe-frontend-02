
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnalyticsChart from '@/components/AnalyticsChart';
import { useUserRole } from '@/hooks/useUserRole';
import { useStores } from '@/hooks/useStores';
import { 
  Plus, 
  TrendingUp, 
  Store, 
  DollarSign, 
  Users, 
  BarChart3,
  ShoppingBag,
  Eye,
  MousePointer
} from 'lucide-react';

const AffiliateDashboard: React.FC = () => {
  const { affiliateStats } = useUserRole();
  const { stores } = useStores();

  // Dados simulados para o gráfico
  const chartData = [
    { name: 'Seg', views: 400, clicks: 24, earnings: 80 },
    { name: 'Ter', views: 300, clicks: 13, earnings: 45 },
    { name: 'Qua', views: 200, clicks: 98, earnings: 320 },
    { name: 'Qui', views: 278, clicks: 39, earnings: 130 },
    { name: 'Sex', views: 189, clicks: 48, earnings: 180 },
    { name: 'Sáb', views: 239, clicks: 38, earnings: 150 },
    { name: 'Dom', views: 349, clicks: 43, earnings: 170 }
  ];

  const analyticsData = {
    totalViews: 5240,
    linkClicks: 328,
    conversionRate: 6.3,
    earnings: affiliateStats?.monthlyCommissions || 1250
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header do Afiliado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Dashboard do Afiliado
          </h1>
          <p className="text-gray-600 mt-2">Gerencie suas vendas e comissões</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/create-post">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Plus size={20} className="mr-2" />
              Novo Post
            </Button>
          </Link>
          <Link to="/add-product">
            <Button variant="outline">
              <ShoppingBag size={20} className="mr-2" />
              Adicionar Produto
            </Button>
          </Link>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affiliateStats?.totalProducts || 0}</div>
            <p className="text-xs text-muted-foreground">produtos publicados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comissões do Mês</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {affiliateStats?.monthlyCommissions.toFixed(2) || '0,00'}</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitas Hoje</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affiliateStats?.todayVisits || 0}</div>
            <p className="text-xs text-muted-foreground">visitantes únicos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minhas Lojas</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stores.length}</div>
            <p className="text-xs text-muted-foreground">lojas ativas</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Performance */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="text-purple-600" size={24} />
          <h2 className="text-2xl font-semibold">Performance da Semana</h2>
        </div>
        <AnalyticsChart data={analyticsData} chartData={chartData} />
      </section>

      {/* Produtos Mais Vendidos */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Top Produtos</h2>
          <Link to="/marketplace">
            <Button variant="outline">Ver Todos</Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {affiliateStats?.topProducts?.map((product, index) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-purple-600 text-white">#{index + 1}</Badge>
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MousePointer size={16} />
                          <span>{product.clicks} cliques</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {product.clicks} cliques
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )) || (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">Nenhum produto publicado ainda</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Ações Rápidas para Afiliados */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/create-store">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Store size={20} className="text-purple-600" />
                  <span>Criar Nova Loja</span>
                </CardTitle>
                <CardDescription>Monte sua loja virtual personalizada</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          
          <Link to="/marketplace">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <ShoppingBag size={20} className="text-blue-600" />
                  <span>Explorar Produtos</span>
                </CardTitle>
                <CardDescription>Encontre novos produtos para promover</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          
          <Link to="/groups">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Users size={20} className="text-green-600" />
                  <span>Grupos de Afiliados</span>
                </CardTitle>
                <CardDescription>Conecte-se com outros vendedores</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AffiliateDashboard;
