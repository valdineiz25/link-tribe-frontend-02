
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Star, ArrowRight, Play, Zap, Target, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeaturedProducts from '@/components/FeaturedProducts';
import TopAffiliates from '@/components/TopAffiliates';

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: 'Afiliados Ativos', value: '10,000+' },
    { icon: DollarSign, label: 'Comissões Pagas', value: 'R$ 2.5M' },
    { icon: Target, label: 'Produtos Disponíveis', value: '50,000+' },
    { icon: TrendingUp, label: 'Taxa de Conversão', value: '8.5%' }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Comissões Altas',
      description: 'Ganhe até 30% de comissão em cada venda realizada'
    },
    {
      icon: Target,
      title: 'Produtos Premium',
      description: 'Acesso exclusivo aos melhores produtos do mercado'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Avançado',
      description: 'Acompanhe suas vendas e otimize seus resultados'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star size={16} className="fill-current" />
            Plataforma #1 de Marketing de Afiliados
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transforme suas
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"> redes sociais </span>
            em uma máquina de vendas
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Conecte-se com as melhores marcas, promova produtos incríveis e ganhe comissões altas. 
            Tudo em uma plataforma moderna e intuitiva.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/register')}
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg"
            >
              Começar Agora
              <ArrowRight size={20} className="ml-2" />
            </Button>
            
            <Button 
              onClick={() => navigate('/presentation')}
              variant="outline" 
              size="lg" 
              className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg"
            >
              <Play size={20} className="mr-2" />
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full mb-4">
                  <stat.icon size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FeaturedProducts />
        </div>
      </section>

      {/* Top Affiliates Section */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <TopAffiliates />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher nossa plataforma?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos as melhores ferramentas e oportunidades para maximizar seus ganhos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full mb-6">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar sua jornada como afiliado?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Junte-se a milhares de criadores que já estão ganhando dinheiro com nossa plataforma
          </p>
          <Button 
            onClick={() => navigate('/register')}
            size="lg" 
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Criar Conta Gratuita
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
