import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { 
  User, 
  Lock, 
  Mail, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Save, 
  Loader2 
} from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, updatePassword } = useAuth();

  // Profile form state
  const [username, setUsername] = useState(user?.username || '');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  // Password form state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Keep username synced if user object updates
  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    if (!username.trim()) {
      setProfileError('Username cannot be empty');
      return;
    }

    if (username.trim().length < 3) {
      setProfileError('Username must be at least 3 characters long');
      return;
    }

    if (username.trim() === user?.username) {
      setProfileSuccess('No changes made to username');
      return;
    }

    setProfileLoading(true);
    const result = await updateProfile(username.trim());
    setProfileLoading(false);

    if (result.success) {
      setProfileSuccess('Profile updated successfully!');
    } else {
      setProfileError(result.message || 'Failed to update profile');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!oldPassword) {
      setPasswordError('Please enter your current (old) password');
      return;
    }

    if (!newPassword) {
      setPasswordError('Please enter a new password');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      return;
    }

    if (oldPassword === newPassword) {
      setPasswordError('New password must be different from current password');
      return;
    }

    setPasswordLoading(true);
    const result = await updatePassword(oldPassword, newPassword);
    setPasswordLoading(false);

    if (result.success) {
      setPasswordSuccess('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordError(result.message || 'Failed to update password');
    }
  };

  return (
    <div className="min-h-screen text-white pt-24 md:pt-28 pb-12 px-4 md:px-6 max-w-6xl mx-auto">
      {/* Compact Single Big Container Card matching feature pages */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden bg-black/65 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-7 shadow-2xl space-y-6"
      >
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* ── Compact Header Section (Avatar + User Info) ── */}
        <div className="flex items-center gap-4 relative z-10 border-b border-white/10 pb-5">
          <div className="relative shrink-0">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-xl md:text-2xl font-bold text-emerald-400 shadow-md font-mono">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#090a0f] p-1 rounded-lg border border-white/10">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
            </div>
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white font-display">
                {user?.username || 'User Profile'}
              </h1>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-medium">
                Verified Account
              </span>
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 font-mono">
              <Mail className="w-3.5 h-3.5 text-emerald-400/80" />
              {user?.email || 'N/A'}
            </p>
          </div>
        </div>

        {/* ── Two Columns Layout Inside Single Container Card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">

          {/* Section 1: Edit Profile Name */}
          <div className="rounded-xl bg-[#12131e]/80 border border-white/[0.08] p-5 md:p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/[0.06]">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white font-display">Account Details</h2>
                  <p className="text-[11px] text-slate-400">Update your account username</p>
                </div>
              </div>

              {profileSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{profileSuccess}</span>
                </motion.div>
              )}

              {profileError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{profileError}</span>
                </motion.div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase text-slate-300 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#05050a] border border-gray-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#05050a]/50 border border-gray-800/60 text-slate-400 text-xs cursor-not-allowed opacity-75 font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Email address is associated with your account identity and cannot be changed.
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="w-full py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 font-mono shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50"
                  >
                    {profileLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        Save Profile
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Section 2: Change Password */}
          <div className="rounded-xl bg-[#12131e]/80 border border-white/[0.08] p-5 md:p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/[0.06]">
                <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white font-display">Change Password</h2>
                  <p className="text-[11px] text-slate-400">Enter your old password to authorize change</p>
                </div>
              </div>

              {passwordSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{passwordSuccess}</span>
                </motion.div>
              )}

              {passwordError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{passwordError}</span>
                </motion.div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                {/* Current / Old Password */}
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase text-slate-300 mb-1">
                    Current Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full pl-9 pr-9 py-2 rounded-lg bg-[#05050a] border border-gray-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showOldPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase text-slate-300 mb-1">
                    New Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min. 6 chars)"
                      className="w-full pl-9 pr-9 py-2 rounded-lg bg-[#05050a] border border-gray-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase text-slate-300 mb-1">
                    Confirm New Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full pl-9 pr-9 py-2 rounded-lg bg-[#05050a] border border-gray-800 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full py-2.5 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 font-mono shadow-md shadow-sky-500/20 transition-all disabled:opacity-50"
                  >
                    {passwordLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        Update Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
