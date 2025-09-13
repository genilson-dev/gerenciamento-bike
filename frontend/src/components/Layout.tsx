import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bike, 
  Users, 
  ShoppingCart, 
  Package, 
  Music, 
  Settings,
  LogOut,
  Home
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Clientes', href: '/clients', icon: Users },
    { name: 'Bikes', href: '/bikes', icon: Bike },
    { name: 'Produtos', href: '/products', icon: Package },
    { name: 'Ordens', href: '/orders', icon: ShoppingCart },
    { name: 'Músicos', href: '/musicians', icon: Music },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ];

  const isCurrentPath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Bike className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Bike Manager
              </span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${
                      isCurrentPath(item.href)
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        isCurrentPath(item.href)
                          ? 'text-primary-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top bar for mobile */}
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <div className="flex items-center justify-between">
            <Bike className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">
              Bike Manager
            </span>
            <button
              onClick={handleLogout}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
