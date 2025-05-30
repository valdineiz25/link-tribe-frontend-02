
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const Privacy: React.FC = () => {
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
            Política de <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Privacidade</span>
          </h1>
          <p className="text-lg text-gray-600">
            Última atualização: 30 de maio de 2024
          </p>
        </div>

        <div className="space-y-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">1. Informações que Coletamos</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                Coletamos informações que você nos fornece diretamente e informações coletadas 
                automaticamente quando você usa nossos serviços:
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Informações Pessoais:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nome completo e email</li>
                    <li>Informações de pagamento</li>
                    <li>Dados de perfil público</li>
                    <li>Histórico de atividades na plataforma</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Informações Técnicas:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Endereço IP e localização</li>
                    <li>Tipo de dispositivo e navegador</li>
                    <li>Cookies e tecnologias similares</li>
                    <li>Dados de uso e navegação</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">2. Como Usamos suas Informações</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Fornecer e manter nossos serviços</li>
                <li>Processar pagamentos e comissões</li>
                <li>Personalizar sua experiência na plataforma</li>
                <li>Comunicar atualizações e ofertas relevantes</li>
                <li>Detectar e prevenir fraudes</li>
                <li>Cumprir obrigações legais</li>
                <li>Melhorar nossos serviços através de analytics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">3. Compartilhamento de Informações</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                Não vendemos suas informações pessoais. Podemos compartilhar informações nas seguintes situações:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Com parceiros comerciais para processamento de afiliação</li>
                <li>Com prestadores de serviços (pagamento, analytics, suporte)</li>
                <li>Quando exigido por lei ou processo legal</li>
                <li>Para proteger nossos direitos e segurança</li>
                <li>Com seu consentimento explícito</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">4. Cookies e Tecnologias Similares</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                Utilizamos cookies e tecnologias similares para:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Manter você logado na plataforma</li>
                <li>Lembrar suas preferências</li>
                <li>Rastrear afiliações e conversões</li>
                <li>Analisar o desempenho da plataforma</li>
                <li>Personalizar conteúdo e anúncios</li>
              </ul>
              <p>
                Você pode controlar o uso de cookies através das configurações do seu navegador.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">5. Segurança dos Dados</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger 
                suas informações pessoais, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Auditorias regulares de segurança</li>
                <li>Treinamento de segurança para funcionários</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">6. Seus Direitos</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                Você tem os seguintes direitos em relação aos seus dados pessoais:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Acessar e obter cópia dos seus dados</li>
                <li>Corrigir dados imprecisos ou incompletos</li>
                <li>Solicitar a exclusão dos seus dados</li>
                <li>Opor-se ao processamento de dados</li>
                <li>Solicitar a portabilidade dos dados</li>
                <li>Retirar consentimento a qualquer momento</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">7. Retenção de Dados</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p>
                Mantemos suas informações pessoais pelo tempo necessário para cumprir os propósitos 
                descritos nesta política, a menos que um período de retenção mais longo seja exigido 
                ou permitido por lei. Dados de afiliação podem ser mantidos por períodos mais longos 
                para fins de auditoria e compliance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">8. Alterações nesta Política</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p>
                Podemos atualizar esta política de privacidade periodicamente. Notificaremos você sobre 
                mudanças significativas publicando a nova política em nosso site e enviando um aviso 
                para seu email cadastrado.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">9. Contato</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 leading-relaxed">
              <p className="mb-4">
                Se você tiver dúvidas sobre esta política de privacidade ou quiser exercer seus direitos, 
                entre em contato conosco:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacidade@affiliatenet.com</p>
                <p><strong>Telefone:</strong> (11) 9999-9999</p>
                <p><strong>Endereço:</strong> Rua das Flores, 123 - São Paulo, SP</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
