import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import History from './pages/History';

const AuthRoute = ({ children }) => {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

import { Toaster } from 'react-hot-toast';

const AppContent = () => {
  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{
          className: 'text-sm font-medium rounded-xl shadow-lg border border-slate-100',
          style: {
            padding: '12px 16px',
            color: '#0f172a',
          }
        }} 
      />
      <Routes>
        {/* Public Routes without Layout wrapper */}
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
        
        {/* Protected Routes wrapped in Layout */}
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
