
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Zap, 
  Star, 
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  BarChart3
} from 'lucide-react';

const Index: React.FC = () => {
  const features = [
    {
      icon: DollarSign,
      title: 'Monetize Seu Conteúdo',
      description: 'Ganhe comissões reais promovendo produtos que você ama'
    },
    {
      icon: Users,
      title: 'Comunidade Ativa',
      description: 'Conecte-se com milhares de afiliados e influenciadores'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Avançado',
      description: 'Acompanhe suas vendas e performance em tempo real'
    },
    {
      icon: Zap,
      title: 'Crescimento Acelerado',
      description: 'Ferramentas poderosas para impulsionar seus resultados'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Afiliados Ativos' },
    { value: 'R$ 2M+', label: 'Em Comissões Pagas' },
    { value: '10K+', label: 'Produtos Disponíveis' },
    { value: '98%', label: 'Satisfação dos Usuários' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100">
      {/* Faixa preta no topo */}
      <div className="w-full h-2 bg-gradient-to-r from-black via-gray-900 to-black"></div>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
              AffiliateNet
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-3xl mx-auto">
              A primeira rede social focada em marketing de afiliados. 
              Conecte-se, promova e lucre com uma comunidade que entende seu negócio.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Começar Gratuitamente
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-amber-500 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Já tenho conta
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-700 mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-white via-amber-50 to-yellow-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Por que escolher a AffiliateNet?
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Tudo que você precisa para crescer como afiliado em um só lugar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-amber-50 hover:scale-105">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon size={28} className="text-black" />
                    </div>
                    <CardTitle className="text-lg text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-700">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-700">
              Simples, rápido e eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">1. Cadastre-se</h3>
              <p className="text-gray-700">
                Crie sua conta gratuita e configure seu perfil de afiliado
              </p>
            </div>

            <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ShoppingBag size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">2. Escolha Produtos</h3>
              <p className="text-gray-700">
                Navegue pelo marketplace e encontre produtos para promover
              </p>
            </div>

            <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BarChart3 size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">3. Lucre</h3>
              <p className="text-gray-700">
                Compartilhe, venda e acompanhe seus ganhos em tempo real
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center text-black">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar a lucrar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de afiliados que já estão monetizando seu conteúdo
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-black text-amber-400 hover:bg-gray-900 hover:text-yellow-300 px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              Criar Conta Gratuita
              <Star size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-r from-black via-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            AffiliateNet
          </div>
          <p className="text-gray-400 mb-6">
            A rede social dos afiliados de sucesso
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-amber-400 transition-colors">Sobre</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Termos</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
