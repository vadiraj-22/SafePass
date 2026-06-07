import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

const stringToColor = (str) => {
  const colors = [
    'var(--clr-violet)', 'var(--clr-cyan)', 'var(--clr-amber)',
    'var(--clr-emerald)', 'var(--clr-coral)', 'var(--clr-indigo)'
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'https://safepass-60b0.onrender.com/api';

  useEffect(() => { fetchPasswords(); }, []);

  const fetchPasswords = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/passwords`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPasswords(res.data);
    } catch {
      setError('Failed to load passwords');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPassword = async (e) => {
    e.preventDefault();
    if (!website || !username || !password) return;
    try {
      const res = await axios.post(
        `${API_URL}/passwords`,
        { website, username, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPasswords([res.data, ...passwords]);
      setWebsite(''); setUsername(''); setPassword('');
    } catch {
      alert('Failed to add password');
    }
  };

  const handleDeletePassword = async (id) => {
    if (!window.confirm('Delete this password?')) return;
    try {
      await axios.delete(`${API_URL}/passwords/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPasswords(passwords.filter(p => p._id !== id));
    } catch {
      alert('Failed to delete password');
    }
  };

  const handleCopy = (pwd, id) => {
    navigator.clipboard.writeText(pwd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleShow = (id) =>
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Page wrapper — clears the floating navbar (≈ top-5 + ~52px pill height) ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-20">

        {/* ── Page header ── */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-[var(--text-muted)] text-[11px] uppercase tracking-[0.22em] mb-2">
            Secure vault
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white leading-[1.1] mb-3">
            Password{' '}
            <span className="text-[var(--text-secondary)]">Manager</span>
          </h1>
          <motion.div
            className="w-14 h-[2px] bg-[var(--clr-violet)] mb-4"
            initial={{ width: 0 }}
            animate={{ width: 56 }}
            transition={{ duration: 0.55, delay: 0.25 }}
          />
          <span className="inline-flex items-center gap-2 text-[11px] text-[var(--clr-amber)] bg-[var(--clr-amber)]/8  rounded-full px-3 py-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Passwords stored securely with JWT authentication
          </span>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── LEFT: Add password form (sticky) ── */}
          <motion.div
            className="w-full lg:w-[300px] shrink-0 sticky top-28"
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {/* gradient border wrapper */}
            <div
              className="rounded-2xl p-[1px]"
              style={{
                background:
                  'linear-gradient(145deg, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.05) 50%, rgba(99,102,241,0.15) 100%)',
              }}
            >
              <div className="bg-[var(--surface-1)] rounded-[15px] p-6">
                {/* Form header */}
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-7 h-7 rounded-lg bg-[var(--clr-violet)]/15 flex items-center justify-center shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--clr-violet)" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
                    </svg>
                  </div>
                  <h2 className="font-display text-[15px] text-white">Add Password</h2>
                </div>

                <form onSubmit={handleAddPassword} className="space-y-4">
                  {/* Website */}
                  <div>
                    <label className="block text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1.5">
                      Website
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Gmail"
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                      className="w-full bg-[var(--surface-3)] text-white text-sm px-3 py-2.5 rounded-lg border border-[var(--border-subtle)] focus:border-[var(--clr-violet)] focus:outline-none transition-colors placeholder:text-[var(--text-muted)]"
                    />
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1.5">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="you@email.com"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full bg-[var(--surface-3)] text-white text-sm px-3 py-2.5 rounded-lg border border-[var(--border-subtle)] focus:border-[var(--clr-violet)] focus:outline-none transition-colors placeholder:text-[var(--text-muted)]"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-[var(--surface-3)] text-white text-sm px-3 py-2.5 rounded-lg border border-[var(--border-subtle)] focus:border-[var(--clr-violet)] focus:outline-none transition-colors placeholder:text-[var(--text-muted)]"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="relative w-full overflow-hidden rounded-lg group"
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--clr-violet)] to-[var(--clr-indigo)] opacity-85 group-hover:opacity-100 transition-opacity duration-200" />
                    <div className="relative flex items-center justify-center gap-2 text-white text-sm font-medium py-2.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                        <polyline points="17,21 17,13 7,13 7,21"/>
                        <polyline points="7,3 7,8 15,8"/>
                      </svg>
                      Save Password
                    </div>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Saved passwords list ── */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <div className="bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden">
              {/* List header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
                <h2 className="font-display text-[15px] text-white">Saved Passwords</h2>
                <span className="text-[11px] text-[var(--text-muted)] bg-[var(--surface-3)] border border-[var(--border-subtle)] px-2.5 py-0.5 rounded-full tabular-nums">
                  {passwords.length}
                </span>
              </div>

              {/* Body */}
              <div className="p-3">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <svg className="animate-spin w-5 h-5 text-[var(--text-muted)]" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    <p className="text-[var(--text-muted)] text-sm">Loading passwords…</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--clr-rose)" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                    </svg>
                    <p className="text-[var(--clr-rose)] text-sm">{error}</p>
                  </div>
                ) : passwords.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <div className="w-14 h-14 rounded-xl bg-[var(--surface-2)] border border-[var(--border-subtle)] flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                        <rect x="3" y="11" width="18" height="11" rx="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm">No passwords yet</p>
                    <p className="text-[var(--text-muted)] text-xs">Add your first password using the form</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {passwords.map((item, index) => {
                      const accent = stringToColor(item.website || '');
                      const initial = (item.website || '?')[0].toUpperCase();
                      return (
                        <motion.div
                          key={item._id}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-[var(--border-subtle)] transition-all duration-150 group"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.25, delay: index * 0.03 }}
                        >
                          {/* Avatar — lock/unlock icon */}
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                              border: `1px solid color-mix(in srgb, ${accent} 20%, transparent)`,
                            }}
                          >
                            {showPassword[item._id] ? (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8">
                                <rect x="3" y="11" width="18" height="11" rx="2"/>
                                <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                              </svg>
                            ) : (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.8">
                                <rect x="3" y="11" width="18" height="11" rx="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                              </svg>
                            )}
                          </div>

                          {/* Site + username */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate leading-tight">{item.website}</p>
                            <p className="text-[var(--text-muted)] text-xs truncate leading-tight mt-0.5">{item.username}</p>
                          </div>

                          {/* Password preview */}
                          <div className="hidden sm:block bg-[var(--surface-2)] border border-[var(--border-subtle)] rounded-lg px-3 py-1.5 font-mono text-[11px] text-[var(--text-secondary)] min-w-[110px] text-center shrink-0">
                            {showPassword[item._id] ? item.password : '••••••••••'}
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-1 shrink-0">
                            <motion.button
                              onClick={() => toggleShow(item._id)}
                              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/[0.07] transition-all"
                              title={showPassword[item._id] ? 'Hide' : 'Show'}
                              whileTap={{ scale: 0.90 }}
                            >
                              {showPassword[item._id] ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--clr-violet)" strokeWidth="1.5">
                                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                  <line x1="1" y1="1" x2="23" y2="23"/>
                                </svg>
                              ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                  <circle cx="12" cy="12" r="3"/>
                                </svg>
                              )}
                            </motion.button>

                            <motion.button
                              onClick={() => handleCopy(item.password, item._id)}
                              className={`p-1.5 rounded-lg transition-all ${
                                copiedId === item._id
                                  ? 'text-[var(--clr-emerald)] bg-[var(--clr-emerald)]/10'
                                  : 'text-[var(--text-muted)] hover:text-white hover:bg-white/[0.07]'
                              }`}
                              title="Copy"
                              whileTap={{ scale: 0.90 }}
                            >
                              {copiedId === item._id ? (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/>
                                </svg>
                              ) : (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <rect x="9" y="9" width="13" height="13" rx="2"/>
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                </svg>
                              )}
                            </motion.button>

                            <motion.button
                              onClick={() => handleDeletePassword(item._id)}
                              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--clr-rose)] hover:bg-[var(--clr-rose)]/10 transition-all"
                              title="Delete"
                              whileTap={{ scale: 0.90 }}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <polyline points="3,6 5,6 21,6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                              </svg>
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* Security notice */}
            <motion.div
              className="mt-4 flex items-start gap-3 border border-[var(--border-subtle)] rounded-xl px-5 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--clr-violet)" strokeWidth="1.5" className="shrink-0 mt-0.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <div>
                <p className="text-xs font-medium text-white mb-1">Security Features</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-[var(--text-muted)]">
                  <span>JWT authentication</span>
                  <span className="text-[var(--border-hover)]">·</span>
                  <span>MongoDB storage</span>
                  <span className="text-[var(--border-hover)]">·</span>
                  <span>User isolation</span>
                  <span className="text-[var(--border-hover)]">·</span>
                  <span>Token verification</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
