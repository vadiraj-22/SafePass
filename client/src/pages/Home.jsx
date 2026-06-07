import FeatureCard from "../components/FeatureCard";
import { Hero } from "../components/Hero";
import { useEffect, useRef, useState } from "react";
import { renderCanvas } from "../components/ui/canvas";
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
  useEffect(() => {
    renderCanvas();
  }, []);

  const stat1 = useCountUp(100, 1800);
  const stat2 = useCountUp(256, 2200);
  const stat3 = useCountUp(0, 1000);

  return (
    <PageTransition transitionKey="home">
    <div className="relative bg-black">
      <canvas
        className="pointer-events-none fixed inset-0 w-full bg-transparent z-0"
        id="canvas"
        style={{ height: '100vh', minHeight: '100vh' }}
      ></canvas>

      <div className="relative z-10">
        <Hero />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">

          {/* Stats — Clean grid */}
          <div className="mb-14 md:mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="text-center py-5 px-3 border border-[var(--border-subtle)] rounded-xl" ref={stat1.ref}>
                <span className="stat-value text-3xl md:text-4xl text-white block mb-1">{stat1.count}%</span>
                <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest">Client-side</span>
              </div>
              <div className="text-center py-5 px-3 border border-[var(--border-subtle)] rounded-xl" ref={stat2.ref}>
                <span className="stat-value text-3xl md:text-4xl text-white block mb-1">{stat2.count}<span className="text-[var(--clr-cyan)] text-lg">-bit</span></span>
                <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest">Encryption</span>
              </div>
              <div className="text-center py-5 px-3 border border-[var(--border-subtle)] rounded-xl" ref={stat3.ref}>
                <span className="stat-value text-3xl md:text-4xl text-[var(--clr-emerald)] block mb-1">{stat3.count}</span>
                <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest">Server Data</span>
              </div>
              <div className="text-center py-5 px-3 border border-[var(--border-subtle)] rounded-xl">
                <span className="stat-value text-3xl md:text-4xl text-white block mb-1">∞</span>
                <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest">Passwords</span>
              </div>
            </div>
          </div>

          {/* Why SafePass — glass highlight */}
          <motion.div
            id="about"
            className="mb-14 md:mb-20 rounded-2xl p-6 md:p-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-start">
              <div className="md:col-span-2">
                <div className="relative pl-3 md:pl-4">
                  <span className="absolute top-0 left-0 text-[30px] md:text-[28px] leading-none text-white font-serif select-none pointer-events-none" aria-hidden="true">"</span>
                  <h2 className="font-display text-2xl md:text-3xl text-white leading-tight">
                    Security<br/>
                    <span className="text-[var(--text-secondary)]">without</span><br/>
                    compromise.
                  </h2>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="border-l border-[var(--border-subtle)] pl-5 md:pl-6">
                  <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-5">
                    SafePass is built with security-first principles. All operations
                    happen locally in your browser, ensuring your passwords never leave
                    your device. We use industry-standard cryptographic algorithms and
                    follow best practices to keep your data safe.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="badge-chip">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--clr-emerald)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Zero Knowledge
                    </span>
                    <span className="badge-chip">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--clr-cyan)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      AES-256
                    </span>
                    <span className="badge-chip">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--clr-amber)" strokeWidth="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      Client-Side
                    </span>
                    <span className="badge-chip">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--clr-violet)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                      Open Source
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Features — merged from Features page, glass highlight */}
          <div id="features" className="mb-14 md:mb-20">
            <motion.div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="section-line mb-8 md:mb-10">
                <h2 className="font-display text-lg md:text-xl text-center text-white whitespace-nowrap px-4">
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

          {/* CTA — Creative call to action */}
          <motion.div
            className="mb-0 relative overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Gradient background */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(34,211,238,0.10) 0%, transparent 60%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.10)',
              }}
            />
            {/* Decorative glow orbs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[var(--clr-violet)]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[var(--clr-cyan)]/8 blur-3xl pointer-events-none" />

            <div className="relative z-10 px-6 md:px-12 py-12 md:py-16 text-center">
              <p className="text-[var(--text-muted)] text-[11px] uppercase tracking-[0.22em] mb-4">
                Start protecting your accounts
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-white leading-tight mb-4">
                Your passwords deserve<br/>
                <span className="text-shimmer">better security.</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
                Join SafePass and take control of your digital security. Free forever, no hidden fees, no data collection.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/signup"
                    className="relative group inline-flex items-center"
                  >
                    <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-[var(--clr-violet)] via-purple-400 to-[var(--clr-cyan)] opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:blur-[2px]" />
                    <div className="relative bg-[#08080e] text-white text-[14px] font-semibold px-8 py-3 rounded-full flex items-center gap-2 tracking-wide">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--clr-violet)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Get Started Free
                    </div>
                  </Link>
                </motion.div>

                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/breach-checker"
                    className="inline-flex items-center gap-2 text-[14px] text-white/60 hover:text-white px-6 py-3 rounded-full border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-all duration-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    Check a password
                  </Link>
                </motion.div>
              </div>

              {/* Social proof micro-copy */}
              <p className="mt-6 text-[var(--text-muted)] text-[11px] flex items-center justify-center gap-2">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--clr-emerald)" strokeWidth="2"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                Zero data collection · Open source · Free forever
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Home;
