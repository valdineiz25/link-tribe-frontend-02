
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  ShoppingBag, 
  Users, 
  MessageCircle, 
  Settings,
  User,
  LogOut,
  BarChart3,
  Video
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/feed', icon: Home, label: 'Feed' },
    { path: '/reels', icon: Video, label: 'Reels' },
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { path: '/groups', icon: Users, label: 'Grupos' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="w-full">
        {/* Faixa preta no topo */}
        <div className="w-full h-2 bg-gradient-to-r from-black via-gray-900 to-black"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Faixa preta no topo */}
      <div className="w-full h-2 bg-gradient-to-r from-black via-gray-900 to-black"></div>
      
      {/* Navbar principal */}
      <nav className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 shadow-lg border-b border-amber-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/feed" className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                AffiliateNet
              </Link>
            </div>

            {/* Navigation Items - Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-amber-700 bg-amber-100 shadow-sm border border-amber-200'
                        : 'text-gray-700 hover:text-amber-700 hover:bg-amber-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Link
                to={`/profile/${user?.id}`}
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-700 transition-colors"
              >
                <User size={20} />
                <span className="hidden sm:block">{user?.name}</span>
              </Link>
              
              <Link to="/settings">
                <Button variant="ghost" size="icon" className="hover:bg-amber-100 hover:text-amber-700">
                  <Settings size={20} />
                </Button>
              </Link>
              
              <Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-red-100 hover:text-red-700">
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-amber-200">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center p-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-amber-700'
                      : 'text-gray-600 hover:text-amber-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
