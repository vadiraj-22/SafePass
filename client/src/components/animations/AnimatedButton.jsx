import { motion } from 'motion/react';

export const AnimatedButton = ({ children, className, onClick, ...props }) => {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
