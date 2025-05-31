
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useStores } from '@/hooks/useStores';
import { 
  Home, 
  Users, 
  MessageCircle, 
  Settings, 
  User, 
  LogOut, 
  Plus,
  Store,
  BarChart3,
  ShoppingBag,
  Video
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { stores } = useStores();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AN</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                AffiliateNet
              </span>
            </Link>
            
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/feed" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AN</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              AffiliateNet
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link to="/feed">
              <Button 
                variant={isActive('/feed') ? 'default' : 'ghost'} 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Home size={16} />
                <span>Feed</span>
              </Button>
            </Link>

            <Link to="/reels">
              <Button 
                variant={isActive('/reels') ? 'default' : 'ghost'} 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Video size={16} />
                <span>Reels</span>
              </Button>
            </Link>

            <Link to="/marketplace">
              <Button 
                variant={isActive('/marketplace') ? 'default' : 'ghost'} 
                size="sm"
                className="flex items-center space-x-2"
              >
                <ShoppingBag size={16} />
                <span>Marketplace</span>
              </Button>
            </Link>

            <Link to="/my-store">
              <Button 
                variant={isActive('/my-store') ? 'default' : 'ghost'} 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Store size={16} />
                <span>Minha Loja</span>
                {stores.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {stores.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button 
                variant={isActive('/dashboard') ? 'default' : 'ghost'} 
                size="sm"
                className="flex items-center space-x-2"
              >
                <BarChart3 size={16} />
                <span>Dashboard</span>
              </Button>
            </Link>

            <Link to="/groups">
              <Button 
                variant={isActive('/groups') ? 'default' : 'ghost'} 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Users size={16} />
                <span>Grupos</span>
              </Button>
            </Link>

            <Link to="/chat">
              <Button 
                variant={isActive('/chat') ? 'default' : 'ghost'} 
                size="sm"
                className="flex items-center space-x-2"
              >
                <MessageCircle size={16} />
                <span>Chat</span>
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Link to="/create-post">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Plus size={16} className="mr-1" />
                <span className="hidden sm:inline">Criar</span>
              </Button>
            </Link>

            <div className="flex items-center space-x-2">
              <Link to={`/profile/${user.id}`}>
                <Button variant="ghost" size="sm">
                  <User size={16} className="mr-1" />
                  <span className="hidden sm:inline">{user.name}</span>
                </Button>
              </Link>

              <Link to="/settings">
                <Button variant="ghost" size="sm">
                  <Settings size={16} />
                </Button>
              </Link>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
