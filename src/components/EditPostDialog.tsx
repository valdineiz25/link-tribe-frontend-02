
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Edit, Upload, Link as LinkIcon } from 'lucide-react';

interface Post {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  image?: string;
  productLink?: string;
  category: string;
  likes: number;
  comments: number;
  timestamp: string;
  productName?: string;
  currentPrice?: number;
  promotionalPrice?: number;
  storeName?: string;
}

interface EditPostDialogProps {
  post: Post;
  onSave: (updatedPost: Post) => void;
}

const EditPostDialog: React.FC<EditPostDialogProps> = ({ post, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    content: post.content,
    productName: post.productName || '',
    currentPrice: post.currentPrice || 0,
    promotionalPrice: post.promotionalPrice || 0,
    storeName: post.storeName || '',
    productLink: post.productLink || '',
    image: post.image || '',
    category: post.category
  });

  const categories = [
    'Saúde',
    'Tecnologia', 
    'Moda',
    'Casa e Jardim',
    'Esportes',
    'Educação',
    'Eletrônicos',
    'Beleza'
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const updatedPost: Post = {
      ...post,
      content: formData.content,
      productName: formData.productName,
      currentPrice: formData.currentPrice,
      promotionalPrice: formData.promotionalPrice,
      storeName: formData.storeName,
      productLink: formData.productLink,
      image: formData.image,
      category: formData.category
    };
    
    onSave(updatedPost);
    setIsOpen(false);
  };

  const discountPercentage = formData.currentPrice && formData.promotionalPrice
    ? Math.round(((formData.currentPrice - formData.promotionalPrice) / formData.currentPrice) * 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit size={16} className="mr-2" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-600">
            Editar Post de Produto
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Conteúdo do Post */}
          <div>
            <Label htmlFor="content" className="text-sm font-semibold">
              Descrição do Post
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Descreva seu produto..."
              className="min-h-[100px] mt-2"
            />
          </div>

          {/* Informações do Produto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="productName" className="text-sm font-semibold">
                Nome do Produto *
              </Label>
              <Input
                id="productName"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                placeholder="Ex: iPhone 15 Pro Max"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="storeName" className="text-sm font-semibold">
                Nome da Loja
              </Label>
              <Input
                id="storeName"
                value={formData.storeName}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
                placeholder="Ex: Apple Store"
                className="mt-2"
              />
            </div>
          </div>

          {/* Preços */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentPrice" className="text-sm font-semibold">
                Preço Atual (R$)
              </Label>
              <Input
                id="currentPrice"
                type="number"
                value={formData.currentPrice}
                onChange={(e) => handleInputChange('currentPrice', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="mt-2"
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="promotionalPrice" className="text-sm font-semibold">
                Preço Promocional (R$)
              </Label>
              <Input
                id="promotionalPrice"
                type="number"
                value={formData.promotionalPrice}
                onChange={(e) => handleInputChange('promotionalPrice', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="mt-2"
                step="0.01"
              />
              {discountPercentage > 0 && (
                <p className="text-xs text-green-600 mt-1">
                  Desconto de {discountPercentage}%
                </p>
              )}
            </div>
          </div>

          {/* Categoria */}
          <div>
            <Label htmlFor="category" className="text-sm font-semibold">
              Categoria
            </Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Link do Afiliado */}
          <div>
            <Label htmlFor="productLink" className="text-sm font-semibold">
              Link de Afiliado
            </Label>
            <div className="flex mt-2">
              <Input
                id="productLink"
                value={formData.productLink}
                onChange={(e) => handleInputChange('productLink', e.target.value)}
                placeholder="https://..."
                className="flex-1"
              />
              <Button variant="outline" size="icon" className="ml-2">
                <LinkIcon size={16} />
              </Button>
            </div>
          </div>

          {/* Foto do Produto */}
          <div>
            <Label htmlFor="image" className="text-sm font-semibold">
              URL da Foto do Produto
            </Label>
            <div className="flex mt-2">
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://..."
                className="flex-1"
              />
              <Button variant="outline" size="icon" className="ml-2">
                <Upload size={16} />
              </Button>
            </div>
            {formData.image && (
              <div className="mt-3">
                <img 
                  src={formData.image} 
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Preview do Card */}
          <div className="border-t pt-4">
            <Label className="text-sm font-semibold text-gray-700">
              Preview do Post
            </Label>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-lg text-orange-600 mb-2">
                  {formData.productName || 'Nome do Produto'}
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  {formData.content.substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {formData.promotionalPrice > 0 && (
                      <span className="text-lg font-bold text-green-600">
                        R$ {formData.promotionalPrice.toFixed(2)}
                      </span>
                    )}
                    {formData.currentPrice > 0 && (
                      <span className={`text-sm ${formData.promotionalPrice > 0 ? 'line-through text-gray-500' : 'text-lg font-bold text-orange-600'}`}>
                        R$ {formData.currentPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {formData.storeName && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {formData.storeName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
