
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, MessageCircle, Settings, Users } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  banner?: string;
}

interface GroupHeaderProps {
  group: Group;
  onBack: () => void;
  isAdmin: boolean;
}

export const GroupHeader: React.FC<GroupHeaderProps> = ({ group, onBack, isAdmin }) => {
  return (
    <div className="relative">
      {/* Banner com overlay */}
      <div className="relative h-48 overflow-hidden">
        {group.banner ? (
          <img 
            src={group.banner} 
            alt={group.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/30" />
        
        {/* Header Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          {/* Top Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <ArrowLeft size={20} />
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Search size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <MessageCircle size={20} />
              </Button>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <Settings size={20} />
                </Button>
              )}
            </div>
          </div>
          
          {/* Group Info */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {group.name}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-white/80">
                <Users size={16} className="mr-1" />
                <span className="text-sm">{group.members} membros</span>
              </div>
              {isAdmin && (
                <Badge className="bg-purple-600/80 text-white border-purple-400">
                  Admin
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
