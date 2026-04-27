import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationToast from './components/Notification';
import Home from './pages/Home';
import Questions from './pages/Questions';
import QuestionDetail from './pages/QuestionDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Exam from './pages/Exam';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';
import type { ReactNode } from 'react';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const { language } = useLanguage();
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>{language === 'ar' ? 'جارٍ التحميل...' : 'Loading...'}</p>
      </div>
    );
  }
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppContent = () => (
  <div className="app-container">
    <Navbar />
    <NotificationToast />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
        <Route path="/exam" element={<Exam />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <LanguageProvider>
        <NotificationProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </NotificationProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
