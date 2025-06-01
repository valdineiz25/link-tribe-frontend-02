
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { AffiGuardService } from '@/services/affiGuardService';

export const AffiGuardRules: React.FC = () => {
  const [showAllowedDomains, setShowAllowedDomains] = useState(false);
  const [showBlockedExamples, setShowBlockedExamples] = useState(false);

  const allowedDomains = AffiGuardService.getAllowedDomains();
  const blockedShorteners = AffiGuardService.getBlockedShorteners();

  const exampleAllowedLinks = [
    'https://amazon.com.br/dp/B08N5WRWNW',
    'https://shopee.com.br/produto-123',
    'https://mercadolivre.com.br/MLB-123456',
    'https://magazineluiza.com.br/produto/123',
    'https://shein.com/product-xyz',
  ];

  const exampleBlockedLinks = [
    'http://amazon.com/unsafe-link',
    'https://bit.ly/suspicious-link',
    'https://fake-amazon.com/scam',
    'https://blog.shopee.com/promotion',
    'https://amaz0n.com/typosquatting',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-900">AffiGuard MAX</CardTitle>
              <p className="text-sm text-gray-600">Sistema de proteção antifraude radical</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Regras Principais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Regras de Links Permitidos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">✅ Permitido</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Links diretos dos marketplaces oficiais</li>
                <li>• Apenas protocolo HTTPS</li>
                <li>• Domínios da lista autorizada</li>
                <li>• Subdomínios oficiais (ex: www.amazon.com)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">❌ Bloqueado</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Links encurtados (bit.ly, tinyurl, etc.)</li>
                <li>• Protocolo HTTP inseguro</li>
                <li>• Domínios não autorizados</li>
                <li>• Tentativas de typosquatting</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <h4 className="font-semibold text-orange-800">Sistema de Punições</h4>
            </div>
            <p className="text-sm text-orange-700">
              <strong>3 tentativas de links bloqueados em 24h = Suspensão automática por 7 dias.</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Domínios Permitidos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Marketplaces Autorizados</span>
              <Badge variant="secondary">{allowedDomains.length} domínios</Badge>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllowedDomains(!showAllowedDomains)}
            >
              {showAllowedDomains ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        {showAllowedDomains && (
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {allowedDomains.map((domain) => (
                <Badge key={domain} variant="outline" className="text-green-700 border-green-300">
                  {domain}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Exemplos Práticos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-blue-600" />
              <span>Exemplos Práticos</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBlockedExamples(!showBlockedExamples)}
            >
              {showBlockedExamples ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        {showBlockedExamples && (
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Links que passam na validação:
              </h4>
              <div className="space-y-2">
                {exampleAllowedLinks.map((link, index) => (
                  <div key={index} className="p-2 bg-green-50 rounded border border-green-200">
                    <code className="text-sm text-green-800">{link}</code>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                <XCircle className="h-4 w-4 mr-2" />
                Links que são bloqueados:
              </h4>
              <div className="space-y-2">
                {exampleBlockedLinks.map((link, index) => (
                  <div key={index} className="p-2 bg-red-50 rounded border border-red-200">
                    <code className="text-sm text-red-800">{link}</code>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Dicas */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">💡 Dicas para evitar bloqueios:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Sempre use links diretos dos sites oficiais</li>
                <li>• Não use encurtadores de URL</li>
                <li>• Verifique se o domínio está correto (sem erros de digitação)</li>
                <li>• Use sempre HTTPS, nunca HTTP</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
