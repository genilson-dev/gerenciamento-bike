import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Bikes from './components/Bikes';
import Products from './components/Products';
import Orders from './components/Orders';
import Musicians from './components/Musicians';

// Componente para rotas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

// Componente principal da aplicação
const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/clients" 
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/clients/new" 
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/bikes" 
        element={
          <ProtectedRoute>
            <Bikes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/bikes/new" 
        element={
          <ProtectedRoute>
            <Bikes />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/products" 
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/products/new" 
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/orders" 
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/orders/new" 
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/musicians" 
        element={
          <ProtectedRoute>
            <Musicians />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
              <p className="text-gray-600">Página de configurações em desenvolvimento</p>
            </div>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={<Navigate to="/dashboard" />} 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
