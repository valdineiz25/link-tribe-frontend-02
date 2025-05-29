
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
  LogOut
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Feed' },
    { path: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { path: '/groups', icon: Users, label: 'Grupos' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
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
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-100'
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
              className="flex items-center space-x-2 text-gray-600 hover:text-primary"
            >
              <User size={20} />
              <span className="hidden sm:block">{user?.name}</span>
            </Link>
            
            <Link to="/settings">
              <Button variant="ghost" size="icon">
                <Settings size={20} />
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-white">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-md ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-600'
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
  );
};

export default Navbar;
