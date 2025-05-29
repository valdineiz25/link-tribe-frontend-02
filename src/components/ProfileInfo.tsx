
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Edit } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}

interface ProfileInfoProps {
  user: User;
  isOwnProfile: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, isOwnProfile }) => {
  return (
    <div className="flex-1 pt-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>{user.city}, {user.state}</span>
            </div>
          </div>
        </div>
        
        {isOwnProfile && (
          <Button variant="outline">
            <Edit size={16} className="mr-2" />
            Editar Perfil
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
