
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useConsumer } from '@/hooks/useConsumer';
import { 
  ShoppingBag, 
  Heart, 
  TrendingDown, 
  Star,
  Gift,
  CreditCard,
  Package,
  Bell
} from 'lucide-react';

const ConsumerDashboard: React.FC = () => {
  const { consumerProfile, wishlist } = useConsumer();

  // Dados simulados para o consumidor
  const recentPurchases = [
    { id: 1, name: 'Smartphone Galaxy', price: 899, date: '2024-05-28', status: 'Entregue' },
    { id: 2, name: 'Fone Bluetooth', price: 79, date: '2024-05-25', status: 'A caminho' },
    { id: 3, name: 'Smartwatch Pro', price: 299, date: '2024-05-20', status: 'Entregue' }
  ];

  const flashOffers = [
    { name: 'Notebook Gamer', discount: 25, price: 2199, oldPrice: 2899 },
    { name: 'Smart TV 55"', discount: 30, price: 1399, oldPrice: 1999 },
    { name: 'Kit Maquiagem', discount: 40, price: 89, oldPrice: 149 }
  ];

  const personalizedOffers = [
    { name: 'Tênis Running', price: 159, category: 'Esportes', rating: 4.8 },
    { name: 'Livro Marketing', price: 45, category: 'Educação', rating: 4.9 },
    { name: 'Suplemento Whey', price: 89, category: 'Saúde', rating: 4.7 }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header do Consumidor */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meu Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Suas compras, ofertas e economia</p>
        </div>
        <Link to="/marketplace">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <ShoppingBag size={20} className="mr-2" />
            Explorar Ofertas
          </Button>
        </Link>
      </div>

      {/* Cards de Estatísticas do Consumidor */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lista de Desejos</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wishlist.length}</div>
            <p className="text-xs text-muted-foreground">produtos favoritados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Economia Total</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 247,50</div>
            <p className="text-xs text-muted-foreground">economizado este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compras Recentes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentPurchases.length}</div>
            <p className="text-xs text-muted-foreground">pedidos este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pontos de Fidelidade</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.250</div>
            <p className="text-xs text-muted-foreground">pontos acumulados</p>
          </CardContent>
        </Card>
      </div>

      {/* Ofertas Relâmpago */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Gift className="text-red-500" size={24} />
            <h2 className="text-2xl font-semibold">Ofertas Relâmpago</h2>
            <Badge className="bg-red-500 text-white animate-pulse">HOT</Badge>
          </div>
          <Link to="/feed">
            <Button variant="outline">Ver Todas</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {flashOffers.map((offer, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-red-200">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{offer.name}</h3>
                    <Badge className="bg-red-500 text-white">-{offer.discount}%</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-600">R$ {offer.price}</div>
                    <div className="text-sm text-gray-500 line-through">R$ {offer.oldPrice}</div>
                  </div>
                  <Button size="sm" className="w-full bg-red-500 hover:bg-red-600">
                    Comprar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Compras Recentes */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Suas Compras Recentes</h2>
          <Button variant="outline">Ver Histórico</Button>
        </div>

        <div className="space-y-4">
          {recentPurchases.map((purchase) => (
            <Card key={purchase.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{purchase.name}</h3>
                      <p className="text-sm text-gray-500">Comprado em {purchase.date}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold">R$ {purchase.price}</div>
                    <Badge 
                      className={purchase.status === 'Entregue' ? 'bg-green-500' : 'bg-yellow-500'}
                    >
                      {purchase.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Ofertas Personalizadas */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <Star className="text-yellow-500" size={24} />
          <h2 className="text-2xl font-semibold">Recomendado para Você</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personalizedOffers.map((offer, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{offer.name}</h3>
                    <p className="text-sm text-gray-500">{offer.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-medium">{offer.rating}</span>
                  </div>
                  <div className="text-xl font-bold text-blue-600">R$ {offer.price}</div>
                  <Button size="sm" className="w-full" variant="outline">
                    Ver Produto
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Ações Rápidas para Consumidores */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Heart size={20} className="text-red-500" />
                <span>Lista de Desejos</span>
              </CardTitle>
              <CardDescription>Veja produtos que você salvou</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <CreditCard size={20} className="text-green-600" />
                <span>Formas de Pagamento</span>
              </CardTitle>
              <CardDescription>Gerencie seus cartões e PIX</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Bell size={20} className="text-blue-600" />
                <span>Alertas de Preço</span>
              </CardTitle>
              <CardDescription>Configure notificações de desconto</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ConsumerDashboard;
