
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, User } from 'lucide-react';

interface ProfileHeaderProps {
  coverImage: string | null;
  profileImage: string | null;
  isOwnProfile: boolean;
  onCoverImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onProfileImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  coverImage,
  profileImage,
  isOwnProfile,
  onCoverImageChange,
  onProfileImageChange
}) => {
  return (
    <>
      {/* Imagem de Capa */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        {coverImage && (
          <img 
            src={coverImage} 
            alt="Capa do perfil" 
            className="w-full h-full object-cover"
          />
        )}
        {isOwnProfile && (
          <div className="absolute top-4 right-4">
            <label htmlFor="cover-upload" className="cursor-pointer">
              <Button size="sm" className="bg-black/50 hover:bg-black/70 text-white">
                <Camera size={16} className="mr-2" />
                Alterar Capa
              </Button>
            </label>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              onChange={onCoverImageChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Foto de Perfil */}
      <div className="relative -mt-16">
        <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt="Foto do perfil" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <User size={48} className="text-gray-500" />
            </div>
          )}
        </div>
        {isOwnProfile && (
          <label htmlFor="profile-upload" className="absolute bottom-2 right-2 cursor-pointer">
            <div className="bg-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors">
              <Camera size={16} className="text-white" />
            </div>
          </label>
        )}
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={onProfileImageChange}
          className="hidden"
        />
      </div>
    </>
  );
};

export default ProfileHeader;
