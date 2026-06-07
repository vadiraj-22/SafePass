import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [slowMessage, setSlowMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSlowMessage('');
    setLoading(true);

    const slowTimer = setTimeout(() => {
      setSlowMessage('Waking up the server, this may take up to 30 seconds on first login...');
    }, 5000);

    const result = await login(email, password);
    clearTimeout(slowTimer);
    setSlowMessage('');

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className='relative bg-black text-white min-h-screen pt-24 pb-16 px-6'>
      <div className='max-w-5xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 items-stretch min-h-[520px]'>

          {/* Left — decorative panel (desktop only) */}
          <motion.div
            className='hidden md:flex flex-col justify-between rounded-l-2xl p-10 relative overflow-hidden'
            style={{ background: 'var(--surface-1)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Subtle dot grid */}
            <div className="absolute inset-0 dot-grid opacity-40" />

            {/* Decorative gradient blob */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
              style={{ background: 'var(--clr-violet)' }} />

            <div className="relative z-10">
              <div className="mb-8">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--clr-violet)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h2 className="font-display text-3xl text-white leading-tight mb-3">
                Welcome<br/>back.
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs">
                Access your secure vault and manage your passwords with confidence.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2">
              <span className="badge-chip">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--clr-emerald)]"></span>
                Encrypted
              </span>
              <span className="badge-chip">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--clr-cyan)]"></span>
                Private
              </span>
              <span className="badge-chip">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--clr-amber)]"></span>
                Secure
              </span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className='rounded-2xl md:rounded-l-none md:rounded-r-2xl p-8 md:p-10 relative overflow-hidden'
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Mobile-only header */}
            <div className='md:hidden mb-8'>
              <h1 className='font-display text-3xl text-white mb-2'>Welcome back.</h1>
              <p className='text-[var(--text-secondary)] text-sm'>Log in to access your vault</p>
            </div>

            <div className='hidden md:block mb-8'>
              <p className='text-[var(--text-muted)] text-xs uppercase tracking-[0.2em]'>Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
              {error && (
                <div className='bg-[var(--clr-rose)]/10 border border-[var(--clr-rose)]/30 rounded-lg p-3 text-[var(--clr-rose)] text-sm'>
                  {error}
                </div>
              )}

              {slowMessage && (
                <div className='bg-[var(--clr-amber)]/10 border border-[var(--clr-amber)]/30 rounded-lg p-3 text-[var(--clr-amber)] text-sm flex items-center gap-2'>
                  <span className='animate-pulse-subtle'>⏳</span>
                  {slowMessage}
                </div>
              )}

              <div>
                <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-2'>Email</label>
                <input
                  type="email"
                  placeholder='you@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='w-full bg-[var(--surface-3)] text-white py-3 rounded-lg px-4 border border-[var(--border-subtle)] focus:border-[var(--clr-violet)] focus:outline-none focus:ring-1 focus:ring-[var(--clr-violet)]/20 transition-all duration-200 text-sm placeholder:text-[var(--text-muted)]'
                />
              </div>

              <div>
                <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-2'>Password</label>
                <input
                  type="password"
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='w-full bg-[var(--surface-3)] text-white py-3 rounded-lg px-4 border border-[var(--border-subtle)] focus:border-[var(--clr-violet)] focus:outline-none focus:ring-1 focus:ring-[var(--clr-violet)]/20 transition-all duration-200 text-sm placeholder:text-[var(--text-muted)]'
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className='relative group w-full overflow-hidden'
                whileTap={{ scale: 0.97 }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[var(--clr-violet)] to-[var(--clr-indigo)] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative text-white font-medium py-3 rounded-lg text-sm">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Signing in...
                    </span>
                  ) : 'Sign In'}
                </div>
              </motion.button>
            </form>

            <div className='mt-8 text-center'>
              <p className='text-[var(--text-muted)] text-sm'>
                Don't have an account?{' '}
                <Link to="/signup" className='text-[var(--clr-violet)] hover:text-white transition-colors'>
                  Create one
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
