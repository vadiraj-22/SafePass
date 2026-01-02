import FeatureCard from '../components/FeatureCard';
import { useEffect } from 'react';
import { renderCanvas } from '../components/ui/canvas';

const Features = () => {
  useEffect(() => {
    // Initialize canvas for the entire page
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
      
      {/* All content with proper z-index */}
      <div className="relative z-10">
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent cybersec-title'>
              ALL FEATURES
            </h1>
            <p className='text-gray-400 text-lg font-mono'>
              Comprehensive password security tools at your fingertips
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <FeatureCard 
              icon="🔍"
              title="Data Breach Checker"
              description="Instantly check if your password has been compromised in known data breaches using the Have I Been Pwned database."
              link="/breach-checker"
            />
            
            <FeatureCard 
              icon="⚡"
              title="Password Generator"
              description="Generate cryptographically secure random passwords with customizable length and character types."
              link="/password-generator"
            />
            
            <FeatureCard 
              icon="🗄️"
              title="Password Manager"
              description="Securely store and manage all your passwords with MongoDB backend and JWT authentication."
              link="/password-manager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
