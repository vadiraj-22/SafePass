import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-black/30 border-b backdrop-blur-2xl border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Brand */}
          <div className='flex items-center gap-3'>
            <Link to='/' className='flex items-center gap-2'>
              <span className='text-2xl'>🔐</span>
              <span className='text-xl sm:text-2xl font-bold bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent'>
                SafePass
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className='hidden md:flex items-center gap-6'>
            <Link to='/' className='text-gray-300 hover:text-white transition'>Home</Link>
            <Link to='/features' className='text-gray-300 hover:text-white transition'>Features</Link>
            {isAuthenticated && (
              <Link to='/password-manager' className='text-gray-300 hover:text-white transition'>My Vault</Link>
            )}
            <a href='#about' className='text-gray-300 hover:text-white transition'>About</a>
          </div>

          {/* Auth Buttons (desktop) */}
          <div className='hidden md:flex items-center gap-4'>
            {isAuthenticated ? (
              <>
                <span className='text-gray-400 text-sm'>
                  Welcome, <span className='text-purple-400 font-semibold'>{user?.username}</span>
                </span>
                <button onClick={logout} className='text-gray-300 hover:text-white transition px-4 py-2 border border-gray-700 hover:border-purple-500 rounded-lg'>Logout</button>
              </>
            ) : (
              <>
                <Link to='/login' className='text-gray-300 hover:text-white transition px-4 py-2 border border-gray-700 hover:border-purple-500 rounded-lg'>Login</Link>
                <Link to='/signup' className='bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition'>Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className='md:hidden flex items-center'>
            <button onClick={() => setOpen(v => !v)} aria-label='Toggle menu' className='p-2 rounded-md text-gray-300 hover:text-white focus:outline-none'>
              {open ? '✖️' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className='md:hidden bg-black/90 border-t border-gray-800'>
          <div className='px-4 pt-2 pb-4 space-y-2'>
            <Link to='/' onClick={() => setOpen(false)} className='block text-gray-300 hover:text-white py-2'>Home</Link>
            <Link to='/features' onClick={() => setOpen(false)} className='block text-gray-300 hover:text-white py-2'>Features</Link>
            {isAuthenticated && (
              <Link to='/password-manager' onClick={() => setOpen(false)} className='block text-gray-300 hover:text-white py-2'>My Vault</Link>
            )}
            <a href='#about' onClick={() => setOpen(false)} className='block text-gray-300 hover:text-white py-2'>About</a>

            <div className='border-t border-gray-800 pt-3'>
              {isAuthenticated ? (
                <>
                  <div className='text-gray-400 text-sm py-2'>Welcome, <span className='text-purple-400 font-semibold'>{user?.username}</span></div>
                  <button onClick={() => { logout(); setOpen(false); }} className='w-full text-left text-gray-300 hover:text-white py-2'>Logout</button>
                </>
              ) : (
                <>
                  <Link to='/login' onClick={() => setOpen(false)} className='block text-gray-300 hover:text-white py-2'>Login</Link>
                  <Link to='/signup' onClick={() => setOpen(false)} className='block bg-linear-to-r from-purple-500 to-blue-500 text-white font-semibold px-3 py-2 rounded-lg mt-2'>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
