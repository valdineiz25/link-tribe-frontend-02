
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Image, Link as LinkIcon } from 'lucide-react';

interface PostCreationProps {
  isCreating: boolean;
  onToggleCreating: (creating: boolean) => void;
}

const PostCreation: React.FC<PostCreationProps> = ({ isCreating, onToggleCreating }) => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <CardContent className="p-6">
        {!isCreating ? (
          <Button 
            onClick={handleCreatePost}
            className="w-full bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg py-3"
            size="lg"
          >
            <Plus size={24} className="mr-2" />
            🔥 Criar novo post de produto
          </Button>
        ) : (
          <div className="space-y-4">
            <Textarea 
              placeholder="O que você quer compartilhar hoje? Descreva seu produto incrível..."
              className="min-h-[120px] text-gray-800 border-white/30"
            />
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Image size={16} className="mr-2" />
                  Foto
                </Button>
                <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <LinkIcon size={16} className="mr-2" />
                  Link Afiliado
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onToggleCreating(false)}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Cancelar
                </Button>
                <Button 
                  size="sm"
                  onClick={handleCreatePost}
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold"
                >
                  🚀 Publicar
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCreation;
