
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Target, 
  Heart, 
  Zap,
  ArrowLeft
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Paixão por Conectar',
      description: 'Acreditamos no poder das conexões genuínas entre pessoas e marcas'
    },
    {
      icon: Target,
      title: 'Foco no Resultado',
      description: 'Nosso compromisso é ajudar você a alcançar seus objetivos financeiros'
    },
    {
      icon: Zap,
      title: 'Inovação Constante',
      description: 'Sempre buscamos novas formas de melhorar a experiência do usuário'
    },
    {
      icon: Users,
      title: 'Comunidade Forte',
      description: 'Construímos uma rede de apoio mútuo entre todos os nossos membros'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft size={20} className="mr-2" />
              Voltar ao início
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sobre a <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">AffiliateNet</span>
          </h1>
        </div>

        {/* Nossa História */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Nossa História</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                A AffiliateNet nasceu da visão de democratizar o marketing de afiliados, criando uma plataforma 
                onde qualquer pessoa pode monetizar suas recomendações e conexões sociais de forma autêntica e transparente.
              </p>
              <p className="mb-4">
                Fundada em 2024, nossa missão é conectar criadores de conteúdo, influenciadores e consumidores 
                com as melhores marcas e produtos do mercado, criando um ecossistema win-win para todos os envolvidos.
              </p>
              <p>
                Hoje, já são mais de 50.000 afiliados ativos em nossa plataforma, gerando milhões em vendas 
                e comissões para nossa comunidade.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Nossos Valores */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nossos Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} className="text-white" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Nossa Equipe */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Nossa Equipe</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p className="mb-4">
                Somos uma equipe apaixonada por tecnologia e marketing digital, com vasta experiência 
                em e-commerce, redes sociais e desenvolvimento de plataformas digitais.
              </p>
              <p>
                Nossa diversidade de backgrounds nos permite entender as necessidades tanto dos 
                afiliados quanto das marcas parceiras, criando soluções inovadoras para ambos os lados.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Quer fazer parte da nossa história?</h2>
              <p className="text-xl mb-8 opacity-90">
                Junte-se a milhares de pessoas que já estão transformando suas conexões em oportunidades
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  Começar Agora
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;
