
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useStores } from '@/hooks/useStores';
import { 
  Store, 
  Upload, 
  Plus, 
  X, 
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle,
  Loader2,
  Package,
  Palette,
  ShoppingBag
} from 'lucide-react';
import { StorageService } from '@/services/storageService';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category: string;
}

interface Catalog {
  id: string;
  name: string;
  description: string;
  image: string | null;
  products: Product[];
}

const StoreBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addStore } = useStores();
  
  // Store info
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [storeLogo, setStoreLogo] = useState<string | null>(null);
  
  // Catalogs
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [newCatalogName, setNewCatalogName] = useState('');
  const [newCatalogDescription, setNewCatalogDescription] = useState('');
  
  // Products for current catalog
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLogoUploading(true);
      const base64 = await StorageService.fileToBase64(file);
      setStoreLogo(base64);
      
      toast({
        title: "✅ Logo carregado!",
        description: "Logo da loja foi carregado com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao carregar logo:', error);
      toast({
        title: "❌ Erro",
        description: "Erro ao carregar logo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLogoUploading(false);
    }
  };

  const addCatalog = () => {
    if (!newCatalogName.trim()) {
      toast({
        title: "❌ Campo obrigatório",
        description: "Digite o nome do catálogo.",
        variant: "destructive",
      });
      return;
    }

    const newCatalog: Catalog = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      name: newCatalogName.trim(),
      description: newCatalogDescription.trim(),
      image: null,
      products: []
    };
    
    setCatalogs(prev => [...prev, newCatalog]);
    setNewCatalogName('');
    setNewCatalogDescription('');
    
    toast({
      title: "📚 Catálogo criado!",
      description: `Catálogo "${newCatalogName}" foi criado.`,
    });
  };

  const removeCatalog = (id: string) => {
    setCatalogs(prev => prev.filter(catalog => catalog.id !== id));
    if (selectedCatalogId === id) {
      setSelectedCatalogId(null);
    }
  };

  const addProductToCatalog = () => {
    if (!selectedCatalogId || !newProductName.trim() || !newProductPrice) {
      toast({
        title: "❌ Campos obrigatórios",
        description: "Preencha nome e preço do produto.",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      name: newProductName.trim(),
      description: newProductDescription.trim(),
      price: parseFloat(newProductPrice),
      image: null,
      category: newProductCategory.trim() || 'Geral'
    };

    setCatalogs(prev => prev.map(catalog => 
      catalog.id === selectedCatalogId 
        ? { ...catalog, products: [...catalog.products, newProduct] }
        : catalog
    ));

    // Reset form
    setNewProductName('');
    setNewProductDescription('');
    setNewProductPrice('');
    setNewProductCategory('');

    toast({
      title: "🛍️ Produto adicionado!",
      description: `Produto "${newProduct.name}" foi adicionado ao catálogo.`,
    });
  };

  const removeProductFromCatalog = (catalogId: string, productId: string) => {
    setCatalogs(prev => prev.map(catalog => 
      catalog.id === catalogId 
        ? { ...catalog, products: catalog.products.filter(p => p.id !== productId) }
        : catalog
    ));
  };

  const handleCreateStore = async () => {
    if (!storeName.trim()) {
      toast({
        title: "❌ Campo obrigatório",
        description: "Digite o nome da loja.",
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

      const success = addStore(storeData);
      
      if (success) {
        toast({
          title: "🎉 Loja criada!",
          description: `Loja "${storeName}" foi criada com ${catalogs.length} catálogos!`,
        });
        
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        throw new Error('Falha na criação');
      }
      
    } catch (error) {
      console.error('Erro ao criar loja:', error);
      toast({
        title: "❌ Erro",
        description: "Erro ao criar loja. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCatalog = catalogs.find(c => c.id === selectedCatalogId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="professional" 
            size="sm"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              🏗️ Construtor de Loja
            </h1>
            <p className="text-slate-600">Crie sua loja completa com catálogos e produtos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Store Info & Catalogs */}
          <div className="space-y-6">
            {/* Store Information */}
            <Card className="shadow-xl border border-slate-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Store className="w-5 h-5 text-blue-600" />
                  <span>Informações da Loja</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Logo */}
                <div className="space-y-2">
                  <Label>Logo da Loja</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
                      {logoUploading ? (
                        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                      ) : storeLogo ? (
                        <img src={storeLogo} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" asChild disabled={logoUploading}>
                        <span>
                          <Upload size={14} className="mr-2" />
                          {logoUploading ? 'Carregando...' : 'Logo'}
                        </span>
                      </Button>
                    </label>
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

                <div className="space-y-2">
                  <Label htmlFor="store-name">Nome da Loja *</Label>
                  <Input
                    id="store-name"
                    placeholder="Nome da sua loja"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-description">Descrição</Label>
                  <Textarea
                    id="store-description"
                    placeholder="Descreva sua loja"
                    value={storeDescription}
                    onChange={(e) => setStoreDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Catalog Management */}
            <Card className="shadow-xl border border-slate-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  <span>Catálogos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Catalog */}
                <div className="border border-dashed border-gray-300 rounded-lg p-4 space-y-3 bg-gray-50/50">
                  <h4 className="font-medium">➕ Novo Catálogo</h4>
                  <div className="space-y-2">
                    <Input
                      placeholder="Nome do catálogo"
                      value={newCatalogName}
                      onChange={(e) => setNewCatalogName(e.target.value)}
                    />
                    <Input
                      placeholder="Descrição (opcional)"
                      value={newCatalogDescription}
                      onChange={(e) => setNewCatalogDescription(e.target.value)}
                    />
                  </div>
                  <Button onClick={addCatalog} size="sm" disabled={isLoading}>
                    <Plus size={14} className="mr-2" />
                    Adicionar
                  </Button>
                </div>

                {/* Catalogs List */}
                {catalogs.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Seus Catálogos ({catalogs.length})</h4>
                    {catalogs.map((catalog) => (
                      <div 
                        key={catalog.id} 
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          selectedCatalogId === catalog.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedCatalogId(catalog.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h5 className="font-medium">{catalog.name}</h5>
                            {catalog.description && (
                              <p className="text-sm text-gray-600">{catalog.description}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              {catalog.products.length} produtos
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCatalog(catalog.id);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Product Management */}
          <div className="space-y-6">
            {selectedCatalog ? (
              <Card className="shadow-xl border border-slate-200 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-green-600" />
                    <span>Produtos - {selectedCatalog.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Product Form */}
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 space-y-3 bg-gray-50/50">
                    <h4 className="font-medium">➕ Novo Produto</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Nome do produto"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                      />
                      <Input
                        placeholder="Preço"
                        type="number"
                        step="0.01"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                      />
                    </div>
                    <Input
                      placeholder="Categoria"
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value)}
                    />
                    <Textarea
                      placeholder="Descrição do produto"
                      value={newProductDescription}
                      onChange={(e) => setNewProductDescription(e.target.value)}
                      rows={2}
                    />
                    <Button onClick={addProductToCatalog} size="sm" disabled={isLoading}>
                      <Package size={14} className="mr-2" />
                      Adicionar Produto
                    </Button>
                  </div>

                  {/* Products List */}
                  {selectedCatalog.products.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Produtos ({selectedCatalog.products.length})</h4>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {selectedCatalog.products.map((product) => (
                          <div key={product.id} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-medium">{product.name}</h5>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-sm font-medium text-green-600">
                                    R$ {product.price.toFixed(2)}
                                  </span>
                                  <span className="text-xs text-gray-500">{product.category}</span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeProductFromCatalog(selectedCatalog.id, product.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-xl border border-slate-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Selecione um Catálogo
                  </h3>
                  <p className="text-gray-600">
                    Escolha um catálogo na esquerda para começar a adicionar produtos
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
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
                Criar Loja Completa
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreBuilder;
