import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, KeyRound, Mail, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'

  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const { login, verifyLoginOtp, resendLoginOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Cooldown countdown timer
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    const result = await login(email, password);

    if (result.requiresOtp) {
      setStep('otp');
      setInfoMessage(result.message || 'OTP verification code sent to your email.');
      setCooldown(30);
    } else if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError('Please enter the complete 6-digit OTP code.');
      return;
    }

    setError('');
    setInfoMessage('');
    setLoading(true);

    const result = await verifyLoginOtp(email, otp);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleResendOtp = async () => {
    if (cooldown > 0 || resending) return;
    setError('');
    setInfoMessage('');
    setResending(true);

    const result = await resendLoginOtp(email);
    if (result.success) {
      setInfoMessage(result.message || 'A new OTP code has been sent to your email.');
      setCooldown(45);
    } else {
      setError(result.message);
    }
    setResending(false);
  };

  return (
    <div className='relative text-white min-h-screen pt-24 md:pt-28 pb-16 px-6'>
      <div className='max-w-5xl mx-auto'>
        <div className='bg-black/65 backdrop-blur-md border border-gray-800/80 rounded-none p-2 md:p-3 shadow-2xl overflow-hidden'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-[520px]'>

            {/* Left — Decorative Panel */}
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
                  {step === 'credentials' ? (
                    <>Welcome<br />back.</>
                  ) : (
                    <>Email<br />Verification.</>
                  )}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                  {step === 'credentials'
                    ? 'Access your secure vault and manage your passwords with confidence.'
                    : 'To ensure your account safety, enter the 6-digit verification code sent to your email.'}
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                <span className="badge-chip bg-white/10 text-white border border-white/15 px-3 py-1 rounded-full text-xs font-mono">
                  2FA Secured
                </span>
                <span className="badge-chip bg-white/10 text-white border border-white/15 px-3 py-1 rounded-full text-xs font-mono">
                  Encrypted Vault
                </span>
                <span className="badge-chip bg-white/10 text-white border border-white/15 px-3 py-1 rounded-full text-xs font-mono">
                  SafePass
                </span>
              </div>
            </motion.div>

            {/* Right — Interactive Form */}
            <motion.div
              className='rounded-2xl md:rounded-l-none md:rounded-r-2xl p-8 md:p-10 relative overflow-hidden bg-black/40 flex flex-col justify-center'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                {step === 'credentials' ? (
                  <motion.div
                    key="step-credentials"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='mb-8'>
                      <p className='text-[var(--text-muted)] text-xs uppercase tracking-[0.2em]'>Sign in to your account</p>
                      <h1 className='md:hidden font-display text-2xl text-white font-bold mt-1'>Welcome Back</h1>
                    </div>

                    <form onSubmit={handleCredentialsSubmit} className='space-y-5'>
                      {error && (
                        <div className='bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-rose-400 text-sm'>
                          {error}
                        </div>
                      )}

                      <div>
                        <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-2'>Email Address</label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder='you@example.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='w-full bg-[var(--surface-3)] text-white py-3 pl-10 pr-4 rounded-lg border border-[var(--border-subtle)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm'
                          />
                          <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest'>Password</label>
                          <Link to="/forgot-password" className='text-xs text-emerald-400 hover:text-emerald-300 hover:underline transition-colors'>
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='w-full bg-[var(--surface-3)] text-white py-3 pl-10 pr-4 rounded-lg border border-[var(--border-subtle)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm'
                          />
                          <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        className='relative group w-full overflow-hidden'
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative text-white font-medium py-3 rounded-lg text-sm flex items-center justify-center gap-2">
                          {loading ? (
                            <>
                              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                              Verifying Credentials...
                            </>
                          ) : 'Continue to Verification'}
                        </div>
                      </motion.button>
                    </form>

                    <div className='mt-8 text-center'>
                      <p className='text-[var(--text-muted)] text-sm'>
                        Don't have an account?{' '}
                        <Link to="/signup" className='text-emerald-400 hover:text-white transition-colors font-medium'>
                          Create one
                        </Link>
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step-otp"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='mb-6'>
                      <button
                        onClick={() => { setStep('credentials'); setError(''); setInfoMessage(''); }}
                        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-3 transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                      </button>
                      <h2 className='text-xl font-bold text-white mb-1'>Verify OTP Code</h2>
                      <p className='text-gray-400 text-xs leading-relaxed'>
                        Enter the 6-digit code sent to <span className="text-emerald-400 font-mono font-medium">{email}</span>. If you don't see it in your inbox, please <span className="text-amber-400 font-medium">check your Spam, Junk, or Updates folder</span>.
                      </p>
                    </div>

                    <form onSubmit={handleOtpSubmit} className='space-y-5'>
                      {error && (
                        <div className='bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-rose-400 text-sm'>
                          {error}
                        </div>
                      )}

                      {infoMessage && (
                        <div className='bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-emerald-400 text-xs flex items-start gap-2'>
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{infoMessage}</span>
                        </div>
                      )}

                      <div>
                        <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-2 text-center'>
                          6-Digit OTP Code
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="123456"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                          required
                          autoFocus
                          className='w-full bg-[var(--surface-3)] text-emerald-400 font-mono text-center tracking-[0.5em] text-2xl py-3 rounded-lg border border-emerald-500/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all'
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        className='relative group w-full overflow-hidden'
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative text-white font-medium py-3 rounded-lg text-sm flex items-center justify-center gap-2">
                          {loading ? (
                            <>
                              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                              Verifying Code...
                            </>
                          ) : 'Verify & Complete Sign In'}
                        </div>
                      </motion.button>
                    </form>

                    <div className='mt-6 pt-4 border-t border-white/10 text-center flex items-center justify-between text-xs'>
                      <span className='text-gray-400'>Didn't receive the code?</span>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={cooldown > 0 || resending}
                        className='inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors font-medium'
                      >
                        <RefreshCw className={`w-3 h-3 ${resending ? 'animate-spin' : ''}`} />
                        {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend OTP'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
