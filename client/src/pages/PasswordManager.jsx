import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'https://safepass-60b0.onrender.com/api';

  // Load passwords from backend
  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/passwords`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPasswords(response.data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
      setError('Failed to load passwords');
    } finally {
      setLoading(false);
    }
  };

  // Add new password
  const handleAddPassword = async (e) => {
    e.preventDefault();
    
    if (!website || !username || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/passwords`,
        { website, username, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPasswords([response.data, ...passwords]);

      // Reset form
      setWebsite("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error('Error adding password:', error);
      alert('Failed to add password');
    }
  };

  // Delete password
  const handleDeletePassword = async (id) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      try {
        await axios.delete(`${API_URL}/passwords/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPasswords(passwords.filter(p => p._id !== id));
      } catch (error) {
        console.error('Error deleting password:', error);
        alert('Failed to delete password');
      }
    }
  };

  // Copy password to clipboard
  const handleCopyPassword = (pwd, id) => {
    navigator.clipboard.writeText(pwd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle password visibility
  const togglePasswordVisibility = (id) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className='relative bg-black text-white min-h-screen pt-24 pb-16 px-6'>
    
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold mb-4 cybersec-title'>
            <span className='mr-3'>🗄️</span>
            <span className='bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent'>
              Password Manager
            </span>
          </h1>

          <div className='mt-4 inline-block bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-2'>
            <p className='text-yellow-400 text-sm'>
              Secure: Passwords are stored in MongoDB with authentication
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Add Password Form */}
          <div className='lg:col-span-1'>
            <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sticky top-24'>
              <h2 className='text-2xl font-bold mb-6'>Add New Password</h2>
              
              <form onSubmit={handleAddPassword} className='space-y-4'>
                <div>
                  <label className='block text-sm font-semibold mb-2'>Website/Service</label>
                  <input 
                    type="text"
                    placeholder='e.g., Gmail, Facebook'
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className='w-full bg-gray-900 text-white py-3 rounded-lg px-4 border border-gray-700 focus:border-purple-500 focus:outline-none transition'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold mb-2'>Username/Email</label>
                  <input 
                    type="text"
                    placeholder='your@email.com'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='w-full bg-gray-900 text-white py-3 rounded-lg px-4 border border-gray-700 focus:border-purple-500 focus:outline-none transition'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold mb-2'>Password</label>
                  <input 
                    type="password"
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full bg-gray-900 text-white py-3 rounded-lg px-4 border border-gray-700 focus:border-purple-500 focus:outline-none transition'
                  />
                </div>

                <button 
                  type="submit"
                  className='w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 font-mono uppercase tracking-wide hover:scale-105'
                >
                  💾 Save Password
                </button>
              </form>
            </div>
          </div>

          {/* Saved Passwords List */}
          <div className='lg:col-span-2'>
            <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold'>Saved Passwords</h2>
                <span className='bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold'>
                  {passwords.length} {passwords.length === 1 ? 'Password' : 'Passwords'}
                </span>
              </div>

              {loading ? (
                <div className='text-center py-12'>
                  <div className='text-4xl mb-4'>⏳</div>
                  <p className='text-gray-400'>Loading your passwords...</p>
                </div>
              ) : error ? (
                <div className='text-center py-12'>
                  <div className='text-4xl mb-4'>⚠️</div>
                  <p className='text-red-400'>{error}</p>
                </div>
              ) : passwords.length === 0 ? (
                <div className='text-center py-12'>
                  <div className='text-6xl mb-4'>🔒</div>
                  <p className='text-gray-400 text-lg'>No passwords saved yet</p>
                  <p className='text-gray-500 text-sm mt-2'>Add your first password using the form</p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {passwords.map((item) => (
                    <div key={item._id} className='bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-purple-500/50 transition'>
                      <div className='flex justify-between items-start mb-3'>
                        <div className='flex-1'>
                          <h3 className='text-lg font-bold text-white mb-1'>{item.website}</h3>
                          <p className='text-gray-400 text-sm'>{item.username}</p>
                        </div>
                        <button 
                          onClick={() => handleDeletePassword(item._id)}
                          className='text-red-400 hover:text-red-300 transition'
                          title='Delete'
                        >
                          🗑️
                        </button>
                      </div>

                      <div className='flex gap-2'>
                        <div className='flex-1 bg-gray-800 rounded px-3 py-2 font-mono text-sm flex items-center'>
                          {showPassword[item._id] ? item.password : '••••••••••••'}
                        </div>
                        <button 
                          onClick={() => togglePasswordVisibility(item._id)}
                          className='bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition'
                          title={showPassword[item._id] ? 'Hide' : 'Show'}
                        >
                          {showPassword[item._id] ? '🙈' : '👁️'}
                        </button>
                        <button 
                          onClick={() => handleCopyPassword(item.password, item._id)}
                          className={`${copiedId === item._id ? 'bg-green-500' : 'bg-purple-500 hover:bg-purple-600'} text-white font-semibold px-4 py-2 rounded transition`}
                          title='Copy Password'
                        >
                          {copiedId === item._id ? '✓' : '📋'}
                        </button>
                      </div>

                      <p className='text-xs text-gray-500 mt-2'>
                        Added: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className='mt-8 bg-purple-900/20 border border-purple-500/30 rounded-lg p-6'>
          <h3 className='font-semibold mb-2 text-purple-400 text-lg'>🔐 Security Features</h3>
          <p className='text-gray-300 text-sm mb-2'>
            Your passwords are protected with:
          </p>
          <ul className='text-sm text-gray-400 space-y-1 ml-4'>
            <li>• JWT authentication for secure access</li>
            <li>• MongoDB database storage</li>
            <li>• User-specific password isolation</li>
            <li>• Secure API endpoints with token verification</li>
          </ul>
          <p className='text-yellow-400 text-xs mt-3'>
            Note: For production, add encryption at rest (AES-256) and HTTPS
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
