import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className='relative bg-black text-white min-h-screen pt-24 pb-16 px-6'>
      
      
      <div className='max-w-md mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent cybersec-title'>
            Welcome Back
          </h1>
          <p className='text-gray-400 text-lg'>
            Login to access your password vault
          </p>
        </div>

        <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {error && (
              <div className='bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm'>
                {error}
              </div>
            )}

            <div>
              <label className='block text-sm font-semibold mb-2'>Email</label>
              <input 
                type="email"
                placeholder='your@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full bg-gray-900 text-white py-3 rounded-lg px-4 border border-gray-700 focus:border-purple-500 focus:outline-none transition'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold mb-2'>Password</label>
              <input 
                type="password"
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full bg-gray-900 text-white py-3 rounded-lg px-4 border border-gray-700 focus:border-purple-500 focus:outline-none transition'
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className='w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border border-gray-700 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 font-mono uppercase tracking-wide hover:scale-105 shadow-sm'
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-gray-400 text-sm'>
              Don't have an account?{' '}
              <Link to="/signup" className='text-purple-400 hover:text-purple-300 font-semibold'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
