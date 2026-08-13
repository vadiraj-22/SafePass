import { motion } from 'motion/react';

const securityPillars = [
  { title: "Client-Side", desc: "100% local processing", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { title: "Encrypted", desc: "256-bit AES encryption", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
  { title: "Private", desc: "Zero data collection", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
  { title: "Secure", desc: "Zero unencrypted storage", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/></svg> },
];

const About = () => {
  return (
    <div className='relative text-white pt-24 md:pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-10'>
      {/* Editorial Header */}
      <div className='bg-black/65 backdrop-blur-md border border-gray-800/80 rounded-none p-8 md:p-10 shadow-2xl space-y-4'>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          SAFEPASS SECURITY ARCHITECTURE & MISSION
        </div>

        <motion.h1
          className='font-display text-3xl md:text-5xl text-white font-extrabold tracking-tight leading-tight'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Built for Security & <span className="text-[#c084fc] font-extrabold">Absolute Privacy</span>
        </motion.h1>

        <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed font-body">
          SafePass is engineered with zero-knowledge cryptography, local client-side processing, and real-time threat intelligence.
        </p>
      </div>

      {/* Mission */}
      <motion.div
        className="bg-black/65 backdrop-blur-md border border-gray-800/80 rounded-none p-8 md:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-5 gap-8 items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="md:col-span-2 space-y-2">
          <h2 className="font-display text-2xl md:text-3xl text-white leading-snug font-extrabold">
            Privacy is not a feature.<br/>
            <span className="text-emerald-400">It's the foundation.</span>
          </h2>
        </div>
        <div className="md:col-span-3">
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-body">
            Most password tools require trusting third-party servers with your credentials. SafePass flips this model completely — your passwords are generated, analyzed, and evaluated entirely inside your browser. Nothing touches our servers unencrypted.
          </p>
        </div>
      </motion.div>

      {/* Security Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityPillars.map((pillar, idx) => (
          <div key={idx} className="bg-[#0b0c12] border border-gray-800/80 rounded-2xl p-6 space-y-2.5 shadow-md">
            <div className="p-3 rounded-xl w-fit bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {pillar.icon}
            </div>
            <h3 className="text-base font-bold text-white font-display">{pillar.title}</h3>
            <p className="text-xs text-slate-300 font-mono">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;