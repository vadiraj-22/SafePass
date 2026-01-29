import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BreachAndStrengthChecker from './pages/BreachAndStrengthChecker';
import PasswordGenerator from './pages/PasswordGenerator';
import PasswordManager from './pages/PasswordManager';
import { AnimationProvider } from './components/animations/AnimationProvider';
import { PageTransition } from './components/animations/PageTransition';

// Wrapper component to access location for page transitions
const AppContent = () => {
  const location = useLocation();

  return (
    <div className='min-h-screen bg-black text-white flex flex-col'>
      <Navbar />
      
      <main className='flex-1'>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/breach-checker" element={<BreachAndStrengthChecker />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route 
            path="/password-manager" 
            element={
              <ProtectedRoute>
                <PasswordManager />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

const App = () => {
  return (
    <AnimationProvider performanceMode="balanced">
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </AnimationProvider>
  );
};

export default App;
