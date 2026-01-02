import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Video from '../components/Video';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register(username, email, password);

    if (result.success) {
      navigate('/password-manager');
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
            Create Account
          </h1>
          <p className='text-gray-400 text-lg'>
            Join SafePass and secure your passwords
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
              <label className='block text-sm font-semibold mb-2'>Username</label>
              <input 
                type="text"
                placeholder='Choose a username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                className='w-full bg-gray-900 text-white py-3 rounded-lg px-4 border border-gray-700 focus:border-purple-500 focus:outline-none transition'
              />
            </div>

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
                placeholder='Create a strong password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className='w-full bg-gray-900 text-white py-3 rounded-lg px-4 border border-gray-700 focus:border-purple-500 focus:outline-none transition'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold mb-2'>Confirm Password</label>
              <input 
                type="password"
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className='w-full bg-gray-900 text-white py-3 rounded-lg px-4 border border-gray-700 focus:border-purple-500 focus:outline-none transition'
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className='w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 font-mono uppercase tracking-wide hover:scale-105'
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-gray-400 text-sm'>
              Already have an account?{' '}
              <Link to="/login" className='text-purple-400 hover:text-purple-300 font-semibold'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
