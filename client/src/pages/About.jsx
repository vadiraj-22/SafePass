import { useEffect } from 'react';
import { renderCanvas } from '../components/ui/canvas';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const techStack = {
  frontend: [
    { name: "React 19", icon: "⚛️" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Vite", icon: "⚡" },
    { name: "TypeScript", icon: "📘" },
  ],
  security: [
    { name: "Crypto RNG", icon: "🔐" },
    { name: "HIBP API", icon: "🔍" },
    { name: "JWT Auth", icon: "🎟️" },
    { name: "MongoDB", icon: "🍃" },
  ]
};

const securityPillars = [
  { title: "Client-Side", desc: "100% local processing", color: "var(--clr-emerald)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { title: "Encrypted", desc: "256-bit encryption", color: "var(--clr-cyan)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
  { title: "Private", desc: "Zero data collection", color: "var(--clr-amber)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
  { title: "Secure", desc: "No server storage", color: "var(--clr-violet)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/></svg> },
];

const About = () => {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div className='relative bg-black text-white min-h-screen pt-24 pb-16 px-6'>
      <canvas
        className="pointer-events-none fixed inset-0 w-full bg-transparent z-0"
        id="canvas"
        style={{ height: '100vh', minHeight: '100vh' }}
      ></canvas>

      <div className="relative z-10">
        <div className='max-w-7xl mx-auto'>
          {/* Editorial header */}
          <div className='mb-16'>
            <motion.p
              className='text-[var(--text-muted)] text-xs uppercase tracking-[0.2em] mb-3'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              About the project
            </motion.p>
            <motion.h1
              className='font-display text-4xl md:text-6xl text-white leading-tight mb-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Built for<br/>
              <span className="text-[var(--text-secondary)]">people who care.</span>
            </motion.h1>
            <motion.div
              className="w-16 h-[2px] bg-[var(--clr-emerald)]"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </div>

          {/* Mission — editorial pull-quote */}
          <motion.div
            className="mb-20 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="md:col-span-2 relative">
              <h2 className="font-display text-2xl md:text-3xl text-white leading-snug">
                Privacy is not<br/>a feature.<br/>
                <span className="text-[var(--clr-emerald)]">It's the foundation.</span>
              </h2>
            </div>
            <div className="md:col-span-3 border-l border-[var(--border-subtle)] pl-6 md:pl-8">
              <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed">
                SafePass is built with security-first principles. All operations happen locally in your browser,
                ensuring your passwords never leave your device. We use industry-standard cryptographic algorithms
                and follow best practices to keep your data safe. Our commitment is to provide you with the most
                secure, private, and user-friendly password management experience possible.
              </p>
            </div>
          </motion.div>

          {/* Security pillars — alternating accent colors */}
          <div className="mb-20">
            <div className="section-line mb-8">
              <h2 className="font-display text-xl text-white whitespace-nowrap px-4">
                Our Principles
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {securityPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  className="group relative rounded-xl p-[1px] overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  style={{
                    background: `linear-gradient(135deg, ${pillar.color}20, transparent)`
                  }}
                >
                  <div className="bg-[var(--surface-1)] rounded-[11px] p-5 h-full text-center">
                    <div
                      className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ color: pillar.color, background: `${pillar.color}10` }}
                    >
                      {pillar.icon}
                    </div>
                    <h3 className="font-display text-sm text-white mb-1">{pillar.title}</h3>
                    <p className="text-[var(--text-muted)] text-xs">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech stack — badge chips */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="section-line mb-10">
              <h2 className="font-display text-xl text-white whitespace-nowrap px-4">
                Technology
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.frontend.map(tech => (
                    <span key={tech.name} className="badge-chip text-xs">
                      <span>{tech.icon}</span>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-4">Security</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.security.map(tech => (
                    <span key={tech.name} className="badge-chip text-xs">
                      <span>{tech.icon}</span>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="relative rounded-2xl p-[1px] overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.2), transparent, rgba(34,211,238,0.2))'
            }}
          >
            <div className="bg-[var(--surface-1)] rounded-[15px] p-10 md:p-16 text-center noise-overlay">
              <div className="relative z-10">
                <h2 className="font-display text-2xl md:text-4xl text-white mb-4">
                  Ready to take control?
                </h2>
                <p className="text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
                  Start generating secure passwords and checking for breaches — it's free, instant, and private.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link
                    to="/password-generator"
                    className="relative group inline-block"
                  >
                    <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-[var(--clr-violet)] to-[var(--clr-cyan)] opacity-70 blur-[1px] group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-[var(--surface-1)] text-white font-medium px-6 py-2.5 rounded-lg text-sm">
                      Start Now
                    </div>
                  </Link>
                  <Link
                    to="/features"
                    className="text-[var(--text-secondary)] hover:text-white border border-[var(--border-subtle)] hover:border-[var(--border-hover)] px-6 py-2.5 rounded-lg text-sm transition-all duration-300"
                  >
                    View Features
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;