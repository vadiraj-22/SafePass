// Enhanced AnimationProvider with performance settings and global variants
import { createContext, useContext, useMemo } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const AnimationContext = createContext();

// Global animation variants for consistent timing and easing
export const globalVariants = {
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeOut" }
  },

  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 }, // Reduced from 30 for better mobile performance
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  },

  // Interactive variants for buttons and form elements
  button: {
    rest: { scale: 1, boxShadow: "0 0 0 rgba(139, 92, 246, 0)" },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  },

  formField: {
    unfocused: {
      borderColor: "rgba(139, 92, 246, 0.2)",
      boxShadow: "0 0 0 rgba(139, 92, 246, 0)"
    },
    focused: {
      borderColor: "rgba(139, 92, 246, 1)",
      boxShadow: "0 0 10px rgba(139, 92, 246, 0.2)",
      transition: { duration: 0.2 }
    }
  }
};

// Performance configuration
const performanceSettings = {
  maxConcurrentAnimations: 10,
  frameRateTarget: 60,
  enableGPUAcceleration: true,
  reducedMotionFallbacks: true
};

// Accessibility configuration
const accessibilitySettings = {
  respectReducedMotion: true,
  fallbackDuration: 0.1,
  maintainFocus: true,
  announceStateChanges: true
};

export const AnimationProvider = ({
  children,
  performanceMode = 'balanced' // 'high' | 'balanced' | 'low'
}) => {
  const reducedMotion = useReducedMotion();

  const animationSettings = useMemo(() => ({
    // Motion preferences
    reducedMotion,

    // Performance settings
    performanceMode,
    ...performanceSettings,

    // Accessibility settings
    ...accessibilitySettings,

    // Global variants
    variants: globalVariants,

    // Timing settings based on reduced motion preference
    duration: reducedMotion ? accessibilitySettings.fallbackDuration : 0.3,
    ease: "easeOut",

    // Helper function to get animation variant based on reduced motion
    getAnimationVariant: (fullAnimation, reducedAnimation = { opacity: 1 }) =>
      reducedMotion ? reducedAnimation : fullAnimation,

    // Helper function for smooth scroll configuration
    smoothScrollConfig: {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    }
  }), [reducedMotion, performanceMode]);

  return (
    <AnimationContext.Provider value={animationSettings}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
