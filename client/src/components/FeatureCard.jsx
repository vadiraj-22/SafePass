import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAnimation } from './animations/AnimationProvider';

const FeatureCard = ({ icon, title, description, link, comingSoon }) => {
  const { variants, getAnimationVariant } = useAnimation();

  // Enhanced card animation variants
  const cardVariants = getAnimationVariant({
    rest: { 
      scale: 1, 
      y: 0,
      borderColor: "rgba(139, 92, 246, 0.2)",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.05, 
      y: -10,
      borderColor: "rgba(139, 92, 246, 0.6)",
      boxShadow: "0 15px 35px rgba(139, 92, 246, 0.25)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }, {
    rest: { opacity: 1 },
    hover: { opacity: 0.9 }
  });

  const iconVariants = getAnimationVariant({
    rest: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -5, 5, 0], 
      scale: 1.1,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  }, {
    rest: { opacity: 1 },
    hover: { opacity: 0.8 }
  });

  const CardContent = () => (
    <motion.div 
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 transition-all duration-300 ${comingSoon ? 'opacity-75' : ''}`}
      style={{
        // GPU acceleration optimization
        transform: 'translateZ(0)',
        willChange: 'transform, box-shadow, border-color'
      }}
    >
      <motion.div 
        variants={iconVariants}
        className='text-5xl mb-4'
      >
        {icon}
      </motion.div>
      
      <motion.h3 
        className='font-heading text-2xl font-bold mb-3 text-white'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className='font-body text-gray-400 mb-4'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {description}
      </motion.p>
      
      {comingSoon && (
        <motion.span 
          className='inline-block bg-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full font-mono'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          COMING SOON
        </motion.span>
      )}
      
      {!comingSoon && (
        <motion.span 
          className='text-purple-400 font-semibold font-mono text-sm inline-flex items-center gap-2'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ x: 5 }}
        >
          EXPLORE 
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.span>
      )}
    </motion.div>
  );

  if (comingSoon) {
    return <div className='cursor-not-allowed'><CardContent /></div>;
  }

  return (
    <Link to={link}>
      <CardContent />
    </Link>
  );
};

export default FeatureCard;
