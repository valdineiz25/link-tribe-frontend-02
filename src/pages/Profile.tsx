
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProfileHeader from '@/components/ProfileHeader';
import ProfileInfo from '@/components/ProfileInfo';
import ProfileStats from '@/components/ProfileStats';
import AffiliateLinks from '@/components/AffiliateLinks';
import ProfileTabs from '@/components/ProfileTabs';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const isOwnProfile = user?.id === id;
  
  const [activeTab, setActiveTab] = useState('posts');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

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
        setActiveTab={setActiveTab}
        isOwnProfile={isOwnProfile}
        user={user}
      />
    </div>
  );
};

export default Profile;
