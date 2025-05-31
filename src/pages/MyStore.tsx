
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { StorageService } from '@/services/storageService';
import { useStores } from '@/hooks/useStores';
import { 
  Store, 
  Plus, 
  Edit,
  Trash2,
  Share2,
  Package,
  Image as ImageIcon,
  ArrowLeft,
  Upload
} from 'lucide-react';

interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string | null;
  category: string;
  affiliateLink: string;
  storeId: string;
  createdAt: string;
}

const MyStore: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { stores } = useStores();
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    affiliateLink: '',
    image: null as string | null
  });

  useEffect(() => {
    if (stores.length > 0) {
      setSelectedStore(stores[0]);
      loadStoreProducts(stores[0].id);
    }
  }, [stores]);

  const loadStoreProducts = (storeId: string) => {
    try {
      const products = StorageService.getStoreProducts(storeId);
      setStoreProducts(products);
    } catch (error) {
      console.error('Erro ao carregar produtos da loja:', error);
      setStoreProducts([]);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
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
      setNewProduct(prev => ({ ...prev, image: base64 }));
      
      toast({
        title: "✅ Sucesso!",
        description: "Imagem carregada com sucesso!",
      });
    } catch (error) {
      console.error('❌ Erro ao carregar imagem:', error);
      toast({
        title: "❌ Erro",
        description: "Erro ao carregar a imagem. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleAddProduct = async () => {
    if (!selectedStore || !newProduct.name.trim() || !newProduct.price) {
      toast({
        title: "❌ Campos obrigatórios",
        description: "Preencha pelo menos nome e preço do produto.",
        variant: "destructive",
      });
      return;
    }

    try {
      const product: StoreProduct = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: newProduct.name.trim(),
        description: newProduct.description.trim(),
        price: parseFloat(newProduct.price),
        originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : undefined,
        image: newProduct.image,
        category: newProduct.category.trim() || 'Geral',
        affiliateLink: newProduct.affiliateLink.trim(),
        storeId: selectedStore.id,
        createdAt: new Date().toISOString()
      };

      StorageService.saveStoreProduct(product);
      loadStoreProducts(selectedStore.id);
      
      setNewProduct({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        affiliateLink: '',
        image: null
      });
      setShowAddProduct(false);

      toast({
        title: "🎉 Produto adicionado!",
        description: `${product.name} foi adicionado ao catálogo da sua loja.`,
      });
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      toast({
        title: "❌ Erro",
        description: "Erro ao adicionar produto. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = (productId: string) => {
    try {
      StorageService.deleteStoreProduct(productId);
      loadStoreProducts(selectedStore.id);
      toast({
        title: "🗑️ Produto removido",
        description: "Produto foi removido do catálogo.",
      });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      toast({
        title: "❌ Erro",
        description: "Erro ao remover produto.",
        variant: "destructive",
      });
    }
  };

  const handleShareToFeed = (product: StoreProduct) => {
    // Navegar para criar post com dados do produto preenchidos
    const productData = encodeURIComponent(JSON.stringify({
      content: `Confira este produto incrível da minha loja! ${product.description}`,
      productName: product.name,
      currentPrice: product.originalPrice,
      promotionalPrice: product.price,
      productLink: product.affiliateLink,
      category: product.category,
      storeName: selectedStore?.name
    }));
    
    navigate(`/create-post?product=${productData}`);
  };

  if (stores.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              🏪 Minha Loja
            </h1>
          </div>

          <Card className="text-center p-12">
            <Store size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Você ainda não possui uma loja
            </h3>
            <p className="text-gray-500 mb-6">
              Crie sua primeira loja para começar a adicionar produtos ao seu catálogo
            </p>
            <Button
              onClick={() => navigate('/create-store')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus size={16} className="mr-2" />
              Criar Minha Primeira Loja
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                🏪 {selectedStore?.name || 'Minha Loja'}
              </h1>
              <p className="text-gray-600">Gerencie o catálogo de produtos da sua loja</p>
            </div>
          </div>
          
          <Button
            onClick={() => setShowAddProduct(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Plus size={16} className="mr-2" />
            Adicionar Produto
          </Button>
        </div>

        {/* Store Selection */}
        {stores.length > 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Selecionar Loja</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                {stores.map((store) => (
                  <Button
                    key={store.id}
                    variant={selectedStore?.id === store.id ? "default" : "outline"}
                    onClick={() => {
                      setSelectedStore(store);
                      loadStoreProducts(store.id);
                    }}
                  >
                    {store.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Product Form */}
        {showAddProduct && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2" size={20} />
                Adicionar Novo Produto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Nome do Produto *</Label>
                  <Input
                    id="product-name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Smartphone XYZ Pro"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-category">Categoria</Label>
                  <Input
                    id="product-category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Ex: Eletrônicos"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-description">Descrição</Label>
                <Textarea
                  id="product-description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva as características e benefícios do produto"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Preço Atual (R$) *</Label>
                  <Input
                    id="product-price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="149.90"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-original-price">Preço Original (R$)</Label>
                  <Input
                    id="product-original-price"
                    type="number"
                    step="0.01"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="199.90"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-link">Link de Afiliado</Label>
                <Input
                  id="product-link"
                  type="url"
                  value={newProduct.affiliateLink}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, affiliateLink: e.target.value }))}
                  placeholder="https://exemplo.com/produto"
                />
              </div>

              <div className="space-y-2">
                <Label>Imagem do Produto</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
                    {newProduct.image ? (
                      <img src={newProduct.image} alt="Produto" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <label htmlFor="product-image" className="cursor-pointer">
                    <Button variant="outline" size="sm" type="button" asChild>
                      <span>
                        <Upload size={16} className="mr-2" />
                        Escolher Imagem
                      </span>
                    </Button>
                  </label>
                  <input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddProduct}>
                  <Package size={16} className="mr-2" />
                  Adicionar Produto
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {storeProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Package size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum produto no catálogo
              </h3>
              <p className="text-gray-500 mb-6">
                Adicione seu primeiro produto ao catálogo da loja
              </p>
              <Button
                onClick={() => setShowAddProduct(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Plus size={16} className="mr-2" />
                Adicionar Primeiro Produto
              </Button>
            </div>
          ) : (
            storeProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                        <ImageIcon size={48} className="text-gray-400" />
                      </div>
                    )}
                    
                    {product.originalPrice && product.originalPrice > product.price && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 h-10">
                      {product.name}
                    </h3>
                    
                    {product.description && (
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="font-bold text-lg text-green-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShareToFeed(product)}
                        className="flex-1"
                      >
                        <Share2 size={14} className="mr-1" />
                        Compartilhar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStore;
