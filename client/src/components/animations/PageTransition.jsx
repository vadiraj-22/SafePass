import { motion, AnimatePresence } from 'motion/react';
import { useAnimation } from './AnimationProvider';

// Enhanced page transition variants
const pageTransitionVariants = {
  slide: {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  },
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.1 }
  }
};

export const PageTransition = ({ 
  children, 
  transitionKey, 
  variant = 'fade' // 'slide' | 'fade' | 'scale'
}) => {
  const { reducedMotion, duration, ease, getAnimationVariant } = useAnimation();
  
  // Get the appropriate variant based on the selected type
  const variants = pageTransitionVariants[variant] || pageTransitionVariants.fade;
  
  // Apply reduced motion preferences
  const finalVariants = getAnimationVariant(variants, {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  });
  
  const pageTransition = {
    type: 'tween',
    ease,
    duration
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial="initial"
        animate="in"
        exit="out"
        variants={finalVariants}
        transition={pageTransition}
        style={{ 
          width: '100%', 
          minHeight: '100vh',
          // GPU acceleration optimization
          transform: 'translateZ(0)',
          willChange: 'transform, opacity'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
