import { useEffect } from 'react';
import { renderCanvas } from '../components/ui/canvas';
import { Button } from '../components/ui/button';
import { Shield, Lock, Eye, Server } from 'lucide-react';

const About = () => {
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
          {/* Hero Section */}
          <div className='text-center mb-16'>
            <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent cybersec-title'>
              ABOUT SAFEPASS
            </h1>
            <p className='text-gray-400 text-lg font-mono max-w-3xl mx-auto'>
              Military-grade password security built with privacy-first principles
            </p>
          </div>

          {/* Main About Content */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12 lg:p-16 mb-16 hover:border-purple-500/50 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-6 text-white cybersec-title text-center">OUR MISSION</h2>
            <p className="text-gray-300 text-lg max-w-4xl mx-auto text-center leading-relaxed">
              SafePass is built with security-first principles. All operations happen locally in your browser, 
              ensuring your passwords never leave your device. We use industry-standard cryptographic algorithms 
              and follow best practices to keep your data safe. Our commitment is to provide you with the most 
              secure, private, and user-friendly password management experience possible.
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white cybersec-title mb-2">CLIENT-SIDE</h3>
              <p className="text-gray-400 text-sm font-mono">100% local processing</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300">
              <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white cybersec-title mb-2">ENCRYPTED</h3>
              <p className="text-gray-400 text-sm font-mono">256-bit encryption</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300">
              <Eye className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white cybersec-title mb-2">PRIVATE</h3>
              <p className="text-gray-400 text-sm font-mono">Zero data collection</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300">
              <Server className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white cybersec-title mb-2">SECURE</h3>
              <p className="text-gray-400 text-sm font-mono">No server storage</p>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12 mb-16 hover:border-purple-500/50 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-6 text-white cybersec-title text-center">TECHNOLOGY STACK</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-purple-400 cybersec-title mb-4">FRONTEND</h3>
                <ul className="text-gray-300 space-y-2 font-mono text-sm">
                  <li>• React 19 with modern hooks</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Vite for fast development</li>
                  <li>• TypeScript for type safety</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-400 cybersec-title mb-4">SECURITY</h3>
                <ul className="text-gray-300 space-y-2 font-mono text-sm">
                  <li>• Cryptographically secure RNG</li>
                  <li>• Have I Been Pwned API</li>
                  <li>• JWT authentication</li>
                  <li>• MongoDB for secure storage</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-white cybersec-title">READY TO SECURE YOUR PASSWORDS?</h2>
            <div className="flex justify-center gap-4">
              <a href="/password-generator">
                <Button variant="default" size="lg" className="font-mono">
                  START NOW
                </Button>
              </a>
              <a href="/features">
                <Button variant="outline" size="lg" className="font-mono">
                  VIEW FEATURES
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;