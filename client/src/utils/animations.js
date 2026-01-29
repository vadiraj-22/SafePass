// This file contains all your animation presets
export const globalVariants = {
  // Page entrance animation
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  // Card hover effect
  cardHover: {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.05, y: -10 },
    transition: { duration: 0.2 }
  },
  
  // Button with glow effect
  buttonGlow: {
    rest: { scale: 1, boxShadow: "0 0 0 rgba(139, 92, 246, 0)" },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" 
    },
    tap: { scale: 0.95 }
  },
  
  // Hero section animations
  heroVariants: {
    title: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay: 0.2 }
    },
    subtitle: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.4 }
    },
    decorations: {
      initial: { scale: 0, rotate: -180 },
      animate: { scale: 1, rotate: 0 },
      transition: { duration: 0.6, ease: "backOut" }
    }
  },
  
  // Stagger animations
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  
  staggerItem: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }
};