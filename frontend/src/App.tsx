import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/LoginForm';
import { AdminDashboard } from './components/AdminDashboard';
import { QuizList } from './components/QuizList';
import { Quiz } from './components/Quiz';

function PrivateRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'admin' | 'user' }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/quizzes'} replace />;
  }

  return <>{children}</>;
}

function App() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {user && (
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex items-center">
                  <span className="text-lg font-semibold">Quiz App</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">
                    Welcome, {user.username} ({user.role})
                  </span>
                  <button
                    onClick={logout}
                    className="px-3 py-2 rounded text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/quizzes'} /> : <LoginForm />}
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRole="admin">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/quizzes"
              element={
                <PrivateRoute allowedRole="user">
                  <QuizList />
                </PrivateRoute>
              }
            />
            <Route
              path="/quiz/:id"
              element={
                <PrivateRoute allowedRole="user">
                  <Quiz />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;