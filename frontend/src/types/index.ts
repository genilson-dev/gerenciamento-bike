// Tipos baseados no schema do Prisma

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  update_at: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  created_at: string;
  update_at: string;
  bikes?: Bike[];
  orders?: Order[];
}

export interface Bike {
  id: string;
  model: string;
  owner_id: string;
  created_at: string;
  update_at: string;
  owner?: Client;
  orders?: Order[];
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
  update_at: string;
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
  category_id: string;
  created_at: string;
  update_at: string;
  category?: Category;
}

export interface Order {
  id: string;
  status: string;
  created_at: string;
  update_at: string;
  client_id: string;
  user_id: string;
  bike_id: string;
  client?: Client;
  user?: User;
  bike?: Bike;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  update_at: string;
  order?: Order;
  product?: Product;
}

export interface Musico {
  id: string;
  name: string;
  sexo: string;
  encarregado_local: boolean;
  encarregado_regional: boolean;
  instrutor: boolean;
  examinadora: boolean;
  aluno: boolean;
  ensaios: boolean;
  rjm: boolean;
  cultos_oficiais: boolean;
  oficializado: boolean;
  possui_instrumento_proprio: boolean;
  instrumento: boolean;
  tonalidade: string;
  created_at: string;
  update_at: string;
}

// Tipos para formulários
export interface LoginForm {
  email: string;
  password: string;
}

export interface CreateUserForm {
  name: string;
  email: string;
  password: string;
}

export interface CreateClientForm {
  name: string;
  email: string;
}

export interface CreateBikeForm {
  model: string;
  owner_id: string;
}

export interface CreateProductForm {
  name: string;
  price: string;
  category_id: string;
}

export interface CreateCategoryForm {
  name: string;
}

export interface CreateOrderForm {
  status: string;
  client_id: string;
  bike_id: string;
}

export interface CreateMusicoForm {
  name: string;
  sexo: string;
  encarregado_local: boolean;
  encarregado_regional: boolean;
  instrutor: boolean;
  examinadora: boolean;
  aluno: boolean;
  ensaios: boolean;
  rjm: boolean;
  cultos_oficiais: boolean;
  oficializado: boolean;
  possui_instrumento_proprio: boolean;
  instrumento: boolean;
  tonalidade: string;
}

// Tipos para API
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
