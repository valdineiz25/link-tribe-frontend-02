
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileInfo from '@/components/ProfileInfo';
import ProfileStats from '@/components/ProfileStats';
import AffiliateLinks from '@/components/AffiliateLinks';
import ProfileTabs from '@/components/ProfileTabs';
import { useToast } from '@/hooks/use-toast';
import { StorageService } from '@/services/storageService';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const isOwnProfile = user?.id === id;
  
  const [activeTab, setActiveTab] = useState('posts');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      console.log('Iniciando upload da foto de perfil:', file.name);
      
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erro no upload",
          description: "Por favor, selecione apenas arquivos de imagem.",
          variant: "destructive",
        });
        return;
      }

      // Validar tamanho (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "A imagem deve ter no máximo 5MB.",
          variant: "destructive",
        });
        return;
      }

      const base64 = await StorageService.fileToBase64(file);
      console.log('Foto de perfil convertida para base64, tamanho:', base64.length);
      setProfileImage(base64);
      
      toast({
        title: "Foto de perfil atualizada ✅",
        description: "Sua foto de perfil foi alterada com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao carregar foto de perfil:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível carregar a imagem. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleCoverImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      console.log('Iniciando upload da foto de capa:', file.name);
      
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erro no upload",
          description: "Por favor, selecione apenas arquivos de imagem.",
          variant: "destructive",
        });
        return;
      }

      // Validar tamanho (10MB max para capa)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "A imagem de capa deve ter no máximo 10MB.",
          variant: "destructive",
        });
        return;
      }

      const base64 = await StorageService.fileToBase64(file);
      console.log('Foto de capa convertida para base64, tamanho:', base64.length);
      setCoverImage(base64);
      
      toast({
        title: "Foto de capa atualizada ✅",
        description: "Sua foto de capa foi alterada com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao carregar foto de capa:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível carregar a imagem. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    toast({
      title: "Aba alterada",
      description: `Visualizando: ${tab === 'posts' ? 'Posts' : tab === 'products' ? 'Produtos' : 'Estatísticas'}`,
    });
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Usuário não encontrado</h2>
        <p className="text-gray-500">Verifique se você está logado corretamente.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header do Perfil com Capa */}
      <Card className="overflow-hidden">
        <ProfileHeader
          coverImage={coverImage}
          profileImage={profileImage}
          isOwnProfile={isOwnProfile}
          onCoverImageChange={handleCoverImageChange}
          onProfileImageChange={handleProfileImageChange}
        />

        <CardHeader className="relative pb-2">
          <div className="flex items-start space-x-6">
            <div className="w-32"></div> {/* Spacer for profile image */}
            
            <ProfileInfo user={user} isOwnProfile={isOwnProfile} />
          </div>
          
          <ProfileStats />
        </CardHeader>
      </Card>

      {/* Links Afiliados */}
      <AffiliateLinks isOwnProfile={isOwnProfile} />

      {/* Abas do Perfil */}
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isOwnProfile={isOwnProfile}
        user={user}
      />
    </div>
  );
};

export default Profile;
