
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
  Award,
  Globe,
  Shield,
  Smartphone
} from 'lucide-react';

const Connect: React.FC = () => {
  const networkFeatures = [
    {
      icon: Users,
      title: 'Comunidade Global',
      description: 'Conecte-se com mais de 50.000 afiliados ativos em todo o mundo',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop'
    },
    {
      icon: DollarSign,
      title: 'Monetização Inteligente',
      description: 'Ganhe até 70% de comissão nos produtos que promover',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avançado',
      description: 'Dashboards em tempo real para acompanhar performance e conversões',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Alcance Global',
      description: 'Promova produtos para audiências em mais de 50 países'
    },
    {
      icon: Shield,
      title: 'Pagamentos Seguros',
      description: 'Sistema de pagamentos criptografado e auditado'
    },
    {
      icon: Smartphone,
      title: 'App Mobile',
      description: 'Gerencie seus links e vendas direto do smartphone'
    },
    {
      icon: Target,
      title: 'Segmentação Precisa',
      description: 'IA que conecta você aos produtos ideais para sua audiência'
    },
    {
      icon: Award,
      title: 'Programa VIP',
      description: 'Benefícios exclusivos para top performers'
    },
    {
      icon: Video,
      title: 'Conteúdo Otimizado',
      description: 'Ferramentas para criar posts, stories e reels que convertem'
    }
  ];

  const testimonials = [
    {
      name: 'Marina Silva',
      role: 'Top Afiliada',
      earnings: 'R$ 25.000/mês',
      text: 'Em 6 meses consegui triplicar minha renda com as ferramentas da AffiliateNet!'
    },
    {
      name: 'Carlos Santos',
      role: 'Influenciador',
      earnings: 'R$ 18.000/mês',
      text: 'A plataforma mudou completamente como eu monetizo meu conteúdo.'
    },
    {
      name: 'Ana Costa',
      role: 'Content Creator',
      earnings: 'R$ 12.000/mês',
      text: 'Nunca imaginei que seria tão fácil ganhar dinheiro com afiliação!'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-6 py-2 mb-6">
              <Zap className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-orange-700 font-semibold">Conecte-se ao Futuro dos Afiliados</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Transforme Sua Paixão
              </span>
              <br />
              <span className="text-gray-800">em Renda Real</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              A AffiliateNet é mais que uma rede social - é sua plataforma completa para 
              construir um negócio de afiliados rentável e sustentável.
            </p>
            
            <Link to="/login">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 text-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Começar Agora Mesmo - GRÁTIS
                <ArrowRight size={24} className="ml-3" />
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500 mt-4">
              ✓ Sem taxa de adesão • ✓ Sem compromisso • ✓ Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Network Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Por que a AffiliateNet é Diferente?
            </h2>
            <p className="text-xl text-gray-600">
              A única rede social pensada 100% para afiliados
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {networkFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 -mt-8 border-4 border-white shadow-lg">
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

      {/* Benefits Grid */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tudo que Você Precisa em Um Só Lugar
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-gray-800">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Histórias de Sucesso Reais
            </h2>
            <p className="text-xl text-gray-600">
              Veja como nossa comunidade está transformando vidas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 mb-3">
                    {testimonial.earnings}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Números que Impressionam
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-lg opacity-90">Afiliados Ativos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">R$ 5M+</div>
              <div className="text-lg opacity-90">Comissões Pagas</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15K+</div>
              <div className="text-lg opacity-90">Produtos Disponíveis</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
              <div className="text-lg opacity-90">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Sua Jornada de Sucesso Começa Agora
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Junte-se a milhares de pessoas que já descobriram como transformar 
            sua presença digital em uma fonte de renda consistente
          </p>
          
          <div className="space-y-4">
            <Link to="/login">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-4 text-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Começar Agora Mesmo - GRÁTIS
                <Star size={24} className="ml-3" />
              </Button>
            </Link>
            
            <p className="text-sm text-gray-400">
              Cadastro grátis • Sem cartão de crédito • Suporte 24/7
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Connect;
