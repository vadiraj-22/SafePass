import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-black border-t border-gray-800 py-12 mt-16 relative z-50'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col items-center text-center gap-8'>
          {/* Logo Section */}
          <div className='flex items-center gap-3'>
            <Link to='/' className='flex items-center gap-2'>
              <img src="/favicon_2.png" className='h-12 w-12' alt="SafePass Logo" />
              <span className='text-2xl font-bold text-white cybersec-title'>
                SafePass
              </span>
            </Link>
          </div>
          
          {/* Description */}
          <p className='text-gray-400 text-lg max-w-2xl'>
            Your complete platform for password security. Military-grade encryption and security tools to keep your digital life safe.
          </p>
          
          {/* Navigation Links */}
          <div className='flex flex-wrap justify-center gap-8 text-sm text-gray-400'>
            <Link to="/" className='hover:text-purple-300 transition-colors font-mono'>HOME</Link>
            <Link to="/features" className='hover:text-purple-300 transition-colors font-mono'>FEATURES</Link>
            <Link to="/password-generator" className='hover:text-purple-300 transition-colors font-mono'>GENERATOR</Link>
            <Link to="/breach-checker" className='hover:text-purple-300 transition-colors font-mono'>BREACH CHECKER</Link>
            <Link to="/password-manager" className='hover:text-purple-300 transition-colors font-mono'>VAULT</Link>
          </div>
          
          {/* Security Features */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl'>
            <div className='text-center bg-gray-900/30 border border-gray-800 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-300'>
              <div className='text-2xl mb-2'>🔒</div>
              <p className='text-purple-400 font-semibold text-sm font-mono'>CLIENT-SIDE SECURITY</p>
              <p className='text-gray-500 text-xs mt-1'>Your data never leaves your device</p>
            </div>
            <div className='text-center bg-gray-900/30 border border-gray-800 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-300'>
              <div className='text-2xl mb-2'>⚡</div>
              <p className='text-purple-400 font-semibold text-sm font-mono'>INSTANT GENERATION</p>
              <p className='text-gray-500 text-xs mt-1'>Cryptographically secure passwords</p>
            </div>
            <div className='text-center bg-gray-900/30 border border-gray-800 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-300'>
              <div className='text-2xl mb-2'>🛡️</div>
              <p className='text-purple-400 font-semibold text-sm font-mono'>BREACH DETECTION</p>
              <p className='text-gray-500 text-xs mt-1'>Real-time security monitoring</p>
            </div>
          </div>
          
          {/* Divider */}
          <div className='w-full border-t border-gray-800'></div>
          
          {/* Copyright */}
          <div className='flex flex-col md:flex-row justify-between items-center w-full gap-4'>
            <p className='text-gray-500 text-sm font-mono'>
             &copy; {new Date().getFullYear()} SafePass. All rights reserved. Built with security in mind.
            </p>
            <div className='flex gap-6 text-xs text-gray-500'>
              <a href="#privacy" className='hover:text-purple-300 transition-colors font-mono'>PRIVACY POLICY</a>
              <a href="#terms" className='hover:text-purple-300 transition-colors font-mono'>TERMS OF SERVICE</a>
              <a href="#security" className='hover:text-purple-300 transition-colors font-mono'>SECURITY</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
