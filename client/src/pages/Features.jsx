import FeatureCard from '../components/FeatureCard';
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';
import { motion } from 'motion/react';

const Features = () => {
  return (
    <div className='relative text-white pt-24 md:pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-10'>
      {/* Editorial Header */}
      <div className='bg-black/65 backdrop-blur-md border border-gray-800/80 rounded-none p-8 md:p-10 shadow-2xl space-y-4'>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          CYBERSECURITY FEATURE MATRIX & CAPABILITIES
        </div>

        <motion.h1
          className='font-display text-3xl md:text-5xl text-white font-extrabold tracking-tight leading-tight'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Security Tools & <span className="text-[#2dd4bf] font-extrabold">Defense Capabilities</span>
        </motion.h1>

        <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed font-body">
          Explore the comprehensive suite of password generation, leak detection, and encrypted storage tools built into SafePass.
        </p>
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
            description="Instantly check if your password or email has been compromised in known data breaches using the Have I Been Pwned database."
            link="/breach-checker"
          />
        </StaggerItem>

        <StaggerItem>
          <FeatureCard
            icon="🔐"
            title="Password Generator"
            description="Generate cryptographically secure, high-entropy passwords with customizable length, symbols, and zero predictability."
            link="/generator"
          />
        </StaggerItem>

        <StaggerItem>
          <FeatureCard
            icon="⚡"
            title="Password Vault"
            description="Store and organize your passwords safely with client-side zero-knowledge encryption and instant search."
            link="/vault"
          />
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
};

export default Features;
