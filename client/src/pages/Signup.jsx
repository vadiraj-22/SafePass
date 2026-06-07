import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

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
      <div className='max-w-5xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-[600px]'>

          {/* Left — decorative panel (desktop only) */}
          <motion.div
            className='hidden md:flex flex-col justify-between rounded-l-2xl p-10 relative overflow-hidden'
            style={{ background: 'var(--surface-1)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 dot-grid opacity-40" />

            {/* Decorative gradient blob */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
              style={{ background: 'var(--clr-cyan)' }} />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-15 blur-3xl"
              style={{ background: 'var(--clr-emerald)' }} />

            <div className="relative z-10">
              <div className="mb-8">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--clr-cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h2 className="font-display text-3xl text-white leading-tight mb-3">
                Start<br/>securing.
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs">
                Create your account and get access to military-grade password security tools — for free.
              </p>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-[1px] bg-[var(--border-hover)]" />
                <span className="text-[var(--text-muted)] text-xs uppercase tracking-widest">What you get</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { text: "Secure password vault", color: "var(--clr-violet)" },
                  { text: "Breach monitoring", color: "var(--clr-cyan)" },
                  { text: "Password generator", color: "var(--clr-amber)" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                    {item.text}
                  </div>
                ))}
              </div>
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
            {/* Mobile header */}
            <div className='md:hidden mb-8'>
              <h1 className='font-display text-3xl text-white mb-2'>Start securing.</h1>
              <p className='text-[var(--text-secondary)] text-sm'>Create your free account</p>
            </div>

            <div className='hidden md:block mb-8'>
              <p className='text-[var(--text-muted)] text-xs uppercase tracking-[0.2em]'>Create your account</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {error && (
                <div className='bg-[var(--clr-rose)]/10 border border-[var(--clr-rose)]/30 rounded-lg p-3 text-[var(--clr-rose)] text-sm'>
                  {error}
                </div>
              )}

              <div>
                <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-2'>Username</label>
                <input
                  type="text"
                  placeholder='Choose a username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  className='w-full bg-[var(--surface-3)] text-white py-3 rounded-lg px-4 border border-[var(--border-subtle)] focus:border-[var(--clr-violet)] focus:outline-none focus:ring-1 focus:ring-[var(--clr-violet)]/20 transition-all duration-200 text-sm placeholder:text-[var(--text-muted)]'
                />
              </div>

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
                  placeholder='Min 6 characters'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className='w-full bg-[var(--surface-3)] text-white py-3 rounded-lg px-4 border border-[var(--border-subtle)] focus:border-[var(--clr-violet)] focus:outline-none focus:ring-1 focus:ring-[var(--clr-violet)]/20 transition-all duration-200 text-sm placeholder:text-[var(--text-muted)]'
                />
              </div>

              <div>
                <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-2'>Confirm Password</label>
                <input
                  type="password"
                  placeholder='Repeat your password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className='w-full bg-[var(--surface-3)] text-white py-3 rounded-lg px-4 border border-[var(--border-subtle)] focus:border-[var(--clr-violet)] focus:outline-none focus:ring-1 focus:ring-[var(--clr-violet)]/20 transition-all duration-200 text-sm placeholder:text-[var(--text-muted)]'
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className='relative group w-full overflow-hidden mt-2'
                whileTap={{ scale: 0.97 }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[var(--clr-cyan)] to-[var(--clr-violet)] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative text-white font-medium py-3 rounded-lg text-sm">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Creating Account...
                    </span>
                  ) : 'Create Account'}
                </div>
              </motion.button>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-[var(--text-muted)] text-sm'>
                Already have an account?{' '}
                <Link to="/login" className='text-[var(--clr-violet)] hover:text-white transition-colors'>
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
