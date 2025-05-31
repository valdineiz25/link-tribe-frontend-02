import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useStores } from '@/hooks/useStores';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileInfo from '@/components/ProfileInfo';
import ProfileStats from '@/components/ProfileStats';
import AffiliateLinks from '@/components/AffiliateLinks';
import ProfileTabs from '@/components/ProfileTabs';
import ProfileSwitcher from '@/components/ProfileSwitcher';
import { useToast } from '@/hooks/use-toast';
import { StorageService } from '@/services/storageService';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { stores } = useStores();
  const { toast } = useToast();
  const isOwnProfile = user?.id === id;
  
  const [activeTab, setActiveTab] = useState('posts');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  
  // Estados para alternância de perfil
  const [currentProfile, setCurrentProfile] = useState<'personal' | 'store'>('personal');
  const [selectedStoreId, setSelectedStoreId] = useState<string | undefined>(undefined);

  const selectedStore = stores.find(store => store.id === selectedStoreId);

  const handleProfileChange = (profile: 'personal' | 'store', storeId?: string) => {
    setCurrentProfile(profile);
    setSelectedStoreId(storeId);
    
    toast({
      title: "Perfil Alternado ✅",
      description: profile === 'personal' 
        ? "Visualizando seu perfil pessoal" 
        : `Visualizando perfil da loja: ${stores.find(s => s.id === storeId)?.name}`,
    });
  };

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

  // Dados para exibição baseados no perfil selecionado
  const displayData = currentProfile === 'personal' 
    ? {
        name: user.name,
        image: profileImage,
        cover: coverImage,
        type: 'Perfil Pessoal'
      }
    : {
        name: selectedStore?.name || 'Loja',
        image: selectedStore?.logo,
        cover: coverImage,
        type: 'Perfil da Loja',
        description: selectedStore?.description,
        catalogs: selectedStore?.catalogs?.length || 0
      };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Switcher - Apenas para o próprio usuário */}
      {isOwnProfile && (
        <div className="max-w-sm">
          <ProfileSwitcher
            currentProfile={currentProfile}
            selectedStoreId={selectedStoreId}
            onProfileChange={handleProfileChange}
          />
        </div>
      )}

      {/* Header do Perfil com Capa */}
      <Card className="overflow-hidden">
        <ProfileHeader
          coverImage={displayData.cover}
          profileImage={displayData.image}
          isOwnProfile={isOwnProfile}
          onCoverImageChange={handleCoverImageChange}
          onProfileImageChange={handleProfileImageChange}
        />

        <CardHeader className="relative pb-2">
          <div className="flex items-start space-x-6">
            <div className="w-32"></div> {/* Spacer for profile image */}
            
            {currentProfile === 'personal' ? (
              <ProfileInfo user={user} isOwnProfile={isOwnProfile} />
            ) : (
              <div className="flex-1 pt-4">
                <div>
                  <h1 className="text-2xl font-bold">{displayData.name}</h1>
                  <p className="text-sm text-blue-600 font-medium mb-2">{displayData.type}</p>
                  {selectedStore?.description && (
                    <p className="text-gray-600 mb-2">{selectedStore.description}</p>
                  )}
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>📚 {displayData.catalogs} catálogos</p>
                    <p>🏪 Loja criada em {new Date(selectedStore?.createdAt || '').toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            )}
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

      {/* Informações da Loja (se perfil de loja estiver selecionado) */}
      {currentProfile === 'store' && selectedStore && (
        <Card className="shadow-lg border border-slate-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <h3 className="text-lg font-semibold">Catálogos da Loja</h3>
          </CardHeader>
          <CardContent>
            {selectedStore.catalogs && selectedStore.catalogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedStore.catalogs.map((catalog: any, index: number) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{catalog.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{catalog.description}</p>
                      <p className="text-xs text-blue-600">
                        {catalog.products?.length || 0} produtos
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">
                Esta loja ainda não possui catálogos.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
