import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAnimation } from './animations/AnimationProvider';
import { smoothScrollToTop } from '../utils/smoothScroll';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { getAnimationVariant } = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }

      if (scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    smoothScrollToTop();
  };

  const buttonVariants = getAnimationVariant({
    hidden: { 
      opacity: 0, 
      scale: 0.7,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 350, damping: 25 }
    },
    hover: {
      scale: 1.1,
      y: -4,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { scale: 0.92, y: 0 }
  }, {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: { opacity: 0.9 }
  });

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-3 pointer-events-auto">
          {/* Tooltip on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c0d14]/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider shadow-lg backdrop-blur-md whitespace-nowrap pointer-events-none"
              >
                <span>TOP</span>
                <span className="text-[10px] text-gray-400">({Math.round(scrollProgress)}%)</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0d0e15]/85 hover:bg-[#141622]/95 border border-emerald-500/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] backdrop-blur-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black group"
            onClick={handleScrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            whileTap="tap"
            aria-label={`Scroll to top (${Math.round(scrollProgress)}% scrolled)`}
          >
            {/* Pulsing background aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-400/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />

            {/* SVG Progress Circle Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
              {/* Track */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-gray-800/60"
                strokeWidth="2.5"
                fill="transparent"
              />
              {/* Animated Progress Indicator */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-emerald-400 transition-all duration-150 ease-out"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Icon inside */}
            <motion.svg
              className="w-5 h-5 relative z-10 text-emerald-400 group-hover:text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </motion.svg>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;