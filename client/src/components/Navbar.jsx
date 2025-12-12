import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-black/80    border-b backdrop-blur-2xl border-gray-800'>
      <div className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo/Brand */}
          <Link to="/" className='flex items-center gap-2'>
            <span className='text-2xl'>🔐</span>
            <span className='text-2xl font-bold bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent'>
              SafePass
            </span>
          </Link>

          {/* Navigation Links */}

          <div className='flex justify-end gap-10'>
            <div className='hidden md:flex items-center gap-8'>
              <Link to="/" className='text-gray-300 hover:text-white transition'>
                Home
              </Link>
              <Link to="/features" className='text-gray-300 hover:text-white transition'>
                Features
              </Link>
              {isAuthenticated && (
                <Link to="/password-manager" className='text-gray-300 hover:text-white transition'>
                  My Vault
                </Link>
              )}
              <a href="#about" className='text-gray-300 hover:text-white transition'>
                About
              </a>
            </div>

            {/* Auth Buttons */}
            <div className='flex items-center gap-4'>
              {isAuthenticated ? (
                <>
                  <span className='text-gray-400 text-sm hidden md:block'>
                    Welcome, <span className='text-purple-400 font-semibold'>{user?.username}</span>
                  </span>
                  <button
                    onClick={logout}
                    className='text-gray-300 hover:text-white transition px-4 py-2 border border-gray-700 hover:border-purple-500 rounded-lg'
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className='text-gray-300 hover:text-white transition px-4 py-2 border border-gray-700 hover:border-purple-500 rounded-lg'>
                    Login
                  </Link>
                  <Link to="/signup" className='bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition'>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
