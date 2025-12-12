import FeatureCard from "../components/FeatureCard";
import Video from "../components/Video";

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-10">
        <Video />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-60 pt-16">
          <div className="my-screen-sm">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 my-24 hover:scale-105 transition-transform bg-linear-to-r from-purple-300 to-blue-500 bg-clip-text text-transparent">
              Password Security Suite
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Military-grade password security tools to protect your digital
              life. Generate, analyze, and manage passwords with confidence.
            </p>

            <div className="flex gap-4 justify-center ">
              <a
                href="#features"
                className=" border border-gray-700 bg-white/20 hover:border-purple-500 text-white font-semibold px-8 py-4 rounded-lg transition text-lg"
              >
                Get Started
              </a>
              <a
                href="#about"
                className="border border-gray-700 bg-white/20 hover:border-purple-500 text-white font-semibold px-8 py-4 rounded-lg transition text-lg"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Powerful Security Features
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Everything you need to stay secure online
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="text-5xl font-bold bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
              100%
            </div>
            <p className="text-gray-400">Client-Side Security</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
              256-bit
            </div>
            <p className="text-gray-400">Encryption Standard</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
              0
            </div>
            <p className="text-gray-400">Data Stored on Servers</p>
          </div>
        </div>

        {/* About Section */}
        <div
          id="about"
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Why SafePass?</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            SafePass is built with security-first principles. All operations
            happen locally in your browser, ensuring your passwords never leave
            your device. We use industry-standard cryptographic algorithms and
            follow best practices to keep your data safe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
