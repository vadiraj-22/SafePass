import { motion } from 'motion/react';
import { useAnimation } from './AnimationProvider';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  viewport = true,
  once = true,
  className = ""
}) => {
  const { reducedMotion, variants, getAnimationVariant } = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    margin: "-100px",
    amount: 0.3 
  });

  // Use global stagger variants or create custom ones
  const containerVariants = getAnimationVariant({
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  }, {
    animate: {
      transition: {
        staggerChildren: 0,
        delayChildren: 0
      }
    }
  });

  const shouldAnimate = viewport ? isInView : true;

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="initial"
      animate={shouldAnimate ? "animate" : "initial"}
      className={className}
      style={{
        // GPU acceleration optimization
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item component
export const StaggerItem = ({ children, className = "" }) => {
  const { variants, getAnimationVariant } = useAnimation();
  
  const itemVariants = getAnimationVariant(
    variants.staggerItem,
    { initial: { opacity: 0 }, animate: { opacity: 1 } }
  );

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      style={{
        // GPU acceleration optimization
        transform: 'translateZ(0)',
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </motion.div>
  );
};