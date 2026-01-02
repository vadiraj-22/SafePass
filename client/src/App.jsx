import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BreachAndStrengthChecker from './pages/BreachAndStrengthChecker';
import PasswordGenerator from './pages/PasswordGenerator';
import PasswordManager from './pages/PasswordManager';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className='min-h-screen bg-black text-white flex flex-col'>
          <Navbar />
          
          <main className='flex-1'>
            <Routes>
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
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
