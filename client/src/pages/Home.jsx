import FeatureCard from "../components/FeatureCard";
import { Hero } from "../components/Hero";
import { useEffect, useRef, useState } from "react";
import { PageTransition } from "../components/animations/PageTransition";
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';

// Animated counter hook
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return { count, ref };
};

const Home = () => {
  const stat1 = useCountUp(100, 1800);
  const stat2 = useCountUp(256, 2200);
  const stat3 = useCountUp(0, 1000);

  return (
    <PageTransition transitionKey="home">
    <div className="relative">
      <div className="relative z-10">
        <Hero />

        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 pb-10 md:pb-14">

          {/* Stats — Clean grid with dark overlay */}
          <div className="mb-14 md:mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="text-center py-5 px-3 bg-black/75 backdrop-blur-md border border-gray-800/80 rounded-xl shadow-lg" ref={stat1.ref}>
                <span className="stat-value text-3xl md:text-4xl text-white font-extrabold block mb-1">{stat1.count}%</span>
                <span className="text-slate-300 text-[11px] font-mono font-medium uppercase tracking-widest">Client-side</span>
              </div>
              <div className="text-center py-5 px-3 bg-black/75 backdrop-blur-md border border-gray-800/80 rounded-xl shadow-lg" ref={stat2.ref}>
                <span className="stat-value text-3xl md:text-4xl text-white font-extrabold block mb-1">{stat2.count}<span className="text-emerald-400 text-lg ml-0.5">-bit</span></span>
                <span className="text-slate-300 text-[11px] font-mono font-medium uppercase tracking-widest">Encryption</span>
              </div>
              <div className="text-center py-5 px-3 bg-black/75 backdrop-blur-md border border-gray-800/80 rounded-xl shadow-lg" ref={stat3.ref}>
                <span className="stat-value text-3xl md:text-4xl text-emerald-400 font-extrabold block mb-1">{stat3.count}</span>
                <span className="text-slate-300 text-[11px] font-mono font-medium uppercase tracking-widest">Server Data</span>
              </div>
              <div className="text-center py-5 px-3 bg-black/75 backdrop-blur-md border border-gray-800/80 rounded-xl shadow-lg">
                <span className="stat-value text-3xl md:text-4xl text-white font-extrabold block mb-1">∞</span>
                <span className="text-slate-300 text-[11px] font-mono font-medium uppercase tracking-widest">Passwords</span>
              </div>
            </div>
          </div>

          {/* Why SafePass — dark overlay card */}
          <motion.div
            id="about"
            className="mb-14 md:mb-20 rounded-2xl p-6 md:p-8 bg-black/75 backdrop-blur-md border border-gray-800/80 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-start">
              <div className="md:col-span-2">
                <div className="relative pl-3 md:pl-4">
                  <span className="absolute top-0 left-0 text-[30px] md:text-[28px] leading-none text-white font-serif select-none pointer-events-none" aria-hidden="true">"</span>
                  <h2 className="font-display text-2xl md:text-3xl text-white font-extrabold leading-tight">
                    Security<br/>
                    <span className="text-emerald-400">without</span><br/>
                    compromise.
                  </h2>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="border-l border-gray-800 pl-5 md:pl-6">
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-5 font-normal">
                    SafePass is built with security-first principles. All operations
                    happen locally in your browser, ensuring your passwords never leave
                    your device. We use industry-standard cryptographic algorithms and
                    follow best practices to keep your data safe.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="badge-chip bg-black/60 text-slate-200 border border-gray-800/90 px-3.5 py-1.5 rounded-full text-xs font-mono">
                      Zero Knowledge
                    </span>
                    <span className="badge-chip bg-black/60 text-slate-200 border border-gray-800/90 px-3.5 py-1.5 rounded-full text-xs font-mono">
                      AES-256
                    </span>
                    <span className="badge-chip bg-black/60 text-slate-200 border border-gray-800/90 px-3.5 py-1.5 rounded-full text-xs font-mono">
                      Client-Side
                    </span>
                    <span className="badge-chip bg-black/60 text-slate-200 border border-gray-800/90 px-3.5 py-1.5 rounded-full text-xs font-mono">
                      Open Source
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Features — dark overlay card */}
          <div id="features" className="mb-14 md:mb-20">
            <motion.div
              className="rounded-2xl p-6 md:p-8 bg-black/75 backdrop-blur-md border border-gray-800/80 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="section-line mb-8 md:mb-10">
                <h2 className="font-display text-xl md:text-2xl text-center text-white font-extrabold whitespace-nowrap px-4">
                  Security Features
                </h2>
              </div>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 lg:gap-5">
                <StaggerItem>
                  <FeatureCard
                    icon="🔍"
                    title="Data Breach Checker"
                    description="Check if your password has been compromised in known data breaches."
                    link="/breach-checker"
                  />
                </StaggerItem>
                <StaggerItem>
                  <FeatureCard
                    icon="⚡"
                    title="Password Generator"
                    description="Generate cryptographically secure random passwords with custom options."
                    link="/password-generator"
                  />
                </StaggerItem>
                <StaggerItem>
                  <FeatureCard
                    icon="🗄️"
                    title="Password Manager"
                    description="Securely store and manage all your passwords with JWT authentication."
                    link="/password-manager"
                  />
                </StaggerItem>
              </StaggerContainer>
            </motion.div>
          </div>

          {/* CTA — dark overlay card */}
          <motion.div
            className="mb-0 relative overflow-hidden rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 p-8 md:p-14 text-center shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <p className="text-emerald-400 text-xs uppercase tracking-[0.22em] mb-3 font-mono font-semibold">
              Start protecting your accounts
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-white font-extrabold leading-tight mb-4">
              Your passwords deserve<br/>
              <span className="text-emerald-400">better security.</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
              Join SafePass and take control of your digital security. Free forever, no hidden fees, no data collection.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileTap={{ scale: 0.96 }}>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black text-[15px] font-bold px-8 py-3.5 rounded-full tracking-wide shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Get Started Free
                </Link>
              </motion.div>

              <motion.div whileTap={{ scale: 0.96 }}>
                <Link
                  to="/breach-checker"
                  className="inline-flex items-center gap-2 text-[15px] text-white hover:text-white px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 transition-all"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  Check a password
                </Link>
              </motion.div>
            </div>

            <p className="mt-6 text-gray-400 text-xs flex items-center justify-center gap-2 font-mono">
              Zero data collection · Open source · Free forever
            </p>
          </motion.div>

        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Home;
