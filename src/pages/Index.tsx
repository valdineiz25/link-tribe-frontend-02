
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePartners } from '@/hooks/usePartners';
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
  Share2,
  Loader2
} from 'lucide-react';

const Index: React.FC = () => {
  const { stores, loading: storesLoading } = usePartners();

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-gray-50">
      {/* Professional gradient header */}
      <div className="w-full h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>
      
      {/* Hero Section - Professional style */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-yellow-400/5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-left">
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                Affiliate<span className="text-yellow-400">Net</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Conecte-se com amigos, descubra produtos incríveis e monetize suas recomendações. 
                A rede social que transforma suas conexões em oportunidades.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="btn-professional px-8 py-4 text-lg rounded-xl shadow-xl w-full sm:w-auto font-semibold"
                  >
                    Criar conta
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="btn-professional-outline px-8 py-4 text-lg font-semibold rounded-xl w-full sm:w-auto"
                  >
                    Entrar
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full border-3 border-black"></div>
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full border-3 border-black"></div>
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full border-3 border-black"></div>
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full border-3 border-black flex items-center justify-center text-yellow-400 text-sm font-bold">
                    +99
                  </div>
                </div>
                <span>Mais de 50.000 pessoas já se conectaram</span>
              </div>
            </div>

            {/* Right side - Mock phone interface */}
            <div className="relative">
              <div className="bg-gray-900 rounded-3xl p-3 shadow-2xl max-w-sm mx-auto border border-yellow-500/20">
                <div className="bg-white rounded-2xl overflow-hidden">
                  {/* Phone header */}
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-4 flex items-center justify-between">
                    <div className="text-lg font-bold text-black">AffiliateNet</div>
                    <div className="flex space-x-2">
                      <Heart size={20} className="text-black" />
                      <MessageCircle size={20} className="text-black" />
                    </div>
                  </div>
                  
                  {/* Mock post */}
                  <div className="p-4 bg-gray-50">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full border-2 border-gray-800"></div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">Maria Silva</div>
                        <div className="text-xs text-gray-600">2 horas atrás</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-800 mb-3">
                      Acabei de descobrir este produto incrível! 💄✨
                    </p>
                    
                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg h-32 mb-3 flex items-center justify-center border border-yellow-300">
                      <Camera size={24} className="text-yellow-600" />
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-3 mb-3">
                      <div className="font-semibold text-sm text-black">Kit Maquiagem Pro</div>
                      <div className="text-sm text-gray-800">R$ 299,90 → R$ 199,90</div>
                    </div>
                    
                    <div className="flex items-center justify-between text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart size={16} className="text-yellow-600" />
                          <span className="text-sm">124</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={16} className="text-yellow-600" />
                          <span className="text-sm">8</span>
                        </div>
                      </div>
                      <Share2 size={16} className="text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Professional style */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-black/90 rounded-xl p-8 shadow-xl border border-yellow-500/20">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Stores Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Parceiros de <span className="text-yellow-400">Confiança</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Trabalhe com as maiores e mais confiáveis lojas do Brasil e do mundo
            </p>
          </div>

          {storesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
              <span className="ml-2 text-gray-300">Carregando lojas parceiras...</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
                {stores.map((store) => (
                  <div 
                    key={store.id} 
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:border-yellow-400/40"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-white rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <img 
                          src={store.logo} 
                          alt={store.alt}
                          className="w-12 h-8 object-contain transition-all duration-300"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/48x32?text=' + store.name.charAt(0);
                          }}
                        />
                      </div>
                      <div className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                        {store.name}
                      </div>
                      <div className="text-xs text-yellow-400 font-semibold mt-1">
                        {store.commission}% comissão
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-sm text-gray-400">
                  E mais de <span className="font-semibold text-yellow-400">500+ lojas parceiras</span> esperando por você
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-yellow-50 via-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tudo que você precisa em <span className="text-yellow-600">um só lugar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra, conecte-se e monetize com a comunidade de afiliados que mais cresce no Brasil
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border border-yellow-200 shadow-xl hover:shadow-2xl transition-all bg-white hover:border-yellow-400 group">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon size={28} className="text-black" />
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

      {/* How it Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Como <span className="text-yellow-400">funciona?</span>
            </h2>
            <p className="text-xl text-gray-300">
              Simples como suas redes sociais favoritas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl border border-yellow-500/20">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">1. Conecte-se</h3>
              <p className="text-gray-300">
                Crie seu perfil e encontre produtos incríveis para compartilhar
              </p>
            </div>

            <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl border border-yellow-500/20">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">2. Compartilhe</h3>
              <p className="text-gray-300">
                Poste sobre produtos que você recomenda para seus amigos
              </p>
            </div>

            <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl border border-yellow-500/20">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">3. Ganhe</h3>
              <p className="text-gray-300">
                Receba comissões por cada venda através das suas recomendações
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center text-black">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para começar a ganhar?
          </h2>
          <p className="text-xl mb-8 text-gray-800">
            Junte-se a milhares de pessoas que já estão monetizando suas conexões
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="bg-black text-yellow-400 hover:bg-gray-800 px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all rounded-xl border-2 border-black"
            >
              Criar Conta Gratuita
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-yellow-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-white mb-2">
              Affiliate<span className="text-yellow-400">Net</span>
            </div>
            <p className="text-gray-400">
              Conectando pessoas e oportunidades
            </p>
          </div>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-yellow-400 transition-colors">Sobre</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Ajuda</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Termos</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacidade</a>
          </div>
          <div className="text-center text-xs text-gray-500 mt-6">
            © 2024 AffiliateNet. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
