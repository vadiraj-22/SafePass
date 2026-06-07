import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState, useRef } from 'react';

const icons = {
  '🔍': (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  '⚡': (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  '🗄️': (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
};

const accentMap = {
  'Data Breach Checker': { color: 'var(--accent-breach)', bg: 'rgba(34,211,238,0.06)', border: 'rgba(34,211,238,0.12)', hoverBorder: 'rgba(34,211,238,0.35)' },
  'Password Generator': { color: 'var(--accent-generator)', bg: 'rgba(251,191,36,0.06)', border: 'rgba(251,191,36,0.12)', hoverBorder: 'rgba(251,191,36,0.35)' },
  'Password Manager': { color: 'var(--accent-vault)', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.12)', hoverBorder: 'rgba(139,92,246,0.35)' },
};

const FeatureCard = ({ icon, title, description, link, comingSoon }) => {
  const accent = accentMap[title] || accentMap['Password Manager'];
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = icons[icon];

  const CardContent = () => (
    <motion.div
      ref={cardRef}
      className="relative rounded-xl overflow-hidden transition-all duration-400 group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        background: 'var(--surface-1)',
        border: `1px solid ${isHovered ? accent.hoverBorder : accent.border}`,
      }}
    >
      <div className="p-5 h-full flex flex-col">
        {/* Icon */}
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{ background: accent.bg, border: `1px solid ${accent.border}` }}
        >
          {IconComponent ? IconComponent(accent.color) : <span className="text-lg">{icon}</span>}
        </div>

        <h3 className='font-display text-base mb-1.5 text-white'>{title}</h3>
        <p className='text-[var(--text-secondary)] text-sm leading-relaxed mb-4 flex-1'>{description}</p>

        {comingSoon ? (
          <span className='inline-block text-[10px] font-medium px-2.5 py-1 rounded-full w-fit'
            style={{ background: accent.bg, color: accent.color, border: `1px solid ${accent.border}` }}>
            Coming Soon
          </span>
        ) : (
          <div className="flex items-center gap-1.5 text-sm font-medium transition-all duration-300 group-hover:gap-2.5" style={{ color: accent.color }}>
            <span>Explore</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (comingSoon) {
    return <div className='cursor-not-allowed opacity-60 h-full'><CardContent /></div>;
  }

  return (
    <Link to={link} className="block h-full">
      <CardContent />
    </Link>
  );
};

export default FeatureCard;
