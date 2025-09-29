import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Bike, 
  Users, 
  ShoppingCart, 
  Package, 
  Music, 
  Settings,
  LogOut,
  Plus,
  Tag,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../services/api';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryLoading(true);
    setCategoryError('');

    try {
      await categoryService.create({ name: categoryName });
      setShowCategoryForm(false);
      setCategoryName('');
      setCategoryError('');
    } catch (err: any) {
      setCategoryError(err.message || 'Erro ao criar categoria');
    } finally {
      setCategoryLoading(false);
    }
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
              <button
                onClick={() => setShowCategoryForm(true)}
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <Tag className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">
                  Nova Categoria
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

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Nova Categoria</h2>
              <button
                onClick={() => {
                  setShowCategoryForm(false);
                  setCategoryName('');
                  setCategoryError('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleCategorySubmit}>
              {categoryError && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {categoryError}
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Categoria
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ex: Pneus, Freios, Suspensão"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryForm(false);
                    setCategoryName('');
                    setCategoryError('');
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={categoryLoading}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {categoryLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Tag className="h-4 w-4 mr-2" />
                  )}
                  {categoryLoading ? 'Criando...' : 'Criar Categoria'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
