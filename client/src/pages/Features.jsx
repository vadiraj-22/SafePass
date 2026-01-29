import FeatureCard from '../components/FeatureCard';
import { useEffect } from 'react';
import { renderCanvas } from '../components/ui/canvas';
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';
import { motion } from 'motion/react';
import { useAnimation } from '../components/animations/AnimationProvider';

const Features = () => {
  const { variants, getAnimationVariant } = useAnimation();

  useEffect(() => {
    // Initialize canvas for the entire page
    renderCanvas();
  }, []);

  // Enhanced animation variants for the features page
  const featuresVariants = {
    title: {
      initial: { opacity: 0, y: 50, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.8, ease: "easeOut" }
    },
    subtitle: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
    }
  };

  return (
    <div className='relative bg-black text-white min-h-screen pt-24 pb-16 px-6'>
      {/* Full page canvas animation */}
      <canvas
        className="pointer-events-none fixed inset-0 w-full bg-transparent z-0"
        id="canvas"
        style={{ height: '100vh', minHeight: '100vh' }}
      ></canvas>
      
      {/* All content with proper z-index */}
      <div className="relative z-10">
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <motion.h1 
              className='text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent cybersec-title'
              variants={getAnimationVariant(featuresVariants.title, { initial: { opacity: 0 }, animate: { opacity: 1 } })}
              initial="initial"
              animate="animate"
            >
              ALL FEATURES
            </motion.h1>
            <motion.p 
              className='text-gray-400 text-lg font-mono'
              variants={getAnimationVariant(featuresVariants.subtitle, { initial: { opacity: 0 }, animate: { opacity: 1 } })}
              initial="initial"
              animate="animate"
            >
              Comprehensive password security tools at your fingertips
            </motion.p>
          </div>

          <StaggerContainer 
            className='grid grid-cols-1 md:grid-cols-3 gap-8'
            staggerDelay={0.2}
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

          {/* Additional features section with smooth scroll anchor */}
          <motion.div 
            id="security-features"
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold mb-8 text-white cybersec-title">
              SECURITY FIRST APPROACH
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🔒", title: "256-bit Encryption", desc: "Military-grade security" },
                { icon: "🛡️", title: "Zero Knowledge", desc: "Your data stays private" },
                { icon: "⚡", title: "Client-Side Processing", desc: "No server dependencies" },
                { icon: "🔍", title: "Real-time Validation", desc: "Instant security feedback" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-mono">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
