import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, link, comingSoon }) => {
  const CardContent = () => (
    <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 ${comingSoon ? 'opacity-75' : ''}`}>
      <div className='text-5xl mb-4'>{icon}</div>
      <h3 className='text-2xl font-bold mb-3 text-white'>{title}</h3>
      <p className='text-gray-400 mb-4'>{description}</p>
      {comingSoon && (
        <span className='inline-block bg-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full'>
          Coming Soon
        </span>
      )}
      {!comingSoon && (
        <span className='text-purple-400 font-semibold'>
          Explore →
        </span>
      )}
    </div>
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
