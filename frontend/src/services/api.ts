import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços específicos
export const authService = {
  login: (email: string, password: string) =>
    api.post('/login', { email, password }),
  
  register: (userData: { name: string; email: string; password: string }) =>
    api.post('/users', userData),
};

export const clientService = {
  create: (clientData: { name: string; email: string }) =>
    api.post('/client', clientData),
  
  list: () => api.get('/clients'),
  
  update: (id: string, clientData: { name: string; email: string }) =>
    api.put(`/clients/${id}`, clientData),
  
  delete: (id: string) => api.delete(`/clients/${id}`),
};

export const bikeService = {
  create: (bikeData: { model: string; owner_id: string }) =>
    api.post('/bike', bikeData),
  
  list: () => api.get('/bikes'),
  
  update: (id: string, bikeData: { model: string; owner_id: string }) =>
    api.put(`/bikes/${id}`, bikeData),
  
  delete: (id: string) => api.delete(`/bikes/${id}`),
};

export const productService = {
  create: (productData: { name: string; price: string; category_id: string }) =>
    api.post('/product', productData),
  
  list: () => api.get('/products'),
  
  update: (id: string, productData: { name: string; price: string; category_id: string }) =>
    api.put(`/products/${id}`, productData),
  
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const categoryService = {
  create: (categoryData: { name: string }) =>
    api.post('/category', categoryData),
  
  list: () => api.get('/categories'),
  
  update: (id: string, categoryData: { name: string }) =>
    api.put(`/categories/${id}`, categoryData),
  
  delete: (id: string) => api.delete(`/categories/${id}`),
};

export const orderService = {
  create: (orderData: { status: string; client_id: string; bike_id: string }) =>
    api.post('/order', orderData),
  
  list: () => api.get('/orders'),
  
  update: (id: string, orderData: { status: string; client_id?: string; bike_id?: string }) =>
    api.put(`/orders/${id}`, orderData),
  
  delete: (id: string) => api.delete(`/orders/${id}`),
  
  getTotal: (orderId: string) => api.get(`/orders/${orderId}/total`),
  
  finish: (orderId: string) => api.post(`/orders/${orderId}/finish`),
};

export const itemService = {
  add: (itemData: { order_id: string; product_id: string; quantity: number }) =>
    api.post('/items', itemData),
  
  remove: (productId: string) =>
    api.delete(`/item?product_id=${productId}`),
};

export const musicoService = {
  create: (musicoData: any) =>
    api.post('/musicos', musicoData),
  
  list: () => api.get('/musicos'),
  
  update: (id: string, musicoData: any) =>
    api.put(`/musicos/${id}`, musicoData),
  
  delete: (id: string) => api.delete(`/musicos/${id}`),
};
