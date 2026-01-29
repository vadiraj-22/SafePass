import { useRef, useEffect } from 'react';
import { useInView, useAnimation as useMotionAnimation } from 'motion/react';
import { useAnimation } from '../components/animations/AnimationProvider';

export const useScrollAnimation = ({
  threshold = 0.3,
  triggerOnce = true,
  rootMargin = "-100px"
} = {}) => {
  const ref = useRef(null);
  const controls = useMotionAnimation();
  const { reducedMotion } = useAnimation();
  
  const inView = useInView(ref, {
    threshold,
    once: triggerOnce,
    margin: rootMargin
  });

  // Automatically trigger animations when in view
  useEffect(() => {
    if (inView) {
      controls.start("animate");
    } else if (!triggerOnce) {
      controls.start("initial");
    }
  }, [inView, controls, triggerOnce]);

  return {
    ref,
    inView,
    controls,
    // Helper function for smooth scroll to element
    scrollToElement: (element, options = {}) => {
      if (!element) return;
      
      const defaultOptions = {
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
        inline: 'nearest',
        ...options
      };
      
      element.scrollIntoView(defaultOptions);
    }
  };
};