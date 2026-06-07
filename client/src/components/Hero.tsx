import { ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from 'motion/react';
import { smoothScrollTo } from '../utils/smoothScroll.ts';

export function Hero() {
  // Handle smooth scroll to sections
  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo('about', { block: 'start' });
  };

  // Enhanced animation variants
  const heroVariants = {
    title: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, ease: "easeOut" }
    },
    subtitle: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
    },
    description: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.4, ease: "easeOut" }
    },
    buttons: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="home" className="relative mt-8 mb-8 md:mt-0 md:mb-0 pt-32 pb-16 md:pt-24 md:pb-16">
      <div className="flex flex-col items-center justify-center px-4 text-center">
        <motion.div 
          className="z-10 mb-10 md:mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="relative flex items-center whitespace-nowrap rounded-full border bg-gray-900/50 backdrop-blur-sm border-gray-800 px-3 py-1 text-xs leading-6 text-gray-300 hover:border-purple-500/50 transition-all duration-300">
            <Shield className="h-5 p-1 text-purple-400" />
            <span className="font-mono">Introducing SafePass.</span>
            <Link
              to="/features"
              className="hover:text-purple-400 ml-1 flex items-center font-semibold transition-colors font-mono"
            >
              <div className="absolute inset-0 flex" aria-hidden="true" />
              Explore{" "}
              <span aria-hidden="true">
                <ArrowRight className="h-4 w-4 ml-1" />
              </span>
            </Link>
          </div>
        </motion.div>

        <div className="mb-16 md:mb-10">
          <div className="px-2">
            <motion.div 
              className="relative mx-auto h-full max-w-5xl border border-gray-800 p-6 md:p-8 lg:p-12 bg-gray-900/50 backdrop-blur-sm rounded-2xl hover:border-purple-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              {/* Corner decorations with enhanced animations */}
              <motion.div
                className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-purple-400"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
              />
              <motion.div
                className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "backOut" }}
              />
              <motion.div
                className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-purple-400"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "backOut" }}
              />
              <motion.div
                className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-purple-400"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "backOut" }}
              />

              <motion.h1 
                className="hero-title select-none px-2 md:px-3 py-2 text-center text-xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
                variants={heroVariants.title}
                initial="initial"
                animate="animate"
              >
                Your complete platform for Password Security.
              </motion.h1>
              
              <motion.div 
                className="flex items-center justify-center gap-1 mt-8 md:mt-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400"></span>
                </span>
                <p className="text-xs text-purple-400 font-semibold font-mono">SYSTEM ONLINE</p>
              </motion.div>
            </motion.div>
          </div>

          <motion.h2 
            className="hero-subtitle mt-8 md:mt-8 text-base md:text-xl lg:text-2xl text-white px-4"
            variants={heroVariants.subtitle}
            initial="initial"
            animate="animate"
          >
            Welcome to your security playground! We're{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent font-bold hero-title">SafePass</span>
          </motion.h2>
          
          <motion.p 
            className="font-body mx-auto mb-8 md:mb-8 mt-4 md:mt-4 max-w-2xl px-6 text-xs md:text-base text-gray-400 lg:text-lg"
            variants={heroVariants.description}
            initial="initial"
            animate="animate"
          >
            We craft military-grade password security tools and provide resources
            to empower your digital safety.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-3 px-4"
            variants={heroVariants.buttons}
            initial="initial"
            animate="animate"
          >
            {/* Primary CTA — gradient glow button */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Link
                to="/password-generator"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto font-mono font-semibold text-sm px-7 py-3 rounded-full tracking-wide text-white border border-purple-500/60 bg-gray-900/40 hover:border-purple-500 hover:bg-gray-800/60 transition-all duration-300"
              >
                <Zap className="h-4 w-4 text-purple-400" />
                START NOW
              </Link>
            </motion.div>

            {/* Secondary CTA — outline */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <button
                onClick={handleScrollToAbout}
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto font-mono font-semibold text-sm px-7 py-3 rounded-full tracking-wide text-gray-300 border border-gray-700 bg-gray-900/40 hover:border-purple-500/60 hover:text-white hover:bg-gray-800/60 transition-all duration-300"
              >
                LEARN MORE
                <ArrowRight className="h-4 w-4 opacity-60" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}