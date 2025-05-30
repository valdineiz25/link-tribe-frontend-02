
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft size={20} className="mr-2" />
              Voltar ao início
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Termos de <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Uso</span>
          </h1>
          <p className="text-lg text-gray-600">
            Última atualização: 30 de maio de 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">1. Aceitação dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p>
                Ao acessar e usar a plataforma AffiliateNet, você concorda em cumprir e estar vinculado 
                aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes 
                termos, não deve usar nossos serviços.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">2. Descrição dos Serviços</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                A AffiliateNet é uma plataforma de marketing de afiliados que conecta criadores de 
                conteúdo com marcas e produtos. Nossos serviços incluem:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Marketplace de produtos para afiliação</li>
                <li>Sistema de tracking de vendas e comissões</li>
                <li>Ferramentas de criação e compartilhamento de conteúdo</li>
                <li>Dashboard de analytics e relatórios</li>
                <li>Rede social para afiliados</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">3. Elegibilidade e Cadastro</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                Para usar nossos serviços, você deve:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Ter pelo menos 18 anos de idade</li>
                <li>Fornecer informações precisas e atualizadas</li>
                <li>Manter a confidencialidade de suas credenciais</li>
                <li>Ser responsável por todas as atividades em sua conta</li>
              </ul>
              <p>
                Reservamos o direito de recusar ou cancelar contas a nosso critério.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">4. Uso da Plataforma</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                Você concorda em usar nossa plataforma apenas para fins legais e de acordo com estes termos. 
                É proibido:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Usar a plataforma para atividades ilegais ou fraudulentas</li>
                <li>Criar múltiplas contas para contornar limitações</li>
                <li>Interferir no funcionamento da plataforma</li>
                <li>Copiar ou reproduzir conteúdo sem autorização</li>
                <li>Enviar spam ou conteúdo malicioso</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">5. Comissões e Pagamentos</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                As comissões são calculadas com base nas vendas confirmadas através de seus links de afiliado. 
                Condições importantes:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Pagamentos são processados mensalmente</li>
                <li>Valor mínimo para saque: R$ 50,00</li>
                <li>Comissões podem variar por produto e categoria</li>
                <li>Vendas canceladas ou devolvidas são deduzidas das comissões</li>
                <li>Atividades fraudulentas resultam em perda de comissões</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">6. Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p>
                Todo o conteúdo da plataforma AffiliateNet, incluindo textos, gráficos, logos, ícones, 
                imagens e software, é propriedade da AffiliateNet ou de seus licenciadores e está protegido 
                por leis de direitos autorais e outras leis de propriedade intelectual.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">7. Limitação de Responsabilidade</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p>
                A AffiliateNet não será responsável por danos diretos, indiretos, incidentais, especiais 
                ou consequenciais resultantes do uso ou incapacidade de usar nossos serviços, mesmo que 
                tenhamos sido avisados da possibilidade de tais danos.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">8. Modificações</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p>
                Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão 
                em vigor imediatamente após a publicação. É sua responsabilidade revisar periodicamente 
                estes termos.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">9. Contato</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p>
                Se você tiver dúvidas sobre estes termos, entre em contato conosco:
              </p>
              <div className="mt-4">
                <p>Email: legal@affiliatenet.com</p>
                <p>Telefone: (11) 9999-9999</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
