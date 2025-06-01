
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  Zap, 
  ShoppingBag, 
  Smartphone, 
  Monitor,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StoreCreationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onStoreCreated: () => void;
}

const StoreCreationWizard: React.FC<StoreCreationWizardProps> = ({
  isOpen,
  onClose,
  onStoreCreated
}) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedAPI, setSelectedAPI] = useState<string | null>(null);

  const templates = [
    {
      id: 'minimal',
      name: 'Vitrine Minimalista',
      description: 'Layout clean e moderno',
      icon: Store,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'blackfriday',
      name: 'Promoção Relâmpago',
      description: 'Ideal para ofertas especiais',
      icon: Zap,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'catalog',
      name: 'Catálogo Completo',
      description: 'Para muitos produtos',
      icon: ShoppingBag,
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const apiSources = [
    {
      id: 'amazon',
      name: 'Amazon',
      description: 'Importar produtos da Amazon',
      available: true
    },
    {
      id: 'shopee',
      name: 'Shopee',
      description: 'Produtos do Shopee',
      available: true
    },
    {
      id: 'mercadolivre',
      name: 'Mercado Livre',
      description: 'Marketplace brasileiro',
      available: false
    }
  ];

  const handleNext = () => {
    if (currentStep === 1 && !selectedTemplate) {
      toast({
        title: "⚠️ Selecione um template",
        description: "Escolha um modelo para sua loja antes de continuar.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && !selectedAPI) {
      toast({
        title: "⚠️ Selecione uma fonte",
        description: "Escolha uma API para importar produtos.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    toast({
      title: "🎉 Loja criada com sucesso!",
      description: "Sua loja foi publicada e já está disponível no feed.",
    });
    onStoreCreated();
    onClose();
    setCurrentStep(1);
    setSelectedTemplate(null);
    setSelectedAPI(null);
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Escolha seu Template
        </h3>
        <p className="text-sm text-gray-600">
          Selecione o layout ideal para sua loja
        </p>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'ring-2 ring-blue-500 shadow-lg'
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center`}>
                  <template.icon size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
                {selectedTemplate === template.id && (
                  <Check size={20} className="text-blue-500" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Importar Produtos
        </h3>
        <p className="text-sm text-gray-600">
          Conecte-se com uma plataforma para importar produtos automaticamente
        </p>
      </div>

      <div className="grid gap-4">
        {apiSources.map((source) => (
          <Card
            key={source.id}
            className={`cursor-pointer transition-all ${
              !source.available 
                ? 'opacity-50 cursor-not-allowed' 
                : selectedAPI === source.id
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : 'hover:shadow-md'
            }`}
            onClick={() => source.available && setSelectedAPI(source.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{source.name}</h4>
                  <p className="text-sm text-gray-600">{source.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {!source.available && (
                    <Badge variant="secondary">Em breve</Badge>
                  )}
                  {selectedAPI === source.id && (
                    <Check size={20} className="text-blue-500" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Preview da Loja
        </h3>
        <p className="text-sm text-gray-600">
          Veja como sua loja ficará antes de publicar
        </p>
      </div>

      {/* Mobile Preview */}
      <div className="flex justify-center space-x-6">
        <div className="text-center">
          <div className="w-32 h-56 bg-gray-100 rounded-xl border-4 border-gray-300 p-2 mx-auto mb-2">
            <div className="w-full h-full bg-white rounded-lg flex flex-col items-center justify-center">
              <Smartphone size={24} className="text-gray-400 mb-2" />
              <div className="text-xs text-gray-500">Mobile</div>
            </div>
          </div>
          <Badge variant="outline">Responsivo</Badge>
        </div>

        <div className="text-center">
          <div className="w-48 h-32 bg-gray-100 rounded-xl border-4 border-gray-300 p-2 mx-auto mb-2">
            <div className="w-full h-full bg-white rounded-lg flex flex-col items-center justify-center">
              <Monitor size={24} className="text-gray-400 mb-2" />
              <div className="text-xs text-gray-500">Desktop</div>
            </div>
          </div>
          <Badge variant="outline">Otimizado</Badge>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <Check size={24} className="text-green-600 mx-auto mb-2" />
        <p className="text-sm text-green-800 font-medium">
          Tudo pronto! Sua loja será publicada instantaneamente.
        </p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Store size={20} className="text-blue-600" />
            <span>Criar Loja - Passo {currentStep}/3</span>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Progress Bar */}
          <div className="flex items-center mb-6">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? <Check size={16} /> : step}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Anterior</span>
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              className="flex items-center space-x-2"
            >
              <span>Próximo</span>
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
            >
              <Check size={16} />
              <span>Publicar Loja</span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoreCreationWizard;
