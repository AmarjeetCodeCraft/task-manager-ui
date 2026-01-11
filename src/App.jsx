import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

/**
 *  NOTE:
 * Routing architecture implements 'Guard Pattern' for session management.
 * - ProtectedRoute: Enforces authentication for private resources.
 * - PublicRoute: Prevents authenticated users from accessing login/signup.
 */

// Helper to centralize auth check (Senior move for maintainability)
const isAuthenticated = () => !!localStorage.getItem('authToken');

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-slate-50">
        <Routes>
          {/* Auth Flow */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />

          {/* Business Logic */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Default Redirection Logic */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;