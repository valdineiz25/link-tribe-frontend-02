
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
  BarChart3,
  Heart,
  Camera,
  Share2
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
    <div className="min-h-screen bg-white">
      {/* Facebook-style header */}
      <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
      
      {/* Hero Section - Instagram/Facebook style */}
      <section className="relative py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Affiliate<span className="text-blue-600">Net</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Conecte-se com amigos, descubra produtos incríveis e monetize suas recomendações. 
                A rede social que transforma suas conexões em oportunidades.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg rounded-lg shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                  >
                    Criar conta
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg font-semibold rounded-lg w-full sm:w-auto"
                  >
                    Entrar
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    +99
                  </div>
                </div>
                <span>Mais de 50.000 pessoas já se conectaram</span>
              </div>
            </div>

            {/* Right side - Mock phone interface */}
            <div className="relative">
              <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl max-w-sm mx-auto">
                <div className="bg-white rounded-2xl overflow-hidden">
                  {/* Phone header */}
                  <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900">AffiliateNet</div>
                    <div className="flex space-x-2">
                      <Heart size={20} className="text-gray-400" />
                      <MessageCircle size={20} className="text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Mock post */}
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <div>
                        <div className="font-semibold text-sm">Maria Silva</div>
                        <div className="text-xs text-gray-500">2 horas atrás</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-800 mb-3">
                      Acabei de descobrir este produto incrível! 💄✨
                    </p>
                    
                    <div className="bg-gray-100 rounded-lg h-32 mb-3 flex items-center justify-center">
                      <Camera size={24} className="text-gray-400" />
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <div className="font-semibold text-sm text-blue-900">Kit Maquiagem Pro</div>
                      <div className="text-sm text-blue-700">R$ 299,90 → R$ 199,90</div>
                    </div>
                    
                    <div className="flex items-center justify-between text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart size={16} />
                          <span className="text-sm">124</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={16} />
                          <span className="text-sm">8</span>
                        </div>
                      </div>
                      <Share2 size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Facebook style */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Instagram style cards */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra, conecte-se e monetize com a comunidade de afiliados que mais cresce no Brasil
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} className="text-blue-600" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works - Instagram stories style */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-600">
              Simples como suas redes sociais favoritas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">1. Conecte-se</h3>
              <p className="text-gray-600">
                Crie seu perfil e encontre produtos incríveis para compartilhar
              </p>
            </div>

            <div className="text-center bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">2. Compartilhe</h3>
              <p className="text-gray-600">
                Poste sobre produtos que você recomenda para seus amigos
              </p>
            </div>

            <div className="text-center bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">3. Ganhe</h3>
              <p className="text-gray-600">
                Receba comissões por cada venda através das suas recomendações
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Facebook style */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar a ganhar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de pessoas que já estão monetizando suas conexões
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Criar Conta Gratuita
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer - Minimal like Instagram */}
      <footer className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              Affiliate<span className="text-blue-600">Net</span>
            </div>
            <p className="text-gray-500">
              Conectando pessoas e oportunidades
            </p>
          </div>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Sobre</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Ajuda</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Termos</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacidade</a>
          </div>
          <div className="text-center text-xs text-gray-400 mt-6">
            © 2024 AffiliateNet. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
