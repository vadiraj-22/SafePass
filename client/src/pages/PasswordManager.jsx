import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

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
    <div className="min-h-screen text-white pt-24 md:pt-28 pb-16 px-4 md:px-6 max-w-6xl mx-auto space-y-6">
      {/* Editorial Header */}
      <div className="bg-black/65 backdrop-blur-md border border-gray-800/80 rounded-2xl md:rounded-3xl p-6 md:p-7 shadow-2xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          ENCRYPTED PASSWORD VAULT
        </div>

        <motion.h1
          className='font-display text-2xl md:text-4xl text-white font-extrabold tracking-tight leading-tight'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Password Vault & <span className="text-[#38bdf8] font-extrabold">Credential Manager</span>
        </motion.h1>

        <p className="text-slate-300 text-xs md:text-sm max-w-3xl leading-relaxed font-body">
          Store, organize, and retrieve your account credentials securely with zero-knowledge encryption and JWT authentication.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="bg-black/65 backdrop-blur-md border border-gray-800/80 rounded-2xl md:rounded-3xl p-5 md:p-7 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Form */}
          <div className="w-full lg:w-1/3 bg-[#12131e] p-6 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white font-display border-b border-gray-800 pb-3">Save New Credential</h3>
            <form onSubmit={handleAddPassword} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-300 font-mono font-semibold mb-1">Website / Service</label>
                <input
                  type="text"
                  placeholder="e.g. github.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-[#05050a] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-300 font-mono font-semibold mb-1">Username / Email</label>
                <input
                  type="text"
                  placeholder="e.g. alex@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#05050a] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-300 font-mono font-semibold mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#05050a] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm font-mono transition-colors cursor-pointer"
              >
                SAVE TO VAULT
              </button>
            </form>
          </div>

          {/* List */}
          <div className="w-full lg:w-2/3 space-y-4">
            <h3 className="text-base font-bold text-white font-display border-b border-gray-800 pb-3 flex items-center justify-between">
              <span>Stored Credentials</span>
              <span className="text-xs font-mono bg-white/5 px-2.5 py-1 rounded text-emerald-400 border border-gray-800">{passwords.length} Entries</span>
            </h3>

            {loading ? (
              <div className="text-center py-12 text-slate-400 font-mono text-xs">Loading encrypted vault...</div>
            ) : passwords.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-mono text-xs bg-[#12131e] rounded-2xl border border-gray-800">
                No credentials saved yet. Add your first login above!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {passwords.map((item) => (
                  <div key={item._id} className="bg-[#12131e] p-5 rounded-2xl border border-gray-800 space-y-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center font-mono text-sm border border-emerald-500/30">
                          {item.website[0]?.toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white font-display">{item.website}</h4>
                          <p className="text-xs text-slate-400 font-mono">{item.username}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeletePassword(item._id)}
                        className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-[#05050a] px-3.5 py-2.5 rounded-xl border border-gray-800 font-mono text-xs">
                      <span className="text-slate-300">
                        {showPassword[item._id] ? item.password : '••••••••••••'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleShow(item._id)}
                          className="text-slate-400 hover:text-white font-medium flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
                          title={showPassword[item._id] ? "Hide Password" : "Show Password"}
                        >
                          {showPassword[item._id] ? (
                            <>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                              <span>HIDE</span>
                            </>
                          ) : (
                            <>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                              <span>SHOW</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleCopy(item.password, item._id)}
                          className="text-emerald-400 font-bold flex items-center gap-1.5 px-2 py-1 rounded hover:bg-emerald-500/10 transition-colors cursor-pointer"
                          title="Copy Password"
                        >
                          {copiedId === item._id ? (
                            <>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                              <span>COPIED!</span>
                            </>
                          ) : (
                            <>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                              <span>COPY</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
