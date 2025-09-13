import React, { useState, useEffect } from 'react';
import { Order, Client, Bike, User, OrderItem, Product } from '../types';
import { orderService, clientService, bikeService, itemService, productService } from '../services/api';
import { Plus, Edit, Trash2, Search, ShoppingCart, User as UserIcon, Bike as BikeIcon, DollarSign, Eye, X, Package, CheckCircle } from 'lucide-react';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [orderTotals, setOrderTotals] = useState<{[key: string]: number}>({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newItem, setNewItem] = useState({
    product_id: '',
    quantity: 1
  });
  const [formData, setFormData] = useState({
    status: '',
    client_id: '',
    bike_id: ''
  });

  const statusOptions = [
    { value: 'aberto', label: 'Aberto' },
    { value: 'em_andamento', label: 'Em Andamento' },
    { value: 'concluido', label: 'Concluído' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  useEffect(() => {
    loadOrders();
    loadClients();
    loadBikes();
    loadProducts();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.list();
      setOrders(response.data);
      
      // Carregar totais para cada ordem
      const totals: {[key: string]: number} = {};
      for (const order of response.data) {
        try {
          const totalResponse = await orderService.getTotal(order.id);
          totals[order.id] = totalResponse.data.total || 0;
        } catch (error) {
          console.error(`Erro ao carregar total da ordem ${order.id}:`, error);
          totals[order.id] = 0;
        }
      }
      setOrderTotals(totals);
    } catch (error) {
      console.error('Erro ao carregar ordens:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadClients = async () => {
    try {
      const response = await clientService.list();
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  const loadBikes = async () => {
    try {
      const response = await bikeService.list();
      setBikes(response.data);
    } catch (error) {
      console.error('Erro ao carregar bikes:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await productService.list();
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Dados do formulário:', formData);
      if (editingOrder) {
        console.log('Atualizando ordem:', editingOrder.id);
        await orderService.update(editingOrder.id, {
          status: formData.status,
          client_id: formData.client_id,
          bike_id: formData.bike_id
        });
      } else {
        console.log('Criando nova ordem...');
        const response = await orderService.create(formData);
        console.log('Resposta da criação:', response);
      }
      setShowForm(false);
      setEditingOrder(null);
      setFormData({ status: '', client_id: '', bike_id: '' });
      loadOrders();
    } catch (error) {
      console.error('Erro ao salvar ordem:', error);
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setFormData({
      status: order.status,
      client_id: order.client_id,
      bike_id: order.bike_id
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta ordem?')) {
      try {
        await orderService.delete(id);
        loadOrders();
      } catch (error) {
        console.error('Erro ao excluir ordem:', error);
      }
    }
  };

  const handleShowDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleManageItems = (order: Order) => {
    setSelectedOrder(order);
    setShowItemsModal(true);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !newItem.product_id) return;

    try {
      await itemService.add({
        order_id: selectedOrder.id,
        product_id: newItem.product_id,
        quantity: newItem.quantity
      });
      
      // Recarregar ordens para atualizar os itens
      await loadOrders();
      
      // Limpar formulário
      setNewItem({ product_id: '', quantity: 1 });
      
      // Atualizar a ordem selecionada
      const updatedOrder = orders.find(o => o.id === selectedOrder.id);
      if (updatedOrder) {
        setSelectedOrder(updatedOrder);
      }
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!selectedOrder) return;

    try {
      await itemService.remove(itemId);
      
      // Recarregar ordens para atualizar os itens
      await loadOrders();
      
      // Atualizar a ordem selecionada
      const updatedOrder = orders.find(o => o.id === selectedOrder.id);
      if (updatedOrder) {
        setSelectedOrder(updatedOrder);
      }
    } catch (error) {
      console.error('Erro ao remover item:', error);
    }
  };

  const handleFinishOrder = async (orderId: string) => {
    if (window.confirm('Tem certeza que deseja concluir esta ordem? Esta ação não pode ser desfeita.')) {
      try {
        await orderService.finish(orderId);
        await loadOrders(); // Recarregar as ordens para atualizar o status
        alert('Ordem concluída com sucesso!');
      } catch (error: any) {
        console.error('Erro ao finalizar ordem:', error);
        alert(error.response?.data?.error || 'Erro ao finalizar ordem');
      }
    }
  };

  const getClientName = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Cliente não encontrado';
  };

  const getBikeModel = (bikeId: string) => {
    const bike = bikes.find(b => b.id === bikeId);
    return bike ? bike.model : 'Bike não encontrada';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto':
        return 'bg-yellow-100 text-yellow-800';
      case 'em_andamento':
        return 'bg-blue-100 text-blue-800';
      case 'concluido':
        return 'bg-green-100 text-green-800';
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.label : status;
  };

  const calculateOrderTotal = (order: Order) => {
    if (!order.items || order.items.length === 0) {
      return 0;
    }

    return order.items.reduce((total, item) => {
      const price = parseFloat(item.product?.price || '0');
      return total + (price * item.quantity);
    }, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const filteredOrders = orders.filter(order =>
    getClientName(order.client_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getBikeModel(order.bike_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAllOrders = filteredOrders.reduce((total, order) => {
    return total + (orderTotals[order.id] || calculateOrderTotal(order));
  }, 0);

  const totalItems = filteredOrders.reduce((total, order) => {
    return total + (order.items?.length || 0);
  }, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ordens de Serviço</h1>
            <p className="text-gray-600">Gerencie as ordens de serviço do sistema</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Ordem
          </button>
        </div>
        
        {/* Resumo de totais */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total de Ordens</p>
                <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAllOrders)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Plus className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total de Itens</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar ordens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {editingOrder ? 'Editar Ordem' : 'Nova Ordem'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Selecione um status</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cliente
                </label>
                <select
                  value={formData.client_id}
                  onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bike
                </label>
                <select
                  value={formData.bike_id}
                  onChange={(e) => setFormData({ ...formData, bike_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Selecione uma bike</option>
                  {bikes.map((bike) => (
                    <option key={bike.id} value={bike.id}>
                      {bike.model} - {getClientName(bike.owner_id)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingOrder(null);
                    setFormData({ status: '', client_id: '', bike_id: '' });
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {editingOrder ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div className="bg-white shadow rounded-lg">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhuma ordem encontrada
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Tente ajustar os termos de busca.' : 'Comece criando uma nova ordem.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bike
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Criação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {getClientName(order.client_id)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <BikeIcon className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {getBikeModel(order.bike_id)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {formatCurrency(orderTotals[order.id] || calculateOrderTotal(order))}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.items?.length || 0} itens
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleManageItems(order)}
                          className="text-green-600 hover:text-green-900"
                          title="Gerenciar itens"
                        >
                          <Package className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleShowDetails(order)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Ver detalhes"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {order.status !== 'concluido' && order.status !== 'cancelado' && (
                          <button
                            onClick={() => handleFinishOrder(order.id)}
                            className="text-emerald-600 hover:text-emerald-900"
                            title="Concluir ordem"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(order)}
                          className="text-primary-600 hover:text-primary-900"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Detalhes da Ordem */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Detalhes da Ordem</h2>
              <div className="flex items-center space-x-2">
                {selectedOrder.status !== 'concluido' && selectedOrder.status !== 'cancelado' && (
                  <button
                    onClick={() => handleFinishOrder(selectedOrder.id)}
                    className="flex items-center px-3 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm"
                    title="Concluir ordem"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Concluir
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Informações da Ordem</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Status:</span> {getStatusLabel(selectedOrder.status)}</p>
                  <p><span className="font-medium">Cliente:</span> {getClientName(selectedOrder.client_id)}</p>
                  <p><span className="font-medium">Bike:</span> {getBikeModel(selectedOrder.bike_id)}</p>
                  <p><span className="font-medium">Data:</span> {new Date(selectedOrder.created_at).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Resumo Financeiro</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Total:</span> {formatCurrency(orderTotals[selectedOrder.id] || calculateOrderTotal(selectedOrder))}</p>
                  <p><span className="font-medium">Itens:</span> {selectedOrder.items?.length || 0}</p>
                </div>
              </div>
            </div>

            {selectedOrder.items && selectedOrder.items.length > 0 ? (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">Itens da Ordem</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Produto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantidade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Preço Unitário
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item) => {
                        const unitPrice = parseFloat(item.product?.price || '0');
                        const subtotal = unitPrice * item.quantity;
                        return (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.product?.name || 'Produto não encontrado'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatCurrency(unitPrice)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatCurrency(subtotal)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                          Total:
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                          {formatCurrency(orderTotals[selectedOrder.id] || calculateOrderTotal(selectedOrder))}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum item adicionado</h3>
                <p className="mt-1 text-sm text-gray-500">Esta ordem ainda não possui itens.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Gerenciamento de Itens */}
      {showItemsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Gerenciar Itens da Ordem</h2>
              <button
                onClick={() => setShowItemsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Formulário para adicionar item */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">Adicionar Item</h3>
                <form onSubmit={handleAddItem} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Produto
                    </label>
                    <select
                      value={newItem.product_id}
                      onChange={(e) => setNewItem({ ...newItem, product_id: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Selecione um produto</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {formatCurrency(parseFloat(product.price))}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantidade
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Adicionar Item
                  </button>
                </form>
              </div>

              {/* Lista de itens atuais */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  Itens Atuais ({selectedOrder.items?.length || 0})
                </h3>
                
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {selectedOrder.items.map((item) => {
                      const unitPrice = parseFloat(item.product?.price || '0');
                      const subtotal = unitPrice * item.quantity;
                      return (
                        <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {item.product?.name || 'Produto não encontrado'}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Quantidade: {item.quantity} | 
                                Preço: {formatCurrency(unitPrice)} | 
                                Subtotal: {formatCurrency(subtotal)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-900 ml-2"
                              title="Remover item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum item adicionado</h3>
                    <p className="mt-1 text-sm text-gray-500">Adicione produtos a esta ordem.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Resumo do total */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Total da Ordem:</span>
                <span className="text-xl font-bold text-primary-600">
                  {formatCurrency(orderTotals[selectedOrder.id] || calculateOrderTotal(selectedOrder))}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
