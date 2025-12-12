const Footer = () => {
  return (
    <footer className='bg-black border-t border-gray-800 py-8 mt-16 relative z-50'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-xl'>🔐</span>
            <span className='text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent'>
              SafePass
            </span>
          </div>
          
          <p className='text-gray-400 text-sm'>
            © 2024 SafePass. Secure Password Management Suite.
          </p>
          
          <div className='flex gap-6 text-sm text-gray-400'>
            <a href="#privacy" className='hover:text-white transition'>Privacy</a>
            <a href="#terms" className='hover:text-white transition'>Terms</a>
            <a href="#contact" className='hover:text-white transition'>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
