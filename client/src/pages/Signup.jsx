import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Shield, KeyRound, Mail, User, Lock } from 'lucide-react';
import { PasswordStrengthChecklist, checkPasswordRequirements } from '../components/PasswordStrengthChecklist';

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

    const reqs = checkPasswordRequirements(password);
    const isStrong = Object.values(reqs).every(Boolean);

    if (!isStrong) {
      setError('Password does not satisfy all strong password requirements below.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
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
    <div className='relative text-white min-h-screen pt-24 md:pt-28 pb-16 px-6'>
      <div className='max-w-5xl mx-auto'>
        <div className='bg-black/65 backdrop-blur-md border border-gray-800/80 rounded-none p-2 md:p-3 shadow-2xl overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-[600px]'>

            {/* Left — Decorative panel */}
            <motion.div
              className='hidden md:flex flex-col justify-between rounded-l-2xl p-10 relative overflow-hidden bg-black/60 border-r border-white/10'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 dot-grid opacity-40" />

              <div className="relative z-10">
                <div className="mb-8">
                  <Shield className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="font-display text-3xl text-white font-extrabold leading-tight mb-3">
                  Start<br />securing.
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                  Create your SafePass account protected by industry-standard encryption and strong password policies.
                </p>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-[1px] bg-white/20" />
                  <span className="text-slate-400 text-xs uppercase tracking-widest font-mono">Vault Security</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { text: "Strong Password Rules Enforced" },
                    { text: "2-Step Email Verification" },
                    { text: "Encrypted Password Vault" },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-2.5 text-sm text-gray-200 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — Signup Form */}
            <motion.div
              className='rounded-2xl md:rounded-l-none md:rounded-r-2xl p-8 md:p-10 relative overflow-hidden bg-black/40 flex flex-col justify-center'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className='mb-6'>
                <p className='text-[var(--text-muted)] text-xs uppercase tracking-[0.2em]'>Create your account</p>
                <h1 className='md:hidden font-display text-2xl text-white font-bold mt-1'>Start Securing</h1>
              </div>

              <form onSubmit={handleSubmit} className='space-y-4'>
                {error && (
                  <div className='bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-rose-400 text-sm'>
                    {error}
                  </div>
                )}

                <div>
                  <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1.5'>Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder='Choose a username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength={3}
                      className='w-full bg-[var(--surface-3)] text-white py-2.5 pl-10 pr-4 rounded-lg border border-[var(--border-subtle)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm font-mono'
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1.5'>Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder='you@example.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className='w-full bg-[var(--surface-3)] text-white py-2.5 pl-10 pr-4 rounded-lg border border-[var(--border-subtle)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm font-mono'
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1.5'>Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder='Create strong password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className='w-full bg-[var(--surface-3)] text-white py-2.5 pl-10 pr-4 rounded-lg border border-[var(--border-subtle)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm font-mono'
                    />
                    <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>

                  {/* Password Strength Checklist & Bar */}
                  <PasswordStrengthChecklist password={password} />
                </div>

                <div>
                  <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1.5'>Confirm Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder='Repeat your password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className='w-full bg-[var(--surface-3)] text-white py-2.5 pl-10 pr-4 rounded-lg border border-[var(--border-subtle)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm font-mono'
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className='relative group w-full overflow-hidden mt-2'
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative text-white font-medium py-3 rounded-lg text-sm flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                        Creating Account...
                      </>
                    ) : 'Create Account'}
                  </div>
                </motion.button>
              </form>

              <div className='mt-6 text-center'>
                <p className='text-[var(--text-muted)] text-sm'>
                  Already have an account?{' '}
                  <Link to="/login" className='text-emerald-400 hover:text-white transition-colors font-medium'>
                    Sign in
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
