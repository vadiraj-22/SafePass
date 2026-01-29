import FeatureCard from "../components/FeatureCard";
import { Hero } from "../components/Hero";
import { useEffect } from "react";
import { renderCanvas } from "../components/ui/canvas";
import { PageTransition } from "../components/animations/PageTransition";
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';

const Home = () => {
  useEffect(() => {
    // Initialize canvas for the entire page
    renderCanvas();
  }, []);

  return (
    <PageTransition transitionKey="home">
    <div className="relative min-h-screen bg-black">
      {/* Full page canvas animation */}
      <canvas
        className="pointer-events-none fixed inset-0 w-full bg-transparent z-0"
        id="canvas"
        style={{ height: '100vh', minHeight: '100vh' }}
      ></canvas>
      
      {/* All content with proper z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16 md:pb-24 mt-8 mb-8 md:mt-0 md:mb-0">
          {/* Features Section */}
          <div id="features" className="mb-20 md:mb-32">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-center mb-4 md:mb-4 text-white">
              POWERFUL SECURITY FEATURES
            </h2>
            <p className="font-body text-center text-gray-400 mb-8 md:mb-12 text-sm md:text-lg px-4">
              Everything you need to stay secure online
            </p>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 xl:gap-10 mb-12 md:mb-16">
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
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-8 mb-16 md:mb-20">
            <div className="text-center bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2 md:mb-2">
                100%
              </div>
              <p className="text-gray-400 font-mono text-xs md:text-sm">CLIENT-SIDE SECURITY</p>
            </div>
            <div className="text-center bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2 md:mb-2">
                256-bit
              </div>
              <p className="text-gray-400 font-mono text-xs md:text-sm">ENCRYPTION STANDARD</p>
            </div>
            <div className="text-center bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-6 hover:border-purple-500/50 transition-all duration-300">
              <div className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2 md:mb-2">
                0
              </div>
              <p className="text-gray-400 font-mono text-xs md:text-sm">DATA STORED ON SERVERS</p>
            </div>
          </div>

          {/* About Section */}
          <div
            id="about"
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 lg:p-12 xl:p-16 text-center"
          >
            <h2 className="font-heading text-xl md:text-3xl font-bold mb-4 md:mb-6 text-white">WHY SAFEPASS?</h2>
            <p className="font-body text-gray-300 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
              SafePass is built with security-first principles. All operations
              happen locally in your browser, ensuring your passwords never leave
              your device. We use industry-standard cryptographic algorithms and
              follow best practices to keep your data safe.
            </p>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default Home;
