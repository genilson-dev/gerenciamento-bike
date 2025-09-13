import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Bike, 
  Users, 
  ShoppingCart, 
  Package, 
  Music, 
  Settings,
  LogOut,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Clientes',
      description: 'Gerenciar clientes',
      icon: Users,
      color: 'bg-blue-500',
      href: '/clients'
    },
    {
      title: 'Bikes',
      description: 'Gerenciar bikes',
      icon: Bike,
      color: 'bg-green-500',
      href: '/bikes'
    },
    {
      title: 'Produtos',
      description: 'Gerenciar produtos e categorias',
      icon: Package,
      color: 'bg-purple-500',
      href: '/products'
    },
    {
      title: 'Ordens',
      description: 'Gerenciar ordens de serviço',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      href: '/orders'
    },
    {
      title: 'Músicos',
      description: 'Gerenciar músicos',
      icon: Music,
      color: 'bg-pink-500',
      href: '/musicians'
    },
    {
      title: 'Configurações',
      description: 'Configurações do sistema',
      icon: Settings,
      color: 'bg-gray-500',
      href: '/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Bike className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Gerenciamento de Bikes
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Olá, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard
            </h2>
            <p className="text-gray-600">
              Gerencie seu sistema de bikes de forma eficiente
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Ações Rápidas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => navigate('/clients/new')}
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Plus className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">
                  Novo Cliente
                </span>
              </button>
              <button
                onClick={() => navigate('/bikes/new')}
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Plus className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">
                  Nova Bike
                </span>
              </button>
              <button
                onClick={() => navigate('/orders/new')}
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Plus className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">
                  Nova Ordem
                </span>
              </button>
              <button
                onClick={() => navigate('/products/new')}
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Plus className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">
                  Novo Produto
                </span>
              </button>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => navigate(item.href)}
                  className="group relative bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <div className={`${item.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4 text-left">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
