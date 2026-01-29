import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useAnimation } from './animations/AnimationProvider';
import { handleSmoothNavigation } from '../utils/smoothScroll';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { variants, getAnimationVariant } = useAnimation();

  // Enhanced mobile menu animation variants
  const mobileMenuVariants = getAnimationVariant({
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    open: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }, {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  });

  // Navigation link animation variants
  const navLinkVariants = getAnimationVariant({
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { scale: 0.95 }
  }, {
    rest: { opacity: 1 },
    hover: { opacity: 0.8 }
  });

  // Check if current path matches link
  const isActiveLink = (path) => location.pathname === path;

  // Handle navigation with smooth scroll for anchor links
  const handleNavClick = (href, callback) => {
    if (href.startsWith('#')) {
      handleSmoothNavigation(href, 80); // 80px offset for fixed navbar
    }
    if (callback) callback();
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-black/30 border-b backdrop-blur-2xl border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Brand with animation */}
          <motion.div 
            className='flex items-center gap-3'
            variants={navLinkVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <Link to='/' className='flex items-center gap-2'>
              <motion.img 
                src="/favicon_2.png" 
                className='h-16 w-16' 
                alt=""
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <span className='font-heading text-xl sm:text-2xl font-bold bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent'>
                SafePass
              </span>
            </Link>
          </motion.div>

          {/* Desktop Links with enhanced animations */}
          <div className='hidden md:flex items-center gap-8'>
            {[
              { to: '/', label: 'HOME' },
              { to: '/features', label: 'FEATURES' },
              { to: '/password-generator', label: 'GENERATOR' },
              { to: '/breach-checker', label: 'BREACH CHECKER' }
            ].map((link) => (
              <motion.div key={link.to} variants={navLinkVariants} initial="rest" whileHover="hover" whileTap="tap">
                <Link 
                  to={link.to} 
                  className={`text-gray-300 hover:text-purple-400 transition font-mono text-sm relative ${
                    isActiveLink(link.to) ? 'text-purple-400' : ''
                  }`}
                >
                  {link.label}
                  {/* Active indicator */}
                  {isActiveLink(link.to) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                      layoutId="activeIndicator"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {isAuthenticated && (
              <motion.div variants={navLinkVariants} initial="rest" whileHover="hover" whileTap="tap">
                <Link 
                  to='/password-manager' 
                  className={`text-gray-300 hover:text-purple-400 transition font-mono text-sm relative ${
                    isActiveLink('/password-manager') ? 'text-purple-400' : ''
                  }`}
                >
                  VAULT
                  {isActiveLink('/password-manager') && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                      layoutId="activeIndicator"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </Link>
              </motion.div>
            )}
          </div>

          {/* Auth Buttons (desktop) with enhanced animations */}
          <div className='hidden md:flex items-center gap-4'>
            {isAuthenticated ? (
              <>
                <motion.span 
                  className='text-gray-400 text-sm font-mono'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Welcome, <span className='text-purple-400 font-semibold'>{user?.username}</span>
                </motion.span>
                <motion.button 
                  onClick={logout} 
                  className='text-gray-300 hover:text-white transition px-4 py-2 border border-gray-700 hover:border-purple-500 rounded-lg font-mono text-sm'
                  variants={variants.button}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  LOGOUT
                </motion.button>
              </>
            ) : (
              <>
                <motion.div
                  variants={variants.button}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white transition px-4 py-2 border border-gray-400/30 hover:border-purple-500 rounded-lg font-mono text-sm"
                  >
                    LOGIN
                  </Link>
                </motion.div>
                <motion.div
                  variants={variants.button}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link to='/signup' className='bg-linear-to-r from-purple-500 to-blue-500 hover:from-gray-400 border border-purple-600 hover:to-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition font-mono text-sm'>
                    SIGN UP
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile hamburger with animation */}
          <div className='md:hidden flex items-center'>
            <motion.button 
              onClick={() => setOpen(v => !v)} 
              aria-label='Toggle menu' 
              className='p-2 rounded-md text-gray-300 hover:text-white focus:outline-none'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? '✖️' : '☰'}
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu panel with animations */}
      <motion.div
        className='md:hidden bg-black/90 border-t border-gray-800 overflow-hidden'
        variants={mobileMenuVariants}
        initial="closed"
        animate={open ? "open" : "closed"}
      >
        <motion.div 
          className='px-4 pt-2 pb-4 space-y-2'
          variants={getAnimationVariant({
            closed: { opacity: 0 },
            open: { 
              opacity: 1,
              transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }, {
            closed: { opacity: 0 },
            open: { opacity: 1 }
          })}
        >
          {[
            { to: '/', label: 'HOME' },
            { to: '/features', label: 'FEATURES' },
            { to: '/password-generator', label: 'GENERATOR' },
            { to: '/breach-checker', label: 'BREACH CHECKER' }
          ].map((link) => (
            <motion.div
              key={link.to}
              variants={getAnimationVariant({
                closed: { opacity: 0, x: -20 },
                open: { opacity: 1, x: 0 }
              }, {
                closed: { opacity: 0 },
                open: { opacity: 1 }
              })}
            >
              <Link 
                to={link.to} 
                onClick={() => setOpen(false)} 
                className={`block text-gray-300 hover:text-purple-400 py-2 font-mono text-sm ${
                  isActiveLink(link.to) ? 'text-purple-400' : ''
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          
          {isAuthenticated && (
            <motion.div
              variants={getAnimationVariant({
                closed: { opacity: 0, x: -20 },
                open: { opacity: 1, x: 0 }
              }, {
                closed: { opacity: 0 },
                open: { opacity: 1 }
              })}
            >
              <Link 
                to='/password-manager' 
                onClick={() => setOpen(false)} 
                className={`block text-gray-300 hover:text-purple-400 py-2 font-mono text-sm ${
                  isActiveLink('/password-manager') ? 'text-purple-400' : ''
                }`}
              >
                VAULT
              </Link>
            </motion.div>
          )}

          <motion.div 
            className='border-t border-gray-800 pt-3'
            variants={getAnimationVariant({
              closed: { opacity: 0, y: 10 },
              open: { opacity: 1, y: 0 }
            }, {
              closed: { opacity: 0 },
              open: { opacity: 1 }
            })}
          >
            {isAuthenticated ? (
              <>
                <div className='text-gray-400 text-sm py-2 font-mono'>
                  Welcome, <span className='text-purple-400 font-semibold'>{user?.username}</span>
                </div>
                <button 
                  onClick={() => { logout(); setOpen(false); }} 
                  className='w-full text-left text-gray-300 hover:text-white py-2 font-mono text-sm'
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link 
                  to='/login' 
                  onClick={() => setOpen(false)} 
                  className='block text-gray-300 hover:text-white py-2 font-mono text-sm'
                >
                  LOGIN
                </Link>
                <Link 
                  to='/signup' 
                  onClick={() => setOpen(false)} 
                  className='block bg-linear-to-r from-purple-500 to-blue-500 text-white font-semibold px-3 py-2 rounded-lg mt-2 font-mono text-sm'
                >
                  SIGN UP
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
