import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, Image, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePosts, useReels } from '@/hooks/usePosts';
import { StorageService } from '@/services/storageService';

const CreatePost: React.FC = () => {
  const [formData, setFormData] = useState({
    type: 'post',
    description: '',
    productLink: '',
    productName: '',
    currentPrice: '',
    promotionalPrice: '',
    storeName: '',
    category: '',
    mediaFile: null as File | null,
    mediaPreview: null as string | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addPost } = usePosts();
  const { addReel } = useReels();

  const categories = [
    'Saúde',
    'Tecnologia',
    'Moda',
    'Casa e Jardim',
    'Esportes',
    'Educação',
    'Beleza',
    'Eletrônicos',
    'Alimentação'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, adicione uma descrição para o post.",
        variant: "destructive",
      });
      return;
    }

    if (formData.type === 'reel' && !formData.mediaFile) {
      toast({
        title: "Erro",
        description: "Por favor, adicione um vídeo para o reel.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      let mediaBase64 = null;
      if (formData.mediaFile) {
        console.log('Convertendo arquivo para base64:', formData.mediaFile.name);
        mediaBase64 = await StorageService.fileToBase64(formData.mediaFile);
      }

      const postData = {
        type: formData.type,
        description: formData.description.trim(),
        productLink: formData.productLink.trim(),
        productName: formData.productName.trim(),
        currentPrice: formData.currentPrice ? parseFloat(formData.currentPrice) : undefined,
        promotionalPrice: formData.promotionalPrice ? parseFloat(formData.promotionalPrice) : undefined,
        storeName: formData.storeName.trim(),
        category: formData.category,
        media: mediaBase64,
        mediaType: formData.mediaFile?.type || undefined,
        mediaName: formData.mediaFile?.name || undefined,
      };

      console.log('Dados do post a serem salvos:', postData);

      if (formData.type === 'reel') {
        const savedReel = await addReel(postData);
        console.log('Reel criado com sucesso!', savedReel);
        toast({
          title: "Reel criado! 🎥",
          description: "Seu reel foi criado e está disponível na aba Reels!",
        });
      } else {
        const savedPost = await addPost(postData);
        console.log('Post criado com sucesso!', savedPost);
        toast({
          title: "Post criado! 🎉",
          description: "Seu post foi criado e publicado no feed!",
        });
      }
      
      // Aguardar um pouco para mostrar o toast antes de navegar
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao criar post/reel:', error);
      toast({
        title: "Erro",
        description: `Erro ao criar o conteúdo: ${error instanceof Error ? error.message : 'Tente novamente.'}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      console.log('Arquivo selecionado:', file.name, file.type, file.size);
      
      // Verificar tipo de arquivo
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      
      if (formData.type === 'reel' && !isVideo) {
        toast({
          title: "Erro",
          description: "Para reels, selecione apenas arquivos de vídeo.",
          variant: "destructive",
        });
        return;
      }
      
      if (formData.type === 'post' && !isImage) {
        toast({
          title: "Erro",
          description: "Para posts, selecione apenas arquivos de imagem.",
          variant: "destructive",
        });
        return;
      }

      // Verificar tamanho (max 50MB para vídeos, 5MB para imagens)
      const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          title: "Erro",
          description: `O arquivo deve ter no máximo ${isVideo ? '50MB' : '5MB'}.`,
          variant: "destructive",
        });
        return;
      }

      const preview = await StorageService.fileToBase64(file);
      setFormData(prev => ({ 
        ...prev, 
        mediaFile: file,
        mediaPreview: preview
      }));
      
      toast({
        title: "Arquivo carregado! ✅",
        description: `${isVideo ? 'Vídeo' : 'Imagem'} carregado com sucesso!`,
      });
    } catch (error) {
      console.error('Erro ao carregar arquivo:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar o arquivo. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto p-4 max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mr-4"
            disabled={isLoading}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Criar Nova Postagem
          </h1>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Upload className="mr-2" size={24} />
              Compartilhe seu produto incrível! 🚀
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo de conteúdo */}
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de conteúdo</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">
                      <div className="flex items-center">
                        <Image size={16} className="mr-2" />
                        Postagem (imagem/texto)
                      </div>
                    </SelectItem>
                    <SelectItem value="reel">
                      <div className="flex items-center">
                        <Video size={16} className="mr-2" />
                        Reel (vídeo curto)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
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

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Conte sobre seu produto! O que o torna especial? Por que você recomenda?"
                  rows={4}
                  className="resize-none"
                  required
                />
              </div>

              {/* Informações do Produto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Nome do Produto</Label>
                  <Input
                    id="productName"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    placeholder="Ex: Smartphone XYZ Pro"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeName">Loja</Label>
                  <Input
                    id="storeName"
                    value={formData.storeName}
                    onChange={(e) => handleInputChange('storeName', e.target.value)}
                    placeholder="Ex: Amazon, Magazine Luiza"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPrice">Preço Original (R$)</Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    step="0.01"
                    value={formData.currentPrice}
                    onChange={(e) => handleInputChange('currentPrice', e.target.value)}
                    placeholder="199.90"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="promotionalPrice">Preço Promocional (R$)</Label>
                  <Input
                    id="promotionalPrice"
                    type="number"
                    step="0.01"
                    value={formData.promotionalPrice}
                    onChange={(e) => handleInputChange('promotionalPrice', e.target.value)}
                    placeholder="149.90"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productLink">Link do produto afiliado</Label>
                <Input
                  id="productLink"
                  type="url"
                  value={formData.productLink}
                  onChange={(e) => handleInputChange('productLink', e.target.value)}
                  placeholder="https://exemplo.com/produto"
                />
              </div>

              {/* Upload de mídia */}
              <div className="space-y-2">
                <Label htmlFor="media">
                  {formData.type === 'reel' ? 'Vídeo *' : 'Imagem'}
                </Label>
                <Input
                  id="media"
                  type="file"
                  accept={formData.type === 'reel' ? 'video/*' : 'image/*'}
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {formData.mediaPreview && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600 mb-2">
                      ✓ Arquivo selecionado: {formData.mediaFile?.name}
                    </p>
                    <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                      {formData.type === 'reel' ? (
                        <video 
                          src={formData.mediaPreview} 
                          className="w-full h-full object-cover"
                          controls
                        />
                      ) : (
                        <img 
                          src={formData.mediaPreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  {formData.type === 'reel' 
                    ? 'Vídeo até 50MB (MP4, MOV, AVI) - OBRIGATÓRIO para reels'
                    : 'Imagem até 5MB (PNG, JPG, JPEG)'
                  }
                </p>
              </div>

              {/* Botões */}
              <div className="flex space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Publicando...' : `🚀 Publicar ${formData.type === 'reel' ? 'Reel' : 'Post'}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePost;
