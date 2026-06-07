import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/password-generator', label: 'Generator' },
  { to: '/breach-checker', label: 'Breach' },
];

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const allLinks = [
    ...navLinks,
    ...(isAuthenticated ? [{ to: '/password-manager', label: 'Vault' }] : []),
  ];

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center  pointer-events-none px-4">
      <motion.div
        className="pointer-events-auto relative w-full max-w-3xl"
        layout
        transition={{ type: 'spring', stiffness: 340, damping: 36 }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute -inset-2 rounded-[36px] pointer-events-none"
          style={{ filter: 'blur(28px)' }}
          animate={{
            opacity: open ? 0.4 : scrolled ? 0.12 : 0.22,
            background: open
              ? 'radial-gradient(ellipse at 50% 0%, var(--clr-violet) 0%, var(--clr-cyan) 100%)'
              : 'radial-gradient(ellipse at 50% 0%, var(--clr-violet) 0%, transparent 65%)',
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Island shell */}
        <motion.div
          layout
          className="relative overflow-hidden w-full"
          style={{
            background: 'rgba(12, 12, 22, 0.75)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          }}
          animate={{
            borderRadius: open ? '28px' : '999px',
            boxShadow: open
              ? '0 12px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)'
              : '0 6px 30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
          }}
          transition={{ type: 'spring', stiffness: 340, damping: 36 }}
        >
          {/* ── Main pill row ── */}
          <div className="flex items-center justify-between px-4 bg-gray-50/10 py-3">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors shrink-0"
            >
              <motion.img
                src="/favicon_2.png"
                className="h-8 w-8"
                alt="SafePass"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="font-display text-[16px] tracking-tight text-white hidden sm:block">
                Safe<span className="text-[var(--clr-violet)]">Pass</span>
              </span>
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-3 hidden md:block shrink-0" />

            {/* Nav links — desktop */}
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {allLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-200 whitespace-nowrap"
                  style={{ color: isActive(link.to) ? '#fff' : 'rgba(255,255,255,0.72)' }}
                >
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="islandActivePill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.09)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-3 hidden md:block shrink-0" />

            {/* Auth — desktop */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center px-5 bg-gray-100/10 gap-1.5 px-3 py-1.5 rounded-full bg-[var(--clr-emerald)]/10">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--clr-emerald)" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span className="text-[13px] text-[var(--clr-emerald)]  font-medium">
                      {user?.username}
                    </span>
                  </div>
                  <motion.button
                    onClick={logout}
                    className="text-[13px] text-white/50 hover:text-white  px-4 py-1.5 rounded-full bg-white/[0.05] hover:bg-red-700 transition-all duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    Log out
                  </motion.button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[13px] text-white/70 hover:text-white px-4 py-1.5 rounded-full hover:bg-white/[0.07] border border-transparent hover:border-white/[0.15] transition-all duration-200"
                  >
                    Log in
                  </Link>
                  <motion.div whileTap={{ scale: 0.95 }}>
                  <Link to="/signup" className="relative group">
                    <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-[var(--clr-violet)] via-purple-400 to-[var(--clr-cyan)] opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:blur-[1px]" />
                    <div className="relative bg-[#08080e] text-white text-[13px] font-semibold px-5 py-1.5 rounded-full flex items-center gap-1.5 tracking-wide">
                      <span className="text-purple-400">⚡</span>
                      Get Started
                    </div>
                  </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden p-2.5 rounded-full text-white/50 hover:text-white hover:bg-white/[0.07] transition-all duration-200 ml-1"
            >
              <div className="w-[18px] h-[14px] flex flex-col justify-between">
                <motion.span
                  className="w-full h-[1.5px] bg-current block origin-center rounded-full"
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.span
                  className="w-full h-[1.5px] bg-current block rounded-full"
                  animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="w-full h-[1.5px] bg-current block origin-center rounded-full"
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </button>
          </div>

          {/* ── Mobile expanded menu ── */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="mobile-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                className="overflow-hidden md:hidden"
              >
                <div className="mx-4 h-px bg-white/[0.07]" />
                <div className="px-4 pt-3 pb-4 space-y-1">
                  {allLinks.map((link, i) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045, duration: 0.2 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 py-2.5 px-4 rounded-2xl text-[14px] font-medium transition-colors ${
                          isActive(link.to)
                            ? 'text-white bg-white/[0.08]'
                            : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        {isActive(link.to) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--clr-violet)] shrink-0" />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Auth section */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: allLinks.length * 0.045 + 0.06 }}
                  >
                    <div className="h-px bg-white/[0.07] my-2" />
                    {isAuthenticated ? (
                      <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-sm text-[var(--clr-emerald)] font-medium">
                          {user?.username}
                        </span>
                        <button
                          onClick={() => { logout(); setOpen(false); }}
                          className="text-sm text-white/50 hover:text-white transition-colors"
                        >
                          Log out
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2.5 pt-1 px-1">
                        <Link
                          to="/login"
                          onClick={() => setOpen(false)}
                          className="flex-1 text-center text-[13px] text-white/55 hover:text-white py-2.5 rounded-2xl border border-white/[0.09] hover:border-white/25 transition-all"
                        >
                          Log in
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setOpen(false)}
                          className="flex-1 text-center text-[13px] text-white font-semibold py-2.5 rounded-2xl bg-gradient-to-r from-[var(--clr-violet)] via-purple-400 to-[var(--clr-cyan)] hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
                        >
                          ⚡ Get Started
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Navbar;
