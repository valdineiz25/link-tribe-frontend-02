
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
  Video,
  Search,
  Bell,
  Menu
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso!",
    });
    navigate('/');
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notificações",
      description: "Você não tem novas notificações.",
    });
  };

  const handleMessageClick = () => {
    navigate('/chat');
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    
    if (searchTerm?.trim()) {
      toast({
        title: "Busca realizada",
        description: `Procurando por: "${searchTerm}"`,
      });
      // Aqui você pode implementar a lógica de busca
    }
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
        {/* Facebook/Instagram style thin blue bar */}
        <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Facebook/Instagram style thin colored bar */}
      <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
      
      {/* Main navbar - Facebook/Instagram style */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Facebook style */}
            <div className="flex items-center">
              <Link 
                to="/feed" 
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                AffiliateNet
              </Link>
            </div>

            {/* Search bar - Facebook style (desktop) */}
            <div className="hidden md:flex flex-1 max-w-xs mx-8">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="search"
                  type="text"
                  placeholder="Pesquisar..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </div>

            {/* Navigation Items - Desktop (Instagram/Facebook style) */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    title={item.label}
                  >
                    <Icon size={24} />
                  </Link>
                );
              })}
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full w-10 h-10"
                onClick={handleNotificationClick}
                title="Notificações"
              >
                <Bell size={20} className="text-gray-600" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full w-10 h-10"
                onClick={handleMessageClick}
                title="Mensagens"
              >
                <MessageCircle size={20} className="text-gray-600" />
              </Button>
              
              {/* Profile dropdown trigger */}
              <div className="relative">
                <Link
                  to={`/profile/${user?.id}`}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Meu Perfil"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name}</span>
                </Link>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout} 
                className="rounded-full w-10 h-10 text-gray-600 hover:text-red-600"
                title="Sair"
              >
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Instagram style bottom bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex justify-around items-center py-2">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600'
                  }`}
                  title={item.label}
                >
                  <Icon size={24} />
                </Link>
              );
            })}
            
            {/* Profile in mobile nav */}
            <Link
              to={`/profile/${user?.id}`}
              className="flex flex-col items-center justify-center w-12 h-12"
              title="Perfil"
            >
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
