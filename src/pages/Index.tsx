
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Star, ArrowRight, Play, Zap, Target, DollarSign, MessageCircle, ShoppingBag, Heart, Share2, Check, Crown, Shield, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeaturedProducts from '@/components/FeaturedProducts';
import TopAffiliates from '@/components/TopAffiliates';

const Index = () => {
  const navigate = useNavigate();

  const differentials = [
    {
      icon: Check,
      title: 'Links Ilimitados',
      description: 'Poste quantos links de afiliados quiser, sem medo de ter conta bloqueada',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: DollarSign,
      title: 'Zero Taxas Ocultas',
      description: 'Nada de pagar para postar ou impulsionar suas recomendações',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Grandes Lojas Integradas',
      description: 'Amazon, AliExpress, Shopee, Mercado Livre e mais, tudo em um só lugar',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Target,
      title: 'Alcance Orgânico',
      description: 'Conecte-se com compradores reais que procuram ofertas',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Rocket,
      title: 'Monetização Instantânea',
      description: 'Ganhe comissões diretas sem intermediários complicados',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Cadastre-se',
      description: 'Gratuito e rápido'
    },
    {
      number: '2',
      title: 'Escolha seus produtos',
      description: 'Links de afiliados das maiores lojas'
    },
    {
      number: '3',
      title: 'Poste e Divulgue',
      description: 'Sem limites, sem censura'
    },
    {
      number: '4',
      title: 'Ganhe Dinheiro',
      description: 'Suas comissões direto na sua conta'
    }
  ];

  const stats = [
    { icon: Users, label: 'Afiliados Ativos', value: '50,000+' },
    { icon: DollarSign, label: 'Comissões Pagas', value: 'R$ 25M' },
    { icon: Target, label: 'Produtos Disponíveis', value: '100,000+' },
    { icon: TrendingUp, label: 'Taxa de Conversão', value: '12.5%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Hero Section - Focado 100% em Afiliados */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        {/* Background com Dashboard de Afiliado */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-green-500/30 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&blend=multiply&blend-alpha=40')] bg-cover bg-center opacity-20"></div>
        
        {/* Elementos Flutuantes - Dinheiro e Gráficos */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-30 animate-bounce flex items-center justify-center text-2xl">💰</div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-40 animate-pulse flex items-center justify-center text-lg">📈</div>
        <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-35 animate-bounce flex items-center justify-center text-sm" style={{ animationDelay: '1s' }}>🚀</div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-bold mb-8 shadow-2xl border-2 border-cyan-400 animate-pulse">
            <Crown size={24} className="text-yellow-400" />
            A ÚNICA Rede Social Feita para Afiliados!
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
              AffiliateNet
            </span>
          </h1>
          
          <p className="text-3xl md:text-4xl text-cyan-100 mb-8 max-w-5xl mx-auto font-bold leading-tight">
            Divulgue seus links livremente,
            <br />
            <span className="text-green-400">sem bloqueios, sem banimentos</span>
            <br />
            <span className="text-yellow-400">e sem pagar fortunas por tráfego!</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              onClick={() => navigate('/register')}
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-16 py-6 text-2xl font-black shadow-2xl hover:shadow-green-500/50 hover:-translate-y-2 transition-all duration-300 rounded-2xl border-2 border-green-400 animate-pulse"
            >
              CADASTRE-SE AGORA!
              <Rocket size={28} className="ml-3" />
            </Button>
            
            <Button 
              onClick={() => navigate('/presentation')}
              variant="outline" 
              size="lg" 
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-12 py-6 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-black/50"
            >
              <Play size={24} className="mr-3" />
              Ver Como Funciona
            </Button>
          </div>

          {/* Stats Impressionantes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-black/50 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl mb-3">
                  <stat.icon size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-black text-cyan-400 mb-1">{stat.value}</div>
                <div className="text-cyan-100 font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais - Direto ao Ponto */}
      <section className="py-20 px-4 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Por que AffiliateNet?
            </h2>
            <p className="text-2xl text-cyan-200 max-w-3xl mx-auto font-bold">
              Finalmente uma plataforma que ENTENDE os afiliados!
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {differentials.map((item, index) => (
              <Card 
                key={index} 
                className="border-2 border-cyan-500/30 shadow-2xl bg-gradient-to-br from-gray-900 to-black hover:shadow-cyan-500/50 hover:-translate-y-4 transition-all duration-500 group cursor-pointer overflow-hidden"
              >
                <CardContent className="p-8 text-center relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${item.color} text-white rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <item.icon size={32} />
                  </div>
                  
                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona - Passo a Passo */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 via-cyan-900 to-green-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Como Funciona?
            </h2>
            <p className="text-2xl text-cyan-200 font-bold">
              4 passos simples para começar a GANHAR AGORA!
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-black text-3xl font-black shadow-2xl">
                  {step.number}
                </div>
                <h3 className="text-2xl font-black mb-4 text-white">{step.title}</h3>
                <p className="text-cyan-200 leading-relaxed font-medium text-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimento - Prova Social */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-green-500 rounded-3xl p-12 shadow-2xl">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={32} className="text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-2xl md:text-3xl text-white mb-8 font-bold italic">
              "Finalmente uma rede social que entende os afiliados! 
              Minhas vendas aumentaram <span className="text-green-400 font-black">300%</span> sem medo de banimento!"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-black text-xl">
                JS
              </div>
              <div className="text-left">
                <div className="text-white font-black text-xl">João Silva</div>
                <div className="text-green-400 font-bold">Afiliado Top 1% 🏆</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mockup do Feed */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Veja Como Será Seu Feed
            </h2>
            <p className="text-2xl text-cyan-200">
              Links de afiliados livres, engajamento real, lucro garantido!
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Mockup */}
              <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-3xl border-4 border-cyan-500">
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                  {/* Phone Header */}
                  <div className="h-6 bg-gray-800 flex items-center justify-center">
                    <div className="w-20 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                  
                  {/* Feed Content */}
                  <div className="p-4 space-y-4 text-white">
                    {/* Post Header */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        JS
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">João - Afiliado Top</p>
                        <p className="text-xs text-gray-400">2h • 🔥 VENDENDO MUITO!</p>
                      </div>
                    </div>
                    
                    {/* Post Content */}
                    <div className="space-y-3">
                      <p className="text-sm text-white">
                        🚨 OFERTA RELÂMPAGO! Fone Bluetooth que uso todos os dias 
                        com 70% OFF! Corram! 🏃‍♂️💨
                      </p>
                      
                      {/* Product Link - Destaque */}
                      <div className="bg-gradient-to-r from-green-600 to-emerald-600 border-2 border-green-400 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <ShoppingBag size={16} className="text-white" />
                          <span className="text-sm font-bold text-white">
                            Fone JBL Bluetooth - Link Afiliado 🔗
                          </span>
                        </div>
                        <p className="text-xs text-green-200 mb-2">
                          💰 Comissão: R$ 45,00 por venda
                        </p>
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-sm py-2">
                          COMPRAR AGORA - R$ 89,90
                        </Button>
                      </div>
                    </div>
                    
                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart size={18} className="text-red-500 fill-current" />
                          <span className="text-xs text-white">234</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle size={18} className="text-cyan-400" />
                          <span className="text-xs text-white">45</span>
                        </div>
                        <Share2 size={18} className="text-green-400" />
                      </div>
                      <span className="text-xs text-green-400 font-bold">🔥 12 vendas hoje!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <FeaturedProducts />
        </div>
      </section>

      {/* CTA Final - Urgência */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
        
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            O Futuro dos Afiliados.
            <br />
            <span className="text-yellow-300">Comece HOJE!</span>
          </h2>
          
          <p className="text-2xl md:text-3xl mb-10 text-green-100 font-bold">
            Não perca mais tempo com plataformas que te limitam!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={() => navigate('/register')}
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 px-12 py-6 text-2xl font-black shadow-2xl hover:shadow-white/25 hover:-translate-y-2 transition-all duration-300 rounded-2xl"
            >
              COMECE AGORA - GRÁTIS! 🚀
              <ArrowRight size={28} className="ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top Affiliates Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <TopAffiliates />
        </div>
      </section>

      {/* Rodapé Impactante */}
      <section className="py-12 px-4 bg-gradient-to-r from-gray-900 to-black border-t border-cyan-500">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-green-500 rounded-xl flex items-center justify-center">
              <Crown size={24} className="text-white" />
            </div>
            <span className="text-white text-2xl font-black">AffiliateNet</span>
          </div>
          
          <p className="text-cyan-400 text-xl font-bold mb-6">
            💡 AffiliateNet – O Futuro dos Afiliados. Comece Hoje!
          </p>
          
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400 font-bold">
              Instagram
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400 font-bold">
              YouTube
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400 font-bold">
              Telegram
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
