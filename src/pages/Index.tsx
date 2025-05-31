
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Star, ArrowRight, Play, Zap, Target, DollarSign, MessageCircle, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeaturedProducts from '@/components/FeaturedProducts';
import TopAffiliates from '@/components/TopAffiliates';

const Index = () => {
  const navigate = useNavigate();

  const differentials = [
    {
      icon: MessageCircle,
      title: 'Conexão Real',
      description: 'Adicione amigos, compartilhe momentos e descubra produtos juntos',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: ShoppingBag,
      title: 'Descubra e Indique',
      description: 'Encontre marcas que combinam com você e recomende sem ser "vendedor"',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: DollarSign,
      title: 'Ganhe com Autenticidade',
      description: 'Monetize cada indicação que seus amigos realmente aproveitem',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { icon: Users, label: 'Afiliados Ativos', value: '10,000+' },
    { icon: DollarSign, label: 'Comissões Pagas', value: 'R$ 2.5M' },
    { icon: Target, label: 'Produtos Disponíveis', value: '50,000+' },
    { icon: TrendingUp, label: 'Taxa de Conversão', value: '8.5%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Hero Section with Video-like Background */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-orange-500/10 to-purple-600/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=800&fit=crop&blend=multiply&blend-alpha=20')] bg-cover bg-center opacity-30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-purple-800 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg border border-purple-200">
            <Star size={16} className="fill-current" />
            Social como deve ser: humano e recompensador
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Sua rede social
            </span>
            <br />
            <span className="text-gray-800">tem valor.</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-4xl mx-auto font-medium">
            Conecte-se. Recomende. Ganhe.
            <br />
            <span className="text-purple-600">Sem perder a autenticidade.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => navigate('/register')}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-1 transition-all duration-300 rounded-xl"
            >
              Comece Agora
              <ArrowRight size={24} className="ml-3" />
            </Button>
            
            <Button 
              onClick={() => navigate('/presentation')}
              variant="outline" 
              size="lg" 
              className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-10 py-4 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              <Play size={24} className="mr-3" />
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Diferenciais em Ícones Animados */}
      <section className="py-20 px-4 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Por que somos diferentes?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A primeira rede social pensada 100% para monetização autêntica
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {differentials.map((item, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 group cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-10 text-center relative">
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${item.color} text-white rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <item.icon size={40} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preview do Feed (Mockup de Celular) */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-100 via-orange-50 to-purple-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Como funciona na prática
            </h2>
            <p className="text-xl text-gray-600">
              Veja como suas recomendações se transformam em renda
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              {/* Phone Mockup */}
              <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-3xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Phone Header */}
                  <div className="h-6 bg-gray-100 flex items-center justify-center">
                    <div className="w-20 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                  
                  {/* Feed Content */}
                  <div className="p-4 space-y-4">
                    {/* Post Header */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        A
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Ana Costa</p>
                        <p className="text-xs text-gray-500">2h • Praia do Forte</p>
                      </div>
                    </div>
                    
                    {/* Post Image */}
                    <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-xl flex items-center justify-center text-white font-semibold">
                      🏖️ Foto na praia
                    </div>
                    
                    {/* Post Content */}
                    <div className="space-y-2">
                      <p className="text-sm">
                        Dia perfeito na praia! ☀️ Esse protetor solar que uso é incrível, 
                        não saiu nem na água 🌊
                      </p>
                      
                      {/* Product Tag */}
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <ShoppingBag size={16} className="text-orange-600" />
                          <span className="text-sm font-medium text-orange-800">
                            Protetor Solar FPS 60+ 🔗
                          </span>
                        </div>
                        <p className="text-xs text-orange-600 mt-1">
                          Ganhe 15% de comissão
                        </p>
                      </div>
                    </div>
                    
                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4">
                        <Heart size={20} className="text-red-500 fill-current" />
                        <MessageCircle size={20} className="text-gray-600" />
                        <Share2 size={20} className="text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-500">127 curtidas</span>
                    </div>
                    
                    {/* Comments */}
                    <div className="space-y-2 text-xs">
                      <p><span className="font-semibold">marina_silva:</span> Onde comprou? 😍</p>
                      <p><span className="font-semibold">ana_costa:</span> Te mando o link! Super recomendo 💕</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-orange-500 text-white rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  <stat.icon size={28} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
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

      {/* Chamada para Influenciadores */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
        
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Você já recomenda produtos todo dia.
            <br />
            <span className="text-orange-200">Aqui, você é pago por isso.</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 text-purple-100 font-light">
            Transforme suas recomendações naturais em uma fonte de renda consistente
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              onClick={() => navigate('/register')}
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-4 text-xl font-bold shadow-2xl hover:shadow-white/25 hover:-translate-y-1 transition-all duration-300 rounded-xl"
            >
              Começar Agora - GRÁTIS
              <ArrowRight size={24} className="ml-3" />
            </Button>
            
            <Button 
              onClick={() => navigate('/connect')}
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-4 text-xl font-semibold shadow-lg transition-all duration-300 rounded-xl"
            >
              Para Criadores →
            </Button>
          </div>
        </div>
      </section>

      {/* Top Affiliates Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <TopAffiliates />
        </div>
      </section>

      {/* Rodapé Minimalista */}
      <section className="py-12 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg"></div>
            <span className="text-white text-xl font-bold">AffiliateNet</span>
          </div>
          
          <p className="text-gray-400 text-lg font-light mb-6">
            Social como deve ser: humano e recompensador.
          </p>
          
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              Instagram
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              Twitter
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              LinkedIn
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
