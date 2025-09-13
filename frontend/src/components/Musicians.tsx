import React, { useState, useEffect } from 'react';
import { Musico } from '../types';
import { musicoService } from '../services/api';
import { Plus, Edit, Trash2, Search, Music, User } from 'lucide-react';

const Musicians: React.FC = () => {
  const [musicians, setMusicians] = useState<Musico[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMusician, setEditingMusician] = useState<Musico | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    sexo: 'M',
    encarregado_local: false,
    encarregado_regional: false,
    instrutor: false,
    examinadora: false,
    aluno: false,
    ensaios: false,
    rjm: false,
    cultos_oficiais: false,
    oficializado: false,
    possui_instrumento_proprio: false,
    instrumento: false,
    tonalidade: ''
  });

  useEffect(() => {
    loadMusicians();
  }, []);

  const loadMusicians = async () => {
    try {
      setLoading(true);
      const response = await musicoService.list();
      setMusicians(response.data);
    } catch (error) {
      console.error('Erro ao carregar músicos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMusician) {
        await musicoService.update(editingMusician.id, formData);
      } else {
        await musicoService.create(formData);
      }
      setShowForm(false);
      setEditingMusician(null);
      resetForm();
      loadMusicians();
    } catch (error) {
      console.error('Erro ao salvar músico:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sexo: 'M',
      encarregado_local: false,
      encarregado_regional: false,
      instrutor: false,
      examinadora: false,
      aluno: false,
      ensaios: false,
      rjm: false,
      cultos_oficiais: false,
      oficializado: false,
      possui_instrumento_proprio: false,
      instrumento: false,
      tonalidade: ''
    });
  };

  const handleEdit = (musician: Musico) => {
    setEditingMusician(musician);
    setFormData({
      name: musician.name,
      sexo: musician.sexo,
      encarregado_local: musician.encarregado_local,
      encarregado_regional: musician.encarregado_regional,
      instrutor: musician.instrutor,
      examinadora: musician.examinadora,
      aluno: musician.aluno,
      ensaios: musician.ensaios,
      rjm: musician.rjm,
      cultos_oficiais: musician.cultos_oficiais,
      oficializado: musician.oficializado,
      possui_instrumento_proprio: musician.possui_instrumento_proprio,
      instrumento: musician.instrumento,
      tonalidade: musician.tonalidade
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este músico?')) {
      try {
        await musicoService.delete(id);
        loadMusicians();
      } catch (error) {
        console.error('Erro ao excluir músico:', error);
      }
    }
  };

  const handleCheckboxChange = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  const filteredMusicians = musicians.filter(musician =>
    musician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    musician.tonalidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-2xl font-bold text-gray-900">Músicos</h1>
            <p className="text-gray-600">Gerencie os músicos cadastrados no sistema</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Músico
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar músicos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl my-8">
            <h2 className="text-lg font-semibold mb-4">
              {editingMusician ? 'Editar Músico' : 'Novo Músico'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sexo
                  </label>
                  <select
                    value={formData.sexo}
                    onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tonalidade
                </label>
                <input
                  type="text"
                  value={formData.tonalidade}
                  onChange={(e) => setFormData({ ...formData, tonalidade: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ex: Dó, Ré, Mi..."
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.encarregado_local}
                    onChange={() => handleCheckboxChange('encarregado_local')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Encarregado Local</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.encarregado_regional}
                    onChange={() => handleCheckboxChange('encarregado_regional')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Encarregado Regional</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.instrutor}
                    onChange={() => handleCheckboxChange('instrutor')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Instrutor</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.examinadora}
                    onChange={() => handleCheckboxChange('examinadora')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Examinadora</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.aluno}
                    onChange={() => handleCheckboxChange('aluno')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Aluno</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.ensaios}
                    onChange={() => handleCheckboxChange('ensaios')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Ensaios</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.rjm}
                    onChange={() => handleCheckboxChange('rjm')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">RJM</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.cultos_oficiais}
                    onChange={() => handleCheckboxChange('cultos_oficiais')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Cultos Oficiais</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.oficializado}
                    onChange={() => handleCheckboxChange('oficializado')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Oficializado</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.possui_instrumento_proprio}
                    onChange={() => handleCheckboxChange('possui_instrumento_proprio')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Possui Instrumento</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.instrumento}
                    onChange={() => handleCheckboxChange('instrumento')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Toca Instrumento</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingMusician(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {editingMusician ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Musicians List */}
      <div className="bg-white shadow rounded-lg">
        {filteredMusicians.length === 0 ? (
          <div className="text-center py-12">
            <Music className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhum músico encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Tente ajustar os termos de busca.' : 'Comece cadastrando um novo músico.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sexo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tonalidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Funções
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Cadastro
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMusicians.map((musician) => (
                  <tr key={musician.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-pink-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {musician.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {musician.sexo === 'M' ? 'Masculino' : 'Feminino'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {musician.tonalidade || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {musician.encarregado_local && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Encarregado Local
                          </span>
                        )}
                        {musician.instrutor && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Instrutor
                          </span>
                        )}
                        {musician.aluno && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Aluno
                          </span>
                        )}
                        {musician.oficializado && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Oficializado
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(musician.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(musician)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(musician.id)}
                          className="text-red-600 hover:text-red-900"
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
    </div>
  );
};

export default Musicians;
