
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { VaultProvider } from './contexts/VaultContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VaultPage from './pages/VaultPage';
import { useAuth } from './hooks/useAuth';
import './styles/App.css';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/LoginPage" 
        element={isAuthenticated ? <Navigate to="/VaultPage" /> : <LoginPage />} 
      />
      <Route 
        path="/RegisterPage" 
        element={isAuthenticated ? <Navigate to="/VaultPage" /> : <RegisterPage />} 
      />
      <Route 
        path="/VaultPage" 
        element={isAuthenticated ? <VaultPage /> : <Navigate to="/LoginPage" />} 
      />
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/VaultPage" : "/LoginPage"} />} 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <VaultProvider>
        <Router>
          <div className="App">
            <AppContent />
          </div>
        </Router>
      </VaultProvider>
    </AuthProvider>
  );
}

export default App;
