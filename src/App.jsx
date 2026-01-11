import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Auth sync error:", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  const handleLogout = () => {
    if (window.confirm("Logout of your account?")) {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-50">
        <p className="text-blue-600 font-medium animate-pulse">Initializing session...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-blue-50">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </main>
  );
}

export default App;