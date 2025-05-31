
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useStores } from '@/hooks/useStores';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Store, 
  ChevronDown, 
  Plus,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileSwitcherProps {
  currentProfile: 'personal' | 'store';
  onProfileChange: (profile: 'personal' | 'store', storeId?: string) => void;
  selectedStoreId?: string;
}

const ProfileSwitcher: React.FC<ProfileSwitcherProps> = ({
  currentProfile,
  onProfileChange,
  selectedStoreId
}) => {
  const { user } = useAuth();
  const { stores } = useStores();
  const navigate = useNavigate();

  const selectedStore = stores.find(store => store.id === selectedStoreId);

  const handleCreateStore = () => {
    navigate('/create-store');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage 
                src={currentProfile === 'store' ? selectedStore?.logo || '' : ''} 
                alt="Profile" 
              />
              <AvatarFallback className="bg-blue-600 text-white">
                {currentProfile === 'personal' ? (
                  user?.name?.charAt(0)?.toUpperCase() || 'U'
                ) : (
                  selectedStore?.name?.charAt(0)?.toUpperCase() || 'S'
                )}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-medium text-sm">
                {currentProfile === 'personal' 
                  ? user?.name 
                  : selectedStore?.name || 'Loja'
                }
              </p>
              <p className="text-xs text-gray-600">
                {currentProfile === 'personal' ? 'Perfil Pessoal' : 'Perfil da Loja'}
              </p>
            </div>
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 bg-white/95 backdrop-blur-sm border border-gray-200" align="start">
        <DropdownMenuLabel className="font-semibold">Alternar Perfil</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Perfil Pessoal */}
        <DropdownMenuItem 
          onClick={() => onProfileChange('personal')}
          className="cursor-pointer p-3"
        >
          <div className="flex items-center space-x-3 w-full">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-blue-600 text-white">
                <User size={16} />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-600">Perfil Pessoal</p>
            </div>
            {currentProfile === 'personal' && (
              <CheckCircle size={16} className="text-green-600" />
            )}
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-sm">Suas Lojas ({stores.length})</DropdownMenuLabel>

        {/* Lojas do usuário */}
        {stores.map((store) => (
          <DropdownMenuItem 
            key={store.id}
            onClick={() => onProfileChange('store', store.id)}
            className="cursor-pointer p-3"
          >
            <div className="flex items-center space-x-3 w-full">
              <Avatar className="w-10 h-10">
                <AvatarImage src={store.logo || ''} alt={store.name} />
                <AvatarFallback className="bg-purple-600 text-white">
                  <Store size={16} />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{store.name}</p>
                <p className="text-sm text-gray-600">
                  {store.catalogs?.length || 0} catálogos
                </p>
              </div>
              {currentProfile === 'store' && selectedStoreId === store.id && (
                <CheckCircle size={16} className="text-green-600" />
              )}
            </div>
          </DropdownMenuItem>
        ))}

        {/* Criar nova loja */}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleCreateStore}
          className="cursor-pointer p-3 bg-blue-50 hover:bg-blue-100"
        >
          <div className="flex items-center space-x-3 w-full text-blue-600">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Plus size={16} />
            </div>
            <div>
              <p className="font-medium">Criar Nova Loja</p>
              <p className="text-sm">Adicionar mais uma loja</p>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileSwitcher;
