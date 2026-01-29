import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAnimation } from './animations/AnimationProvider';
import { smoothScrollToTop } from '../utils/smoothScroll';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { variants, getAnimationVariant } = useAnimation();

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScrollToTop = () => {
    smoothScrollToTop();
  };

  const buttonVariants = getAnimationVariant({
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  }, {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: { opacity: 0.8 }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 z-40 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg backdrop-blur-sm border border-purple-500/30"
          onClick={handleScrollToTop}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          aria-label="Back to top"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;