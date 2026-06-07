import FeatureCard from '../components/FeatureCard';
import { useEffect } from 'react';
import { renderCanvas } from '../components/ui/canvas';
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';
import { motion } from 'motion/react';

const securityFeatures = [
  { icon: "🔒", title: "256-bit Encryption", desc: "Military-grade security for every password", color: "var(--clr-violet)" },
  { icon: "🛡️", title: "Zero Knowledge", desc: "We never see, store, or access your data", color: "var(--clr-emerald)" },
  { icon: "⚡", title: "Client-Side Processing", desc: "Everything runs in your browser, nothing sent to servers", color: "var(--clr-amber)" },
  { icon: "🔍", title: "Real-time Validation", desc: "Instant feedback on password strength and breaches", color: "var(--clr-cyan)" },
];

const Features = () => {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div className='relative bg-black text-white min-h-screen pt-24 pb-16 px-6'>
      {/* Full page canvas animation */}
      <canvas
        className="pointer-events-none fixed inset-0 w-full bg-transparent z-0"
        id="canvas"
        style={{ height: '100vh', minHeight: '100vh' }}
      ></canvas>

      <div className="relative z-10">
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='mb-16'>
            <motion.p
              className='text-[var(--text-muted)] text-xs uppercase tracking-[0.2em] mb-3'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Everything you need
            </motion.p>
            <motion.h1
              className='font-display text-4xl md:text-6xl text-white leading-tight mb-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Security tools,<br/>
              <span className="text-[var(--text-secondary)]">built right.</span>
            </motion.h1>
            <motion.div
              className="w-16 h-[2px] bg-[var(--clr-violet)]"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </div>

          {/* Main features grid */}
          <StaggerContainer
            className='grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch'
            staggerDelay={0.1}
            viewport={true}
            once={true}
          >
            <StaggerItem>
              <FeatureCard
                icon="🔍"
                title="Data Breach Checker"
                description="Instantly check if your password has been compromised in known data breaches using the Have I Been Pwned database."
                link="/breach-checker"
              />
            </StaggerItem>

            <StaggerItem>
              <FeatureCard
                icon="⚡"
                title="Password Generator"
                description="Generate cryptographically secure random passwords with customizable length and character types."
                link="/password-generator"
              />
            </StaggerItem>

            <StaggerItem>
              <FeatureCard
                icon="🗄️"
                title="Password Manager"
                description="Securely store and manage all your passwords with MongoDB backend and JWT authentication."
                link="/password-manager"
              />
            </StaggerItem>
          </StaggerContainer>

          {/* Security approach — staggered cards with varied heights */}
          <div className="mt-24">
            <div className="section-line mb-10">
              <h2 className="font-display text-xl text-white whitespace-nowrap px-4">
                Security First
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group relative rounded-xl p-[1px] overflow-hidden"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                  viewport={{ once: true }}
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}20, transparent, ${feature.color}10)`
                  }}
                >
                  <div className="bg-[var(--surface-1)] rounded-[11px] p-6 h-full transition-all duration-300">
                    {/* Colored accent line */}
                    <div
                      className="w-8 h-[2px] mb-5 rounded-full transition-all duration-300 group-hover:w-12"
                      style={{ background: feature.color }}
                    />
                    <h3 className="font-display text-base text-white mb-2">{feature.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
