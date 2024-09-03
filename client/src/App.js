import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FundDetails from './components/FundDetails';
import AppHeader from './components/AppHeader'; // Import the AppHeader component
import { login } from './api/auth';
import { getKeyFromLocalStorage, removeKeyFromLocalStorage } from './components/LocalStore';
import FundPurchasePage from './components/Purchases';

const { Content } = Layout;

const App = () => {
  const localAccessToken = getKeyFromLocalStorage("accessToken");
  const [accessToken, setAccessToken] = useState(localAccessToken);
  const [isLoggedIn, setIsLoggedIn] = useState(accessToken ? true : false);

  const handleLogin = (username, password) => {
    login(username, password).then((response) => {
      if (response.success) {
        setAccessToken(response.token);
        setIsLoggedIn(true);
      }
    });
  };

  const handleLogout = () => {
    removeKeyFromLocalStorage("accessToken");
    setAccessToken(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Content style={{ padding: '50px' }}>
          <Routes>
            <Route path="/" element={
              isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/dashboard" element={
              isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />
            } />
            <Route path="/fund/:id" element={
              isLoggedIn ? <FundDetails /> : <Navigate to="/" replace />
            } />
            <Route path="/funds" element={
              isLoggedIn ? <FundPurchasePage /> : <Navigate to="/" replace />
            } />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
