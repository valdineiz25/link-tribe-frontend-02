
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  TrendingUp, 
  ShoppingBag, 
  MessageCircle, 
  Video,
  BarChart3,
  Star,
  ArrowRight,
  Zap,
  DollarSign,
  Target,
  Award
} from 'lucide-react';

const Presentation: React.FC = () => {
  const features = [
    {
      icon: DollarSign,
      title: 'Monetização Inteligente',
      description: 'Transforme sua audiência em renda com ferramentas avançadas de afiliação'
    },
    {
      icon: Users,
      title: 'Comunidade Engajada',
      description: 'Conecte-se com milhares de criadores e marcas em um só lugar'
    },
    {
      icon: BarChart3,
      title: 'Analytics Poderoso',
      description: 'Monitore performance, conversões e ganhos em tempo real'
    },
    {
      icon: Target,
      title: 'Público Qualificado',
      description: 'Alcance exatamente quem precisa dos produtos que você promove'
    },
    {
      icon: Video,
      title: 'Conteúdo Dinâmico',
      description: 'Posts, reels e stories otimizados para conversão'
    },
    {
      icon: Award,
      title: 'Programa de Recompensas',
      description: 'Ganhe pontos e benefícios exclusivos por performance'
    }
  ];

  const benefits = [
    {
      number: '01',
      title: 'Cadastro Simples',
      description: 'Crie sua conta em minutos e comece a ganhar hoje mesmo'
    },
    {
      number: '02',
      title: 'Produtos Verificados',
      description: 'Apenas produtos de qualidade com comissões garantidas'
    },
    {
      number: '03',
      title: 'Suporte 24/7',
      description: 'Equipe especializada para ajudar no seu crescimento'
    },
    {
      number: '04',
      title: 'Pagamentos Rápidos',
      description: 'Receba suas comissões de forma ágil e segura'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-6 py-2 mb-8">
              <Zap className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-orange-700 font-semibold">A Revolução do Marketing Digital</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                AffiliateNet
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              A primeira rede social dedicada exclusivamente ao marketing de afiliados. 
              Conecte, promova e monetize como nunca antes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Começar Agora
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold"
                >
                  Fazer Login
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-gray-600 mt-2 font-medium">Criadores Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  R$ 5M+
                </div>
                <div className="text-gray-600 mt-2 font-medium">Em Comissões</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  15K+
                </div>
                <div className="text-gray-600 mt-2 font-medium">Produtos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  99%
                </div>
                <div className="text-gray-600 mt-2 font-medium">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
              Recursos que fazem a diferença
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ferramentas profissionais para maximizar seus resultados e acelerar seu crescimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} className="text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
              Por que escolher a AffiliateNet?
            </h2>
            <p className="text-xl text-gray-600">
              Vantagens exclusivas para impulsionar seu sucesso
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {benefit.number}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para transformar sua paixão em lucro?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
            Junte-se a milhares de criadores que já descobriram o poder da AffiliateNet
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 text-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Começar Gratuitamente
              <Star size={24} className="ml-3" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
              AffiliateNet
            </div>
            <p className="text-gray-400 text-lg mb-8">
              Conectando criadores, marcas e resultados extraordinários
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Carreiras</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-orange-400">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AffiliateNet. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Presentation;
