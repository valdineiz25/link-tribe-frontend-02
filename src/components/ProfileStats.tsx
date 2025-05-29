
import React from 'react';

const ProfileStats: React.FC = () => {
  return (
    <div className="flex space-x-6 mt-4">
      <div className="text-center">
        <div className="font-bold">234</div>
        <div className="text-sm text-gray-600">Posts</div>
      </div>
      <div className="text-center">
        <div className="font-bold">1.2k</div>
        <div className="text-sm text-gray-600">Seguidores</div>
      </div>
      <div className="text-center">
        <div className="font-bold">456</div>
        <div className="text-sm text-gray-600">Seguindo</div>
      </div>
    </div>
  );
};

export default ProfileStats;
