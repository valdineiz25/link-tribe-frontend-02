
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { useStores } from '@/hooks/useStores';
import { UserTypeSwitcher } from '@/components/UserTypeSwitcher';
import { 
  Home, 
  Users, 
  MessageCircle, 
  Settings, 
  LogOut, 
  Store,
  BarChart3,
  ShoppingBag,
  Video,
  X
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isAffiliate, isConsumer } = useUserRole();
  const { stores } = useStores();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserTypeSwitcher, setShowUserTypeSwitcher] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determinar o link do feed baseado no tipo de usuário
  const getFeedLink = () => {
    if (isAffiliate) return '/affiliate-feed';
    if (isConsumer) return '/consumer-feed';
    return '/feed'; // fallback
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
    <>
      <nav className="bg-white shadow-lg border-b border-yellow-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to={getFeedLink()} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AN</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                AffiliateNet
              </span>
            </Link>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-4">
                <Link to={getFeedLink()}>
                  <Button 
                    variant={isActive('/affiliate-feed') || isActive('/consumer-feed') ? 'default' : 'ghost'} 
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

                {/* Dashboard apenas para afiliados */}
                {isAffiliate && (
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
                )}

                {/* Apenas afiliados veem a loja */}
                {isAffiliate && (
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
                )}

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

                {/* User Type Indicator */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserTypeSwitcher(true)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isAffiliate 
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {isAffiliate ? (
                    <>
                      <Store size={12} className="mr-1" />
                      Afiliado
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={12} className="mr-1" />
                      Comprador
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4">
            <div className="flex flex-col space-y-2">
              <Link to={getFeedLink()} onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <Home size={16} className="mr-2" />
                  Feed
                </Button>
              </Link>
              {isAffiliate && (
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <BarChart3 size={16} className="mr-2" />
                    Dashboard
                  </Button>
                </Link>
              )}
              <Link to="/marketplace" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingBag size={16} className="mr-2" />
                  Marketplace
                </Button>
              </Link>
              <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageCircle size={16} className="mr-2" />
                  Chat
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* User Type Switcher Modal */}
      {showUserTypeSwitcher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Alterar Tipo de Conta</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowUserTypeSwitcher(false)}
              >
                <X size={20} />
              </Button>
            </div>
            <div className="p-4">
              <UserTypeSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
