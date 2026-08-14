import { ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from 'motion/react';
export function Hero() {
  const heroVariants = {
    title: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, ease: "easeOut" }
    },
    subtitle: {
      initial: { opacity: 0, y: 25 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.2, ease: "easeOut" }
    },
    description: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.3, ease: "easeOut" }
    },
    buttons: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-28 md:pb-16" style={{ zIndex: 10 }}>
      <div className="flex flex-col items-center justify-center px-6 md:px-10 lg:px-12 text-center">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div 
            className="relative mx-auto border-2 border-emerald-500/30 p-7 md:p-11 lg:p-14 bg-black/75 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Corner subtle accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-emerald-400" />
            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-emerald-400" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-emerald-400" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-emerald-400" />

            {/* Badge */}
            <motion.div 
              className="z-10 mb-6 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative flex items-center whitespace-nowrap rounded-full border bg-emerald-500/10 border-emerald-500/20 px-4 py-1.5 text-xs text-emerald-400 font-mono font-medium">
                <Shield className="h-3.5 w-3.5 mr-2 text-emerald-400" />
                <span>SafePass Security Platform</span>
                <Link
                  to="/features"
                  className="hover:text-white ml-2 flex items-center font-bold transition-colors text-emerald-400"
                >
                  Explore{" "}
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="hero-title select-none px-2 md:px-3 py-2 text-center text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-white font-extrabold"
              variants={heroVariants.title}
              initial="initial"
              animate="animate"
            >
              Your Complete Platform for <span className="text-emerald-400 font-extrabold">Password Security</span>.
            </motion.h1>

            <motion.div 
              className="flex items-center justify-center gap-2 mt-3 mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              </span>
              <p className="text-xs text-emerald-400 font-semibold font-mono tracking-wider">SYSTEM ONLINE</p>
            </motion.div>

            {/* Subtitle */}
            <motion.h2 
              className="hero-subtitle mt-4 text-lg md:text-xl text-white px-4 font-bold"
              variants={heroVariants.subtitle}
              initial="initial"
              animate="animate"
            >
              Welcome to your security platform — <span className="text-emerald-400 font-bold">SafePass</span>
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              className="font-body mx-auto mb-8 mt-3 max-w-2xl px-4 text-sm md:text-base text-slate-300 leading-relaxed"
              variants={heroVariants.description}
              initial="initial"
              animate="animate"
            >
              We craft military-grade password security tools and provide resources
              to empower your digital safety.
            </motion.p>

            {/* Action Buttons — Clean & Cohesive */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-3 px-4"
              variants={heroVariants.buttons}
              initial="initial"
              animate="animate"
            >
              <Link
                to="/breach-checker"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-400 px-7 py-3.5 text-sm font-bold text-slate-950 font-mono transition-colors"
              >
                BREACH CHECKER
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link
                to="/generator"
                className="inline-flex items-center justify-center rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 px-7 py-3.5 text-sm font-bold text-white font-mono transition-colors"
              >
                GENERATE PASSWORD
                <Zap className="ml-2 h-4 w-4 text-emerald-400" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}