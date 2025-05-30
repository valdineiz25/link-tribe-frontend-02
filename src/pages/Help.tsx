
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  ArrowLeft,
  HelpCircle,
  DollarSign,
  Users,
  ShoppingBag
} from 'lucide-react';

const Help: React.FC = () => {
  const faqs = [
    {
      question: 'Como funciona o sistema de comissões?',
      answer: 'Você ganha uma porcentagem sobre cada venda realizada através do seu link de afiliado. As comissões variam de acordo com o produto e loja parceira.'
    },
    {
      question: 'Quando recebo meus pagamentos?',
      answer: 'Os pagamentos são processados mensalmente, sempre no dia 15 do mês seguinte ao fechamento do período de vendas.'
    },
    {
      question: 'Como posso acompanhar meus ganhos?',
      answer: 'No seu dashboard você tem acesso a relatórios completos de vendas, comissões e histórico de pagamentos em tempo real.'
    },
    {
      question: 'Posso promover qualquer produto?',
      answer: 'Você pode promover qualquer produto disponível em nosso marketplace. Todos os produtos passam por curadoria de qualidade.'
    },
    {
      question: 'Existe taxa para usar a plataforma?',
      answer: 'A AffiliateNet é gratuita para afiliados. Não cobramos taxas de adesão ou mensalidade.'
    },
    {
      question: 'Como criar conteúdo eficaz?',
      answer: 'Oferecemos guias completos sobre criação de conteúdo, estratégias de marketing e melhores práticas para aumentar suas conversões.'
    }
  ];

  const categories = [
    {
      icon: DollarSign,
      title: 'Pagamentos e Comissões',
      description: 'Dúvidas sobre ganhos, pagamentos e sistema de comissões'
    },
    {
      icon: Users,
      title: 'Conta e Perfil',
      description: 'Configurações de conta, perfil e dados pessoais'
    },
    {
      icon: ShoppingBag,
      title: 'Produtos e Marketplace',
      description: 'Como encontrar e promover produtos em nossa plataforma'
    },
    {
      icon: HelpCircle,
      title: 'Primeiros Passos',
      description: 'Guia completo para iniciantes na plataforma'
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
            Central de <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Ajuda</span>
          </h1>
          <p className="text-xl text-gray-600">
            Encontre respostas para suas dúvidas ou entre em contato conosco
          </p>
        </div>

        {/* Categorias de Ajuda */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Categorias de Ajuda</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={28} className="text-white" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contato */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Precisa de Mais Ajuda?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="text-center">
                <MessageCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <CardTitle>Chat ao Vivo</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Converse conosco em tempo real</p>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500">
                  Iniciar Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="text-center">
                <Mail className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Envie um email para suporte</p>
                <a 
                  href="mailto:valdtkr@gmail.com"
                  className="inline-block"
                >
                  <Button variant="outline" className="border-orange-500 text-orange-600">
                    valdtkr@gmail.com
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="text-center">
                <Phone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <CardTitle>WhatsApp</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Fale conosco no WhatsApp</p>
                <a 
                  href="https://wa.me/5563999589965" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button variant="outline" className="border-orange-500 text-orange-600">
                    +55 63 9958-9965
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Help;
