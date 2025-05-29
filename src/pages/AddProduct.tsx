
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, Image, Video, Tag, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    discountPrice: '',
    discountCoupon: '',
    affiliateLink: '',
    category: '',
    brand: '',
    images: [] as File[],
    videos: [] as File[],
    specifications: '',
    tags: '',
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    'Eletrônicos',
    'Moda e Vestuário',
    'Casa e Jardim',
    'Saúde e Beleza',
    'Esportes e Fitness',
    'Livros e Educação',
    'Automóveis',
    'Alimentação',
    'Tecnologia',
    'Infantil'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productName.trim() || !formData.price || !formData.category) {
      toast({
        title: "Erro",
        description: "Por favor, preencha os campos obrigatórios: Nome, Preço e Categoria.",
        variant: "destructive",
      });
      return;
    }

    console.log('Produto criado:', formData);
    
    toast({
      title: "Produto Criado! 🎉",
      description: "Seu produto foi adicionado com sucesso!",
    });
    
    navigate('/marketplace');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: 'images' | 'videos', files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({ ...prev, [field]: [...prev[field], ...fileArray] }));
    }
  };

  const removeFile = (field: 'images' | 'videos', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const calculateDiscount = () => {
    const price = parseFloat(formData.price);
    const discountPrice = parseFloat(formData.discountPrice);
    
    if (price && discountPrice && discountPrice < price) {
      return Math.round(((price - discountPrice) / price) * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/marketplace')}
            className="mr-4"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Adicionar Novo Produto
          </h1>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Tag className="mr-2" size={24} />
              Informações do Produto 📦
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Informações Básicas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Nome do Produto *</Label>
                    <Input
                      id="productName"
                      value={formData.productName}
                      onChange={(e) => handleInputChange('productName', e.target.value)}
                      placeholder="Ex: iPhone 15 Pro Max 256GB"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Marca</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="Ex: Apple, Samsung, Nike"
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="description">Descrição Detalhada</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descreva detalhadamente o produto, suas características, benefícios e diferenciais..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Preços e Descontos */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <DollarSign className="mr-2" size={20} />
                  Preços e Descontos
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço Original (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="199.90"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountPrice">Preço com Desconto (R$)</Label>
                    <Input
                      id="discountPrice"
                      type="number"
                      step="0.01"
                      value={formData.discountPrice}
                      onChange={(e) => handleInputChange('discountPrice', e.target.value)}
                      placeholder="149.90"
                    />
                    {calculateDiscount() > 0 && (
                      <p className="text-xs text-green-600">
                        💰 Desconto de {calculateDiscount()}%
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountCoupon">Cupom de Desconto</Label>
                    <Input
                      id="discountCoupon"
                      value={formData.discountCoupon}
                      onChange={(e) => handleInputChange('discountCoupon', e.target.value)}
                      placeholder="DESCONTO10"
                    />
                  </div>
                </div>
              </div>

              {/* Links e Especificações */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Links e Especificações</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="affiliateLink">Link de Afiliado</Label>
                    <Input
                      id="affiliateLink"
                      type="url"
                      value={formData.affiliateLink}
                      onChange={(e) => handleInputChange('affiliateLink', e.target.value)}
                      placeholder="https://exemplo.com/produto-afiliado"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specifications">Especificações Técnicas</Label>
                    <Textarea
                      id="specifications"
                      value={formData.specifications}
                      onChange={(e) => handleInputChange('specifications', e.target.value)}
                      placeholder="Dimensões, peso, características técnicas, materiais, etc..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      placeholder="smartphone, tecnologia, apple, celular"
                    />
                  </div>
                </div>
              </div>

              {/* Upload de Imagens */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <Image className="mr-2" size={20} />
                  Imagens do Produto
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="images">Selecionar Imagens</Label>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileChange('images', e.target.files)}
                      className="cursor-pointer"
                    />
                  </div>

                  {formData.images.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Imagens selecionadas:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {formData.images.map((file, index) => (
                          <div key={index} className="relative">
                            <div className="bg-gray-100 p-2 rounded text-xs text-center">
                              📷 {file.name.substring(0, 15)}...
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              onClick={() => removeFile('images', index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload de Vídeos */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <Video className="mr-2" size={20} />
                  Vídeos do Produto
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="videos">Selecionar Vídeos</Label>
                    <Input
                      id="videos"
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={(e) => handleFileChange('videos', e.target.files)}
                      className="cursor-pointer"
                    />
                  </div>

                  {formData.videos.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Vídeos selecionados:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {formData.videos.map((file, index) => (
                          <div key={index} className="relative">
                            <div className="bg-gray-100 p-2 rounded text-xs text-center">
                              🎥 {file.name.substring(0, 25)}...
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              onClick={() => removeFile('videos', index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botões */}
              <div className="flex space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/marketplace')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  📦 Adicionar Produto
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
