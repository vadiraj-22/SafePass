import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='relative z-50 bg-[var(--surface-1)]'>
      {/* Decorative top divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border-hover)] to-transparent" />

      <div className='max-w-7xl mx-auto px-6 py-16'>
        {/* 3-column asymmetric layout */}
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-12'>
          {/* Brand block — takes more space */}
          <div className='md:col-span-5'>
            <Link to='/' className='flex items-center gap-2.5 mb-4'>
              <img src="/favicon_2.png" className='h-9 w-9' alt="SafePass Logo" />
              <span className='font-display text-lg text-white'>
                Safe<span className="text-[var(--clr-violet)]">Pass</span>
              </span>
            </Link>
            <p className='text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm'>
              Your complete platform for password security. Military-grade encryption and security tools to keep your digital life safe.
            </p>
          </div>

          {/* Navigation */}
          <div className='md:col-span-3'>
            <h4 className='text-[var(--text-muted)] text-xs uppercase tracking-widest mb-4'>Navigate</h4>
            <div className='flex flex-col gap-2.5'>
              {[
                { to: "/", label: "Home" },
                { to: "/features", label: "Features" },
                { to: "/password-generator", label: "Generator" },
                { to: "/breach-checker", label: "Breach Checker" },
                { to: "/password-manager", label: "Vault" },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className='text-[var(--text-secondary)] hover:text-white text-sm transition-colors duration-200 hover-line w-fit'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Security badges strip */}
          <div className='md:col-span-4'>
            <h4 className='text-[var(--text-muted)] text-xs uppercase tracking-widest mb-4'>Built With</h4>
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-3 text-sm text-[var(--text-secondary)]'>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--clr-emerald)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>Client-side processing</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-[var(--text-secondary)]'>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--clr-cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                <span>Cryptographically secure</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-[var(--text-secondary)]'>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--clr-amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
                <span>Real-time breach detection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='border-t border-[var(--border-subtle)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-[var(--text-muted)] text-xs'>
            &copy; {new Date().getFullYear()} SafePass. All rights reserved.
          </p>
          <div className='flex gap-6 text-xs text-[var(--text-muted)]'>
            <a href="#privacy" className='hover:text-[var(--text-secondary)] transition-colors hover-line'>Privacy</a>
            <a href="#terms" className='hover:text-[var(--text-secondary)] transition-colors hover-line'>Terms</a>
            <a href="#security" className='hover:text-[var(--text-secondary)] transition-colors hover-line'>Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
