
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { StorageService } from '@/services/storageService';
import { useStores } from '@/hooks/useStores';
import { 
  Store, 
  Upload, 
  Plus, 
  X, 
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface Catalog {
  id: string;
  name: string;
  description: string;
  image: string | null;
}

const CreateStore: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addStore } = useStores();
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [storeLogo, setStoreLogo] = useState<string | null>(null);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [newCatalogName, setNewCatalogName] = useState('');
  const [newCatalogDescription, setNewCatalogDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLogoUploading(true);
      console.log('📤 Iniciando upload do logo:', file.name);
      
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        toast({
          title: "❌ Erro",
          description: "Por favor, selecione apenas arquivos de imagem.",
          variant: "destructive",
        });
        return;
      }

      // Verificar tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "❌ Erro",
          description: "A imagem deve ter no máximo 5MB.",
          variant: "destructive",
        });
        return;
      }

      const base64 = await StorageService.fileToBase64(file);
      console.log('✅ Logo convertido para base64, tamanho:', base64.length);
      setStoreLogo(base64);
      
      toast({
        title: "✅ Sucesso!",
        description: "Logo carregado com sucesso!",
      });
    } catch (error) {
      console.error('❌ Erro ao carregar logo:', error);
      toast({
        title: "❌ Erro",
        description: "Erro ao carregar a imagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLogoUploading(false);
    }
  };

  const addCatalog = () => {
    if (!newCatalogName.trim()) {
      toast({
        title: "❌ Erro",
        description: "Digite o nome do catálogo.",
        variant: "destructive",
      });
      return;
    }

    const newCatalog: Catalog = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      name: newCatalogName.trim(),
      description: newCatalogDescription.trim(),
      image: null
    };
    
    setCatalogs(prevCatalogs => [...prevCatalogs, newCatalog]);
    setNewCatalogName('');
    setNewCatalogDescription('');
    
    toast({
      title: "✅ Catálogo adicionado!",
      description: `Catálogo "${newCatalogName}" foi adicionado.`,
    });
  };

  const removeCatalog = (id: string) => {
    setCatalogs(prevCatalogs => prevCatalogs.filter(catalog => catalog.id !== id));
    toast({
      title: "🗑️ Catálogo removido",
      description: "Catálogo foi removido com sucesso.",
    });
  };

  const handleCatalogImageUpload = async (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      console.log('📤 Iniciando upload da imagem do catálogo:', file.name);
      
      if (!file.type.startsWith('image/')) {
        toast({
          title: "❌ Erro",
          description: "Por favor, selecione apenas arquivos de imagem.",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "❌ Erro",
          description: "A imagem deve ter no máximo 5MB.",
          variant: "destructive",
        });
        return;
      }

      const base64 = await StorageService.fileToBase64(file);
      setCatalogs(prevCatalogs => 
        prevCatalogs.map(catalog => 
          catalog.id === id 
            ? { ...catalog, image: base64 }
            : catalog
        )
      );

      toast({
        title: "✅ Sucesso!",
        description: "Imagem do catálogo carregada!",
      });
    } catch (error) {
      console.error('❌ Erro ao carregar imagem do catálogo:', error);
      toast({
        title: "❌ Erro",
        description: "Erro ao carregar a imagem. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleCreateStore = async () => {
    if (!storeName.trim()) {
      toast({
        title: "❌ Campo obrigatório",
        description: "Por favor, digite o nome da loja.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const storeData = {
        name: storeName.trim(),
        description: storeDescription.trim(),
        logo: storeLogo,
        catalogs
      };

      console.log('🏪 Criando loja com dados:', storeData);
      const success = addStore(storeData);
      
      if (success) {
        toast({
          title: "🎉 Loja criada com sucesso!",
          description: `A loja "${storeName}" foi criada!`,
        });
        
        // Aguardar um pouco para mostrar o toast antes de navegar
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        throw new Error('Falha na criação da loja');
      }
      
    } catch (error) {
      console.error('❌ Erro ao criar loja:', error);
      toast({
        title: "❌ Erro na criação",
        description: "Erro ao criar a loja. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="professional" 
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
            disabled={isLoading}
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              🏪 Criar Minha Loja
            </h1>
            <p className="text-slate-600">Configure sua loja e organize seus catálogos profissionalmente</p>
          </div>
        </div>

        {/* Informações da Loja */}
        <Card className="shadow-xl border border-slate-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Store className="w-5 h-5 text-blue-600" />
              <span>Informações da Loja</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo da Loja */}
            <div className="space-y-2">
              <Label>Logo da Loja</Label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
                  {logoUploading ? (
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                  ) : storeLogo ? (
                    <img src={storeLogo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div>
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Button variant="professional" size="sm" type="button" asChild disabled={logoUploading}>
                      <span>
                        <Upload size={16} className="mr-2" />
                        {logoUploading ? 'Carregando...' : 'Escolher Logo'}
                      </span>
                    </Button>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG até 5MB</p>
                </div>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  disabled={logoUploading}
                />
              </div>
            </div>

            {/* Nome da Loja */}
            <div className="space-y-2">
              <Label htmlFor="store-name">Nome da Loja *</Label>
              <Input
                id="store-name"
                placeholder="Digite o nome da sua loja"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
                className="border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Descrição da Loja */}
            <div className="space-y-2">
              <Label htmlFor="store-description">Descrição</Label>
              <Textarea
                id="store-description"
                placeholder="Descreva sua loja e o que você oferece"
                value={storeDescription}
                onChange={(e) => setStoreDescription(e.target.value)}
                rows={3}
                className="border-gray-300 focus:border-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Catálogos */}
        <Card className="shadow-xl border border-slate-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>📚 Catálogos de Produtos</CardTitle>
            <p className="text-sm text-gray-600">Organize seus produtos em catálogos temáticos</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Adicionar Novo Catálogo */}
            <div className="border border-dashed border-gray-300 rounded-lg p-4 space-y-4 bg-gray-50/50">
              <h3 className="font-medium text-gray-900">➕ Adicionar Novo Catálogo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="catalog-name">Nome do Catálogo</Label>
                  <Input
                    id="catalog-name"
                    placeholder="Ex: Eletrônicos, Roupas, Casa..."
                    value={newCatalogName}
                    onChange={(e) => setNewCatalogName(e.target.value)}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="catalog-description">Descrição</Label>
                  <Input
                    id="catalog-description"
                    placeholder="Breve descrição do catálogo"
                    value={newCatalogDescription}
                    onChange={(e) => setNewCatalogDescription(e.target.value)}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>
              <Button onClick={addCatalog} className="w-full md:w-auto" disabled={isLoading}>
                <Plus size={16} className="mr-2" />
                Adicionar Catálogo
              </Button>
            </div>

            {/* Lista de Catálogos */}
            {catalogs.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">📦 Seus Catálogos ({catalogs.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catalogs.map((catalog) => (
                    <Card key={catalog.id} className="border border-gray-200 bg-white shadow-md">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium">{catalog.name}</h4>
                            {catalog.description && (
                              <p className="text-sm text-gray-600 mt-1">{catalog.description}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCatalog(catalog.id)}
                            className="text-red-500 hover:text-red-700"
                            disabled={isLoading}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                        
                        {/* Imagem do Catálogo */}
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-16 border border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                            {catalog.image ? (
                              <img src={catalog.image} alt={catalog.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <label htmlFor={`catalog-image-${catalog.id}`} className="cursor-pointer">
                            <Button variant="outline" size="sm" asChild>
                              <span>
                                <Upload size={14} className="mr-1" />
                                Imagem
                              </span>
                            </Button>
                          </label>
                          <input
                            id={`catalog-image-${catalog.id}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCatalogImageUpload(catalog.id, e)}
                            className="hidden"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate(-1)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            onClick={handleCreateStore}
            disabled={!storeName.trim() || isLoading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Criando...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Criar Loja
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateStore;
