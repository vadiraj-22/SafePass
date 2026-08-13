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
            <Link to='/' className='flex items-center gap-2.5 mb-4 group'>
              <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 group-hover:border-emerald-400/60 transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-emerald-400 shrink-0">
                  <path d="M12 2L3 7V12C3 17.55 6.84 21.74 12 23C17.16 21.74 21 17.55 21 12V7L12 2Z" fill="rgba(16,185,129,0.18)" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                  <rect x="9" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M10 10V8C10 6.895 10.895 6 12 6C13.105 6 14 6.895 14 8V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <span className='font-display text-xl font-extrabold tracking-tight flex items-center'>
                <span className="text-white font-extrabold">Safe</span>
                <span className="text-emerald-400 font-extrabold ml-0.5">Pass</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1.5 inline-block" />
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
