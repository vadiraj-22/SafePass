import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, KeyRound, Mail, ArrowLeft, RefreshCw, CheckCircle2, Lock } from 'lucide-react';
import { PasswordStrengthChecklist, checkPasswordRequirements } from '../components/PasswordStrengthChecklist';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [step, setStep] = useState('request'); // 'request' | 'reset' | 'success'
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const { requestPasswordResetOtp, resetPasswordWithOtp } = useAuth();
  const navigate = useNavigate();

  // Cooldown timer for resending reset OTP
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    const result = await requestPasswordResetOtp(email);

    if (result.success) {
      setStep('reset');
      setInfoMessage(result.message || 'Password reset OTP sent to your email address.');
      setCooldown(45);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }
    const reqs = checkPasswordRequirements(newPassword);
    if (!Object.values(reqs).every(Boolean)) {
      setError('New password must satisfy all strong password requirements.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setInfoMessage('');
    setLoading(true);

    const result = await resetPasswordWithOtp(email, otp, newPassword);

    if (result.success) {
      setStep('success');
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

    const result = await requestPasswordResetOtp(email);
    if (result.success) {
      setInfoMessage('A new reset OTP code has been sent to your email.');
      setCooldown(60);
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
                  <KeyRound className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="font-display text-3xl text-white font-extrabold leading-tight mb-3">
                  Account<br />Recovery.
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                  Reset your password using an instant 6-digit One-Time Password sent to your inbox.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2">
                <span className="badge-chip bg-white/10 text-white border border-white/15 px-3 py-1 rounded-full text-xs font-mono">
                  OTP Verified
                </span>
                <span className="badge-chip bg-white/10 text-white border border-white/15 px-3 py-1 rounded-full text-xs font-mono">
                  Secure Reset
                </span>
                <span className="badge-chip bg-white/10 text-white border border-white/15 px-3 py-1 rounded-full text-xs font-mono">
                  SafePass
                </span>
              </div>
            </motion.div>

            {/* Right — Dynamic Step Content */}
            <motion.div
              className='rounded-2xl md:rounded-l-none md:rounded-r-2xl p-8 md:p-10 relative overflow-hidden bg-black/40 flex flex-col justify-center'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                {step === 'request' && (
                  <motion.div
                    key="step-request"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='mb-6'>
                      <Link
                        to="/login"
                        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-3 transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                      </Link>
                      <h1 className='text-2xl font-bold text-white mb-1'>Reset Password</h1>
                      <p className='text-gray-400 text-xs leading-relaxed'>
                        Enter your registered email address and we'll send you a 6-digit OTP code to reset your password.
                      </p>
                    </div>

                    <form onSubmit={handleRequestOtp} className='space-y-5'>
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
                              Sending Reset OTP...
                            </>
                          ) : 'Send Reset OTP'}
                        </div>
                      </motion.button>
                    </form>
                  </motion.div>
                )}

                {step === 'reset' && (
                  <motion.div
                    key="step-reset"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='mb-6'>
                      <button
                        onClick={() => { setStep('request'); setError(''); setInfoMessage(''); }}
                        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-3 transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Change Email
                      </button>
                      <h2 className='text-2xl font-bold text-white mb-1'>Set New Password</h2>
                      <p className='text-gray-400 text-xs leading-relaxed'>
                        Enter the 6-digit OTP code sent to <span className="text-emerald-400 font-mono font-medium">{email}</span> and your new password. Check your <span className="text-amber-400 font-medium">Spam, Junk, or Updates folder</span> if not in your primary inbox.
                      </p>
                    </div>

                    <form onSubmit={handleResetPassword} className='space-y-4'>
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
                        <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1.5 text-center'>
                          6-Digit Reset OTP
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          placeholder="123456"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                          required
                          autoFocus
                          className='w-full bg-[var(--surface-3)] text-emerald-400 font-mono text-center tracking-[0.5em] text-2xl py-2.5 rounded-lg border border-emerald-500/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all'
                        />
                      </div>

                      <div>
                        <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1.5'>New Password</label>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder='Must satisfy strong password rules'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className='w-full bg-[var(--surface-3)] text-white py-2.5 pl-10 pr-4 rounded-lg border border-[var(--border-subtle)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm font-mono'
                          />
                          <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        </div>
                        <PasswordStrengthChecklist password={newPassword} />
                      </div>

                      <div>
                        <label className='block text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1.5'>Confirm New Password</label>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder='Re-enter new password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className='w-full bg-[var(--surface-3)] text-white py-2.5 pl-10 pr-4 rounded-lg border border-[var(--border-subtle)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all text-sm'
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
                              Updating Password...
                            </>
                          ) : 'Reset Password'}
                        </div>
                      </motion.button>
                    </form>

                    <div className='mt-5 pt-3 border-t border-white/10 text-center flex items-center justify-between text-xs'>
                      <span className='text-gray-400'>Didn't receive the OTP?</span>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={cooldown > 0 || resending}
                        className='inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors font-medium'
                      >
                        <RefreshCw className={`w-3 h-3 ${resending ? 'animate-spin' : ''}`} />
                        {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Reset OTP'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="step-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Password Reset Complete</h2>
                    <p className="text-gray-300 text-sm max-w-sm mx-auto mb-6">
                      Your SafePass account password has been successfully updated. You can now log in with your new credentials.
                    </p>

                    <button
                      onClick={() => navigate('/login')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 py-3 rounded-lg text-sm transition-colors shadow-lg shadow-emerald-900/30"
                    >
                      Return to Sign In
                    </button>
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

export default ForgotPassword;
